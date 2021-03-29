import React from 'react';
import ColorPalette from './screens/ColorPalette';
import ColorsExample from './screens/ColorsExample';
import BottomNav from './components/Tabs';
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
        component={BottomNav}
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
                <IconButton
                  type="options"
                  onPress={() => navigation.navigate('ColorsExample')}
                />
              </View>
              <View style={{ paddingRight: 20 }}>
                <IconButton
                  type="add"
                  onPress={() => navigation.navigate('ColorsExample')}
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

// import * as Notifications from 'expo-notifications';
// import React from 'react';
// import { View, Button } from 'react-native';

// export default function App() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'space-around',
//       }}
//     >
//       <Button
//         title="Press to schedule a notification"
//         onPress={async () => {
//           await schedulePushNotification();
//         }}
//       />
//     </View>
//   );
// }

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail!!!! 📬",
//       body: 'Here is the notification body',
//       data: { data: 'goes here' },
//     },
//     trigger: { seconds: 2 },
//   });
// }
