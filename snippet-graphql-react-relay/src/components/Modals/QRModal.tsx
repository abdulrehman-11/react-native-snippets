import React, {FC} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Modal from 'react-native-modal';

import {Colors} from '../../common';
import {Text} from '..';

interface PasswordVerifiedModalProps {
  isVisible: boolean;
  title: string;
  qrCode: string;
  onCancel: () => void;
}

const QRModal: FC<PasswordVerifiedModalProps> = ({
  isVisible,
  title,
  qrCode,
  onCancel,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onCancel}
      onBackdropPress={onCancel}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.text}>
            <Text>{title}</Text>
          </View>
          <Image source={{uri: qrCode}} style={{width: 200, height: 200}} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center'},
  mainContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
  },
  otpLabel: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: -0.408,
    lineHeight: 22,
    color: Colors.grey,
  },
  text: {justifyContent: 'center', alignItems: 'center'},
});

export default QRModal;
