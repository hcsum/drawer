import {
  RouteProp,
  useNavigation,
  StackActions,
  EventArg,
} from '@react-navigation/native';
import NumericInput from 'react-native-numeric-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
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
import {
  PRESET_LABEL,
  PROBATION_PERIOD,
  PROBATION_PERIOD_OPTIONS,
  TItem,
} from '../contexts/ItemsTypeDef';
import { CameraCapturedPicture } from 'expo-camera';
import Icon from '../components/Icon';
import { getDateStringSince } from '../utils/item';

type routeProp = RouteProp<MainScreenParamList, 'ItemSingle'>;

type Props = {
  route: routeProp;
};

const ScreenSingleItem = ({ route }: Props) => {
  const navigation = useNavigation();
  const { item, isNew } = route.params;
  const { updateItem, addItem, removeItem } = useItems();
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

  function updatePhoto(val: CameraCapturedPicture) {
    update({ img: val });
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

    if (localItem.label === PRESET_LABEL.TO_BE_REMOVED) {
      navigation.dispatch(StackActions.replace('Home', { screen: 'Clear' }));
      return;
    }

    navigation.dispatch(
      StackActions.replace('ItemList', {
        title: localItem.label,
        searchQuery: { label: localItem.label },
      })
    );
  }

  function handleRemove() {
    Alert.alert('Remove item?', '', [
      { text: 'Cancel', style: 'cancel', onPress: () => {} },
      {
        text: 'Confirm',
        style: 'destructive',
        onPress: () => {
          removeItem(localItem.id);
          navigation.navigate('Home');
        },
      },
    ]);
  }

  function renderDateSettingField(type: 'dateAcquired' | 'dateLastUsed') {
    const title = type === 'dateAcquired' ? 'Date Acquired' : 'Last Time Used';

    return (
      <View style={styles.sectionWrap}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <DateTimePicker
          value={new Date(localItem[type] || '')}
          textColor="black"
          mode="date"
          display="default"
          onChange={(_, date) =>
            update({
              [type]: date?.toISOString(),
            })
          }
        />
        <Text style={styles.subText}>
          {getDateStringSince(localItem[type]!)}
        </Text>
      </View>
    );
  }

  function renderLabelSpecificFields() {
    if (localItem.label === PRESET_LABEL.TO_BE_REMOVED)
      return (
        <>
          {renderDateSettingField('dateLastUsed')}
          <View style={styles.sectionWrap}>
            <Text style={styles.sectionTitle}>Probation Period</Text>
            <Picker
              selectedValue={
                localItem.probationPeriod || PROBATION_PERIOD_OPTIONS[0].value
              }
              onValueChange={(val) =>
                update({ probationPeriod: val as PROBATION_PERIOD })
              }
            >
              {PROBATION_PERIOD_OPTIONS.map((option) => (
                <Picker.Item
                  label={option.label}
                  value={option.value}
                  key={option.value}
                />
              ))}
            </Picker>
          </View>
        </>
      );

    return renderDateSettingField('dateAcquired');
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <SafeAreaView>
        <ScrollView>
          <View>
            <View style={styles.imageAndName}>
              <TouchableOpacity
                style={styles.imageWrap}
                onPress={() => {
                  navigation.navigate('CameraPopup', {
                    onChange: updatePhoto,
                  });
                }}
              >
                {localItem.img ? (
                  <Image
                    style={styles.image}
                    source={localItem.img || require('../assets/item.png')}
                  />
                ) : (
                  <View style={styles.placeholder}>
                    <Icon type="item" size={50} />
                  </View>
                )}
              </TouchableOpacity>
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
              <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>Note</Text>
                <Text>{localItem.note || '...'}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.sectionWrap}>
              <Text style={styles.sectionTitle}>Amount</Text>
              <NumericInput
                onChange={(value) => update({ amount: value })}
                rounded
                minValue={1}
                value={localItem.amount}
              />
            </View>
            {renderLabelSpecificFields()}
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
          {!isNew && (
            <View style={styles.deleteBtn}>
              <Button
                onPress={handleRemove}
                title="DELETE ITEM"
                color="white"
                accessibilityLabel="Delete this item"
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
  imageWrap: {
    flex: 1,
  },
  image: {
    ...shared.image,
    resizeMode: 'cover',
  },
  itemName: {
    fontSize: shared.bigSizeText,
  },
  labelName: {
    ...shared.secondaryText,
  },
  sectionWrap: {
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
  deleteBtn: {
    ...shared.buttonBig,
    backgroundColor: '#fc5603',
  },
  placeholder: {
    ...shared.image,
    justifyContent: 'center',
    alignItems: 'center',
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
