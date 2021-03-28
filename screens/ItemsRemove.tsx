import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import LabelThumbnail from '../components/LabelThumbnail';

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

export default function ItemsToKeep({ navigation, route }) {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.labelList}
        data={ItemsByLabel}
        numColumns={COLUMN}
        keyExtractor={(item) => item.label}
        renderItem={({ item, index }) => {
          return (
            <View>
              <LabelThumbnail
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
  },
  touchBarWrap: {
    marginBottom: 20,
  },
  labelList: {
    // marginTop: 20,
  },
});
