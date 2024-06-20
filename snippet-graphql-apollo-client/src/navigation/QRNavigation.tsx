import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { BoughtCouponDetail, QRCodeScreen } from "../screens/App";
import { Routes } from "../common";

const Stack = createStackNavigator();

const QRNavigation: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.QRScreen} component={QRCodeScreen} />
      <Stack.Screen
        name={Routes.BoughtCouponDetailScreen}
        component={BoughtCouponDetail}
      />
    </Stack.Navigator>
  );
};

export default QRNavigation;
