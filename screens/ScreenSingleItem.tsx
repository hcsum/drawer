import {
  RouteProp,
  useNavigation,
  StackActions,
} from '@react-navigation/native';
import NumericInput from 'react-native-numeric-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Button,
  SafeAreaView,
  Alert,
} from 'react-native';
import shared from '../CommonStyles';
import { MainScreenParamList } from './ScreenMain';
import { useItems } from '../contexts/ItemsContext';
import { TItem } from '../contexts/ItemsTypeDef';

type routeProp = RouteProp<MainScreenParamList, 'ItemSingle'>;

type Props = {
  route: routeProp;
};

const ScreenSingleItem = ({ route }: Props) => {
  const navigation = useNavigation();
  const { item, isNew } = route.params;
  const { updateItem, addItem } = useItems();
  const [localItem, setLocalItem] = useState(item);

  navigation.addListener('beforeRemove', (e) => {
    const isSaveClicked = e.data.action.type === 'REPLACE';
    if (!isNew || isSaveClicked) return;

    e.preventDefault();

    Alert.alert(
      'Discard changes?',
      'You have unsaved changes. Are you sure to discard them and leave the screen?',
      [
        { text: "Don't leave", style: 'cancel', onPress: () => {} },
        {
          text: 'Discard',
          style: 'destructive',
          // This will continue the action that had triggered the removal of the screen
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]
    );
  });

  function update(field: Partial<TItem>) {
    const updated = { ...item, ...field };

    updateItem(updated);
    setLocalItem(updated);
  }

  function updateName(val: string) {
    update({ name: val });
  }

  function updateNote(val: string) {
    update({ note: val });
  }

  function handleAdd() {
    addItem(localItem);
    navigation.dispatch(
      StackActions.replace('ItemList', { labelName: localItem.label })
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <SafeAreaView>
        <ScrollView>
          <View>
            <View style={styles.imageAndName}>
              <Image
                source={require('../assets/keychron-k6.jpeg')}
                style={shared.image}
              />
              <View>
                <Text
                  style={styles.itemName}
                  onPress={() => {
                    navigation.navigate('InputPopup', {
                      value: item.name,
                      fieldName: 'Name',
                      onChange: updateName,
                    });
                  }}
                >
                  {item.name || 'Name goes here'}
                </Text>
                <Text style={styles.labelName}>{item.label}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('InputPopup', {
                  value: item.note,
                  fieldName: 'Note',
                  onChange: updateNote,
                  isMultiLine: true,
                });
              }}
            >
              <View style={styles.noteSection}>
                <Text style={styles.sectionTitle}>Note</Text>
                <Text>{localItem.note || '...'}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.noteSection}>
              <Text style={styles.sectionTitle}>Amount</Text>
              <NumericInput
                onChange={(value) => update({ amount: value })}
                rounded
                minValue={1}
                value={localItem.amount}
              />
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
          {isNew && (
            <View style={styles.saveBtn}>
              <Button
                onPress={handleAdd}
                title="SAVE"
                color="white"
                accessibilityLabel="Save this newly created item"
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
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
  subText: {
    ...shared.secondaryText,
    alignSelf: 'flex-end',
  },
  saveBtn: {
    ...shared.buttonBig,
  },
});

export default ScreenSingleItem;
