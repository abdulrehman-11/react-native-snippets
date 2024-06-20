import React, {FC} from 'react';
import {View, ScrollView} from 'react-native';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';

import {Button, InputText, Label} from '../../../../components';
import {CSNetwork, Urls} from '../../../../config';
import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../../components/Toastify';
import {useAuth, useLoader} from '../../../../hooks';
import LangKeys from '../../../../i18n/translations/LangKeys';

const validationSchema = Yup.object().shape({
  account_name: Yup.string().required('Account name is required'),
  account_number: Yup.string().required('Account number is required'),
  bank_name: Yup.string().required('Bank name is required'),
  ifsc_code: Yup.string().required('IFSC code is required'),
});

const BankDetail: FC = () => {
  const {setLoading} = useLoader();
  const {user, updateUser} = useAuth();
  const {t} = useTranslation();

  const initialValues = {
    account_number: user?.user_bank_account?.account_number || '',
    account_name: user?.user_bank_account?.account_name || '',
    bank_name: user?.user_bank_account?.bank_name || '',
    ifsc_code: user?.user_bank_account?.ifsc_code || '',
  };
  const onSubmit = async (values: any) => {
    setLoading(true);
    const response: any = await CSNetwork.post(Urls.UserBankAccount, values);
    setLoading(false);

    if (!response.ok) return showErrorMessage(response.data.message);
    showSuccessMessage(response.data.message);
    if (user) updateUser({...user, user_bank_account: response.data.data});
  };

  const {setFieldTouched, touched, handleChange, handleSubmit, errors, values} =
    useFormik({
      onSubmit,
      validationSchema,
      initialValues,
    });
  return (
    <View style={{marginVertical: 20}}>
      <ScrollView nestedScrollEnabled={true}>
        <Label title={t(LangKeys.accountName)} />
        <InputText
          value={values.account_name}
          error={errors['account_name']}
          onChangeText={handleChange('account_name')}
          onBlur={() => setFieldTouched('account_name')}
          placeholder={t(LangKeys.enterAccountName)}
          touched={touched['account_name']}
        />
        <Label title={t(LangKeys.accountNumber)} />
        <InputText
          value={values.account_number}
          error={errors['account_number']}
          onChangeText={handleChange('account_number')}
          onBlur={() => setFieldTouched('account_number')}
          placeholder={t(LangKeys.enterAccountNumber)}
          touched={touched['account_number']}
        />
        <Label title={t(LangKeys.bankName)} />
        <InputText
          value={values.bank_name}
          error={errors['bank_name']}
          onChangeText={handleChange('bank_name')}
          onBlur={() => setFieldTouched('bank_name')}
          placeholder={t(LangKeys.enterBankName)}
          touched={touched['bank_name']}
        />
        <Label title={t(LangKeys.ifscCode)} />
        <InputText
          value={values.ifsc_code}
          error={errors['ifsc_code']}
          onChangeText={handleChange('ifsc_code')}
          onBlur={() => setFieldTouched('ifsc_code')}
          placeholder={t(LangKeys.enterIFSCCode)}
          touched={touched['ifsc_code']}
        />

        <Button title={t(LangKeys.save)} onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
};

export default BankDetail;
