import React from "react";
import { View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { Colors } from "../../../common";
import { Text } from "../../index";
import styles from "./styles";

const PrimaryButton = ({
  title,
  style,
  textStyle,
  gradient = false,
  onPress,
}) => {
  if (gradient) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{ ...styles.container, ...styles }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[Colors.gradientBlue, Colors.gradientViolet]}
          style={styles.gradientButton}
        >
          <Text style={{ ...styles.title, color: Colors.WHITE, ...textStyle }}>
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.container, backgroundColor: Colors.WHITE, ...style }}
    >
      <Text style={{ ...styles.title, ...textStyle }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
