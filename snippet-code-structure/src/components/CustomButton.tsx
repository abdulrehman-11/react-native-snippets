import React from "react";
import { StyleSheet, TouchableOpacity, type ViewStyle } from "react-native";

import { Colors, Fonts } from "../common";
import { Text } from ".";

type ButtonType = "primary" | "secondary" | "danger";

interface ButtonComponentProps {
  title: string;
  isDiabled?: boolean;
  onPress: () => void;
  type?: ButtonType;
  style?: ViewStyle;
  width?: string;
}

const CustomButton: React.FC<ButtonComponentProps> = ({
  title,
  onPress,
  isDiabled,
  type = "primary",
  width = "100%",
  style,
}) => {
  return (
    <TouchableOpacity
      disabled={isDiabled}
      // @ts-ignore
      style={{
        ...styles.container,
        width: width,
        borderColor:
          type === "primary"
            ? Colors.white
            : type === "danger"
            ? Colors.danger
            : Colors.primary,
        backgroundColor:
          type === "primary"
            ? Colors.primary
            : type === "danger"
            ? Colors.danger
            : Colors.white,

        ...style,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          ...styles.title,

          color: type !== "secondary" ? Colors.white : Colors.primary,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    alignSelf: "center",
    paddingVertical: 15,
    borderRadius: 4,
    borderWidth: 1,
  },
  title: {
    textAlign: "center",
    color: Colors.white,
    fontWeight: "400",
    fontSize: 14,
    fontFamily: Fonts.Regular,
    textTransform: "uppercase",
    lineHeight: 21,
  },
});

export default CustomButton;
