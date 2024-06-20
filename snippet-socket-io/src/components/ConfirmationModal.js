import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';

import {Colors} from '../common';
import LangKeys from '../common/languages/lang';
import ButtonComponent from './ButtonComponent';

const ConfirmationModal = ({
  isVisible,
  title,
  onCancel,
  onAccept,
  description,
}) => {
  const {t} = useTranslation();

  return (
    <Modal onBackDropPress={onCancel} isVisible={isVisible}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.text}>
            <Text>{title}</Text>
            <Text style={styles.otpLabel}>{description}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '40%', marginRight: 10}}>
              <ButtonComponent
                width="100%"
                title={t(LangKeys.Cancel)}
                onPress={onCancel}
                backgroundColor={Colors.white}
                borderColor={Colors.gray}
                color={Colors.gray}
              />
            </View>
            <View style={{width: '40%'}}>
              <ButtonComponent
                width="100%"
                title={t(LangKeys.Confirm)}
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

export default ConfirmationModal;
