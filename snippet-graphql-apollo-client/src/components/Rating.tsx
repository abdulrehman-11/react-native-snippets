import React from 'react';
import {View} from 'react-native';
import {Colors, Icons} from '../common';

interface StarRatingProps {
  rating: number;
  size?: number;
  color?: string;
}

const Rating: React.FC<StarRatingProps> = ({
  rating,
  size = 8,
  color = Colors.yellow,
}) => {
  const filledStars = rating;
  const emptyStars = 5 - rating;

  return (
    <View style={{flexDirection: 'row'}}>
      {[...Array(filledStars)].map((_, index) => (
        <Icons.AntDesign key={index} name="star" color={color} size={size} />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <Icons.AntDesign key={index} name="staro" color={color} size={size} />
      ))}
    </View>
  );
};

export default Rating;
