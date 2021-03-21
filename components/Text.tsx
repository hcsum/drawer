import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface IProps {
  children: string;
}

const AppText = ({ children }: IProps) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
  },
});

export default AppText;
