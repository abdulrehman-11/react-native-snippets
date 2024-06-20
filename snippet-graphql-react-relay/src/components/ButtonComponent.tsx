import React from 'react';
import {StyleSheet, TouchableOpacity, type ViewStyle} from 'react-native';

import {Colors, Fonts} from '../common';
import {Text} from '.';

interface ButtonComponentProps {
  title: string;
  isDiabled?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  width?: string;
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  title,
  onPress,
  isDiabled,
  width = '100%',
  borderColor = Colors.primary,
  backgroundColor = Colors.primary,
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
    fontFamily: Fonts.Regular,
    textTransform: 'uppercase',
    lineHeight: 21,
  },
});

export default ButtonComponent;
