import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import CountryPicker from "react-native-country-picker-modal";

import { Colors, TextSizes } from "../common";

const PhoneInput = ({
  value = "",
  onChangeText,
  callingCode = "+91",
  countryCode = "US",
  setCallingCode,
  setCountryCode,
  editable = true,
}) => {
  return (
    <View style={value ? styles.valueContainer : styles.container}>
      <CountryPicker
        withFlag
        placeholder={callingCode}
        withFilter
        countryCode={countryCode}
        onSelect={
          editable
            ? (code) => {
                setCountryCode(code.cca2);
                setCallingCode("+" + code.callingCode);
              }
            : () => {}
        }
      />
      <TextInput
        style={styles.textInput}
        placeholder="Phone Number"
        keyboardType="number-pad"
        value={value}
        editable={editable}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    flexDirection: "row",
    marginTop: "10%",
    alignItems: "center",
    marginHorizontal: "5%",
  },
  valueContainer: {
    borderBottomWidth: 4,
    borderBottomColor: Colors.darkBlue,
    flexDirection: "row",
    marginTop: "10%",
    alignItems: "center",
    marginHorizontal: "5%",
  },
  textInput: {
    width: "80%",
    height: "100%",
    fontSize: TextSizes.text,
    color: Colors.black,
  },
});

export default PhoneInput;
