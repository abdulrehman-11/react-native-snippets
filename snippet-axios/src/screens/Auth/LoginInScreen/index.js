import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';

import styles from './styles';
import {Colors, Routes} from '../../../common';
import {
  PhoneInput,
  Screen,
  Text,
  TextInput,
  ActivityIndicator,
} from '../../../components';
import {AuthHeader} from '../../../components/Headers';
import {Button} from '../../../components/Buttons';
import {handleLogin} from './helpers';
import {useAuth, useUser} from '../../../hooks';

const LogInScreen = ({navigation}) => {
  const [callingCode, setCallingCode] = useState('+1');
  const [countryCode, setCountryCode] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const [clubId, setClubId] = useState();
  const [loading, setLoading] = useState(false);
  const {logIn} = useAuth();
  const {saveUser} = useUser();

  const onSignIn = async () => {
    setLoading(true);
    const result = await handleLogin(
      callingCode,
      phoneNumber,
      password,
      clubId?.toUpperCase(),
    );
    setLoading(false);

    if (result) {
      await logIn(result.token);
      await saveUser(result.user);
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <AuthHeader title="Sign In" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.mainText}>Club Passport</Text>
          <PhoneInput
            value={phoneNumber}
            callingCode={callingCode}
            countryCode={countryCode}
            onChangeText={setPhoneNumber}
            setCallingCode={setCallingCode}
            setCountryCode={setCountryCode}
          />
          <TextInput
            label="Password*"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TextInput label="Club ID*" value={clubId} onChangeText={setClubId} />
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.ForgotPasswordScreen)}>
            <Text style={styles.forgotPassword}>Forgot Pasword?</Text>
          </TouchableOpacity>
          <Button title="Sign In" gradient onPress={onSignIn} />

          <View style={styles.container}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.SignupScreen)}>
              <Text style={{color: Colors.commonButtonGradient2}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Screen>
    </>
  );
};

export default LogInScreen;
