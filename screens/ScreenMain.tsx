import React from 'react';
import HomeTabs from './NavHome';
import ItemList from './ScreenItemList';
import ItemSingle from '../screens/ScreenSingleItem';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IconButton from '../components/IconButton';
import { View } from 'react-native';
import { TItem } from '../contexts/ItemsTypeDef';
import { getNewItem } from '../utils/item';
import { RootScreenParamList } from '../App';
import SearchButton from '../components/SearchButton';

export type MainScreenParamList = {
  Home: undefined;
  ItemList: { title: string; data: TItem[] };
  ItemSingle: {
    isNew?: boolean;
    item: TItem;
  };
};

const Stack = createStackNavigator<MainScreenParamList>();

const MainScreen = () => {
  const navigation = useNavigation<
    NavigationProp<MainScreenParamList & RootScreenParamList>
  >();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{
          title: 'Drawer',
          headerLeft: () => (
            <View style={{ paddingLeft: 20 }}>
              <SearchButton />
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <View style={{ paddingRight: 15 }}>
                <IconButton type="options" onPress={() => alert('haha')} />
              </View>
              <View style={{ paddingRight: 20 }}>
                <IconButton
                  type="add"
                  onPress={() =>
                    navigation.navigate('ItemSingle', {
                      item: getNewItem(),
                      isNew: true,
                    })
                  }
                />
              </View>
            </View>
          ),
          headerTitleStyle: {
            fontFamily: 'Menlo',
            fontSize: 26,
          },
        }}
      />
      <Stack.Screen
        name="ItemList"
        component={ItemList}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen name="ItemSingle" component={ItemSingle} />
    </Stack.Navigator>
  );
};

export default MainScreen;
