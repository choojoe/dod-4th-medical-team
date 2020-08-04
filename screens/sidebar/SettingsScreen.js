/**
 * This screen holds all the different settings for our app.
 * Currently, the only setting available is our ability to toggle multilanguage capabilities.
 * ROUTE NAME: Settings
 */
//default imports needed to construct the screen
import React from "react"
import {Button, View, StyleSheet} from "react-native"

//allow us to configure the power translator - service that allows us to translate text with google translate.
import {PowerTranslator, TranslatorFactory, ProviderTypes, TranslatorConfiguration} from "react-native-power-translator"
//allow us to configure i18n.
import i18n from "i18next";
import {useTranslation} from "react-i18next"
// delete this.
const GOOGLE_KEY_API_TO_BE_DELETED = "AIzaSyAHX61bmDFYT3zxGPgJrYGb2FuB8E0_zAM"

export default function SettingsScreen({navigation}) {
    const {t} = useTranslation() //allows us to translate text on this page using react-i18next.

    const [language, setLanguage] = React.useState("en") //This is an alternative way of configuring state.
    // instead of defining a class component, we can use state in a functional component
    // by using useState - the above hook creates a variable language
    // and a function setLanguage, which allows us to change the value of the language.
    // Currently, only languages English (es) and Spanish (en) are supported.

    //we define the languagePrompt here - this is what the user will see on the "translate to" button
    //upon clicking on the app. We change the content of the prompt depending on what the language is.
    //If you have multiple languages in the future, it would make sense to convert this 
    //functionality into a dropdown menu with multiple languages.
    //https://github.com/react-native-community/react-native-picker for the above.
    let languagePrompt = ""
    if (language === "en"){ //If language is English, offer translate feature English -> Spanish
        languagePrompt = "Translate to Spanish"
    }
    else { //Otherwise, offer translate feature Spanish -> English
        languagePrompt = "Traducir al ingles"
    }

    //We configure the power translator (google cloud translate) to take in a Google API Key to target language.
    TranslatorConfiguration.setConfig(ProviderTypes.Google, GOOGLE_KEY_API_TO_BE_DELETED, language) 

    //We return a centered view with two buttons, one redirecting users back home
    //and the other configuring both our PowerTranslator and our i18n translator.
    return (
        <View style = {styles.container}>
            <Button
                title = {t("Go Back Home")}
                onPress = {() => navigation.navigate("Home")}
            />
            <Button
                title = {languagePrompt}
                onPress={() => {
                    //if the language is equal to Spanish, then do the following
                    if (language === "es"){
                        i18n.changeLanguage("en") //change the language being used locally (via i18n) to en (the ISO code for English)
                        //TranslatorConfiguration.setConfig(ProviderTypes.Google, GOOGLE_KEY_API_TO_BE_DELETED, "en") 
                        //configure the power translator (google cloud translate) to take in a Google API Key to target language English
                        setLanguage("en") //Change our state variable to en so our button switches between the two prompts.
                    }
                    //otherwise, assume the language is equal to English
                    else{
                        i18n.changeLanguage("es")
                        //TranslatorConfiguration.setConfig(ProviderTypes.Google, GOOGLE_KEY_API_TO_BE_DELETED, "es")
                        setLanguage("es")
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //tells view to take as much space as possible
        justifyContent: "center" //ensures items are vertically centered
    }
})