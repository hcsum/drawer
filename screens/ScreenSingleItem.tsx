import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import shared from '../CommonStyles';
import { MainScreenParamList } from './ScreenMain';

type navigationProp = StackNavigationProp<MainScreenParamList, 'ItemSingle'>;
type routeProp = RouteProp<MainScreenParamList, 'ItemSingle'>;

type Props = {
  navigation: navigationProp;
  route: routeProp;
};

export default ({ navigation, route }: Props) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.imageAndName}>
        <Image source={require('../assets/keychron-k6.jpeg')} style={shared.image} />
        <View style={styles.subSection}>
          <Text style={shared.bigText}>{item.name}</Text>
        </View>
      </View>
      <View />
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: shared.common.screenPadding,
  },
  imageAndName: {
    ...shared.section,
    height: 300,
  },
  subSection: {
    padding: 10,
  },
});
