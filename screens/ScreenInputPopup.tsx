import { RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { RootScreenParamList } from '../App';
import shared from '../CommonStyles';
import { useItems } from '../contexts/ItemsContext';
import { PRESET_LABEL } from '../contexts/ItemsTypeDef';

type routeProp = RouteProp<RootScreenParamList, 'InputPopup'>;

type Props = {
  route: routeProp;
};

const ScreenInputPopup = ({ route }: Props) => {
  const {
    value = '',
    fieldName = 'Input',
    isMultiLine = false,
    onChange,
  } = route.params;
  const { labelsWithTotal } = useItems();
  const [text, setText] = useState(value);
  const labels = [
    ...labelsWithTotal.map((label) => label[0]),
    PRESET_LABEL.TO_BE_REMOVED,
  ];

  function updateText(val: string) {
    setText(val);
    onChange(val);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.fieldName}>{fieldName}</Text>
        <TextInput
          value={text}
          maxLength={1000}
          multiline={isMultiLine}
          autoFocus
          numberOfLines={4}
          placeholder="..."
          style={styles.inputArea}
          onChangeText={updateText}
        />
      </View>
      {fieldName.toLowerCase() === 'label' && (
        <View style={styles.labels}>
          {labels.map((label) => (
            <Button
              key={label}
              title={label}
              onPress={() => updateText(label)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
    paddingTop: 200,
  },
  content: {
    // flex: 1,
  },
  fieldName: {
    ...shared.secondaryText,
    fontSize: 30,
    marginBottom: 10,
  },
  inputArea: {
    ...shared.inputArea,
    fontSize: 20,
  },
  labels: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  labelButton: {
    borderWidth: 1,
  },
});

export default ScreenInputPopup;
