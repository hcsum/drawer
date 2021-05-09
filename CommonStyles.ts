import { StyleSheet } from 'react-native';

const borderRadius = 10;
const screenPadding = 20;
const backgroundColor = 'white';

export default StyleSheet.create({
  common: {
    borderRadius,
    screenPadding,
  },
  section: {
    borderRadius,
    backgroundColor,
  },
  image: {
    flex: 1,
    width: 'auto',
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  bigText: {
    fontSize: 30,
  },
});
