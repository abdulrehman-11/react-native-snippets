import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Routes } from "../common";
import {
  SplashScreen,
  WelcomeScreen,
  LogInScreen,
  SignUpScreen,
  ForgetPasswordScreen,
  CodeVerificationScreen,
  NewPasswordScreen,
} from "../screens/Auth";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={Routes.SplashScreen}
    >
      <Stack.Screen name={Routes.SplashScreen} component={SplashScreen} />
      <Stack.Screen name={Routes.WelcomeScreen} component={WelcomeScreen} />
      <Stack.Screen name={Routes.LoginScreen} component={LogInScreen} />
      <Stack.Screen name={Routes.SignupScreen} component={SignUpScreen} />
      <Stack.Screen
        name={Routes.ForgotPasswordScreen}
        component={ForgetPasswordScreen}
      />
      <Stack.Screen
        name={Routes.CodeVerificationScreen}
        component={CodeVerificationScreen}
      />
      <Stack.Screen
        name={Routes.NewPasswordScreen}
        component={NewPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
