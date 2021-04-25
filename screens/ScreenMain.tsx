import React from 'react';
import HomeTabs from './NavHome';
import ItemList from './ScreenItemList';
import ItemSingle from '../screens/ScreenSingleItem';
// import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IconButton from '../components/IconButton';
import { View } from 'react-native';
import { TItem } from '../contexts/ItemsContext';

export type MainScreenParamList = {
  Home: undefined;
  ItemList: { labelName: string; items: TItem[] };
  ItemSingle: undefined;
};

const Stack = createStackNavigator<MainScreenParamList>();

const MainScreen = () => {
  // const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{
          title: 'Drawer',
          headerLeft: () => (
            <View style={{ paddingLeft: 20 }}>
              <IconButton type="search" onPress={() => alert('search')} />
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <View style={{ paddingRight: 15 }}>
                <IconButton type="options" onPress={() => alert('haha')} />
              </View>
              <View style={{ paddingRight: 20 }}>
                <IconButton type="add" onPress={() => alert('haha')} />
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
        options={({ route }) => ({ title: route.params.labelName })}
      />
      <Stack.Screen name="ItemSingle" component={ItemSingle} />
    </Stack.Navigator>
  );
};

export default MainScreen;
