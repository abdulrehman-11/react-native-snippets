import React, { FC, useState } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import { Button, InputText, Label, Text } from "../../../../components";
import { CSNetwork, Urls } from "../../../../config";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../components/Toastify";
import { useAuth, useLoader } from "../../../../hooks";
import LangKeys from "../../../../i18n/translations/LangKeys";
import { Colors } from "../../../../common";

const BankDetail: FC = () => {
  const { setLoading } = useLoader();
  const { user, updateUser } = useAuth();
  const { t } = useTranslation();
  const accountTypes: any[] = [
    { value: "normal", label: t(LangKeys.normal) },
    { value: "current", label: t(LangKeys.current) },
  ];
  const [selectedAccountType, setSelectedAccountType] = useState<string>(
    user?.user_bank_account?.deposit_type || accountTypes[0].value
  );

  const handleAccountTypeChange = (type: string) => {
    setSelectedAccountType(type);
  };

  const validationSchema = Yup.object().shape({
    account_name: Yup.string().required(
      `${t(LangKeys.accountName)} ${t(LangKeys.isRequired)}`
    ),
    account_number: Yup.string().required(
      `${t(LangKeys.accountNumber)} ${t(LangKeys.isRequired)}`
    ),
    bank_name: Yup.string().required(
      `${t(LangKeys.bankName)} ${t(LangKeys.isRequired)}`
    ),
    branch_number: Yup.string()
      .required(`${t(LangKeys.branchNumber)} ${t(LangKeys.isRequired)}`)
      .max(3, t(LangKeys.errorMustBe3Characters))
      .min(3, t(LangKeys.errorMustBe3Characters)),
    account_name_furigana: Yup.string().required(
      `${t(LangKeys.accountNameFurigana)} ${t(LangKeys.isRequired)}`
    ),
  });

  const initialValues = {
    account_number: user?.user_bank_account?.account_number || "",
    account_name: user?.user_bank_account?.account_name || "",
    account_name_furigana: user?.user_bank_account?.account_name_furigana || "",
    bank_name: user?.user_bank_account?.bank_name || "",
    branch_number: user?.user_bank_account?.branch_number.toString() ?? "",
  };

  const onSubmit = async (values: any) => {
    setLoading(true);
    const response: any = await CSNetwork.post(Urls.UserBankAccount, {
      ...values,
      deposit_type: selectedAccountType,
    });
    setLoading(false);
    if (!response.ok) return showErrorMessage(response.data.message);
    showSuccessMessage(response.data.message);
    if (user) updateUser({ ...user, user_bank_account: response.data.data });
  };

  const {
    setFieldTouched,
    touched,
    handleChange,
    handleSubmit,
    errors,
    values,
  } = useFormik({
    onSubmit,
    validationSchema,
    initialValues,
  });
  return (
    <View style={{ marginVertical: 20 }}>
      <ScrollView nestedScrollEnabled={true}>
        <Label title={`${t(LangKeys.bankName)}*`} />
        <InputText
          value={values.bank_name}
          error={errors["bank_name"]}
          onChangeText={handleChange("bank_name")}
          onBlur={() => setFieldTouched("bank_name")}
          placeholder={t(LangKeys.enterBankName)}
          touched={touched["bank_name"]}
        />
        <Label title={`${t(LangKeys.branchNumber)}*`} />
        <InputText
          value={values.branch_number}
          error={errors["branch_number"]}
          onChangeText={handleChange("branch_number")}
          onBlur={() => setFieldTouched("branch_number")}
          placeholder={t(LangKeys.enterBranchNumber)}
          touched={touched["branch_number"]}
        />

        <View>
          <Label title={`${t(LangKeys.selectAccountType)}*`} />
          <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
              {accountTypes.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    ...styles.button,

                    borderColor:
                      selectedAccountType === type.value
                        ? Colors.primary
                        : "white",
                  }}
                  onPress={() => handleAccountTypeChange(type.value)}
                >
                  <Text
                    style={{
                      color:
                        selectedAccountType === type.value
                          ? Colors.primary
                          : "black",
                    }}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <Label title={`${t(LangKeys.accountNumber)}*`} />
        <InputText
          value={values.account_number}
          error={errors["account_number"]}
          onChangeText={handleChange("account_number")}
          onBlur={() => setFieldTouched("account_number")}
          placeholder={t(LangKeys.enterAccountNumber)}
          touched={touched["account_number"]}
        />
        <Label title={`${t(LangKeys.accountName)}*`} />
        <InputText
          value={values.account_name}
          error={errors["account_name"]}
          onChangeText={handleChange("account_name")}
          onBlur={() => setFieldTouched("account_name")}
          placeholder={t(LangKeys.enterAccountName)}
          touched={touched["account_name"]}
        />
        <Label title={`${t(LangKeys.accountNameFurigana)}*`} />
        <InputText
          value={values.account_name_furigana}
          error={errors["account_name_furigana"]}
          onChangeText={handleChange("account_name_furigana")}
          onBlur={() => setFieldTouched("account_name_furigana")}
          placeholder={t(LangKeys.enterAccountName)}
          touched={touched["account_name_furigana"]}
        />

        <Button title={t(LangKeys.save)} onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 5,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    // borderColor: "black",
    borderWidth: 1,
  },
});

export default BankDetail;
