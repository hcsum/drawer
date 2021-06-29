import { useNavigation, NavigationProp } from '@react-navigation/native';
import React from 'react';
import { RootScreenParamList } from '../App';
import { useItems } from '../contexts/ItemsContext';
import { MainScreenParamList } from '../screens/ScreenMain';
import IconButton from './IconButton';

function SearchButton() {
  const { searchForItems } = useItems();
  const navigation = useNavigation<
    NavigationProp<MainScreenParamList & RootScreenParamList>
  >();

  return (
    <IconButton
      type="search"
      onPress={() =>
        navigation.navigate('InputPopup', {
          fieldName: 'Search',
          willHandleNavigation: true,
          onChange: (val) => {
            const result = searchForItems(val);
            navigation.navigate('ItemList', {
              title: 'Search result',
              data: result,
            });
          },
        })
      }
    />
  );
}

export default SearchButton;
