import React, { FC, useEffect } from "react";
import { Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import { Screen } from "../../../components";
import { Routes } from "../../../common";
import useAuth from "../../../hooks/useAuth";
import { getLanguage, getToken, getUser } from "../../../utils/storage";
import { useLanguage } from "../../../hooks";
import { User } from "../../../types";

const SplashScreen: FC = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const { saveLanguage } = useLanguage();

  useEffect(() => {
    (async () => {
      const token: string | null | undefined = await getToken();
      const language: string | null | undefined = await getLanguage();
      const user: User | null | undefined = await getUser();
      saveLanguage(language || "jp");
      if (token) {
        await login({ token, data: user });
      } else {
        setTimeout(() => {
          // @ts-ignore
          navigation.navigate(Routes.LoginScreen);
        }, 3000);
      }
    })();
  }, []);

  return (
    <Screen>
      <View style={styles.splash}>
        <Image
          style={styles.container}
          source={require("../../../assets/images/LogoImage.png")}
        />
      </View>
    </Screen>
  );
};

export default SplashScreen;
