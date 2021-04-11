import CommonStyles from '../CommonStyles';
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Text from './Text';
import SubText from './SubText';

interface IProps {
  name: string;
  total: number;
  index: number;
  width: number;
  onTap: () => void;
}

const LabelThumbnail = ({ name, total, width, index, onTap }: IProps) => {
  const containerStyle = {
    ...styles.container,
    width,
  };

  if ((index + 1) % 2 === 0) {
    containerStyle.marginLeft = 10;
  } else {
    containerStyle.marginRight = 10;
  }

  return (
    <TouchableOpacity onPress={onTap}>
      <View style={containerStyle}>
        <Text>{name}</Text>
        <SubText>{total} items</SubText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: CommonStyles.borderRadius,
    padding: 10,
    height: 200,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 20,
  },
});

export default LabelThumbnail;
