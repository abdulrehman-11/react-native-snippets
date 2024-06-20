import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { AppHeader, Screen, Stepper } from "../../../components";

import LangKeys from "../../../i18n/translations/LangKeys";
import MyShop from "./component/MyShop";
import { MY_SHOP_DUMMY_DATA } from "../../../common/DummyData";
import BankDetail from "./component/BankDetail";

const ShopScreen: FC = () => {
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const { t } = useTranslation();

  return (
    <Screen>
      <AppHeader title={t(LangKeys.myShop)} />
      <Stepper
        data={MY_SHOP_DUMMY_DATA}
        selectedItem={selectedItem}
        onSelect={setSelectedItem}
      />
      {selectedItem === 0 && <MyShop />}
      {selectedItem === 1 && <BankDetail />}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ShopScreen;
