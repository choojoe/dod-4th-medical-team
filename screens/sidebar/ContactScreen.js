/**
 * TBC
 * ROUTE NAME: Contact
 */
import React from "react"
import {View, ScrollView, Image, StyleSheet, Text, Button} from "react-native"
import * as Linking from "expo-linking"
import {useTranslation} from "react-i18next"

//old base operator was 1-919-722-1212??? trusting website info on this one

const DATA = [
    {
        title: "Call Us",
        url: "tel:1-919-722-1802"
    },
    {
        title: "Base Operator",
        url: "tel:1-919-722-1110"
    },
    {
        title: "Security Forces",
        url: "tel:1-919-722-1212"
    },
    {
        title: "Medical Appointment Line",
        url: "tel:1-919-722-1802"
    },
    {
        title: "Voting Questions",
        url: "tel:1-919-722-3695"
    },
    {
        title: "Patient Advocate",
        url: "tel:1-919-722-0733"
    },
    {
        title: "4th MDG First Sgt",
        url: "tel:1-919-221-4065"
    }
]

export default function ContactScreen({navigation}) {
    const {t} = useTranslation();
    return ( //insert image down
        <ScrollView styles = {styles.container}>
            <Image style = {styles.image} source = {require("../../assets/4MTHeader.png")}/>

            <Button
                title = "Go Back Home"
                onPress = {() => navigation.navigate("Home")}
            />

            <Text style = {[styles.text, {fontWeight: "bold"}]}>Main Clinic</Text>
            <Text style = {styles.text}>
                2803 Medical Campus Drive {"\n"}
                Seymour Johnson AFB, NC, 27531 {"\n"}
                Hours of Operation {"\n"}
                Monday through Friday {"\n"}
                7:30am to 4:30pm {"\n"}
            </Text>

            <Text style = {[styles.text, {fontWeight: "bold"}]}>Dental Clinic</Text>
            <Text style = {styles.text}>
                1055 Jabara Avenue {"\n"}
                Goldsboro, NC, 27531 {"\n"}
                Hours of Operation {"\n"}
                Monday through Friday {"\n"}
                7:15am to 4:30pm {"\n"}
            </Text>

            <Text style = {styles.text}>
                The clinic is closed weekends and federal holidays. {"\n"}
                Open with limited services during training days. {"\n"}
                Please check the calendar for a list of training days. {"\n"}
            </Text>

            <Text style = {styles.text}>
                For more information, you can call our individual services below.
            </Text>

            {DATA.map(item => 
                <View style = {{paddingTop: 10}} key = {item.title+" contact"}>
                    <Button 
                        title = {t(item.title)}
                        onPress = {() => Linking.openURL(item.url)}
                    />
                </View>
            )}
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        alignItems: "center",
        textAlign: "center"
    },
    image: {
        flex: 1,
        width: null,
        height: 220,
        resizeMode: "contain"
    },
})