import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import { Text } from "../index";
import { Colors, Fonts, TextSizes } from "../../common";

const NotificationCard = ({ text, time, date, detail, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={{ ...styles.text, fontSize: TextSizes.SubHeading }}>
          {text}
        </Text>
        <Text style={styles.text}>{detail}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{time}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    alignSelf: "center",
    marginVertical: "3%",
    width: "90%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginTop: "2%",
  },
  text: {
    color: Colors.WHITE,
    fontFamily: Fonts.SemiBold,
    textAlign: "center",
    paddingBottom: "3%",
  },
  date: {
    color: Colors.WHITE,
    fontSize: TextSizes.smallText,
  },
});

export default NotificationCard;
