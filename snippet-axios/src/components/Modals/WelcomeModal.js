import React from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../Buttons";
import { Routes } from "../../common";

const WelcomeModal = ({ visible, setVisible }) => {
  const navigation = useNavigation();
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => setVisible(!visible)}
      onBackButtonPress={() => setVisible(!visible)}
    >
      <View style={styles.container}>
        <Button
          title="Sign In"
          onPress={() => {
            setVisible(false);
            navigation.navigate(Routes.LoginScreen);
          }}
        />
        <Button
          title="Sign Up"
          onPress={() => {
            setVisible(false);
            navigation.navigate(Routes.SignupScreen);
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 150,
  },
});

export default WelcomeModal;
