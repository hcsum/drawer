import AsyncStorage from '@react-native-async-storage/async-storage';

export type StorageDataKeyType = '@item_data';

export const storeData = async (key: StorageDataKeyType, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('storeData', e);
  }
};

export const getData = async (key: StorageDataKeyType) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) return value;
  } catch (e) {
    console.log('getData', e);
  }
};
