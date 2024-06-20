import React, {FC} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Text} from '..';
import {Colors} from '../../common';
import Rating from '../Rating';

interface Props {
  name: string;
  image: string;
  joinFee: number;
  rating: number;
  onPress: () => void;
}

const GameCard: FC<Props> = ({onPress, name, image, joinFee, rating}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        style={styles.img}
        source={
          image ? {uri: image} : require('../../assets/images/LogoImage.png')
        }
      />
      <View style={styles.innerContainer}>
        <Text style={styles.text}>{name}</Text>
        {/* <Text style={styles.description}>{description}</Text> */}
      </View>
      <View style={styles.downSection}>
        <Rating rating={rating} color={Colors.primary} />
        <Text style={styles.greenText}>CP : {joinFee}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.lightgrey,
    height: 237,
    width: 177,
    flexShrink: 0,
  },
  img: {width: 177, height: 141, resizeMode: 'cover'},
  innerContainer: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
  description: {letterSpacing: -0.41, fontSize: 8, color: Colors.grey},
  text: {letterSpacing: -0.41, fontSize: 10, fontWeight: '400'},
  downSection: {
    marginHorizontal: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greenText: {
    color: Colors.green,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
    letterSpacing: -0.41,
  },
});

export default GameCard;
