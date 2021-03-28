import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import Text from './Text';
import CommonStyles from '../CommonStyles';

interface IProps {
  title: string;
  number: number;
  onPress: () => void;
  icon: 'all' | 'label' | 'remove';
}

const IconMap = {
  all: require('../assets/all.png'),
  label: require('../assets/label.png'),
  remove: require('../assets/remove.png'),
};

const TouchBar = ({ title, number, onPress, icon }: IProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.title}>
        <Image style={styles.icon} source={IconMap[icon]} />
        <Text>{title}</Text>
      </View>
      <Text>{number}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    borderRadius: CommonStyles.borderRadius,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
});

export default TouchBar;
