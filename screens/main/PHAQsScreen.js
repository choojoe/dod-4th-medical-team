/**
 * Displays the PHAQs. Allows a user to download a file as a PDF onto their device
 * and send a completed PDF as an email.
 */
//default imports
import React, {useState} from "react"
import {View, Button, StyleSheet} from "react-native"

//allow us to configure i18n.
import {useTranslation} from "react-i18next"

//allows us to download files
//might want to use example with AsyncStorage in the future to support 
//file uploading and downloading across app restarts. We used a brief implementation
//https://docs.expo.io/versions/latest/sdk/filesystem/
import * as FileSystem from "expo-file-system"

//allows us to compose emails
//https://docs.expo.io/versions/v38.0.0/sdk/mail-composer/
//Note that this module does not work on iOS simulators.

import * as Linking from "expo-linking"


export default function PHAQsScreen({navigation}) {
    const {t} = useTranslation();
    const [downloadProgress, setDownloadProgress] = useState(0);

    const callback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        setDownloadProgress(progress);
    };

    const downloadResumable = FileSystem.createDownloadResumable(
        "http://techslides.com/demos/sample-videos/small.mp4",
        FileSystem.documentDirectory + 'small.mp4',
        {},
        callback
    );

    const downloadFunction = async function () {
        console.log("STARTING")
        try {
            const {uri} = await downloadResumable.downloadAsync();
            console.log("Finished downloading to ", uri);
        }
        catch(e){
            console.error(e)
        }
    }

    const uploadFunction = async function () {
        console.log("UPLOADING")
    }
      
    return (
        <View style = {styles.container}>
            <Button
                title = {t("Go Back Home")}
                onPress = {() => navigation.navigate("Home")}
            />
            <Button
                title = {"View PHAQs"}
                onPress = {() => {console.log(require("../../assets/4MTEmblem.png"))}}
            />
            <Button
                title = {t("Download PHAQs")}
                onPress = {downloadFunction}
            />
            <Button
                title = {t("Upload PHAQs")}
                onPress = {uploadFunction}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //tells view to take as much space as possible
        justifyContent: "center" //ensures items are vertically centered
    },
})