import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";

import { Screen, Text } from "../../../components";
import { WelcomeModal } from "../../../components/Modals";
import styles from "./styles";

const WelcomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Screen>
      <Image
        source={require("../../../../assets/Images/blue_logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Club Passport</Text>
        <Text style={styles.text}>
          Your ticket to the Gamification of learning
        </Text>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={require("../../../../assets/Images/btn_screen_up.png")}
          style={styles.upArrow}
        />
      </TouchableOpacity>
      <WelcomeModal visible={modalVisible} setVisible={setModalVisible} />
    </Screen>
  );
};

export default WelcomeScreen;
