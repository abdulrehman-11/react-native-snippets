import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {ApiCall, ApiRoutes, config} from '../apiConfiguration';
import {AuthContext} from '../context';
import {showErrorMessage} from '../utils/toastMessages';

export const useAuth = () => {
  const {token, setToken, setCurrentUser, currentUser} =
    useContext(AuthContext);

  const userLogin = data => {
    AsyncStorage.setItem(process.env.TOKEN_KEY, data.token);
    setToken(data.token);
    AsyncStorage.setItem(
      process.env.ROOFING_USER,
      JSON.stringify(data.loginEmployee),
    );
    setCurrentUser(data.loginEmployee);
  };

  const Logout = async () => {
    await AsyncStorage.removeItem(process.env.TOKEN_KEY);
    await AsyncStorage.removeItem(process.env.ROOFING_USER);
    await AsyncStorage.removeItem('fcmToken');
    setToken(null);
  };

  return {
    userLogin,
    Logout,
    token,
    currentUser,
  };
};

export default useAuth;
