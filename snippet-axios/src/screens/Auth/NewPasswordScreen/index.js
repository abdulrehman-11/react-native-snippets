import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import {
  Screen,
  Text,
  TextInput,
  ActivityIndicator,
} from "../../../components";
import { Button } from "../../../components/Buttons";
import { AuthHeader } from "../../../components/Headers";
import { handleReset } from "./helpers";

const NewPasswordScreen = ({ navigation, route }) => {
  const { code, phone_number, club_id } = route.params;
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <AuthHeader title="Reset Password" />
        <Text style={styles.newPassword}>Create your new password</Text>
        <TextInput
          label="Password*"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          label="Confirm Password*"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <View style={styles.container}>
          <Button
            onPress={async () => {
              setLoading(true);
              await handleReset(
                code,
                phone_number,
                password,
                confirmPassword,
                club_id,
                navigation
              );
              setLoading(false);
            }}
            title="Reset"
            gradient
          />
        </View>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: "15%",
  },
  newPassword: {
    alignSelf: "center",
    marginVertical: "5%",
  },
});

export default NewPasswordScreen;
