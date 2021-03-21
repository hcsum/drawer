import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

interface IProps {
  onPress: () => void;
  icon: 'search' | 'add';
}

const IconMap = {
  search: require('../assets/search.png'),
  add: require('../assets/plus.png'),
};

const IconButton = ({ onPress, icon }: IProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.icon} source={IconMap[icon]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

export default IconButton;
