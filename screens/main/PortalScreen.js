import React from "react"
import { Button, Text, View, StyleSheet, Alert } from "react-native" //StatusBar, Linking, TextInput, Platform
import * as WebBrowser from "expo-web-browser"
//import InAppBrowser from "react-native-inappbrowser-reborn"
//import * as Linking from "expo-linking"
/**
 * Redirects users to two different websites via the WebBrowser component. 
 * Gave up on InAppBrowser-Reborn, not expo compatible. Might bring it back later.
 * ROUTE NAME: Portal
 */ 
export default class PortalScreen extends React.Component {
    render(){
        return (
            <View style = {styles.container}>
                <Button
                    title = "MyPatientPortal"
                    onPress = {() => WebBrowser.openBrowserAsync("https://sso.tricareonline.com/amserver/RUI/?realm=/tricareonline&appname=TOL")}
                />
                <Button 
                    title = "SecureMessaging"
                    onPress = {() => WebBrowser.openBrowserAsync("https://communicator.demo.clinical.changehealthcare.com/")}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "space-between",
        justifyContent: "center",
    }
})