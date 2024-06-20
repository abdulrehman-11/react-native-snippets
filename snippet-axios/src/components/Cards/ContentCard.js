import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text } from "../index";
import { Colors, TextSizes, Fonts } from "../../common";

const ContentCard = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.textstyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: Colors.darkBlue,
    alignItems: "center",
    borderRadius: 15,
    width: "85%",
    alignSelf: "center",
    marginVertical: "3%",
    height: 120,
  },
  textstyle: {
    fontSize: TextSizes.SubHeading,
    color: Colors.WHITE,
    fontFamily: Fonts.Bold,
  },
});

export default ContentCard;
