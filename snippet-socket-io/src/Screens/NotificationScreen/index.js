import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {Colors} from '../../common';
import Header from '../../components/HeaderComponents/Header';
import {useTranslation} from 'react-i18next';
import lang from '../../common/languages/lang';
import {ApiCall, ApiRoutes, config} from '../../apiConfiguration';
import {showErrorMessage} from '../../utils/toastMessages';
import {useAuth, useLoader, useNotify} from '../../hooks';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Screen} from '../../components';

import styles from './styles';

const NotificationScreen = () => {
  const {t} = useTranslation();
  const {setLoading, loading} = useLoader();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const {Logout} = useAuth();
  const {notification, setNotification} = useNotify();

  useEffect(() => {
    getNotifications();
  }, [isFocused]);
  const getNotifications = async () => {
    setLoading(true);
    const response = await ApiCall.get(
      ApiRoutes.getNotifications,
      (
        await config()
      ).headers,
    );

    if (!response.ok) {
      showErrorMessage(response?.data.error);
      setLoading(false);
      if (response.status == 401) {
        Logout();
      }
      return;
    }
    setNotification(response?.data.notifications);
    setLoading(false);
  };

  const clearNotifications = async () => {
    setLoading(true);
    const response = await ApiCall.delete(
      ApiRoutes.clearNotifications,
      {},
      (
        await config()
      ).headers,
    );
    if (!response.ok) {
      showErrorMessage(response?.data.error);
      setLoading(false);
      if (response.status == 401) {
        Logout();
      }
      return;
    }
    getNotifications();
  };

  const readNotifictaion = async item => {
    if (!item?.isRead) {
      const response = await ApiCall.put(
        ApiRoutes.readNotifictaion(item?._id),
        {},
        (
          await config()
        ).headers,
      );
      if (!response.ok) {
        showErrorMessage(response?.data.error);
        if (response.status == 401) {
          Logout();
        }
        return;
      }
    }
    if (item?.training) {
      navigation.navigate('TrainingDetails', {id: item?.training});
    } else navigation.navigate('MyCertificates');
  };

  return (
    <Screen>
      <Header />
      <Text style={styles.heading}>{t(lang.Notifications)}</Text>
      {notification.length === 0 && !loading ? (
        <Text style={styles.noNotifications}>{t(lang.NoNotifications)}</Text>
      ) : null}
      <FlatList
        data={notification}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.cardNotification}
              onPress={() => readNotifictaion(item)}>
              <View style={styles.notificationHeadingContainer}>
                {!item?.isRead ? (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: Colors.buttonColor,
                    }}
                  />
                ) : null}
                <Text style={item?.isRead ? styles.text : styles.unReadText}>
                  {item?.title}
                </Text>
              </View>
              <Text style={styles.description}>{item?.body}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        disabled={notification.length === 0}
        style={
          notification.length === 0
            ? {...styles.signInBtn, backgroundColor: Colors.gray}
            : styles.signInBtn
        }
        onPress={clearNotifications}>
        <Text style={styles.signInText}>{t(lang.ClearNotifications)} </Text>
      </TouchableOpacity>
    </Screen>
  );
};

export default NotificationScreen;
