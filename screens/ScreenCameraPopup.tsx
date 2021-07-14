import { RouteProp, useNavigation } from '@react-navigation/native';
import { CameraCapturedPicture } from 'expo-camera';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RootScreenParamList } from '../App';
import Camera from '../components/Camera';

type routeProp = RouteProp<RootScreenParamList, 'CameraPopup'>;

type Props = {
  route: routeProp;
};

const ScreenCameraPopup = ({ route }: Props) => {
  const { onChange } = route.params;
  const nav = useNavigation();

  function handleSnap(pic: CameraCapturedPicture) {
    onChange(pic);
    nav.goBack();
  }

  return (
    <View style={styles.container}>
      <Camera onSnap={handleSnap} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenCameraPopup;
