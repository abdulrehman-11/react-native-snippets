import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";

import { AppHeader, Label, Screen } from "../../../components";

import { useLoader } from "../../../hooks";
import { CSNetwork, Urls } from "../../../config";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../components/Toastify";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../../common";
import { t } from "i18next";
import LangKeys from "../../../i18n/translations/LangKeys";

const QRCdoeScreen: FC = () => {
  const { setLoading } = useLoader();
  const navigation = useNavigation();

  const handleUseCoupon = async (data: string) => {
    setLoading(true);
    const response: any = await CSNetwork.post(
      Urls.manageBoughtCoupon(parseInt(data))
    );
    setLoading(false);
    if (!response.ok) return showErrorMessage(response.data.message);
    showSuccessMessage(response.data.message);
    // @ts-ignore
    navigation.navigate(Routes.BoughtCouponDetailScreen, { id: data });
  };

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <AppHeader title={t(LangKeys.qrCode)} />
      </View>
      <QRCodeScanner
        onRead={({ data }) => handleUseCoupon(data)}
        topContent={
          <View style={{ paddingBottom: 100 }}>
            <Label title={t(LangKeys.scantheQRCode)} size="lg" />
          </View>
        }
      />
    </Screen>
  );
};

export default QRCdoeScreen;
