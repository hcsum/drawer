import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainScreenParamList } from './ScreenMain';
import ItemThumbnail from '../components/ItemThumbnail';
import SubText from '../components/SubText';

const WINDOW_WIDTH = Dimensions.get('window').width;
const COLUMN = 2;

type navigationProp = StackNavigationProp<MainScreenParamList, 'ItemList'>;
type routeProp = RouteProp<MainScreenParamList, 'ItemList'>;

type Props = {
  navigation: navigationProp;
  route: routeProp;
};

export default function ItemList({ navigation, route }: Props) {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <FlatList
          style={styles.labelList}
          data={data}
          numColumns={COLUMN}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <ItemThumbnail
                onTap={() => navigation.navigate('ItemSingle', { item })}
                width={(WINDOW_WIDTH - 60) / COLUMN}
                name={item.name}
                note={item.note}
                index={index}
              />
            );
          }}
        />
      ) : (
        <View style={styles.noResult}>
          <SubText>No item found</SubText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 5,
  },
  NumberBarWrap: {
    marginBottom: 20,
  },
  labelList: {
    // marginTop: 20,
  },
  noResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
