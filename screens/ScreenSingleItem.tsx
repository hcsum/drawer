import {
  RouteProp,
  useNavigation,
  StackActions,
  EventArg,
} from '@react-navigation/native';
import NumericInput from 'react-native-numeric-input';
import { Button, NativeBaseProvider, Modal } from 'native-base';
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
  Alert,
  Pressable,
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
import { getDateStringSince } from '../utils/Item';
import ButtonBig from '../components/ButtonBig';
import pickImage from '../utils/ImagePicker';

type routeProp = RouteProp<MainScreenParamList, 'ItemSingle'>;

type Props = {
  route: routeProp;
};

const ScreenSingleItem = ({ route }: Props) => {
  const navigation = useNavigation();
  const { item, isNew } = route.params;
  const { updateItem, addItem, removeItem } = useItems();
  const [localItem, setLocalItem] = useState(item);
  const [imagePromptShow, setImagePromptShow] = useState(false);

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

    console.log('updated', updated);

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

  function onImageTap() {
    setImagePromptShow(true);
  }

  function onCameraOpen() {
    navigation.navigate('CameraPopup', {
      onChange: updatePhoto,
    });
  }

  function onImagePickerOpen() {
    pickImage().then((uri) => uri && update({ img: uri }));
  }

  function onNoteInputTap() {
    navigation.navigate('InputPopup', {
      value: localItem.note,
      fieldName: 'Note',
      onChange: updateNote,
      isMultiLine: true,
    });
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

  function renderFieldsForToBeRemoved() {
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
  }

  function renderImageField() {
    const { img } = localItem;
    const SCALE_RATIO = img && img.height < img.width ? 10 : 6;

    return (
      <Pressable style={styles.imageWrap} onPress={onImageTap}>
        {img ? (
          <Image
            style={[
              styles.image,
              {
                height: img.height / SCALE_RATIO,
              },
            ]}
            source={img || require('../assets/item.png')}
          />
        ) : (
          <View style={styles.placeholder}>
            <Icon type="item" size={50} />
          </View>
        )}
      </Pressable>
    );
  }

  function renderLabelAndNameFields() {
    return (
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
    );
  }

  function renderImagePromptDialog() {
    return (
      <Modal
        isOpen={imagePromptShow}
        onClose={() => setImagePromptShow(false)}
        size="lg"
      >
        <Modal.Content>
          <Modal.Body>
            <NativeBaseProvider>
              <Button
                style={{ marginBottom: 10, marginTop: 10 }}
                onPress={() => {
                  setImagePromptShow(false);
                  onImagePickerOpen();
                }}
              >
                Pick From Library
              </Button>
              <Button
                style={{ marginBottom: 10 }}
                onPress={() => {
                  setImagePromptShow(false);
                  onCameraOpen();
                }}
              >
                Take Picture
              </Button>
              <Button style={{ marginBottom: 10 }} onPress={() => {}}>
                Delete Picture
              </Button>
            </NativeBaseProvider>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      {renderImagePromptDialog()}
      <ScrollView>
        <View>
          <View style={styles.imageAndName}>
            {renderImageField()}
            {renderLabelAndNameFields()}
          </View>
          <TouchableOpacity onPress={onNoteInputTap}>
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
          {localItem.label === PRESET_LABEL.TO_BE_REMOVED
            ? renderFieldsForToBeRemoved()
            : renderDateSettingField('dateAcquired')}
        </View>
        {isNew && (
          <ButtonBig
            onPress={handleAdd}
            title="SAVE"
            backgroundColor="#6bb37e"
            accessibilityLabel="Save this newly created item"
          />
        )}
        {!isNew && (
          <ButtonBig
            onPress={handleRemove}
            title="DELETE ITEM"
            backgroundColor="#fc5603"
            accessibilityLabel="Delete this item"
          />
        )}
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
  },
  imageWrap: {
    flex: 1,
  },
  image: {
    ...shared.image,
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
  placeholder: {
    ...shared.image,
    height: 100,
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
