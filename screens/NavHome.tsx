import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenItemsKeep from './ScreenItemsKeep';
import ScreenItemsRemove from './ScreenItemsRemove';
import Icon from '../components/Icon';

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
      }}
    >
      <Tab.Screen
        name="Keep"
        component={ScreenItemsKeep}
        options={{
          tabBarLabel: 'Keep',
          tabBarIcon: ({ size }) => {
            return <Icon type="drawer" size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Clear"
        component={ScreenItemsRemove}
        options={{
          tabBarLabel: 'Clear',
          tabBarIcon: () => <Icon type="remove" />,
        }}
      />
    </Tab.Navigator>
  );
}
