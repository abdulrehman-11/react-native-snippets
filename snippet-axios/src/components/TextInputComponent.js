import React from "react";
import { StyleSheet } from "react-native";
import { Hoshi } from "react-native-textinput-effects";
import { Colors, Fonts, TextSizes } from "../common";

const TextInputComponent = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType,
  autoCapitalize,
  editable,
}) => {
  return (
    <Hoshi
      label={label}
      value={value}
      onChangeText={onChangeText}
      labelStyle={styles.container}
      secureTextEntry={secureTextEntry}
      borderColor={Colors.darkBlue}
      editable={editable}
      keyboardType={keyboardType}
      style={styles.textField}
      autoCapitalize={autoCapitalize}
      autoComplete="off"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: Fonts.Regular,
    color: Colors.black,
    fontSize: TextSizes.mediumText,
  },
  textField: {
    marginHorizontal: "5%",
    marginTop: "3%",
  },
});

export default TextInputComponent;
