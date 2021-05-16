import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenItemsKeep from './ScreenItemsKeep';
import ScreenItemsRemove from './ScreenItemsRemove';
import Icon, { IconType } from '../components/Icon';

export type HomeTabStackParamList = {
  Keep: undefined;
  Clear: undefined;
};

const Tab = createBottomTabNavigator<HomeTabStackParamList>();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { position: 'absolute' },
        labelStyle: { fontSize: 12 },
        tabStyle: {
          marginTop: 8,
        },
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName: IconType;

          if (route.name === 'Keep') iconName = focused ? 'drawer' : 'drawer-gray';
          else iconName = focused ? 'clear' : 'clear-gray';

          return <Icon type={iconName} size={size} />;
        },
      })}
    >
      <Tab.Screen
        name="Keep"
        component={ScreenItemsKeep}
        options={{
          tabBarLabel: 'Keep',
        }}
      />
      <Tab.Screen
        name="Clear"
        component={ScreenItemsRemove}
        options={{
          tabBarLabel: 'Clear',
        }}
      />
    </Tab.Navigator>
  );
}
