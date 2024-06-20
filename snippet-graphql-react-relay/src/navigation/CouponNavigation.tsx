import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  BoughtCouponDetail,
  CouponDetailScreen,
  CouponScreen,
} from "../screens/App";
import { Routes } from "../common";

const Stack = createStackNavigator();

const CouponNavigation: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.CouponsScreen} component={CouponScreen} />
      <Stack.Screen
        name={Routes.CouponDetailScreen}
        component={CouponDetailScreen}
      />
      <Stack.Screen
        name={Routes.BoughtCouponDetailScreen}
        component={BoughtCouponDetail}
      />
    </Stack.Navigator>
  );
};

export default CouponNavigation;
