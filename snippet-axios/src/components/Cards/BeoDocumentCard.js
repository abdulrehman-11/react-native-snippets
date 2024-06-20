import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { Colors, Fonts, Icons, TextSizes } from "../../common";
import { Text } from "../index";

const BeoDocumentCard = ({ name, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View style={styles.imageContainer}>
          <Icons.Entypo name="text-document" color={Colors.WHITE} size={24} />
        </View>
        <View style={{ width: "70%" }}>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    width: "90%",
    alignItems: "center",
    marginVertical: "3%",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 20,
    height: 80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  name: {
    fontFamily: Fonts.SemiBold,
    fontSize: TextSizes.text,
    color: Colors.WHITE,
    alignSelf: "center",
    textAlign: "center",
  },
});

export default BeoDocumentCard;
