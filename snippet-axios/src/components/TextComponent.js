import React from "react";
import { StyleSheet, Text } from "react-native";

import { Colors, Fonts, TextSizes } from "../common";

const TextComponent = ({ children, style }) => {
  return <Text style={{ ...styles.text, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: Colors.black,
    fontFamily: Fonts.Regular,
    fontSize: TextSizes.text,
  },
});

export default TextComponent;
