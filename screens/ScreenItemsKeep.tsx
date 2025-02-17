import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import NumberBar from '../components/NumberBar';
import LabelThumbnail from '../components/LabelThumbnail';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeTabStackParamList } from '../components/MainScreenBottomNav';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { MainScreenParamList } from './ScreenMain';
import { useItems } from '../contexts/ItemsContext';

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
  const { labelsWithTotal, items } = useItems();

  return (
    <View style={styles.container}>
      <View style={styles.allItems}>
        <NumberBar
          title="All items"
          number={items.length}
          onPress={() => {
            navigation.navigate('ItemList', {
              title: 'All',
              searchQuery: {},
            });
          }}
        />
      </View>
      <View>
        <FlatList
          style={styles.labelList}
          data={labelsWithTotal}
          numColumns={COLUMN}
          keyExtractor={(item) => item[0]}
          renderItem={({ item, index }) => {
            return (
              <LabelThumbnail
                onTap={() => {
                  navigation.navigate('ItemList', {
                    title: item[0],
                    searchQuery: { label: item[0] },
                  });
                }}
                width={(WINDOW_WIDTH - 60) / COLUMN}
                name={item[0]}
                total={item[1]}
                index={index}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  allItems: {
    marginBottom: 20,
  },
  labelList: {
    // paddingBottom: 200,
  },
});
