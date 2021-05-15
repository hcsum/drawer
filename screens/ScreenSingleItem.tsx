import { RouteProp } from '@react-navigation/native';
import NumericInput from 'react-native-numeric-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import shared from '../CommonStyles';
import { MainScreenParamList } from './ScreenMain';

// type navigationProp = StackNavigationProp<MainScreenParamList, 'ItemSingle'>;
type routeProp = RouteProp<MainScreenParamList, 'ItemSingle'>;

type Props = {
  route: routeProp;
};

const ScreenSingleItem = ({ route }: Props) => {
  const { item } = route.params;

  return (
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
              value={item.note}
              editable
              maxLength={1000}
              multiline
              numberOfLines={4}
              placeholder="..."
              style={styles.inputArea}
            />
          </View>
          <View style={styles.noteSection}>
            <Text style={styles.sectionTitle}>Amount</Text>
            <NumericInput onChange={(value) => console.log(value)} rounded minValue={1} />
          </View>
          <View style={styles.noteSection}>
            <Text style={styles.sectionTitle}>Date Acquired</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(item.dateAcquired)}
              textColor="black"
              mode="date"
              display="default"
              onChange={(date) => console.log(date)}
            />
            <Text style={styles.subText}>6 years ago</Text>
          </View>
          {item.dateLastUsed && (
            <View style={styles.noteSection}>
              <Text style={styles.sectionTitle}>Last Time Used</Text>
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date(item.dateLastUsed)}
                textColor="black"
                mode="date"
                display="default"
                onChange={(date) => console.log(date)}
              />
              <Text style={styles.subText}>6 years ago</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    marginBottom: 10,
  },
  inputArea: {
    ...shared.inputArea,
    flex: 1,
  },
  subText: {
    ...shared.secondaryText,
    alignSelf: 'flex-end',
  },
});

export default ScreenSingleItem;
