import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ItemsKeep from '../screens/ItemsKeep';
import ItemsRemove from '../screens/ItemsRemove';
import Icon from './Icon';

const Tab = createBottomTabNavigator();

export default function BottomNav({ navigation, route }) {
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
        component={ItemsKeep}
        options={{
          tabBarLabel: 'Keep',
          tabBarIcon: ({ size, color }) => {
            console.log('color', color);
            return <Icon type="drawer" size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Clear"
        component={ItemsRemove}
        options={{
          tabBarLabel: 'Clear',
          tabBarIcon: () => <Icon type="remove" />,
        }}
      />
    </Tab.Navigator>
  );
}
