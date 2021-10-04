import React from 'react';
import { Button, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import common from '../CommonStyles';

type IProps = {
  onPress: () => void;
  title: string;
  accessibilityLabel: string;
  backgroundColor?: string;
  color?: string;
  style?: any;
};

const ButtonBig = ({
  onPress,
  title,
  accessibilityLabel,
  backgroundColor = 'blue',
  color = 'white',
  style,
}: IProps) => {
  return (
    <View style={{ ...styles.buttonBig, backgroundColor, ...style }}>
      <Button
        onPress={onPress}
        title={title}
        color={color}
        accessibilityLabel={accessibilityLabel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBig: {
    ...common.buttonBig,
  },
});

export default ButtonBig;
