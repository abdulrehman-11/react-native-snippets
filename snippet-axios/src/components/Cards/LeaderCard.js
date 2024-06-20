import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

import { Colors } from "../../common";
import { Text } from "../index";

const LeaderCard = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.rowStyles}>
        <Text> Total Score</Text>
        <Image source={require("../../../assets/Images/ic_coins.png")} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "45%",
    backgroundColor: Colors.gradientViolet,
    borderRadius: 10,
  },
});

export default LeaderCard;
