import React, {FC} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Modal from 'react-native-modal';
import {Colors, Icons} from '../../common';
import {Button, Text} from '..';

interface PasswordVerifiedModalProps {
  isVisible: boolean;
  title: string;
  onPress: () => void;
  description: string;
}

const VerifiedModal: FC<PasswordVerifiedModalProps> = ({
  isVisible,
  title,
  onPress,
  description,
}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={{marginVertical: 10}}>
            <Image
              source={require('../../assets/images/Verified.png')}
              style={{width: 89, height: 89}}
            />
          </View>
          <View style={styles.text}>
            <Text>{title}</Text>
            <Text style={styles.otpLabel}>{description}</Text>
          </View>
          <Button title="Close" onPress={onPress} />
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

export default VerifiedModal;
