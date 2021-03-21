import React from 'react';
import ColorPalette from './screens/ColorPalette';
import ColorsExample from './screens/ColorsExample';
import Home from './screens/Home';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddNewPaletteModal from './screens/AddNewPaletteModal';
import IconButton from './components/IconButton';
import { View } from 'react-native';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
  const navigation = useNavigation();

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Drawer',
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <IconButton
                icon="add"
                onPress={() => navigation.navigate('ColorsExample')}
              />
            </View>
          ),
          headerLeft: () => (
            <View style={{ paddingLeft: 20 }}>
              <IconButton icon="search" onPress={() => alert('search')} />
            </View>
          ),
          headerTitleStyle: {
            fontFamily: 'Menlo',
            fontSize: 26,
          },
        }}
      />
      <MainStack.Screen name="ColorsExample" component={ColorsExample} />
      <MainStack.Screen
        name="ColorPalette"
        component={ColorPalette}
        options={({ route }) => ({ title: route.params.paletteName })}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="AddNewPalette" component={AddNewPaletteModal} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
