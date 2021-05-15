import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="position" keyboardVerticalOffset={100}>
        <ScrollView>
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
              <TextInput
                editable
                maxLength={1000}
                multiline
                numberOfLines={4}
                placeholder="..."
                style={styles.inputArea}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    ...shared.screen,
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
  inputArea: {
    ...shared.inputArea,
    borderWidth: 1,
    flex: 1,
  },
});

export default ScreenSingleItem;
