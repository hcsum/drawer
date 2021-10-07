import React, { useState } from 'react';
import { View, Image } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { IconButton, Icon, Center } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

interface IProp {
  image: ImageManipulator.ImageResult;
  onDone: (image: ImageManipulator.ImageResult) => void;
  onCancel: () => void;
}

function ImageEditor({ image: imageProp, onDone, onCancel }: IProp) {
  const [image, setImage] = useState(imageProp);

  const _rotate = async (degree: number) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ rotate: degree }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    setImage(manipResult);
  };

  const _renderImage = () => {
    return (
      <View
        style={{
          marginVertical: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={{ uri: image.uri }}
          style={{ width: 300, height: 500, resizeMode: 'contain' }}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {image && _renderImage()}
      <Center flexDir="row">
        <IconButton
          icon={<Icon as={MaterialIcons} name="cancel" />}
          borderRadius="full"
          onPress={onCancel}
          _icon={{
            color: 'black',
            size: 'md',
          }}
          _hover={{
            bg: 'black:alpha.20',
          }}
          _pressed={{
            bg: 'black:alpha.20',
          }}
        />
        <IconButton
          icon={<Icon as={MaterialIcons} name="rotate-left" />}
          borderRadius="full"
          onPress={() => _rotate(-90)}
          _icon={{
            color: 'black',
            size: 'md',
          }}
          _hover={{
            bg: 'black:alpha.20',
          }}
          _pressed={{
            bg: 'black:alpha.20',
          }}
        />
        <IconButton
          icon={<Icon as={MaterialIcons} name="rotate-right" />}
          borderRadius="full"
          onPress={() => _rotate(90)}
          _icon={{
            color: 'black',
            size: 'md',
          }}
          _hover={{
            bg: 'black:alpha.20',
          }}
          _pressed={{
            bg: 'black:alpha.20',
          }}
        />
        <IconButton
          icon={<Icon as={MaterialIcons} name="check" />}
          borderRadius="full"
          onPress={() => onDone(image)}
          _icon={{
            color: 'black',
            size: 'md',
          }}
          _hover={{
            bg: 'black:alpha.20',
          }}
          _pressed={{
            bg: 'black:alpha.20',
          }}
        />
      </Center>
    </View>
  );
}

export default ImageEditor;
