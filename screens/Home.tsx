import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import TouchBar from '../components/TouchBar';
import LabelTile from '../components/LabelTile';

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

const ITEM_WIDTH = Dimensions.get('window').width;
const COLUMN = 2;

export default function Home({ navigation, route }) {
  return (
    <View style={styles.container}>
      <View style={styles.touchBarWrap}>
        <TouchBar onPress={() => alert('pressed')} icon="all" />
      </View>
      <View>
        <TouchBar onPress={() => alert('pressed')} icon="label" />
      </View>
      <FlatList
        style={styles.labelList}
        data={ItemsByLabel}
        numColumns={COLUMN}
        keyExtractor={(item) => item.label}
        renderItem={({ item, index }) => {
          return (
            <View>
              <LabelTile
                width={(ITEM_WIDTH - 60) / COLUMN}
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
  },
  touchBarWrap: {
    marginBottom: 20,
  },
  labelList: {
    marginTop: 20,
  },
});
