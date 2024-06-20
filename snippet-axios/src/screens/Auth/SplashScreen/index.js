import React, { useEffect } from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAuth, useUser } from "../../../hooks";
import { Screen } from "../../../components";
import styles from "./styles";
import navigateNext from "./helper";

const SplashScreen = () => {
  const navigation = useNavigation();
  const { logIn } = useAuth();
  const { saveUser } = useUser();

  useEffect(() => {
    checkversion();
  }, []);

  const checkversion = async () => {
    navigateNext(navigation, logIn, saveUser);
  };

  return (
    <Screen>
      <Image
        source={require("../../../../assets/Images/blue_logo.png")}
        resizeMode="contain"
        style={styles.container}
      />
    </Screen>
  );
};

export default SplashScreen;
