import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import Pdf from "react-native-view-pdf";

import { Colors, Icons } from "../../common";
import { Screen, Text } from "../../components";
import { recreateUrl } from "../../utils/helpers";

const PdfModal = ({ visible, setVisible, link }) => {
  const [loading, setLoading] = useState(true);

  return (
    <Modal
      supportedOrientations={[
        "portrait",
        "landscape",
        "landscape-left",
        "landscape-right",
        "portrait-upside-down",
      ]}
      visible={visible}
    >
      <Screen style={{ backgroundColor: "black" }}>
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          style={styles.viewPdfContainer}
        >
          <Icons.Entypo name="circle-with-cross" size={40} color={Colors.red} />
        </TouchableOpacity>
        {loading && (
          <ActivityIndicator
            animating={loading}
            size="large"
            color={Colors.darkBlue}
          />
        )}
        <Pdf
          resource={recreateUrl(link)}
          style={{ width: "100%", height: "100%", padding: 10 }}
          onError={(error) => console.log(error)}
          onLoad={() => setLoading(false)}
        />
      </Screen>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewPdfContainer: {
    position: Platform.OS === "ios" ? "relative" : "absolute",
    zIndex: 1,
    alignSelf: "flex-end",
    marginRight: Platform.OS === "ios" ? "5%" : "2%",
  },
});

export default PdfModal;
