import React, { useState } from "react";
import { View } from "react-native";

import {
  Screen,
  Text,
  PhoneInput,
  ActivityIndicator,
  TextInput,
} from "../../../components";
import { Button } from "../../../components/Buttons";
import { AuthHeader } from "../../../components/Headers";
import { handleNext } from "./helpers";
import styles from "./styles";

const ForgetPasswordScreen = ({ navigation }) => {
  const [callingCode, setCallingCode] = useState("+1");
  const [countryCode, setCountryCode] = useState("US");
  const [phoneNumber, setPhoneNumber] = useState();
  const [clubId, setClubId] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <AuthHeader title="Help With Password" />
        <Text style={styles.enterPassword}>
          Enter your mobile number and you will get verification code to reset
          password
        </Text>
        <PhoneInput
          value={phoneNumber}
          callingCode={callingCode}
          countryCode={countryCode}
          onChangeText={setPhoneNumber}
          setCallingCode={setCallingCode}
          setCountryCode={setCountryCode}
        />
        <TextInput label="Club ID*" value={clubId} onChangeText={setClubId} />
        <View style={styles.container}>
          <Button
            onPress={async () => {
              setLoading(true);
              await handleNext(callingCode, phoneNumber, clubId, navigation);
              setLoading(false);
            }}
            title="Next"
            gradient
          />
        </View>
      </Screen>
    </>
  );
};

export default ForgetPasswordScreen;
