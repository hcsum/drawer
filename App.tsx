import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './screens/ScreenMain';
import { ItemsProvider } from './contexts/ItemsContext';

const RootStack = createStackNavigator();

const App = () => {
  return (
    <ItemsProvider>
      <NavigationContainer>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </ItemsProvider>
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
