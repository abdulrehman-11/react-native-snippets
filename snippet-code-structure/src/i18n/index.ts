import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './translations/en.json';
import jp from './translations/jp.json';

i18n.use(initReactI18next).init({
  resources: {
    'en-US': {
      translation: en,
    },
    jp: {
      translation: jp,
    },
  },
  lng: 'jp',
  fallbackLng: 'jp',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
