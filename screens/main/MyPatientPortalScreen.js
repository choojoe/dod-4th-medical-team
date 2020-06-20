import React from "react"
import { WebView } from "react-native-webview"
export default function MyPatientPortalScreen() {
    return (
        <WebView 
            source = {{uri: "https://sso.tricareonline.com/amserver/RUI/?realm=/tricareonline&appname=TOL"}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            scalesPageToFit={true}
        />
    )
}