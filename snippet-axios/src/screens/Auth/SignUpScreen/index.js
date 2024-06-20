import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Checkbox } from "native-base";

import styles from "./styles";
import TextField from "../../../components/TextInputComponent";
import {
  Screen,
  Text,
  PhoneInput,
  ActivityIndicator,
  Picker,
} from "../../../components";
import { AuthHeader } from "../../../components/Headers";
import { Button } from "../../../components/Buttons";
import { showWarningMessage } from "../../../components/Toastify";
import { searchClub } from "./helpers";
import { useAuth, useUser } from "../../../hooks";
import { handleLogin } from "../LoginInScreen/helpers";

const SignUpScreen = () => {
  const [club, setClub] = useState();
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [employeeTypeID, setEmployeeTypeID] = useState(null);
  const [clubID, setClubID] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [callingCode, setCallingCode] = useState("+1");
  const [countryCode, setCountryCode] = useState("US");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const { logIn } = useAuth();
  const { saveUser } = useUser();

  const renderClubID = () => {
    return (
      <>
        <Image
          style={styles.logo}
          source={require("../../../../assets/Images/blue_logo.png")}
        />

        <Text style={styles.label}>Enter Club ID</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            value={clubID}
            onChangeText={setClubID}
            style={styles.textInput}
          />
          <TouchableOpacity
            onPress={async () => {
              if (clubID.length >= 3) {
                setLoading(true);
                const response = await searchClub(clubID.toUpperCase());
                setLoading(false);
                if (response !== -1) {
                  const { club, newEmployeeTypes } = response;
                  setClub(club);
                  setEmployeeTypes(newEmployeeTypes);
                  setShowOptions(true);
                }
              } else {
                showWarningMessage("Enter a valid club id");
              }
            }}
          >
            <Image
              source={
                clubID.length >= 3
                  ? require("../../../../assets/Images/ic_id_enter.png")
                  : require("../../../../assets/Images/ic_id_enter_black.png")
              }
              style={{ marginLeft: "2%" }}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const renderOptions = () => {
    return (
      <>
        <TextField label="Name*" value={name} onChangeText={setName} />
        <TextField
          label="Username(Optional)"
          value={userName}
          onChangeText={setUserName}
        />
        <PhoneInput
          value={phoneNumber}
          callingCode={callingCode}
          countryCode={countryCode}
          onChangeText={setPhoneNumber}
          setCallingCode={setCallingCode}
          setCountryCode={setCountryCode}
        />
        <TextField
          label="Email Address*"
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        <Picker
          data={employeeTypes}
          disabeled={!employeeTypes.length}
          selectedValue={employeeTypeID}
          placeholder="Select department"
          onValueChange={setEmployeeTypeID}
        />
        <TextField
          label="Password*"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
        />

        <View style={styles.container}>
          <Checkbox
            aria-label="terms and services"
            value={check}
            onChange={setCheck}
          />
          <Text style={styles.agreeText}>
            I agree with your terms and services
          </Text>
        </View>
        <Button
          onPress={async () => {
            setLoading(true);
            const result = await handleLogin(
              callingCode,
              phoneNumber,
              password,
              clubID
            );

            setLoading(false);
            if (result) {
              await saveUser(result.user);
              logIn(result.token);
            }
          }}
          title="Sign Up"
          gradient
        />
      </>
    );
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <AuthHeader title="Sign Up" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {showOptions ? renderOptions() : renderClubID()}
        </ScrollView>
      </Screen>
    </>
  );
};

export default SignUpScreen;
