import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../common';
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import lang from '../common/languages/lang';

const ModalResult = ({modalVisible, setModalVisible, result}) => {
  const navigation = useNavigation();
  const goToHome = () => {
    setModalVisible(!modalVisible);
    navigation.goBack();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{t(lang.QuizResult)}</Text>
          <Text
            style={
              result?.status === 'Fail' ? styles.failText : styles.passText
            }>
            {result?.status === 'Fail'
              ? t(lang.Sorry)
              : t(lang.Congratulations)}
          </Text>
          <View style={{alignSelf: 'center'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.marksText}>{t(lang.ObtainedMarks)}: </Text>
              <Text style={styles.marksText}>{result?.obtainedMarks}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 20,
                justifyContent: 'space-between',
              }}>
              <Text style={styles.marksText}>{t(lang.TotalMarks)}: </Text>
              <Text style={styles.marksText}>{result?.totalMarks}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={goToHome}>
            <Text style={styles.textStyle}>{t(lang.BackHome)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalResult;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "backgroundColor: 'rgba(0, 0, 0, 0.4)'",
  },
  modalView: {
    margin: 20,
    padding: 15,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 7,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  buttonOpen: {
    backgroundColor: Colors.buttonColor,
  },
  buttonClose: {
    backgroundColor: Colors.buttonColor,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.gray,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 0.7,
    alignSelf: 'center',
  },
  marksText: {
    marginBottom: 5,
    fontSize: 17,
    fontWeight: '500',
    color: Colors.gray,
  },
  failText: {
    backgroundColor: '#ea54551f',
    color: '#ea5455',
    alignSelf: 'center',
    marginBottom: 15,
    paddingHorizontal: 8,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
    borderRadius: 100,
  },
  passText: {
    backgroundColor: '#28c76f1f',
    color: '#28c76f',
    marginBottom: 15,
    alignSelf: 'center',
    paddingHorizontal: 8,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
    borderRadius: 100,
  },
});
