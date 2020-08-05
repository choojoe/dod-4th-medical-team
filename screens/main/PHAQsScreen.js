/**
 * Displays the PHAQs. Allows a user to download a file as a PDF onto their device
 * and send a completed PDF as an email.
 */
//default imports
import React, {useState} from "react"
import {View, Button, StyleSheet, Text} from "react-native"

//allow us to configure i18n.
import {useTranslation} from "react-i18next"

// Packages required to download the PDF
import {Asset} from "expo-asset"

// Packages required to upload the PDF
import * as MailComposer from "expo-mail-composer";
import * as DocumentPicker from "expo-document-picker"


export default function PHAQsScreen({navigation}) {
    //We set two variables: status (what the user sees upon each output) and file (details about the file that users uploaded)
    //setStatus and setFile are the functions used to change our variables' values, respectively.
    const [status, setStatus] = useState("")
    const [file, setFile] = useState(undefined)

    //enables us to use local translations
    const {t} = useTranslation();

    //WARNING: THIS CODE REQUIRES USE OF NATIVE PACKAGE REACT-NATIVE-FS. IT CANNOT
    //BE TESTED ON EXPO SINCE IT IS A NATIVE PACKAGE. Rough code is provided, but
    // we cannot guarantee that it will work properly.
    //https://www.npmjs.com/package/react-native-fs
    const downloadPDF = async () => {
        const RNFS = require("react-native-fs") //store the React Native FS variable here.
        const PHAQsURI = Asset.fromModule(require('../../assets/PHAQ.pdf')).uri; //use the Asset library to get the uri of our PHAQ file stored on our directory
        RNFS.downloadFile({ //download the file
            fromUrl: PHAQsURI, //download from our PHAQs file above
            toFile: `${RNFS.DocumentDirectoryPath}/PHAQ.pdf`, //save it onto our local path
          }).then((r) => {
            setStatus("File downloaded! Check your documents folder!") //upon success, display success message!
        });
    }

    const uploadPDF = async () => {
        //wait for the user to choose a file. Must be a pdf.
        //https://docs.expo.io/versions/latest/sdk/document-picker/
        const pdf = await DocumentPicker.getDocumentAsync({
            type: "application/pdf", //specify type pdf
            copyToCacheDirectory: true, //we save a local version of the file in the cache.
        })
        if (!pdf){
            setStatus("You didn't submit a file!")
            return ;
        }
        setStatus("Uploaded "+ pdf.name) //if a pdf was submitted, then display a success message containing the name of the file
        setFile(pdf) //save the file details using setFile.
    }

    const sendEmail = async () => {
        //send an email using the file stored from uploadPDF
        // see https://docs.expo.io/versions/latest/sdk/mail-composer/
        MailComposer.composeAsync({
            recipients: ["Johnmarth.D.Perez.mil@mail.mil"],
            subject: "PHAQ Submission",
            body: "Sent from the 4th Medical Group Mobile App.",
            attachments: [file.uri]
        })
    }
    //Return a list of three buttons: to download PHAQs, to upload PHAQs, and to
    //send PHAQs by email. Note that the send feature is disabled if there is no active file.
    // Download PHAQs is disabled right now due to lack of testing.
    return (
        <View style = {styles.container}>
            <Button 
                title = {t("Download PHAQs")}
                disabled = {true}
                onPress = {() => {downloadPDF()}}
            />
            <Button 
                title = {t("Upload PHAQs")}
                onPress = {() => {uploadPDF()}}
            />
            <Button 
                title = {t("Send PHAQs")}
                disabled = {!file}
                onPress = {() => {sendEmail()}}
            />
            <Text>{status}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //tells view to take as much space as possible
        justifyContent: "center" //ensures items are vertically centered
    },
})