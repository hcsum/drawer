import { RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { RootScreenParamList } from '../App';
import shared from '../CommonStyles';

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
  const [text, setText] = useState(value);

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
          onChangeText={(val) => {
            setText(val);
            onChange(val);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 200,
  },
  content: {
    flex: 1,
    padding: 20,
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
});

export default ScreenInputPopup;
