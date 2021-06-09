import shared from '../CommonStyles';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Text from './Text';
import SubText from './SubText';
import truncate from '../utils/truncate';
import { getLastUseSince } from '../utils/item';

interface IProps {
  name: string;
  note?: string;
  index: number;
  width: number;
  isToBeRemoved?: boolean;
  timeLastUsed?: string;
  onTap: () => void;
}

const ItemThumbnail = ({
  name,
  note,
  width,
  index,
  isToBeRemoved,
  timeLastUsed,
  onTap,
}: IProps) => {
  const containerStyle = {
    ...styles.container,
    width,
  };

  if ((index + 1) % 2 === 0) containerStyle.marginLeft = 10;
  else containerStyle.marginRight = 10;

  return (
    <TouchableOpacity onPress={onTap}>
      <View style={containerStyle}>
        <Image
          style={styles.thumbnail}
          source={require('../assets/keychron-k6.jpeg')}
        />
        <View style={styles.texts}>
          <Text>{name}</Text>
          {isToBeRemoved && timeLastUsed ? (
            <SubText>{getLastUseSince(timeLastUsed)}</SubText>
          ) : (
            <SubText>{truncate(note)}</SubText>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: shared.common.borderRadius,
    height: 200,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 20,
  },
  thumbnail: shared.image,
  texts: {
    padding: 10,
  },
});

export default ItemThumbnail;
