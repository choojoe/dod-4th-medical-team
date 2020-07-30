/**
 * TBC
 * ROUTE NAME: Settings
 */
import React from "react"
import { Button } from "react-native"
import {View, Text, Linking} from "react-native"
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';

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
                title = { "Translate to " + (language === "es" ? "Spanish" : "English") }
                onPress={() => {
                    TranslatorConfiguration.setConfig(ProviderTypes.Google, 'OurGoogleAPI', language === "es" ? "en" : "es" , language);
                    setLanguage( language === "es" ? "en" : "es" )

            }}
            />
        </View>
    );
}