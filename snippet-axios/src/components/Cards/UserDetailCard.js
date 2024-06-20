import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

import { Colors, Icons } from "../../common";
import { Text } from "../index";
import { baseUrl } from "../../config";

const UserDetailCard = ({ image, name, email, onPress }) => {
  return (
    <View style={styles.profileDetailContainer}>
      <View style={styles.detailContainerA}>
        {image ? (
          <Image
            source={{ uri: baseUrl + image }}
            style={{ width: 80, height: 80, borderRadius: 10 }}
          />
        ) : (
          <Icons.MaterialIcons name="person" size={50} color={Colors.blue} />
        )}
      </View>

      <View style={styles.detailContainerB}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userAddress}>{email}</Text>
      </View>

      <TouchableOpacity onPress={onPress} style={styles.detailEditButton}>
        <Icons.FontAwesome5 size={15} name="pencil-alt" color={Colors.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileDetailContainer: {
    flex: 1,
    height: 100,
    marginVertical: 20,
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
    width: "90%",
    alignSelf: "center",
  },
  detailContainerA: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  detailContainerB: {
    flex: 0.6,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#242424",
  },
  userAddress: {
    fontSize: 13,
    color: "#242424",
  },

  detailEditButton: {
    flex: 0.08,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.darkBlue,
    borderRadius: 20,
    height: 25,
    marginBottom: 55,
  },
});

export default UserDetailCard;
