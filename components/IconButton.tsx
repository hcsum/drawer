import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import Icon, { IconProps } from './Icon';

interface IProps extends IconProps {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const IconButton = ({ onPress, type, style, size }: IProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Icon type={type} size={size} />
    </TouchableOpacity>
  );
};

export default IconButton;
