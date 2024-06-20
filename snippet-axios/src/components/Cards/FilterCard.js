import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import { Text } from "..";
import { Colors, Fonts, TextSizes } from "../../common";

const FilterCard = ({ name, image, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.name}>{name.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "85%",
    alignSelf: "center",
    marginVertical: "3%",
    borderRadius: 10,
    backgroundColor: Colors.darkBlue,
    flexDirection: "row",
    alignItems: "center",
    padding: "5%",
  },
  imageContainer: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: "5%",
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  name: {
    color: Colors.WHITE,
    fontSize: TextSizes.SubHeading,
    fontFamily: Fonts.Medium,
    width: "70%",
  },
});

export default FilterCard;
