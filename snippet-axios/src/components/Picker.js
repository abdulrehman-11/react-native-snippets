import React from "react";
import { View, StyleSheet } from "react-native";
import { Select, CheckIcon } from "native-base";

import { Colors } from "../common";

const Picker = ({
  data = [],
  selectedValue,
  onValueChange,
  placeholder,
  disabeled,
}) => {
  return (
    <View
      style={
        selectedValue
          ? {
              ...styles.container,
              borderBottomWidth: 4,
              borderColor: Colors.darkBlue,
            }
          : {
              ...styles.container,
              borderBottomWidth: 1,
              borderColor: Colors.grey,
            }
      }
    >
      <Select
        selectedValue={selectedValue}
        width="90%"
        borderColor={Colors.gray}
        accessibilityLabel={placeholder}
        placeholder={placeholder}
        placeholderTextColor={Colors.lightGray}
        marginX={5}
        isDisabled={disabeled}
        borderWidth={0}
        onValueChange={onValueChange}
        _selectedItem={{
          bg: Colors.green,
          endIcon: <CheckIcon size={4} />,
        }}
      >
        {data.map((item, index) => {
          return (
            <Select.Item key={index} label={item.label} value={item.value} />
          );
        })}
      </Select>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    borderBottomWidth: 1,
    alignItems: "center",
    width: "90%",
    height: 50,
    marginVertical: "5%",
  },
});

export default Picker;
