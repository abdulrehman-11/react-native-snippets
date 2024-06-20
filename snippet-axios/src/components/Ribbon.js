import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Ribbon = ({color}) => {
  return <View style={{...styles.ribbon, borderTopColor: color}}></View>;
};

const styles = StyleSheet.create({
  ribbon: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 20,
    borderTopWidth: 20,
    borderRightColor: 'transparent',
    transform: [{rotate: '90deg'}],
    right: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});

export default Ribbon;
