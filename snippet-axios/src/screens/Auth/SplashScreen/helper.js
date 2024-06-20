import {Routes} from '../../../common';
import {config, CPNetwork, Urls} from '../../../config';
import {getToken} from '../../../utils/storage';

const navigateNext = async (navigation, logIn, saveUser) => {
  setTimeout(async () => {
    const token = await getToken();

    if (token) {
      const user = await GetUser();
      saveUser(user);
      return logIn(token);
    }

    navigation.navigate(Routes.WelcomeScreen);
  }, 3000);
};

const GetUser = async () => {
  const response = await CPNetwork.get(Urls.GetUser);

  if (!response.ok) {
    return {};
  }
  return response.data.user;
};

export default navigateNext;
