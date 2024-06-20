import React, { FC, useEffect } from "react";
import { View, TouchableOpacity, ScrollView, BackHandler } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import {
  AuthLogo,
  Button,
  InputText,
  Label,
  Screen,
  Text,
  Footer,
} from "../../../components";
import styles from "./styles";
import { Routes } from "../../../common";
import { CSNetwork, Urls } from "../../../config";
import { showErrorMessage } from "../../../components/Toastify";
import { useLoader, useAuth } from "../../../hooks";
import LangKeys from "../../../i18n/translations/LangKeys";
import LanguageChanger from "./components/LanguageChanger";

const LoginScreen: FC = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const { setLoading } = useLoader();
  const { t } = useTranslation();

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required(
      `${t(LangKeys.email)} ${t(LangKeys.isRequired)}`
    ),
    password: Yup.string().required(
      `${t(LangKeys.password)} ${t(LangKeys.isRequired)}`
    ),
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    const response = await CSNetwork.post(Urls.login, values);
    setLoading(false);
    if (!response.ok) {
      // @ts-ignore
      return showErrorMessage(response.data.message);
    }
    // @ts-ignore
    login({ token: response.data.meta.token, data: response.data.data });
  };

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp(); // Exit the app
      return true; // Prevent default behavior (going back)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Clean up the event listener when the component unmounts
  }, []);

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    setFieldTouched,
    touched,
  } = useFormik({
    onSubmit,
    validationSchema,
    initialValues,
  });

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ position: "absolute", top: 0, right: 0, zIndex: 99 }}>
          <LanguageChanger />
        </View>
        <AuthLogo />

        <View>
          <Label title={t(LangKeys.signin)} size="lg" />
          <View style={styles.inputContainer}>
            <Label title={t(LangKeys.email)} size="sm" />
            <InputText
              placeholder={t(LangKeys.enterEmail)}
              value={values.email}
              error={errors["email"]}
              onChangeText={handleChange("email")}
              autoCapitalize="none"
              touched={touched["email"]}
              onBlur={() => setFieldTouched("email")}
            />
            <Label title={t(LangKeys.password)} size="sm" />
            <InputText
              placeholder={t(LangKeys.enterPassword)}
              secureTextEntry={true}
              value={values.password}
              error={errors["password"]}
              touched={touched["password"]}
              onChangeText={handleChange("password")}
              onBlur={() => setFieldTouched("password")}
            />
          </View>
          <View style={styles.row}>
            <View></View>
            <TouchableOpacity
              onPress={() =>
                // @ts-ignore
                navigation.navigate(Routes.ForgotPasswordEmailScreen)
              }
            >
              <Text>{t(LangKeys.forgotPassword)}</Text>
            </TouchableOpacity>
          </View>
          <Button
            title={t(LangKeys.signin)}
            style={{ marginVertical: 20 }}
            onPress={handleSubmit}
          />

          <Footer
            title={`${t(LangKeys.dontHaveAccount)}`}
            highlightTitle={t(LangKeys.signup)}
            onPress={() => {
              // @ts-ignore
              navigation.navigate(Routes.SignupScreen);
            }}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default LoginScreen;
