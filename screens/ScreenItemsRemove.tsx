import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import ItemThumbnail from '../components/ItemThumbnail';
import { useItems } from '../contexts/ItemsContext';
// import useNotification from '../hooks/useNotification';
import { HomeTabStackParamList } from './NavHome';
import { MainScreenParamList } from './ScreenMain';

const WINDOW_WIDTH = Dimensions.get('window').width;
const COLUMN = 2;

type navigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeTabStackParamList, 'Clear'>,
  StackNavigationProp<MainScreenParamList, 'ItemSingle'>
>;
type routeProp = RouteProp<HomeTabStackParamList, 'Clear'>;

type Props = {
  navigation: navigationProp;
  route: routeProp;
};

export default function RemoveItemsScreen({ navigation }: Props) {
  const { itemsToBeRemoved } = useItems();
  const data = itemsToBeRemoved.sort(
    (itemA, itemB) =>
      new Date(itemA.dateLastUsed || 0).getTime() -
      new Date(itemB.dateLastUsed || 0).getTime()
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.labelList}
        data={data}
        numColumns={COLUMN}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <ItemThumbnail
              isToBeRemoved
              probationPeriod={item.probationPeriod}
              timeLastUsed={item.dateLastUsed}
              onTap={() => {
                navigation.navigate('ItemSingle', { item });
              }}
              width={(WINDOW_WIDTH - 60) / COLUMN}
              name={item.name}
              index={index}
            />
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
    paddingBottom: 80,
  },
  touchBarWrap: {
    marginBottom: 20,
  },
  labelList: {
    paddingBottom: 180,
  },
});
