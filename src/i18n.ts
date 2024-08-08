import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './locales/en.json';
import tr from './locales/tr.json';
import store from './store';

const resources = {
  en: {
    translation: en
  },
  tr: {
    translation: tr
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') ?? 'en',
    interpolation: {
      escapeValue: false
    }
  });

store.subscribe(() => {
  const state = store.getState();
  i18n.changeLanguage(state.language.language);
});

export default i18n;
