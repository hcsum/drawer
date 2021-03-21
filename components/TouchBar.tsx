import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import Text from './Text';
import CommonStyles from '../CommonStyles';

interface IProps {
  onPress: () => void;
  icon: 'all' | 'label';
}

const IconMap = {
  all: require('../assets/all.png'),
  label: require('../assets/label.png'),
};

const TouchBar = ({ onPress, icon }: IProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.title}>
        <Image style={styles.icon} source={IconMap[icon]} />
        <Text>All Stuff</Text>
      </View>
      <Text>238</Text>
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
