import React, { FC } from "react";
import { View, StyleSheet, Text, Image, ImageBackground } from "react-native";

import { Colors, Fonts } from "../../common";
import type { Coupon } from "../../types";
import { useTranslation } from "react-i18next";
import LangKeys from "../../i18n/translations/LangKeys";

interface Props {
  coupon: Coupon;
}

const CouponCard: FC<Props> = ({ coupon }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: coupon.coupon_image }}
        style={styles.imgBackground}
        imageStyle={styles.backgroundImage}
      >
        <Image source={{ uri: coupon.shop_logo }} style={styles.img} />
      </ImageBackground>
      <View style={{ height: "50%", paddingHorizontal: 10, paddingTop: 10 }}>
        {!!coupon.coupons_available && (
          <Text style={styles.token}>
            {t(LangKeys.cpTokens)} : {coupon.coupons_available}
          </Text>
        )}
        <Text style={styles.couponName}>{coupon.coupon_name}</Text>
        <Text style={styles.expiryDate}>
          {t(LangKeys.expiresOn)} : {coupon.coupon_usage_end_date}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 237,
    width: 177,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  img: {
    width: 54,
    height: 54,
    marginRight: 10,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: "10%",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  imgBackground: {
    justifyContent: "center",
    alignItems: "center",
    height: "55%",
  },
  expiryDate: {
    color: Colors.darkBlack,
    fontFamily: Fonts.SemiBold,
    fontSize: 10,
  },
  couponName: { color: Colors.primary, fontFamily: Fonts.SemiBold },
  token: {
    color: Colors.darkBlack,
    alignSelf: "center",
    fontFamily: Fonts.SemiBold,
    marginVertical: 10,
  },
});

export default CouponCard;
