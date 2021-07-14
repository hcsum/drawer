import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, CameraCapturedPicture } from 'expo-camera';
import IconButton from './IconButton';

interface IProps {
  onSnap: (pic: CameraCapturedPicture) => void;
}

export default function CameraComponent(props: IProps) {
  const { onSnap } = props;
  const [hasPermission, setHasPermission] = useState(false);
  const ref = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  function snap() {
    if (ref.current) ref.current.takePictureAsync().then(onSnap);
  }

  if (hasPermission === null) return <View />;

  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={ref}
      />
      <IconButton
        type="circle"
        onPress={snap}
        style={styles.button}
        size={60}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 0.8,
  },
  button: {
    flex: 0.1,
    marginTop: 20,
    alignItems: 'center',
  },
});
