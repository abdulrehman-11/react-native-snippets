import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

import { Colors, Fonts, Icons, TextSizes } from "../../common";
import { Text } from "../index";

const BeoCard = ({ image, name, time, onPress, comments = 0, location }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {comments ? (
        <View style={styles.commentContainer}>
          <Icons.MaterialCommunityIcons
            name="message-text-outline"
            color={Colors.yellow}
            size={20}
          />
          <Text style={styles.comments}>{comments}</Text>
        </View>
      ) : null}
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={{ width: "60%" }}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.date}>{time}</Text>
            <Text style={styles.date}>{location}</Text>
          </View>
        </View>
      </View>

      {/* {updatedAt && (
        <Text style={styles.updatedAt}>
          Updated at : {moment(updatedAt).format("MMM Do")}{" "}
          {moment(updatedAt).format("hh:mm A")}
        </Text>
      )} */}
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
    height: 180,
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
  timeContainer: {
    width: "100%",
    justifyContent: "center",
    marginTop: "10%",
    alignItems: "center",
  },
  date: {
    color: Colors.WHITE,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  updatedAt: {
    fontSize: 14,
    color: Colors.WHITE,
    alignSelf: "flex-end",
    paddingRight: "10%",
  },
  imageContainer: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    alignSelf: "flex-end",
    right: 20,
    top: 10,
  },
  comments: {
    color: Colors.yellow,
    fontSize: TextSizes.intermediateMediumText,
    marginLeft: 5,
  },
});

export default BeoCard;
