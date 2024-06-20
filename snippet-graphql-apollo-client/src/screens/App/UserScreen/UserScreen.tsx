import React, { FC } from "react";

import { Screen, AppHeader } from "../../../components";
import PersonalDetail from "./component/PersonalDetail";
import { useTranslation } from "react-i18next";
import LangKeys from "../../../i18n/translations/LangKeys";

const UserScreen: FC = () => {
  const { t } = useTranslation();

  return (
    <Screen>
      <AppHeader showBack={true} title={t(LangKeys.profile)} />

      <PersonalDetail />
    </Screen>
  );
};

export default UserScreen;
