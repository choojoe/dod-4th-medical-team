/**
 * This file helps us configure multilanguage functionality.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


//These two packages are not being used in our project, but you can use them if you choose to implement more languages.
//see https://react.i18next.com/latest/using-with-hooks for full code
//import Backend from 'i18next-http-backend';
//import LanguageDetector from 'i18next-browser-languagedetector';

/** 
 * Translations. Stored here for now. To be moved to locales later
 * TODO: Move these to locales
 * TODO: Create translations
 * TODO: Create multiple namespaces
 */
const resources = {
    en: {
        /**
         * English keys should match english values
         */
        translation: {
            "Classes" : "Classes",
            "Directory" : "Directory",
            "Map" : "Map",
            "News" : "News",
            "Online Center" : "Online Center",
            "MyPatientPortal" : "MyPatientPortal",
            "SecureMessaging" : "SecureMessaging",

            "Home" : "Home",
            "Settings" : "Settings",
            "FAQs" : "FAQs",
            "Contact Us" : "Contact Us",
            "Night Mode": "Night Mode"

        }
    },
    es: {
        translation: {
            "Classes": "Clases",
            "Directory": "Directorio",
            "Map": "Mapa",
            "News": "Noticias",
            "Online Center" : "Centro en línea",
            "MyPatientPortal": "Portal de pacientes",
            "SecureMessaging": "Mensajería segura",

            "Home": "Hogar",
            "Settings" : "Ajustes",
            "FAQs" : "Preguntas frecuentes",
            "Contact Us" : "Contacta con nosotros",
            "Night Mode" : "Modo nocturno"
        }
    }
}

i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en',
    lng: "en",
    supportedLngs: ["en", "es"],
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
        useSuspense: false
    }
  });


export default i18n;