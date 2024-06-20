import React from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";

import { Colors, TextSizes } from "../../common";
import { Button } from "../Buttons";
import { Text } from "../index";

const AlertModal = ({ visible, setVisible, onAccept, description, title }) => {
  return (
    <Modal isVisible={visible} onBackdropPress={() => setVisible(false)}>
      <View style={styles.logOutContainer}>
        <Text style={styles.warnStyle}>{title}</Text>
        <Text style={styles.warnText}>{description}</Text>
        <View style={styles.btnRow}>
          <Button
            title="No"
            style={styles.btnStyle}
            textStyle={styles.txtStyles}
            onPress={() => setVisible(false)}
          />
          <Button
            title="Yes"
            style={styles.btnStyle2}
            textStyle={styles.txtStyles}
            onPress={() => {
              onAccept();
              setVisible(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {},
  btnStyle: {
    backgroundColor: Colors.darkBlue,
    width: "40%",
    height: 50,
  },
  btnStyle2: {
    backgroundColor: Colors.RED,
    width: "40%",
    height: 50,
  },
  txtStyles: {
    color: Colors.WHITE,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  warnText: {
    textAlign: "center",
  },
  warnStyle: {
    textAlign: "center",
    fontSize: TextSizes.LargeHeading,
    color: Colors.red,
  },
  logOutContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});

export default AlertModal;
