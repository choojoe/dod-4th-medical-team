/**
 * This file allows us to implement multilanguage functionality.
 * React i18n allows us to provide local translations depending on the language, which we use throughout our app.
 * NOTE THAT THE TRANSLATIONS MUST MATCH WORD FOR WORD! IF YOU CHANGE A PIECE OF TEXT IN-APP, YOU SHOULD CHANGE ITS TRANSLATION HERE.
 * https://react.i18next.com/guides/quick-start
 * 
 * Note that in any functional component (if it says export default function ScreenName()), you can use i18n translations by:
 * import {useTranslation} from "react-i18next"
 * export default function exampleFunction(){
 *  const {t} = useTranslation()
 *  return (
 *    <View>
 *      <Text>{t("This is a test!")}</Text>
 *    </View>
 *  )
 * }
 */

 //imports allow us to use packages
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

//we import our translation files from locales
import en from "./locales/en.json"
import es from "./locales/es.json"

/**
 * These resources represent our translations.
 */
const resources = {
    //english translations. translations are grouped together by screen.
    //We create a key-value pair between each string to be translated and it's actual translation.
    //Note that for english translations, we should be mapping english to english, i.e, each key should match its value.
    en: {
        translation: en
    },
    //spanish translations. same deal as above, but we map english string to spanish translation.
    es: {
        translation: es
    }
}

//run this command to configure out i18n object
i18n
  .use(initReactI18next) //this line initializes our i18n object for react.
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources : resources, //we use the resources loaded in variable resources
    fallbackLng: 'en', //by default, we use english in case if things don't load
    lng: "en", //we use english by default
    supportedLngs: ["en", "es"], //we siwtch between english and spanish (represented by their ISO codes)
    debug: true, //debug mode activated for now.

    keySeparator: false, // configures code to work with flat json files above

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
        useSuspense: false // prevents errors from showing up by default
    }
  });


export default i18n; //send the function back!