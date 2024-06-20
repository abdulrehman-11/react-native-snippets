import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

import {Colors} from '../../common';
import {Button} from '../Buttons';
import {Text} from '../index';

const TranlationLanguagesModal = ({
  visible,
  setVisible,
  onAccept,
  currentLanguage,
  languages = [],
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const Language = ({onPress, language}) => {
    return (
      <TouchableOpacity
        style={{
          padding: 16,
          borderColor: Colors.darkBlue,
          borderWidth: selectedLanguage === language.value ? 1 : 0,
          borderRadius: 10,
        }}
        onPress={onPress}>
        <Text>{language.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal isVisible={visible} onBackdropPress={() => setVisible(false)}>
      <View style={styles.logOutContainer}>
        <Text style={styles.warnText}>Select the translation language</Text>

        <View style={{marginVertical: 10}}>
          {languages.map(language => {
            return (
              <Language
                language={language}
                onPress={() => setSelectedLanguage(language.value)}
              />
            );
          })}
        </View>

        <View style={styles.btnRow}>
          <Button
            title="Done"
            style={styles.btnStyle}
            textStyle={styles.txtStyles}
            onPress={() => {
              setVisible(false);
              onAccept(selectedLanguage);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: Colors.darkBlue,
    width: '40%',
    height: 50,
  },

  txtStyles: {
    color: Colors.WHITE,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  warnText: {
    textAlign: 'center',
  },

  logOutContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});

export default TranlationLanguagesModal;
