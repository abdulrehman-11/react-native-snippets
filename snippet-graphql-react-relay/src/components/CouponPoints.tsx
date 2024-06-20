import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '.';
import {Colors} from '../common';

interface Props {
  points: string | undefined;
}

const CouponPoints: FC<Props> = ({points}) => {
  return (
    <View style={styles.container}>
      <View style={styles.LeftContainer}>
        <Text style={styles.cp}>CP</Text>
      </View>
      <Text style={styles.points}>{points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryLight,
    height: 25,
    borderRadius: 24,
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 5,
  },
  points: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '400',
  },
  LeftContainer: {
    backgroundColor: Colors.primary,
    width: 25,
    height: 25,
    borderRadius: 24,
    marginRight: 3,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  cp: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default CouponPoints;
