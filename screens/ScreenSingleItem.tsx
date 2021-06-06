import {
  RouteProp,
  useNavigation,
  StackActions,
  EventArg,
} from '@react-navigation/native';
import NumericInput from 'react-native-numeric-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const onGoBack = (e: NavEvent) => {
      const isSaveClicked = e.data.action.type === 'REPLACE';
      if (!isNew || isSaveClicked) return;

      e.preventDefault();

      Alert.alert(
        'Quit adding?',
        'If you have unsaved changes, leaving the screen will discard them.',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Leave',
            style: 'destructive',
            // This will continue the action that had triggered the removal of the screen
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    };

    navigation.addListener('beforeRemove', onGoBack);

    return () => navigation.removeListener('beforeRemove', onGoBack);
  }, []);

  function update(field: Partial<TItem>) {
    const updated = { ...localItem, ...field };

    updateItem(updated);
    setLocalItem(updated);
  }

  function updateName(val: string) {
    update({ name: val });
  }

  function updateNote(val: string) {
    update({ note: val });
  }

  function updateLabel(val: string) {
    update({ label: val });
  }

  function handleAdd() {
    addItem(localItem);
    navigation.dispatch(
      StackActions.replace('ItemList', {
        label: localItem.label,
        title: localItem.label,
      })
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
                      value: localItem.name,
                      fieldName: 'Name',
                      onChange: updateName,
                    });
                  }}
                >
                  {localItem.name || 'Name goes here'}
                </Text>
                {!!localItem.label && (
                  <Text
                    style={styles.labelName}
                    onPress={() => {
                      navigation.navigate('InputPopup', {
                        value: localItem.label,
                        fieldName: 'Label',
                        onChange: updateLabel,
                      });
                    }}
                  >
                    {localItem.label}
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('InputPopup', {
                  value: localItem.note,
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
            {localItem.dateAcquired && (
              <View style={styles.noteSection}>
                <Text style={styles.sectionTitle}>Date Acquired</Text>
                <DateTimePicker
                  value={new Date(localItem.dateAcquired)}
                  textColor="black"
                  mode="date"
                  display="default"
                  onChange={(_, date) =>
                    update({
                      dateAcquired: date?.toISOString(),
                    })
                  }
                />
                <Text style={styles.subText}>6 years ago</Text>
              </View>
            )}
            {localItem.dateLastUsed && (
              <View style={styles.noteSection}>
                <Text style={styles.sectionTitle}>Last Time Used</Text>
                <DateTimePicker
                  value={new Date(localItem.dateLastUsed)}
                  textColor="black"
                  mode="date"
                  display="default"
                  onChange={(_, date) =>
                    update({
                      dateLastUsed: date?.toISOString(),
                    })
                  }
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

type NavEvent = EventArg<
  'beforeRemove',
  true,
  {
    action: Readonly<{
      type: string;
      payload?: object | undefined;
      source?: string | undefined;
      target?: string | undefined;
    }>;
  }
>;

export default ScreenSingleItem;
