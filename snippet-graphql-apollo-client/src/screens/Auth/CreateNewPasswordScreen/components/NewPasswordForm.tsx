import React, {FC} from 'react';
import {View} from 'react-native';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {create} from 'apisauce';
import {useFormik} from 'formik';

import LangKeys from '../../../../i18n/translations/LangKeys';
import {Button, InputText, Label} from '../../../../components';
import {useAuth, useLoader} from '../../../../hooks';
import {Urls} from '../../../../config';
import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../../components/Toastify';

const apiClient = create({
  baseURL: 'https://coupons.thesinella.com/api/',
});

interface Props {
  data: any;
}

const NewPasswordForm: FC<Props> = ({data}) => {
  const {t} = useTranslation();
  const {setLoading} = useLoader();
  const {login} = useAuth();

  const validationSchema = Yup.object().shape({
    password: Yup.string().required(
      `${t(LangKeys.newPassword)} ${t(LangKeys.isRequired)}`,
    ),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref('password')],
      t(LangKeys.passwordMustMatch),
    ),
  });

  const initialValues = {
    password: '',
    password_confirmation: '',
  };

  const onSubmit = async (values: any) => {
    setLoading(true);

    const obj = {
      old_password: data.meta.tempPassword,
      new_password: values.password,
      new_password_confirmation: values.password_confirmation,
    };

    let response: any = await apiClient.put(
      Urls.updatePasswordAfterGoogleLogin,
      obj,
      {
        headers: {
          Authorization: `Bearer ${data.meta.token}`,
          Accept: 'application/json',
        },
      },
    );

    setLoading(false);
    if (!response.ok) {
      return showErrorMessage(response.data.message);
    }
    showSuccessMessage(response.data.message);

    login({token: data.meta.token, data: data.user});
  };

  const {handleChange, handleSubmit, values, errors, touched, setFieldTouched} =
    useFormik({
      onSubmit,
      validationSchema,
      initialValues,
    });

  return (
    <>
      <View style={{marginVertical: 40}}>
        <Label title={t(LangKeys.newPassword)} />
        <InputText
          placeholder={t(LangKeys.enterNewPassword)}
          secureTextEntry={true}
          value={values.password}
          error={errors['password']}
          onChangeText={handleChange('password')}
          touched={touched['password']}
          onBlur={() => setFieldTouched('password')}
        />
        <Label title={t(LangKeys.confirmNewPassword)} />
        <InputText
          placeholder={t(LangKeys.enterNewPassword)}
          secureTextEntry={true}
          value={values.password_confirmation}
          error={errors['password_confirmation']}
          onChangeText={handleChange('password_confirmation')}
          touched={touched['password_confirmation']}
          onBlur={() => setFieldTouched('password_confirmation')}
        />
      </View>
      <Button title={t(LangKeys.update)} onPress={handleSubmit} />
    </>
  );
};

export default NewPasswordForm;
