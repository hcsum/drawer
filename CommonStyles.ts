const borderRadius = 10;
const screenPadding = 20;
const backgroundColor = 'white';
const bigSizeText = 30;
const smaillSizeText = 18;

export default {
  common: {
    borderRadius,
  },
  screen: {
    padding: screenPadding,
  },
  section: {
    borderRadius,
    backgroundColor,
    padding: 10,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    width: 'auto',
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  normalText: {
    fontSize: 20,
    color: 'black',
  },
  secondaryText: {
    fontSize: 16,
    color: 'gray',
  },
  bigSizeText,
  smaillSizeText,
};
