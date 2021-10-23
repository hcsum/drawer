import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenMain from './screens/ScreenMain';
import { ItemsProvider } from './contexts/ItemsContext';
import ScreenInputPopup from './screens/ScreenInputPopup';
import ScreenCameraPopup from './screens/ScreenCameraPopup';
import { CameraCapturedPicture } from 'expo-camera';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { SafeAreaView, StyleSheet } from 'react-native';

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
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <ItemsProvider>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <RootStack.Navigator mode="modal">
              <RootStack.Screen
                name="Main"
                component={ScreenMain}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
