import { useContext } from "react";

import { AuthContext } from "../context";
import {
  removeToken,
  storeToken,
  removeUser,
  storeUser,
  getUser,
} from "../utils/storage";
import { CSNetwork, Urls } from "../config";
import { User } from "../types";

const useAuth = () => {
  const { token, setToken, user, setUser } = useContext(AuthContext);

  const logout = async () => {
    await removeToken();
    await removeUser();
    setToken("");
    setUser(null);
  };

  const login = async (value: any) => {
    await storeToken(value.token);
    await storeUser(value.data);

    setToken(value.token);
    setUser(value.data);
  };

  const getUserDetails = async (token: string) => {
    const response: any = await CSNetwork.get(Urls.updateProfile);
    if (!response.ok) {
      return await getUser();
    }
    login({ token, data: response.data.data });
  };

  const updateUser = (user: User) => {
    setUser(user);
    storeUser(user);
  };

  return {
    user,
    token,
    login,
    logout,
    setUser,
    getUserDetails,
    updateUser,
  };
};

export default useAuth;
