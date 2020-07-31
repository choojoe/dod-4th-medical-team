import React from "react"
import { WebView } from "react-native-webview"
export default function SecureMessagingScreen() {
    return (
        <WebView 
            source = {{uri: "https://communicator.demo.clinical.changehealthcare.com/"}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            scalesPageToFit={true}
            androidHardwareAccelerationDisabled = {true} //no idea if this will work lol
        />
    )
}