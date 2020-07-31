/**
 * This website displays the ChangeHealthCare website using an in-app-browser.
 * Documentation available below:
 * https://github.com/react-native-community/react-native-webview/
 * https://github.com/react-native-community/react-native-webview/blob/master/docs/Reference.md [use this to figure out which properties you want to modify below]
 * 
 * ROUTE: SecureMessaging
 */
import React from "react"
import { WebView } from "react-native-webview" //the main component we'll be using
export default function SecureMessagingScreen() {
    return (
        <WebView 
            source = {{uri: "https://communicator.demo.clinical.changehealthcare.com/"}}
            javaScriptEnabled={true} //enables JavaScript
            domStorageEnabled={true} //used only in android
            startInLoadingState={true} //set to true so we can get loading pinwheel
            scalesPageToFit={true} //ensures window fits in-app
            androidHardwareAccelerationDisabled = {true} //helps load up the app on android.
        />
    )
}