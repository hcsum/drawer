import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import TouchBar from '../components/TouchBar';
import LabelThumbnail from '../components/LabelThumbnail';
import { getData, storeData } from '../utils/Storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeTabStackParamList } from './NavHome';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { MainScreenParamList } from './ScreenMain';

storeData('haha');

const ItemsByLabel = [
  {
    label: 'Wardrobe',
    total: 36,
  },
  {
    label: 'Kitchen',
    total: 12,
  },
  {
    label: 'Desk',
    total: 8,
  },
  {
    label: 'Bed',
    total: 5,
  },
  {
    label: 'Sport',
    total: 15,
  },
];

const WINDOW_WIDTH = Dimensions.get('window').width;
const COLUMN = 2;

type navigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeTabStackParamList, 'Keep'>,
  StackNavigationProp<MainScreenParamList, 'ItemList'>
>;
type routeProp = RouteProp<HomeTabStackParamList, 'Keep'>;

type Props = {
  navigation: navigationProp;
  route: routeProp;
};

export default function KeepItemsScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.touchBarWrap}>
        <TouchBar
          title="All items"
          number={237}
          onPress={() => {
            getData().then((data) => {
              alert(data);
            });
          }}
          icon="all"
        />
      </View>
      <FlatList
        style={styles.labelList}
        data={ItemsByLabel}
        numColumns={COLUMN}
        keyExtractor={(item) => item.label}
        renderItem={({ item, index }) => {
          return (
            <View>
              <LabelThumbnail
                onTap={() => {
                  navigation.navigate('ItemList', { name: item.label });
                }}
                width={(WINDOW_WIDTH - 60) / COLUMN}
                name={item.label}
                total={item.total}
                index={index}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 5,
  },
  touchBarWrap: {
    marginBottom: 20,
  },
  labelList: {
    marginTop: 20,
  },
});
