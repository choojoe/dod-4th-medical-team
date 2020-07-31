/**
 * TBC
 * ROUTE NAME: Settings
 */
import React from "react"
import { Button } from "react-native"
import {View, Text, Linking} from "react-native"
import i18n from "i18next";

export default function SettingsScreen({navigation}) {
    const [language, setLanguage] = React.useState("en")
    return (
        <View>
            <Button
                title = "Go Back Home"
                onPress = {() => navigation.navigate("Home")}
            />
            <Button
                title = "Settings"
                onPress={() => {
                    Linking.openSettings();
            }}
            />
            <Button
                title = { "Translate to " + (language === "es" ? "Spanish" : "English") }
                onPress={() => {
                    i18n.changeLanguage("es")

            }}
            />
        </View>
    );
}