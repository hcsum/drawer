import React from 'react';
import common from '../CommonStyles';
import { View, StyleSheet, Text } from 'react-native';

function ScreenSettings() {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Export data</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Restore data</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...common.screen,
  },
  section: {
    ...common.section,
  },
  title: {
    fontSize: 18,
  },
});

export default ScreenSettings;
