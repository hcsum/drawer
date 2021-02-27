import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145570029d72',
    title: 'Third Item',
  },
  {
    id: '51694a0f-3da1-471f-bd96-145571e29w72',
    title: 'Third Item',
  },
  {
    id: '48694a0f-3da1-471f-bd96-145571e29dds',
    title: 'Third Item',
  },
  {
    id: '38694a0f-3da1-471f-bd96-145570029d72',
    title: 'Third Item',
  },
  {
    id: '28694a0f-3da1-471f-bd96-145571e29w72',
    title: 'Third Item',
  },
  {
    id: '18694a0f-3da1-471f-bd96-145571e29dds',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const List = () => {
  const renderItem = ({ item }) => <Item title={item.title} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Total items</Text>
      <Text style={styles.text}>81</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 40,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
