import React from "react"
import { Button, Text, View, StyleSheet, Alert } from "react-native" //StatusBar, Linking, TextInput, Platform
import * as WebBrowser from "expo-web-browser"
//import InAppBrowser from "react-native-inappbrowser-reborn"
//import * as Linking from "expo-linking"
import CustomLinkButton from "../../components/CustomLinkButton"
/**
 * Redirects users to two different websites via the WebBrowser component. 
 * Gave up on InAppBrowser-Reborn, not expo compatible. Might bring it back later.
 * ROUTE NAME: Portal
 */ 
export default class PortalScreen extends React.Component {
    render(){
        return (
            <View style = {styles.container}>
                <CustomLinkButton
                    title = "MyPatientPortal"
                    icon = "clinic-medical"
                    backgroundColor = "#5B2A86"
                    onPress = {() => WebBrowser.openBrowserAsync("https://sso.tricareonline.com/amserver/RUI/?realm=/tricareonline&appname=TOL")}
                />
                <CustomLinkButton 
                    title = "SecureMessaging"
                    icon = "envelope"
                    backgroundColor = "#87B6A7"
                    onPress = {() => WebBrowser.openBrowserAsync("https://communicator.demo.clinical.changehealthcare.com/")}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flexDirection: "row",
    }
})