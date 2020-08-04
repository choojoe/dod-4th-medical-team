/**
 * Displays the PHAQs. Allows a user to download a file as a PDF onto their device
 * and send a completed PDF as an email.
 */
//default imports
import React, {useState} from "react"
import {View, Button, StyleSheet, Text} from "react-native"

//allow us to configure i18n.
import {useTranslation} from "react-i18next"

//allows us to extract URI from local file
import {Asset} from "expo-asset";
import * as FileSystem from 'expo-file-system';
import * as MailComposer from "expo-mail-composer";
import * as DocumentPicker from "expo-document-picker"


export default function PHAQsScreen({navigation}) {
    const [status, setStatus] = useState("")
    const [file, setFile] = useState(undefined)

    const {t} = useTranslation();

    const downloadPDF = async () => {
        
    }

    const uploadPDF = async () => {
        const pdf = await DocumentPicker.getDocumentAsync({
            type: "application/pdf",
            copyToCacheDirectory: true,
        })
        if (!pdf){
            setStatus("You didn't submit a file!")
            return ;
        }
        console.log(pdf)
        setStatus("Uploaded "+ pdf.name)
        setFile(pdf)
    }

    const sendEmail = async () => {
        MailComposer.composeAsync({
            recipients: ["Johnmarth.D.Perez.mil@mail.mil"],
            subject: "PHAQ Submission",
            body: "Sent from the 4th Medical Group Mobile App.",
            attachments: [file.uri]
        })
    }
    return (
        <View style = {styles.container}>
            <Button 
                title = {"Download PHAQs"}
                onPress = {() => downloadPDF()}
            />
            <Button 
                title = {"Upload PHAQs"}
                onPress = {() => {uploadPDF()}}
            />
            <Button 
                title = {"Send PHAQs"}
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