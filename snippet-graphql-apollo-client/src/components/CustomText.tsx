import React from 'react';
import {StyleSheet, Text, type TextStyle} from 'react-native';
import {Colors, Fonts} from '../common';

interface CustomTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const CustomText: React.FC<CustomTextProps> = ({children, style}) => {
  return <Text style={{...styles.container, ...style}}>{children}</Text>;
};

const styles = StyleSheet.create({
  container: {
    fontSize: 16,
    fontFamily: Fonts.Regular,
    color: Colors.black,
  },
});

export default CustomText;
