import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, Image} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import Feather from 'react-native-vector-icons/Feather';
import Logo from '../../Images/RoofingLogo.png';
import {ApiRoutes, ApiCall, config} from '../../apiConfiguration';
import styles from './styles';
import {useAuth, useLoader} from '../../hooks';
import {Screen} from '../../components';
import {showErrorMessage} from '../../utils/toastMessages';
import {Colors} from '../../common';
import SignInScreenContainer from '../../components/SignInScreenContainer';
// https://www.backend.rooftechnologypartners.com/api/
const SignInScreen = () => {
  Feather.loadFont();
  const [showPassword, setShowPassword] = useState(false);
  const {userLogin} = useAuth();
  const [formInput, setFormInput] = useState({
    password: '',
    phone: '',
  });
  const {setLoading} = useLoader();
  const toggle = () => {
    setShowPassword(!showPassword);
  };
  const onChangeNumber = number => {
    setFormInput({
      ...formInput,
      phone: number.substring(1),
    });
  };
  const onChangePassword = password => {
    setFormInput({
      ...formInput,
      password: password,
    });
  };

  const loginHandler = async () => {
    setLoading(true);
    const response = await ApiCall.post(
      ApiRoutes.login,
      JSON.stringify(formInput),
      (
        await config()
      ).headers,
    );
    setLoading(false);
    if (!response.ok) {
      return showErrorMessage(response?.data.error);
    }

    userLogin(response.data);
  };
  return (
    <Screen>
      <SignInScreenContainer>
        <View style={styles.formContainer}>
          <Image style={styles.logo} source={Logo} />
          <Text style={styles.inputLabel}>Phone Number</Text>
          <PhoneInput
            textStyle={{color: Colors.black}}
            textProps={{
              style: {
                color: Colors.black,
              },
            }}
            style={styles.phoneInput}
            initialValue="+1"
            onChangePhoneNumber={onChangeNumber}
          />
          <Text style={styles.inputLabel}>Password</Text>

          <View style={styles.password}>
            <TextInput
              style={styles.input}
              onChangeText={onChangePassword}
              secureTextEntry={!showPassword}
              placeholder="********"
            />
            <TouchableOpacity onPress={toggle}>
              {!showPassword ? (
                <Feather name="eye-off" color={Colors.black} size={18} />
              ) : (
                <Feather name="eye" color={Colors.black} size={18} />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.signInBtn} onPress={loginHandler}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SignInScreenContainer>
    </Screen>
  );
};

export default SignInScreen;
