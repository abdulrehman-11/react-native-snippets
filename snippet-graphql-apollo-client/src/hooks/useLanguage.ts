import {useContext} from 'react';
import i18n from 'i18next';

import {storeLanguage} from '../utils/storage';
import {LanguageContext} from '../context';

const useLanguage = () => {
  const {language, setLanguage} = useContext(LanguageContext);

  const saveLanguage = (str: string) => {
    i18n.changeLanguage(str);
    setLanguage(str);
    storeLanguage(str);
  };

  return {language, saveLanguage};
};

export default useLanguage;
