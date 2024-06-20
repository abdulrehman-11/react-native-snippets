import React, { FC } from "react";
import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import { AuthLogo, Footer, Label, Screen } from "../../../components";
import styles from "./styles";
import { Routes } from "../../../common";
import PersonalDetails from "./PersonalDetails";
import { CSNetwork, Urls } from "../../../config";
import { useAuth, useLoader } from "../../../hooks";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../components/Toastify";
import LangKeys from "../../../i18n/translations/LangKeys";
import LanguageChanger from "../LoginScreen/components/LanguageChanger";

const SignupScreen: FC = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const { setLoading } = useLoader();
  const { t } = useTranslation();
  // @ts-ignore

  const initialValues = {
    name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(
      `${t(LangKeys.name)} ${t(LangKeys.isRequired)}`
    ),
    email: Yup.string()
      .email()
      .required(`${t(LangKeys.email)} ${t(LangKeys.isRequired)}`),
    phone_number: Yup.string(),
    password: Yup.string().required(
      `${t(LangKeys.password)} ${t(LangKeys.isRequired)}`
    ),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref("password")],
      `${t(LangKeys.passwordMustMatch)}`
    ),
  });

  const onSubmit = async (values: any) => {
    const { phone_number, ...restValues } = values;
    const obj = { ...restValues };
    if (phone_number) obj.phone_number = phone_number;

    setLoading(true);
    const response = await CSNetwork.post(Urls.register, obj);
    setLoading(false);

    console.log(response.data);
    if (!response.ok) {
      // @ts-ignore
      return showErrorMessage(response.data.message);
    }
    // @ts-ignore
    login({ token: response.data.meta.token, data: response.data.data });
    // @ts-ignore
    showSuccessMessage(response.data.message);
  };

  const {
    errors,
    values,
    handleSubmit,
    handleChange,
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
        <LanguageChanger />

        <View style={styles.contentContainer}>
          <AuthLogo />
          <Label title={t(LangKeys.signup)} size="lg" />
          <Label title={t(LangKeys.getStartedToPlay)} size="md" />
        </View>

        <PersonalDetails
          errors={errors}
          setFieldTouched={setFieldTouched}
          handleChange={handleChange}
          onContinue={handleSubmit}
          values={values}
          touched={touched}
        />

        <Footer
          title={t(LangKeys.haveAnAccount)}
          highlightTitle={t(LangKeys.signin)}
          onPress={() => {
            // @ts-ignore
            navigation.navigate(Routes.LoginScreen);
          }}
        />
      </ScrollView>
    </Screen>
  );
};

export default SignupScreen;
