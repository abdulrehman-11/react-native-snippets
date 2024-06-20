import React from "react";
import { View, StyleSheet, Modal, Linking } from "react-native";

import { Text, Screen } from "..";
import { Colors, TextSizes, Icons } from "../../common";
import { Button } from "../Buttons";

const UpdateModal = ({ isVisible, url }) => {
  return (
    <Modal visible={isVisible}>
      <Screen>
        <View style={styles.container}>
          <Icons.MaterialIcons
            name="system-update"
            size={70}
            color={Colors.darkBlue}
          />
          <Text style={styles.update}>Update Available!</Text>
          <Text style={styles.description}>
            Please update your app to continue.
          </Text>
          <Button
            onPress={() => Linking.openURL(url)}
            title="Update"
            gradient
          />
        </View>
      </Screen>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  update: {
    fontSize: TextSizes.Heading,
    color: Colors.blue,
    marginBottom: "5%",
  },
  description: {
    marginBottom: "5%",
  },
});

export default UpdateModal;
