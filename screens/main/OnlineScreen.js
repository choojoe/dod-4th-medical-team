import React from "react"
import { Button, Text, View, StyleSheet, Alert } from "react-native" //StatusBar, Linking, TextInput, Platform
//import InAppBrowser from "react-native-inappbrowser-reborn"
//import * as Linking from "expo-linking"
import CustomRouteButton from "../../components/CustomRouteButton"
/**
 * Redirects users to two different websites via the WebBrowser component. 
 * Gave up on InAppBrowser-Reborn, not expo compatible. Might bring it back later.
 * ROUTE NAME: Portal
 */ 

 //navigation
export default function OnlineScreen({navigation}) {
    return (
        <View style = {styles.container}>
            <CustomRouteButton
                title = "MyPatientPortal"
                route = "MyPatientPortal"
                icon = "clinic-medical"
                backgroundColor = "#5B2A86"
                navigation = {navigation}
            />
            <CustomRouteButton 
                title = "SecureMessaging"
                route = "SecureMessaging"
                icon = "envelope"
                backgroundColor = "#87B6A7"
                navigation = {navigation}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flexDirection: "row",
    }
})