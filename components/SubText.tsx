import React from 'react';
import { Text, StyleSheet } from 'react-native';

const SubText: React.FC = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'gray',
  },
});

export default SubText;
