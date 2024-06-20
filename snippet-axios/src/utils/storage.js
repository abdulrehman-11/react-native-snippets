import AsyncStorage from "@react-native-async-storage/async-storage";

const TokenKey = "ClubPassport_token";
const UserKey = "ClubPassport_user";

const storeToken = async (token, user) => {
  try {
    await AsyncStorage.setItem(TokenKey, token);
  } catch (error) {
    console.log("Error saving token.");
  }
};

const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TokenKey);
  } catch (error) {
    console.log("Error getting the token");
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TokenKey);
  } catch (error) {
    console.log("Error deleting the token");
  }
};

//User
const storeUser = async (user) => {
  try {
    await removeUser();
    await AsyncStorage.setItem(UserKey, user);
  } catch (error) {
    console.log("Error saving user.");
  }
};

const getUser = async () => {
  try {
    return await AsyncStorage.getItem(UserKey);
  } catch (error) {
    console.log("Error getting the user");
  }
};

const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(UserKey);
  } catch (error) {
    console.log("Error deleting the user");
  }
};

export { storeToken, getToken, removeToken, storeUser, removeUser, getUser };
