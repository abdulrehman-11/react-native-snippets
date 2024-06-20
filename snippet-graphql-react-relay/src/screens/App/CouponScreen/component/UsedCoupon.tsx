import React, { FC, useEffect, useState } from "react";
import { FlatList, View, Pressable, Platform } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import { CouponCard, NoData, Text } from "../../../../components";
import type { Coupon } from "../../../../types";
import { useLoader } from "../../../../hooks";
import { CSNetwork, Urls } from "../../../../config";
import { showErrorMessage } from "../../../../components/Toastify";
import { Routes } from "../../../../common";
import LangKeys from "../../../../i18n/translations/LangKeys";
import { useTranslation } from "react-i18next";

const CreateCoupon: FC = () => {
  const [usedCoupons, setUsedCoupons] = useState<any>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const { setLoading } = useLoader();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { t } = useTranslation();

  const getShopUsedCoupons = async () => {
    setLoading(true);

    const response: any = await CSNetwork.get(Urls.status);
    setLoading(false);

    if (!response.ok) return showErrorMessage(response.data.message);
    setUsedCoupons(response.data.data);
    setCoupons(response.data.data.bought_coupons);
  };

  useEffect(() => {
    if (isFocused) getShopUsedCoupons();
  }, [isFocused]);

  const CouponList = () => {
    return (
      <>
        <View style={{ marginBottom: 100 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <FlatList
              numColumns={2}
              data={coupons}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    // @ts-ignore
                    navigation.navigate(Routes.BoughtCouponDetailScreen, {
                      id: item.coupon_id,
                    })
                  }
                >
                  <View
                    style={{
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginVertical: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text>{t(LangKeys.totalbought)}: </Text>
          <Text>{usedCoupons?.total_bought}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>{t(LangKeys.totalUsed)}: </Text>
          <Text>{usedCoupons?.used_coupons}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>{t(LangKeys.totalselling)}: </Text>
          <Text>¥{usedCoupons?.total_selling}</Text>
        </View>
      </View>
      {coupons.length === 0 ? (
        <NoData message={t(LangKeys.noCoupons)} />
      ) : (
        <CouponList />
      )}
    </View>
  );
};

export default CreateCoupon;
