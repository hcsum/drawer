import React from 'react';
import { StyleSheet, View } from 'react-native';
import TouchBar from '../components/TouchBar';

export default function Home({ navigation, route }) {
  return (
    <View style={styles.container}>
      <View style={styles.touchBarWrap}>
        <TouchBar onPress={() => alert('pressed')} icon="all" />
      </View>
      <View>
        <TouchBar onPress={() => alert('pressed')} icon="label" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  touchBarWrap: {
    marginBottom: 10,
  },
});
