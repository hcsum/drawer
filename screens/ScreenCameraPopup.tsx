import { RouteProp, useNavigation } from '@react-navigation/native';
import { CameraCapturedPicture } from 'expo-camera';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ImageEditor } from 'expo-image-editor';
import { RootScreenParamList } from '../App';
import Camera from '../components/Camera';

type routeProp = RouteProp<RootScreenParamList, 'CameraPopup'>;

type Props = {
  route: routeProp;
};

const ScreenCameraPopup = ({ route }: Props) => {
  const [editorVisible, setEditorVisible] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const { onChange } = route.params;
  const nav = useNavigation();

  function handleSnap(pic: CameraCapturedPicture) {
    setImageUri(pic.uri);
    setEditorVisible(true);
    // onChange(pic);
    // nav.goBack();
  }

  return (
    <View style={styles.container}>
      <Camera onSnap={handleSnap} />
      <ImageEditor
        visible={editorVisible}
        onCloseEditor={() => setEditorVisible(false)}
        imageUri={imageUri}
        lockAspectRatio={false}
        minimumCropDimensions={{
          width: 100,
          height: 100,
        }}
        onEditingComplete={(result) => {
          onChange(result);
          nav.goBack();
        }}
        mode="full"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenCameraPopup;
