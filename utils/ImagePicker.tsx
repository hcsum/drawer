import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
  checkPermission();

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) return Promise.resolve(result);
};

async function checkPermission() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('Sorry, we need camera roll permissions to make this work.');
    return;
  }
}

export default pickImage;
