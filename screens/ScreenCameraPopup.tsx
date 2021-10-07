import { RouteProp, useNavigation } from '@react-navigation/native';
import { CameraCapturedPicture } from 'expo-camera';
import { ImageResult } from 'expo-image-manipulator';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RootScreenParamList } from '../App';
import Camera from '../components/Camera';
import ImageEditor from '../components/ImageEditor';

type routeProp = RouteProp<RootScreenParamList, 'CameraPopup'>;

type Props = {
  route: routeProp;
};

const ScreenCameraPopup = ({ route }: Props) => {
  const [image, setImage] = useState<CameraCapturedPicture>();
  const { onChange } = route.params;
  const nav = useNavigation();

  function handleSnap(pic: CameraCapturedPicture) {
    setImage(pic);
  }

  function handleEditDone(pic: ImageResult) {
    onChange(pic);
    nav.goBack();
  }

  return (
    <View style={styles.container}>
      {!image && <Camera onSnap={handleSnap} />}
      {image && (
        <ImageEditor
          image={image}
          onDone={handleEditDone}
          onCancel={() => nav.goBack()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenCameraPopup;
