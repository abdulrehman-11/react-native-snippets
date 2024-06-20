import React from "react";
import { TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import styles from "./styles";

const IconButton = ({
  name,
  iconName,
  onPress,
  onFocus,
  onBlur,
  style,
  styleText,
}) => {
  return (
    <TouchableOpacity
      onFocus={onFocus}
      onBlur={onBlur}
      onPress={onPress}
      style={{ ...styles.container, ...style }}
    >
      <Icon
        name={iconName}
        style={{ ...styles.icon, ...styleText }}
        size={18}
      />
      <Text style={{ ...styles.name, ...styleText }}>{name}</Text>
    </TouchableOpacity>
  );
};

export default IconButton;
