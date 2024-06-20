import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import {Colors} from '../common';

const ButtonComponent = ({
  title,
  onPress,
  isDiabled,
  width = '100%',
  borderColor = Colors.buttonColor,
  backgroundColor = Colors.buttonColor,
  color = Colors.white,
  style,
}) => {
  return (
    <TouchableOpacity
      disabled={isDiabled}
      // @ts-ignore
      style={{
        ...styles.container,
        width: width,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        ...style,
      }}
      onPress={onPress}>
      <Text
        style={{
          ...styles.title,
          color: color,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    alignSelf: 'center',
    paddingVertical: 15,
    borderRadius: 4,
    borderWidth: 1,
  },
  title: {
    textAlign: 'center',
    color: Colors.white,
    fontWeight: '400',
    fontSize: 14,
    textTransform: 'uppercase',
    lineHeight: 21,
  },
});

export default ButtonComponent;
