import React from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment";

import { Text } from ".";
import { Colors, Fonts, TextSizes } from "../common";

const Field = ({ title, value, time }) => {
  return (
    <View style={{ marginTop: "2%" }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {time && (
          <Text style={styles.title}>
            {moment(time).format("MMM Do") + "  "}
            {moment(time).format("hh:mm A")}
          </Text>
        )}
      </View>

      <View style={styles.valuesContainer}>
        <Text>{value ? value : "None"}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    color: Colors.darkBlue,
    fontFamily: Fonts.SemiBold,
    fontSize: TextSizes.mediumText,
  },
  valuesContainer: {
    paddingLeft: "10%",
    width: "80%",
    alignSelf: "center",
    marginVertical: "1%",
  },
  titleContainer: {
    marginLeft: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: "5%",
  },
});

export default Field;
