import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './screens/ScreenMain';
import { ItemsProvider } from './contexts/ItemsContext';
import ScreenInputPopup from './screens/ScreenInputPopup';
import ScreenCameraPopup from './screens/ScreenCameraPopup';
import { CameraCapturedPicture } from 'expo-camera';
import { NativeBaseProvider, StatusBar } from 'native-base';

export type RootScreenParamList = {
  Main: undefined;
  InputPopup: {
    fieldName: string;
    willHandleNavigation?: boolean;
    value?: string;
    isMultiLine?: boolean;
    onChange: (val: string) => void;
  };
  CameraPopup: {
    onChange: (pic: CameraCapturedPicture) => void;
  };
};

const RootStack = createStackNavigator<RootScreenParamList>();

const App = () => {
  return (
    <NativeBaseProvider>
      <ItemsProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <RootStack.Navigator mode="modal">
            <RootStack.Screen
              name="Main"
              component={Main}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="InputPopup"
              component={ScreenInputPopup}
              options={{
                headerShown: false,
                gestureResponseDistance: { vertical: 300 },
              }}
            />
            <RootStack.Screen
              name="CameraPopup"
              component={ScreenCameraPopup}
              options={{
                headerShown: false,
                gestureResponseDistance: { vertical: 300 },
              }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </ItemsProvider>
    </NativeBaseProvider>
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
