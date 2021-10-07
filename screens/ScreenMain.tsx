import React from 'react';
import HomeTabs from '../components/MainScreenBottomNav';
import ItemList from './ScreenItemList';
import ItemSingle from '../screens/ScreenSingleItem';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IconButton from '../components/IconButton';
import { View } from 'react-native';
import { ISearchQuery, TItem } from '../contexts/ItemsTypeDef';
import { getNewItem } from '../utils/Item';
import { RootScreenParamList } from '../App';
import SearchButton from '../components/SearchButton';
import ScreenSettings from './ScreenSettings';

export type MainScreenParamList = {
  Home: undefined;
  ItemList: { title: string; searchQuery: ISearchQuery };
  ItemSingle: {
    isNew?: boolean;
    item: TItem;
  };
  Settings: {};
};

const Stack = createStackNavigator<MainScreenParamList>();

const MainScreen = () => {
  const navigation =
    useNavigation<NavigationProp<MainScreenParamList & RootScreenParamList>>();

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
                <IconButton
                  type="options"
                  onPress={() => navigation.navigate('Settings', {})}
                />
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
            // fontFamily: 'Menlo',
            fontSize: 22,
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
      <Stack.Screen
        name="Settings"
        component={ScreenSettings}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="ItemSingle" component={ItemSingle} />
    </Stack.Navigator>
  );
};

export default MainScreen;
