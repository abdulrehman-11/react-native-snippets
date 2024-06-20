import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { Colors, Fonts, TextSizes, Icons } from "../../common";
import { Text } from "../index";

const ProfileCard = ({ iconName, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.subContainerA}>{iconName}</View>

      <View style={styles.subContainerB}>
        <Text style={styles.subTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "80%",
    alignSelf: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: Colors.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: Colors.darkBlue,
    borderWidth: 2,
  },
  subContainerA: {
    flex: 0.2,
    marginLeft: 10,
  },
  titleText: {
    fontSize: TextSizes.smallText,
    fontFamily: Fonts.SemiBold,
    marginLeft: 3,
    color: Colors.lightBlackColor,
  },
  subContainerB: {
    flex: 0.8,
    justifyContent: "center",
  },
  subTitle: {
    fontSize: TextSizes.mediumText,
    fontWeight: "bold",
    color: Colors.black,
  },
});

export default ProfileCard;
