import {useContext} from 'react';
import {storeToken, removeToken, removeUser} from '../utils/storage';
import {AuthContext} from '../context';
import useMembers from './useMembers';

const useAuth = () => {
  const {token, setToken} = useContext(AuthContext);
  const {setMembers} = useMembers();

  const logIn = async authToken => {
    await storeToken(authToken);
    setToken(authToken);
  };

  const logOut = async () => {
    setToken(null);
    setMembers([]);
    await removeToken();
    await removeUser();
  };
  return {token, logOut, logIn};
};

export default useAuth;
