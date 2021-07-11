import shared from '../CommonStyles';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Text from './Text';
import SubText from './SubText';
import truncate from '../utils/truncate';
import { checkIsExpired, getLastUseSince } from '../utils/item';
import { PROBATION_PERIOD, TItem } from '../contexts/ItemsTypeDef';

interface IProps {
  name: string;
  note?: string;
  index: number;
  width: number;
  isToBeRemoved?: boolean;
  timeLastUsed?: string;
  probationPeriod?: PROBATION_PERIOD;
  item: TItem;
  onTap: () => void;
}

const ItemThumbnail = ({
  name,
  note,
  width,
  index,
  isToBeRemoved,
  timeLastUsed,
  probationPeriod,
  item,
  onTap,
}: IProps) => {
  const containerStyle = {
    ...styles.container,
    width,
  };

  if (
    isToBeRemoved &&
    timeLastUsed &&
    probationPeriod &&
    checkIsExpired(timeLastUsed, probationPeriod)
  )
    Object.assign(containerStyle, styles.expired);

  if ((index + 1) % 2 === 0) containerStyle.marginLeft = 10;
  else containerStyle.marginRight = 10;

  const imgSrc = item.img || require('../assets/item.png');

  return (
    <TouchableOpacity onPress={onTap}>
      <View style={containerStyle}>
        <Image style={styles.thumbnail} source={imgSrc} />
        <View style={styles.texts}>
          <Text>{name}</Text>
          {isToBeRemoved && timeLastUsed ? (
            <SubText>Last used {getLastUseSince(timeLastUsed)}</SubText>
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
  thumbnail: {
    ...shared.image,
    resizeMode: 'center',
  },
  texts: {
    padding: 10,
  },
  expired: {
    borderColor: 'red',
    borderWidth: 1,
  },
});

export default ItemThumbnail;
