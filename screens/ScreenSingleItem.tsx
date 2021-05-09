import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import shared from '../CommonStyles';
import { MainScreenParamList } from './ScreenMain';

type navigationProp = StackNavigationProp<MainScreenParamList, 'ItemSingle'>;
type routeProp = RouteProp<MainScreenParamList, 'ItemSingle'>;

type Props = {
  navigation: navigationProp;
  route: routeProp;
};

const ScreenSingleItem = ({ navigation, route }: Props) => {
  const { item } = route.params;

  return (
    <KeyboardAwareScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.imageAndName}>
            <Image source={require('../assets/keychron-k6.jpeg')} style={shared.image} />
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.labelName}>{item.label}</Text>
            </View>
          </View>
          <View style={styles.noteSection}>
            <Text style={styles.sectionTitle}>Note</Text>
            <TextInput editable maxLength={1000} multiline numberOfLines={4} />
          </View>
          <View style={styles.noteSection}>
            <Text style={styles.sectionTitle}>Amount</Text>
            <TextInput editable maxLength={1000} multiline numberOfLines={4} />
          </View>
          <View style={styles.noteSection}>
            <Text style={styles.sectionTitle}>Amount</Text>
            <TextInput editable maxLength={1000} multiline numberOfLines={4} />
          </View>
          <View style={styles.noteSection}>
            <Text style={styles.sectionTitle}>Amount</Text>
            <TextInput editable maxLength={1000} multiline numberOfLines={4} />
          </View>
          <View style={styles.noteSection}>
            <Text style={styles.sectionTitle}>Amount</Text>
            <TextInput editable maxLength={1000} multiline numberOfLines={4} />
          </View>
          <View style={styles.noteSection}>
            <Text style={styles.sectionTitle}>Amount</Text>
            <TextInput editable maxLength={1000} multiline numberOfLines={4} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: shared.screen.padding,
    flex: 1,
  },
  imageAndName: {
    ...shared.section,
    height: 300,
  },
  itemName: {
    fontSize: shared.bigSizeText,
  },
  labelName: {
    ...shared.secondaryText,
  },
  noteSection: {
    ...shared.section,
    minHeight: 100,
  },
  sectionTitle: {
    ...shared.normalText,
  },
});

export default ScreenSingleItem;
