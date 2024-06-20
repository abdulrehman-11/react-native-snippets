import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from '../common';
import {
  CreateNewPasswordScreen,
  EnterOtpScreen,
  ForgotPasswordPhoneNumberScreen,
  ForgotPasswordScreen,
  LoginScreen,
  SignupScreen,
  SplashScreen,
} from '../screens/Auth';

const Stack = createStackNavigator();

const AuthNavigation: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.SplashScreen} component={SplashScreen} />
      <Stack.Screen name={Routes.LoginScreen} component={LoginScreen} />
      <Stack.Screen name={Routes.SignupScreen} component={SignupScreen} />
      <Stack.Screen
        name={Routes.ForgotPasswordEmailScreen}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={Routes.ForgotPasswordPhoneScreen}
        component={ForgotPasswordPhoneNumberScreen}
      />

      <Stack.Screen name={Routes.EnterOTPScreen} component={EnterOtpScreen} />
      <Stack.Screen
        name={Routes.CreateNewPasswordScreen}
        component={CreateNewPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
