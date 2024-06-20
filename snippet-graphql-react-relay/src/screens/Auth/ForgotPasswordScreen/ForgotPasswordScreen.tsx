import React, { FC, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

import {
  AuthLogo,
  Button,
  Footer,
  InputText,
  Label,
  Screen,
  VerifiedModal,
} from "../../../components";
import { Colors, Icons, Routes } from "../../../common";
import styles from "./styles";
import { CSNetwork, Urls } from "../../../config";
import { showErrorMessage } from "../../../components/Toastify";
import { useFormik } from "formik";
import { useLoader } from "../../../hooks";
import { useTranslation } from "react-i18next";
import LangKeys from "../../../i18n/translations/LangKeys";

const ForgotPasswordScreen: FC = () => {
  const [showReset, setShowReset] = useState<boolean>(true);
  const [switchPhoneNumber, setSwitchPhoneNumber] = useState<boolean>(false);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    login: Yup.string().required(t(LangKeys.fieldIsRequired)),
  });

  const { setLoading } = useLoader();
  const initialValues = {
    login: "",
  };

  const onSubmit = async (values: any) => {
    setLoading(true);
    const response: any = await CSNetwork.post(Urls.sendOTP, values);
    setLoading(false);
    if (!response.ok) {
      return showErrorMessage(response.data.message);
    }
    setShowReset(false);
  };

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldTouched,
  } = useFormik({
    onSubmit,
    validationSchema,
    initialValues,
  });

  const ResetPassword = () => {
    return (
      <View>
        <View style={styles.resetContainer}>
          <Label
            title={`${
              switchPhoneNumber
                ? t(LangKeys.otpHasBeenSent)
                : t(LangKeys.emailHasBeenSent)
            }!`}
            size="lg"
          />
          <Label title={t(LangKeys.checkEmail)} size="md" />
        </View>
        <Button
          title={t(LangKeys.createNewPassword)}
          onPress={() => {
            // @ts-ignore
            navigation.navigate(Routes.CreateNewPasswordScreen);
          }}
        />
      </View>
    );
  };
  return (
    <Screen>
      <View style={{ flex: 1 }}>
        {showReset ? (
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => {
              // @ts-ignore
              navigation.goBack();
            }}
          >
            <Icons.MaterialIcons
              name="arrow-back-ios"
              size={20}
              color={Colors.grey}
            />
          </TouchableOpacity>
        ) : null}
        <AuthLogo />
        {/* <VerifiedModal
          isVisible={false}
          title="Password"
          description="Your password has been changed"
          onPress={() => {}}
        /> */}
        {showReset ? (
          <View>
            <Label title={t(LangKeys.forgotPassword)} size="lg" />
            <Label
              title={
                switchPhoneNumber
                  ? t(LangKeys.enterPhoneResetPassword)
                  : t(LangKeys.enterEmailResetPassword)
              }
              size="md"
            />
            <View style={styles.inputContainer}>
              <Label
                title={
                  switchPhoneNumber
                    ? t(LangKeys.mobileNumber)
                    : t(LangKeys.email)
                }
                size="sm"
              />
              <InputText
                placeholder={
                  switchPhoneNumber
                    ? t(LangKeys.enterMobileNumber)
                    : t(LangKeys.enterEmail)
                }
                value={values.login}
                error={errors["login"]}
                onChangeText={handleChange("login")}
                autoCapitalize="none"
                touched={touched["login"]}
                onBlur={() => setFieldTouched("login")}
              />
            </View>
            <Button title={t(LangKeys.resetPassword)} onPress={handleSubmit} />
            <Button
              title={
                switchPhoneNumber
                  ? t(LangKeys.resetWithEmailAddress)
                  : t(LangKeys.resetWithPhoneNumber)
              }
              type="secondary"
              onPress={() => {
                if (switchPhoneNumber) setSwitchPhoneNumber(false);
                else setSwitchPhoneNumber(true);
                // @ts-ignore
                // navigation.navigate(Routes.ForgotPasswordPhoneScreen);
              }}
            />
          </View>
        ) : (
          <ResetPassword />
        )}

        {showReset ? (
          <Footer
            title={`${t(LangKeys.resetPassword)} ?`}
            highlightTitle={`${t(LangKeys.signin)} ?`}
            onPress={() => {
              // @ts-ignore
              navigation.navigate(Routes.LoginScreen);
            }}
          />
        ) : null}
      </View>
    </Screen>
  );
};

export default ForgotPasswordScreen;
