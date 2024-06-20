import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {showErrorMessage} from './toastMessages';
import {ApiCall, ApiRoutes, config} from '../apiConfiguration';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken();
  }
};

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      try {
        subscribeNotifications(fcmToken);
      } catch (error) {
        showErrorMessage(error?.message);
      }
    }
  }
};
const subscribeNotifications = async fcmToken => {
  const response = await ApiCall.post(
    ApiRoutes.subscribeNotification,
    JSON.stringify({token: fcmToken}),
    (
      await config()
    ).headers,
  );
  if (!response.ok) {
    return showErrorMessage(response?.data.error);
  }
  await AsyncStorage.setItem('fcmToken', fcmToken);
};
export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification caused app to open from background state:', {
      remoteMessage,
    });
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', {
          remoteMessage,
        });
      }
    });
};
