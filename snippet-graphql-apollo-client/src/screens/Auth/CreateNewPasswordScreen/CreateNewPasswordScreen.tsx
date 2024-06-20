import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';

import {AuthLogo, Label, Screen} from '../../../components';
import LangKeys from '../../../i18n/translations/LangKeys';
import ResetPasswordForm from './components/ResetPasswordForm';
import NewPasswordForm from './components/NewPasswordForm';

const CreateNewPasswordScreen: FC = () => {
  const {t} = useTranslation();
  const route = useRoute();
  // @ts-ignore
  const data: any = route.params?.data || null;

  return (
    <Screen>
      <AuthLogo />
      <Label title={t(LangKeys.createNewPassword)} size="lg" />
      <Label title={t(LangKeys.newPasswordDifferent)} size="md" />

      {data ? <NewPasswordForm data={data} /> : <ResetPasswordForm />}
    </Screen>
  );
};

export default CreateNewPasswordScreen;
