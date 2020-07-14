/**
 * TBC
 * ROUTE NAME: Settings
 */
import React from "react"
import { Button } from "react-native"
import {View, Text, Linking} from "react-native"
import {ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
function test() {
    const translator = TranslatorFactory.createTranslator();
    translator.translate('Engineering physics or engineering science').then(translated => {
        console.log(translated)
    })
}

export default function SettingsScreen() {
    const [language, setLanguage] = React.useState("en")
    return (
        <View>
            <Button
                title = "Settings"
                onPress={() => {
                    Linking.openSettings();
            }}
            />
            <Button
                title = { "Translate to " + (language === "en" ? "Spanish" : "English") }
                onPress={() => {
                    TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyB8Wozd7rLfU-EMOfI98rg9XenVzwZkhbA', language === "es" ? "en" : "es" , language);
                    setLanguage( language === "es" ? "en" : "es" )
            }}
            />
            <Button 
                title = "Test function"
                onPress = {() => {test()}}
            />

        </View>
    );
}