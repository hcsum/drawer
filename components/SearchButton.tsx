import { useNavigation, NavigationProp } from '@react-navigation/native';
import React from 'react';
import { RootScreenParamList } from '../App';
import { MainScreenParamList } from '../screens/ScreenMain';
import IconButton from './IconButton';

function SearchButton() {
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
            navigation.navigate('ItemList', {
              title: 'Search result',
              searchQuery: { keyword: val },
            });
          },
        })
      }
    />
  );
}

export default SearchButton;
