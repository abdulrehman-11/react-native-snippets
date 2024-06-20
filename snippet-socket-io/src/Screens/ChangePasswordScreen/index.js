import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../components/HeaderComponents/Header';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import lang from '../../common/languages/lang';
import {showErrorMessage, showSuccessMessage} from '../../utils/toastMessages';
import {ApiCall, ApiRoutes, config} from '../../apiConfiguration';
import {useAuth, useLoader} from '../../hooks';
import {useNavigation} from '@react-navigation/native';
import {Screen} from '../../components';
import {Colors} from '../../common';
const passwordInitialValue = {
  newPassword: '',
  confirmPassword: '',
};
const ChangePasswordScreen = () => {
  Feather.loadFont();

  const {setLoading} = useLoader();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const {Logout} = useAuth();
  const [password, setPassword] = useState(passwordInitialValue);

  const onChangeHandler = (value, passwordText) => {
    setPassword({...password, [passwordText]: value});
  };
  const {t} = useTranslation();

  const changePasswordHandler = async () => {
    setLoading(true);
    if (password?.newPassword.length < 6) {
      showErrorMessage('Please enter password with atleast 6 characters');
      setLoading(false);

      return;
    }
    if (password?.newPassword !== password?.confirmPassword) {
      showErrorMessage('Password must match');
      setLoading(false);

      return;
    }

    const response = await ApiCall.post(
      ApiRoutes.changePassword,
      {password: password.newPassword},
      (
        await config()
      ).headers,
    );
    setLoading(false);

    if (!response.ok) {
      showErrorMessage(response?.data.error);
      if (response.status == 401) {
        Logout();
      }
      return;
    }
    setPassword(passwordInitialValue);
    showSuccessMessage(response?.data.message);
    navigation.goBack();
  };

  const toggle = pass => {
    setShowPassword({...showPassword, [pass]: !showPassword[pass]});
  };
  return (
    <Screen>
      <Header />
      <Text style={styles.heading}>{t(lang.ChangePassword)}</Text>
      <Text style={styles.inputLabel}>{t(lang.NewPassword)}</Text>
      <View style={styles.password}>
        <TextInput
          style={styles.input}
          onChangeText={value => onChangeHandler(value, 'newPassword')}
          secureTextEntry={!showPassword.newPassword}
          value={password.newPassword}
          placeholderTextColor={Colors.gray}
          placeholder="********"
        />
        <TouchableOpacity onPress={() => toggle('newPassword')}>
          {!showPassword.newPassword ? (
            <Feather name="eye-off" color={Colors.black} size={20} />
          ) : (
            <Feather color={Colors.black} name="eye" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.inputLabel}>{t(lang.RetypeNewPassword)}</Text>
      <View style={styles.password}>
        <TextInput
          style={styles.input}
          onChangeText={value => onChangeHandler(value, 'confirmPassword')}
          secureTextEntry={!showPassword.confirmPassword}
          value={password.confirmPassword}
          placeholderTextColor={Colors.gray}
          placeholder="********"
        />
        <TouchableOpacity onPress={() => toggle('confirmPassword')}>
          {!showPassword.confirmPassword ? (
            <Feather color={Colors.black} name="eye-off" size={20} />
          ) : (
            <Feather color={Colors.black} name="eye" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.subHeading}>{t(lang.PasswordRequirements)}</Text>
      <Text style={styles.text}>{t(lang.PasswordWarning)}</Text>
      <TouchableOpacity
        style={styles.signInBtn}
        onPress={changePasswordHandler}>
        <Text style={styles.signInText}>{t(lang.ChangePassword)}</Text>
      </TouchableOpacity>
    </Screen>
  );
};

export default ChangePasswordScreen;
