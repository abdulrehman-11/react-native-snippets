import AsyncStorage from "@react-native-async-storage/async-storage";
import type { User } from "../types";

const TokenKey = "CSS_token";
const UserKey = "CSS_user";
const LanguageKey = "CSS_language";

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TokenKey, token);
  } catch (error) {
    console.log("Error saving token.");
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TokenKey);
  } catch (error) {
    console.log("Error getting the token");
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TokenKey);
  } catch (error) {
    console.log("Error deleting the token");
  }
};

//User
export const storeUser = async (user: User) => {
  try {
    await removeUser();
    await AsyncStorage.setItem(UserKey, JSON.stringify(user));
  } catch (error) {
    console.log("Error saving user.");
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem(UserKey);
    if (user) return JSON.parse(user);
    return null;
  } catch (error) {
    console.log("Error getting the user");
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(UserKey);
  } catch (error) {
    console.log("Error deleting the user");
  }
};
//Favourites

export const storeLanguage = async (data: string) => {
  try {
    await AsyncStorage.setItem(LanguageKey, data);
  } catch (error) {
    console.log("Error saving language.");
  }
};

export const getLanguage = async () => {
  try {
    return await AsyncStorage.getItem(LanguageKey);
  } catch (error) {
    console.log("Error getting the language");
  }
};

export const removeLanguage = async () => {
  try {
    await AsyncStorage.removeItem(LanguageKey);
  } catch (error) {
    console.log("Error deleting the language");
  }
};
