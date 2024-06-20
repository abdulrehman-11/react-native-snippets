import React, { FC, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { AppHeader, Screen, Stepper } from "../../../components";
import LangKeys from "../../../i18n/translations/LangKeys";
import { COUPON_CREATE_DUMMY_DATA } from "../../../common/DummyData";
import CreateCoupon from "./component/CreateCoupon";
import UsedCoupon from "./component/UsedCoupon";
import { useAuth } from "../../../hooks";

const CouponScreen: FC = () => {
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const { t } = useTranslation();

  const { user } = useAuth();
  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <AppHeader title={t(LangKeys.coupon)} />
      </View>
      <Stepper
        data={COUPON_CREATE_DUMMY_DATA}
        selectedItem={selectedItem}
        onSelect={setSelectedItem}
      />
      {selectedItem === 0 && <CreateCoupon />}
      {selectedItem === 1 && <UsedCoupon />}
    </Screen>
  );
};

export default CouponScreen;
