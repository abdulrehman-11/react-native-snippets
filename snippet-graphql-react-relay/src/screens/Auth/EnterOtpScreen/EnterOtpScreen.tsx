import React, {FC} from 'react';
import {View} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import {useNavigation} from '@react-navigation/native';

import {
  AuthLogo,
  Button,
  Footer,
  Label,
  Screen,
  VerifiedModal,
} from '../../../components';
import {Colors, Routes} from '../../../common';

const EnterOtpScreen: FC = () => {
  const navigation = useNavigation();

  return (
    <Screen>
      <View style={{flex: 1}}>
        <AuthLogo />
        <Label title="Enter OTP Code" size="lg" />
        <Label
          title="An 6 digit code has been sent to +92 344 5578089"
          size="md"
        />
        <View style={{marginVertical: 20}}>
          <OTPTextInput
            inputCount={6}
            tintColor={Colors.primary}
            textInputStyle={{borderWidth: 1, borderRadius: 8}}
          />
        </View>
        <Button
          title="Verify"
          onPress={() => {
            // @ts-ignore
            navigation.navigate(Routes.CreateNewPasswordScreen);
          }}
        />
      </View>
      <VerifiedModal
        isVisible={true}
        title="OTP Verified"
        description="Your OTP has been verified , please create new password"
        onPress={() => {}}
      />
      <Footer
        title="Not your number change it?"
        highlightTitle="Change Number"
        onPress={() => {
          // @ts-ignore
          navigation.goBack();
        }}
      />
    </Screen>
  );
};

export default EnterOtpScreen;
