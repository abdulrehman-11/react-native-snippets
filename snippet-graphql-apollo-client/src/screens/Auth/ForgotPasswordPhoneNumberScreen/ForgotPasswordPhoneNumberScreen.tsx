import React, {FC} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  AuthLogo,
  Button,
  Footer,
  InputText,
  Label,
  Screen,
} from '../../../components';
import {Colors, Icons, Routes} from '../../../common';
import styles from './styles';

const ForgotPasswordPhoneNumberScreen: FC = () => {
  const navigation = useNavigation();
  return (
    <Screen>
      <View style={{flex: 1}}>
        <TouchableOpacity style={{marginTop: 20}}>
          <Icons.MaterialIcons
            name="arrow-back-ios"
            size={20}
            color={Colors.grey}
          />
        </TouchableOpacity>
        <AuthLogo />
        <Label title="Forgot Password" size="lg" />
        <Label
          title="Enter your phone number to reset your password"
          size="md"
        />
        <View style={styles.inputContainer}>
          <Label title="Phone Number" size="sm" />
          <InputText placeholder="Enter your phone number here" />
        </View>
        <Button
          title="reset password"
          onPress={() => {
            // @ts-ignore
            navigation.navigate(Routes.EnterOTPScreen);
          }}
        />
        <Button
          title="reset with email"
          type="secondary"
          onPress={() => {
            // @ts-ignore
            navigation.navigate(Routes.ForgotPasswordEmailScreen);
          }}
        />
      </View>

      <Footer
        title="Remember password?"
        highlightTitle="Sign In"
        onPress={() => {
          // @ts-ignore
          navigation.navigate(Routes.LoginScreen);
        }}
      />
    </Screen>
  );
};

export default ForgotPasswordPhoneNumberScreen;
