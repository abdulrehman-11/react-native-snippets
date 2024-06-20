import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import { Routes } from "../../../common";
import { Screen, Text, ActivityIndicator } from "../../../components";
import { Button } from "../../../components/Buttons";
import { AuthHeader } from "../../../components/Headers";
import { handleVerify, resendCode } from "./helpers";
import styles from "./styles";

const CodeVerificationScreen = ({ navigation, route }) => {
  const { code, phone_number, club_id } = route.params;
  const [value, setValue] = useState("");
  const [validationCode, setValidationCode] = useState(code);
  const [loading, setLoading] = useState(false);

  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <AuthHeader title="Enter Valid Token Code" />
        <Text style={styles.otpText}>
          OTP has been sent to your mobile number please enter it below
        </Text>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />

        <TouchableOpacity
          onPress={async () => {
            setLoading(true);
            const result = await resendCode(phone_number);
            if (result) setValidationCode(result);
            setLoading(false);
          }}
          style={styles.resendCodeContainer}
        >
          <Text>Resend Code?</Text>
        </TouchableOpacity>

        <Button
          onPress={() =>
            handleVerify(
              validationCode,
              value,
              phone_number,
              club_id,
              navigation
            )
          }
          title="Verify"
          gradient
        />
      </Screen>
    </>
  );
};

export default CodeVerificationScreen;
