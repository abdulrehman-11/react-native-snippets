import React from "react";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";

import { Colors, Fonts, TextSizes } from "../../common";
import { Text } from "../index";

const GameCard = ({ title, game, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.game}>Total Questions: {game}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    width: "85%",
    marginVertical: "3%",
    alignSelf: "center",
    borderRadius: 20,
    height: 120,
    paddingLeft: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  title: {
    fontFamily: Fonts.SemiBold,
    fontSize: TextSizes.Heading,
    color: Colors.WHITE,
    marginTop: "5%",
  },
  game: {
    fontSize: TextSizes.text,
    color: Colors.coinButtonBorder,
    marginTop: Platform.OS === "ios" ? "3%" : 0,
  },
});

export default GameCard;
