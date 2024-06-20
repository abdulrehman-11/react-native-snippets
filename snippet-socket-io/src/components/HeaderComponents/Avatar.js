import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AD from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

import {Colors} from '../../common';
import lang from '../../common/languages/lang';
import {useAuth, useLoader} from '../../hooks';
import apiRoutes from '../../apiConfiguration/apiRoutes';
import {ApiCall, ApiRoutes, config} from '../../apiConfiguration';
import ConfirmationModal from '../ConfirmationModal';
import {showErrorMessage} from '../../utils/toastMessages';

const Avatar = ({toggle, setToggle, onPress}) => {
  const {t} = useTranslation();
  const {Logout} = useAuth();
  const {setLoading} = useLoader();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const removeToken = async () => {
    setLoading(true);
    const obj = {
      token: await AsyncStorage.getItem('fcmToken'),
    };

    await ApiCall.post(apiRoutes.employeeLogout, obj, (await config()).headers);

    setLoading(false);
  };

  Feather.loadFont();
  AD.loadFont();

  const toggleHandler = () => {
    if (toggle === 'account') {
      setToggle(null);
      return;
    }
    setToggle('account');
  };

  const handleDeleteAccount = async () => {
    const response = await ApiCall.delete(
      ApiRoutes.deleteAccount,
      {},
      (
        await config()
      ).headers,
    );

    console.log(response, 'response');
    if (!response.ok) {
      return showErrorMessage('Failed to delete account');
    }
    await removeToken();
    Logout();
  };

  return (
    <>
      <View style={styles.mainView}>
        <TouchableOpacity onPress={toggleHandler}>
          <Image
            style={styles.tinyLogo}
            source={require('../../Images/avatar.jpg')}
          />
          <View style={styles.activeContainer} />
        </TouchableOpacity>
        {toggle === 'account' ? (
          <View style={styles.openView}>
            <TouchableOpacity
              style={styles.languageContainer}
              onPress={onPress}>
              <Feather name="lock" color={Colors.gray} size={22} />
              <Text style={styles.text}>{t(lang.ChangePassword)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.languageContainer}
              onPress={() => setShowDeleteModal(true)}>
              <AD name="delete" color={Colors.gray} size={22} />
              <Text style={styles.text}>{t(lang.DeleteAccount)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.languageContainer}
              onPress={async () => {
                await removeToken();
                Logout();
              }}>
              <Feather name="power" color={Colors.gray} size={22} />
              <Text style={styles.text}>{t(lang.Logout)}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <ConfirmationModal
        title={t(lang.Warning)}
        description={t(lang.DeleteAccountMessage)}
        onCancel={() => setShowDeleteModal(false)}
        isVisible={showDeleteModal}
        onAccept={handleDeleteAccount}
      />
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginLeft: 5,
  },
  openView: {
    width: 200,
    position: 'absolute',
    top: 50,
    right: -9,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginVertical: 3,
  },
  text: {
    marginLeft: 10,
    color: Colors.black,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  activeContainer: {
    width: 10,
    height: 10,
    position: 'absolute',
    backgroundColor: Colors.activeColor,
    bottom: 0,
    right: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.white,
  },
});

export default Avatar;
