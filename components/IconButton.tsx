import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon, { IconProps } from './Icon';

interface IProps extends IconProps {
  onPress: () => void;
}

const IconButton = ({ onPress, type }: IProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon type={type} />
    </TouchableOpacity>
  );
};

export default IconButton;
