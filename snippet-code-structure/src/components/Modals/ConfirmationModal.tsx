import React, { FC } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useTranslation } from "react-i18next";
import Modal from "react-native-modal";

import { Colors } from "../../common";
import { ButtonComponent, Text } from "..";
import LangKeys from "../../i18n/translations/LangKeys";

interface PasswordVerifiedModalProps {
  isVisible: boolean;
  title: string;
  onCancel: () => void;
  onAccept: () => void;
  description: string;
}

const ConfirmationModal: FC<PasswordVerifiedModalProps> = ({
  isVisible,
  title,
  onCancel,
  onAccept,
  description,
}) => {
  const { t } = useTranslation();

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={{ marginVertical: 10 }}>
            <Image
              source={require("../../assets/images/logout.png")}
              style={{ width: 89, height: 89 }}
            />
          </View>
          <View style={styles.text}>
            <Text style={{ textAlign: "center" }}>{title}</Text>
            <Text style={styles.otpLabel}>{description}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "40%", marginRight: 10 }}>
              <ButtonComponent
                width="100%"
                title={t(LangKeys.cancel)}
                onPress={onCancel}
                backgroundColor={Colors.white}
                borderColor={Colors.lightGray}
                color={Colors.lightGray}
              />
            </View>
            <View style={{ width: "40%" }}>
              <ButtonComponent
                width="100%"
                title={t(LangKeys.confirm)}
                onPress={onAccept}
                color={Colors.white}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center" },
  mainContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
  },
  otpLabel: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: -0.408,
    lineHeight: 22,
    color: Colors.grey,
  },
  text: { justifyContent: "center", alignItems: "center" },
});

export default ConfirmationModal;
