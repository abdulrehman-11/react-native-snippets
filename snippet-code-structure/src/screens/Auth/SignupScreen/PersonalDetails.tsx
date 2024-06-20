import React, { FC } from "react";

import { Button, InputText, Label } from "../../../components";
import { useTranslation } from "react-i18next";
import LangKeys from "../../../i18n/translations/LangKeys";

interface Props {
  errors: any;
  handleChange: any;
  setFieldTouched: any;
  onContinue: any;
  values: any;
  touched: any;
}

const PersonalDetails: FC<Props> = ({
  errors,
  setFieldTouched,
  handleChange,
  onContinue,
  values,
  touched,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Label title={t(LangKeys.name) + "*"} />
      <InputText
        value={values["name"]}
        placeholder={t(LangKeys.enterName)}
        error={errors["name"]}
        onChangeText={handleChange("name")}
        touched={touched["name"]}
        onBlur={() => setFieldTouched("name")}
      />
      <Label title={t(LangKeys.email) + "*"} />
      <InputText
        placeholder={t(LangKeys.enterEmail)}
        error={errors["email"]}
        value={values["email"]}
        onChangeText={handleChange("email")}
        touched={touched["email"]}
        onBlur={() => setFieldTouched("email")}
        autoCapitalize="none"
      />
      <Label title={`${t(LangKeys.mobileNumber)}`} />
      <InputText
        value={values["phone_number"]}
        placeholder={t(LangKeys.enterMobileNumber)}
        error={errors["phone_number"]}
        onChangeText={handleChange("phone_number")}
        touched={touched["phone_number"]}
        onBlur={() => setFieldTouched("phone_number")}
      />

      <Label title={t(LangKeys.password) + "*"} />
      <InputText
        value={values["password"]}
        placeholder={t(LangKeys.enterPassword)}
        secureTextEntry={true}
        error={errors["password"]}
        onChangeText={handleChange("password")}
        touched={touched["password"]}
        onBlur={() => setFieldTouched("password")}
      />
      <Label title={t(LangKeys.confirmPassword) + "*"} />
      <InputText
        placeholder={t(LangKeys.enterPassword)}
        value={values["password_confirmation"]}
        secureTextEntry={true}
        error={errors["password_confirmation"]}
        onChangeText={handleChange("password_confirmation")}
        touched={touched["password_confirmation"]}
        onBlur={() => setFieldTouched("password_confirmation")}
      />
      <Button title={t(LangKeys.continue)} onPress={onContinue} />
    </>
  );
};

export default PersonalDetails;
