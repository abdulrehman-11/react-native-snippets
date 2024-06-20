import React, {FC} from 'react';
import {View, StyleSheet, Text, Image, ImageBackground} from 'react-native';
import {Colors} from '../../common';
import {Button} from '..';
import type {Coupon} from '../../types';
import {useTranslation} from 'react-i18next';
import LangKeys from '../../i18n/translations/LangKeys';

interface Props {
  coupon: Coupon;
  onPress: (couponId: number) => void;
  title: string;
}

const CouponCardTwo: FC<Props> = ({coupon, onPress, title}) => {
  const {t} = useTranslation();

  return (
    <View style={{ marginBottom: 16 }}>
      <ImageBackground source={{ uri: coupon.coupon_background }} style={styles.mainContainer}>
        <Image source={{ uri: coupon.coupon_background }} style={styles.rightCircle} />
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{ uri: coupon.coupon_image }} />
          <View>
            <Text style={styles.heading}>{coupon.coupon_name}</Text>
            <Text style={styles.text}>CP : {coupon.coupon_cp_token}</Text>
          </View>
        </View>
        <View style={styles.expireSection}>
          <View>
            <Text style={styles.expire}>{t(LangKeys.expiresOn)}</Text>
            <Text style={styles.expireNumber}>{coupon.coupon_ends_date}</Text>
          </View>
          <Text style={styles.dollar}>¥{coupon.coupon_price}</Text>
        </View>
      </ImageBackground>
      <View style={styles.redeem}>
        <Button
          title={title}
          onPress={() => onPress(coupon.coupon_id)}
          type='secondary'
          width='40%'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rightCircle: {
    width: 150,
    height: 150,
    position: 'absolute',
    objectFit: 'cover',
    right: -10,
    top: 0,
  },
  mainContainer: {
    backgroundColor: Colors.primary,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    padding: 10,
    borderWidth: 3,
    borderStyle: 'dotted',
    borderColor: Colors.white,
  },
  img: {
    width: 54,
    height: 54,
    marginRight: 10,
    borderRadius: 50,
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expireSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expire: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 18,
    color: Colors.white,
  },
  expireNumber: {
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 18,
    color: Colors.white,
  },
  dollar: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
  },
  heading: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: Colors.white,
  },
  text: {fontSize: 12, fontWeight: '400', lineHeight: 18, color: Colors.white},
  redeem: {
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderWidth: 3,
    borderStyle: 'dotted',
    borderColor: Colors.white,
    paddingHorizontal: 10,
    backgroundColor: Colors.primary,
    marginTop: -4,
  },
});

export default CouponCardTwo;
