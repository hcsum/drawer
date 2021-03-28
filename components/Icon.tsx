import React from 'react';
import { StyleSheet, Image, ImageStyle } from 'react-native';

export interface IconProps {
  type: 'search' | 'add' | 'options' | 'remove' | 'drawer';
  size?: number;
}

const IconMap = {
  search: require('../assets/search.png'),
  add: require('../assets/plus.png'),
  options: require('../assets/options.png'),
  remove: require('../assets/remove.png'),
  drawer: require('../assets/drawer.png'),
};

const Icon = ({ type, size }: IconProps) => {
  const iconStyle = { ...styles.icon };
  if (size) {
    iconStyle.height = size;
    iconStyle.width = size;
  }

  return <Image style={iconStyle as ImageStyle} source={IconMap[type]} />;
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

export default Icon;
