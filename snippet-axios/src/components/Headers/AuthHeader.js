import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors, Fonts, TextSizes } from "../../common";
import { Text } from "../index";

const AuthHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconContainer}
      >
        <Image
          source={require("../../../assets/Images/back.png")}
          style={styles.backIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={{ width: "80%" }}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  title: {
    alignSelf: "center",
    fontFamily: Fonts.SemiBold,
    color: Colors.violet,
    fontSize: TextSizes.SubHeading,
  },
  iconContainer: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthHeader;
