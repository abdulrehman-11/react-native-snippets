import React, { FC } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

import { Button, InputText, Label } from "../../../../components";
import LangKeys from "../../../../i18n/translations/LangKeys";
import { useLoader } from "../../../../hooks";
import { CSNetwork, Urls } from "../../../../config";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../components/Toastify";
import { Routes } from "../../../../common";

const ResetPasswordForm: FC = () => {
  const { t } = useTranslation();
  const { setLoading } = useLoader();
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    otp_code: Yup.string().required(
      `${t(LangKeys.otp)} ${t(LangKeys.isRequired)}`
    ),
    password: Yup.string().required(
      `${t(LangKeys.newPassword)} ${t(LangKeys.isRequired)}`
    ),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref("password")],
      t(LangKeys.passwordMustMatch)
    ),
  });

  const initialValues = {
    otp_code: "",
    password: "",
    password_confirmation: "",
  };

  const onSubmit = async (values: any) => {
    setLoading(true);

    let response: any = await CSNetwork.put(Urls.createNewPassword, values);

    setLoading(false);
    if (!response.ok) {
      return showErrorMessage(response.data.message);
    }
    showSuccessMessage(response.data.message);

    // @ts-ignore
    navigation.navigate(Routes.LoginScreen);
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

  return (
    <>
      <View style={{ marginVertical: 40 }}>
        <Label title={t(LangKeys.recoveryPin)} />
        <InputText
          placeholder={t(LangKeys.enterRecoveryPin)}
          value={values.otp_code}
          error={errors["otp_code"]}
          onChangeText={handleChange("otp_code")}
          touched={touched["otp_code"]}
          onBlur={() => setFieldTouched("otp_code")}
        />
        <Label title={t(LangKeys.newPassword)} />
        <InputText
          placeholder={t(LangKeys.enterNewPassword)}
          secureTextEntry={true}
          value={values.password}
          error={errors["password"]}
          onChangeText={handleChange("password")}
          touched={touched["password"]}
          onBlur={() => setFieldTouched("password")}
        />
        <Label title={t(LangKeys.confirmNewPassword)} />
        <InputText
          placeholder={t(LangKeys.enterNewPassword)}
          secureTextEntry={true}
          value={values.password_confirmation}
          error={errors["password_confirmation"]}
          onChangeText={handleChange("password_confirmation")}
          touched={touched["password_confirmation"]}
          onBlur={() => setFieldTouched("password_confirmation")}
        />
      </View>
      <Button title={t(LangKeys.resetPassword)} onPress={handleSubmit} />
    </>
  );
};

export default ResetPasswordForm;
