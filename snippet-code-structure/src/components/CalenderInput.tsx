import React, { ReactNode, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Calendar } from "react-native-calendars";

import { Colors, Icons } from "../common";
import ErrorMessage from "./ErrorMessage";
import { Text } from ".";

interface Props {
  value: ReactNode;
  onChange(text: string): void;
  touched?: boolean;
  error?: string;
  style?: any;
  icon?: ReactNode;
  onBlur?: () => void;
  placeholder: string;
}

const CalenderInput: React.FC<Props> = ({
  value,
  onChange,
  error,
  style,
  placeholder,
  onBlur,
  touched,
}) => {
  const [borderColor, setBorderColor] = useState<string>(
    error ? "red" : Colors.grey
  );
  const [borderWidth, setBorderWidth] = useState<number>(1);
  const [shwoCalender, setShowCalender] = useState<boolean>(false);

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
      {shwoCalender ? (
        <Calendar
          onDayPress={(day) => {
            setShowCalender(false);
            onChange(day.dateString);
          }}
        />
      ) : (
        <TouchableOpacity
          onFocus={handleSetFocus}
          onPress={() => setShowCalender(true)}
          onBlur={handleOnBlur}
          style={{
            ...styles.container,
            borderColor,
            borderWidth,
          }}
        >
          <Text style={value ? styles.value : styles.placeholder}>
            {value ? value : placeholder}
          </Text>
        </TouchableOpacity>
      )}
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
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    justifyContent: "center",
    paddingVertical: Platform.OS === "ios" ? 12 : 0,
  },

  placeholder: { color: Colors.grey, alignSelf: "flex-start", fontSize: 14 },
  value: { color: Colors.black, alignSelf: "flex-start", fontSize: 14 },
});

export default CalenderInput;
