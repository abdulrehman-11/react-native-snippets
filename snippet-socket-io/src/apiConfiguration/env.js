import {create} from 'apisauce';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = process.env.BASEURL;
const client = create({
  baseURL: 'https://www.backend.rooftechnologypartners.com/api/',
});

export const config = async () => {
  const token = await AsyncStorage.getItem(process.env.TOKEN_KEY);

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  };
};
export const authConfig = async token => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  };
};

export default client;
