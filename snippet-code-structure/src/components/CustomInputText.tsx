import React, { ReactNode, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  type TextInputProps,
  Platform,
} from "react-native";

import { Colors, Icons } from "../common";
import ErrorMessage from "./ErrorMessage";

interface Props extends TextInputProps {
  icon?: ReactNode;
  error?: string;
  touched?: boolean;
}

const CustomInputText: React.FC<Props> = ({
  value,
  onChangeText,
  editable = true,
  keyboardType,
  secureTextEntry,
  error,
  style,
  icon,
  onBlur,
  touched,
  ...otherProps
}) => {
  const [borderColor, setBorderColor] = useState<string>(
    error ? "red" : Colors.grey
  );
  const [borderWidth, setBorderWidth] = useState<number>(1);
  const [secureText, setSecureText] = useState<boolean>(
    secureTextEntry as boolean
  );

  useEffect(() => {
    setBorderWidth(1);

    if (error && touched) {
      setBorderColor("red");
    } else {
      setBorderColor(Colors.grey);
    }
  }, [error]);

  const handleSetFocus = () => {
    setBorderColor(Colors.primary);
    setBorderWidth(2);
  };

  const handleOnBlur = () => {
    setBorderColor(Colors.grey);
    setBorderWidth(1);
    // @ts-ignore
    onBlur();
  };

  return (
    <View
      style={{
        marginBottom: error ? 15 : 10,
      }}
    >
      <View
        style={{
          ...styles.container,
          borderColor,
          borderWidth,
          backgroundColor: !editable ? Colors.lightGray : Colors.white,
        }}
      >
        <TextInput
          placeholderTextColor={Colors.grey}
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          onFocus={handleSetFocus}
          onBlur={handleOnBlur}
          secureTextEntry={secureText}
          {...otherProps}
        />
        {!!secureTextEntry && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Icons.Ionicons
              onPress={() => setSecureText(!secureText)}
              name={secureText ? "eye-outline" : "eye-off-outline"}
              color="black"
              size={20}
            />
          </View>
        )}
        {!!icon && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {icon}
          </View>
        )}
      </View>
      {error ? <ErrorMessage error={error} visible={touched} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    alignSelf: "center",
    marginTop: 5,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: "pink",
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "center",
    paddingVertical: Platform.OS === "ios" ? 12 : 0,
  },
  input: {
    flex: 1,
    color: Colors.black,
  },
});

export default CustomInputText;
