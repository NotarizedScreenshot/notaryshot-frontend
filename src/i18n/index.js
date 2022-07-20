import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.js';

const i18nConfig = {
  resources: {
    en,
  },
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
};

i18n.use(initReactI18next).init(i18nConfig);
