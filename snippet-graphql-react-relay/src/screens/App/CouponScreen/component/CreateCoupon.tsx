import React, { FC, useEffect, useState } from "react";
import { FlatList, View, Pressable } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import {
  AppHeader,
  CouponCard,
  Screen,
  Button,
  Label,
} from "../../../../components";
import type { Coupon } from "../../../../types";
import { useLoader, useShop } from "../../../../hooks";
import { CSNetwork, Urls } from "../../../../config";
import { showErrorMessage } from "../../../../components/Toastify";
import { Routes } from "../../../../common";
import LangKeys from "../../../../i18n/translations/LangKeys";

const CreateCoupon: FC = () => {
  const [couponsList, setCouponsList] = useState<Coupon[]>([]);
  const { setLoading } = useLoader();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const { shop } = useShop();

  const getShopCoupons = async () => {
    setLoading(true);

    const response: any = await CSNetwork.get(Urls.manageCoupons);
    setLoading(false);

    if (!response.ok) return showErrorMessage(response.data.message);
    setCouponsList(response.data.data);
  };

  useEffect(() => {
    if (isFocused) getShopCoupons();
  }, [isFocused]);

  const CouponList = () => {
    return (
      <>
        <View style={{ paddingHorizontal: 16 }}>
          <Button
            title={t(LangKeys.createCoupons)}
            width="50%"
            type="secondary"
            onPress={() =>
              // @ts-ignore
              navigation.navigate(Routes.CouponDetailScreen, { mode: "Create" })
            }
          />
        </View>
        <View style={{ marginBottom: 100 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <FlatList
              numColumns={2}
              data={couponsList}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    // @ts-ignore
                    navigation.navigate(Routes.CouponDetailScreen, {
                      coupon: item,
                      mode: "Edit",
                    })
                  }
                >
                  <View
                    style={{
                      // marginLeft: Platform.OS === "ios" ? "3%" : "2%",
                      marginTop: "1%",
                      paddingHorizontal: "1%",
                      marginBottom: "2%",
                    }}
                  >
                    <CouponCard coupon={item} />
                  </View>
                </Pressable>
              )}
            />
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={{ paddingHorizontal: 0 }}>
      {shop ? (
        <CouponList />
      ) : (
        <>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: "25%",
            }}
          >
            <Label title={t(LangKeys.createShopFirst)} size="md" />
          </View>
          <Button
            title={t(LangKeys.Create)}
            width="50%"
            type="secondary"
            onPress={() =>
              // @ts-ignore
              navigation.navigate(t(Routes.ShopStack))
            }
          />
        </>
      )}
    </View>
  );
};

export default CreateCoupon;
