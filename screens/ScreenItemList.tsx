import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainScreenParamList } from './ScreenMain';
import ItemThumbnail from '../components/ItemThumbnail';
import { useItems } from '../contexts/ItemsContext';

const WINDOW_WIDTH = Dimensions.get('window').width;
const COLUMN = 2;

type navigationProp = StackNavigationProp<MainScreenParamList, 'ItemList'>;
type routeProp = RouteProp<MainScreenParamList, 'ItemList'>;

type Props = {
  navigation: navigationProp;
  route: routeProp;
};

export default function ItemList({ navigation, route }: Props) {
  const { label } = route.params;
  const { getItemsByLabel } = useItems();
  const items = getItemsByLabel(label);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.labelList}
        data={items}
        numColumns={COLUMN}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <View>
              <ItemThumbnail
                onTap={() => navigation.navigate('ItemSingle', { item })}
                width={(WINDOW_WIDTH - 60) / COLUMN}
                name={item.name}
                note={item.note}
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
