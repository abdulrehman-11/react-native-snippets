import React, { FC, useEffect, useState } from "react";
import { View, ImageBackground, Image, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { AppHeader, Screen, Text } from "../../../components";
import { showErrorMessage } from "../../../components/Toastify";
import LangKeys from "../../../i18n/translations/LangKeys";
import { Coupon } from "../../../types";
import { useLoader } from "../../../hooks";
import { CSNetwork, Urls } from "../../../config";
import styles from "./styles";

const CouponDetailScreen: FC = () => {
  const { t } = useTranslation();
  const { params } = useRoute();
  const navigation = useNavigation();
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const { setLoading } = useLoader();

  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: "none" }, tabBarVisible: false });
    return () =>
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation]);

  useEffect(() => {
    // @ts-ignore
    if (params.id !== null) getBoughtCoupon();
    else {
      // @ts-ignore
      setCoupon(params.coupon);
    }
  }, []);

  const getBoughtCoupon = async () => {
    setLoading(true);
    const response: any = await CSNetwork.get(
      // @ts-ignore
      Urls.manageBoughtCoupon(params.id)
    );
    setLoading(false);

    if (!response.ok) return showErrorMessage(response.data.message);
    setCoupon(response.data.data);
  };

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 16 }}>
          <AppHeader showBack={true} title={t(LangKeys.coupon)} />
        </View>
        <ImageBackground
          imageStyle={styles.backgroundImage}
          source={{ uri: coupon?.coupon_image }}
        >
          <Image
            style={styles.img}
            source={{ uri: coupon?.coupon_background }}
          />
        </ImageBackground>
        <View style={{ paddingHorizontal: 16, flex: 1 }}>
          <Text style={styles.name}>{coupon?.coupon_name}</Text>
          <View style={styles.row}>
            {(coupon?.coupon_cp_token || coupon?.coupons_available) && (
              <Text style={styles.token}>
                {t(LangKeys.cpTokens)} :{" "}
                {coupon?.coupon_cp_token || coupon?.coupons_available}
              </Text>
            )}
            <Text style={styles.price}>¥{coupon?.coupon_price}</Text>
          </View>
          <Text style={styles.expiry}>
            {t(LangKeys.validFrom)} :{" "}
            {coupon?.coupon_starts_date || coupon?.coupon_usage_start_date} -{" "}
            {coupon?.coupon_ends_date || coupon?.coupon_usage_end_date}
          </Text>
          {coupon?.coupon_metadata?.used_at && (
            <Text style={styles.expiry}>
              {t(LangKeys.usedAt)} : {coupon?.coupon_metadata?.used_at}
            </Text>
          )}
          <Text style={{ marginTop: 10 }}>{coupon?.coupon_description}</Text>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default CouponDetailScreen;
