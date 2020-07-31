/**
 * A screen displaying basic contact info for the clinic
 * ROUTE NAME: Contact
 */
//The components used from React Native to create the app.
import React from "react"
import {View, ScrollView, Image, StyleSheet, Text, Button} from "react-native"
//This package allows us to access external links.
import * as Linking from "expo-linking"
//This package allows us to translate our text using react-i18n.
import {useTranslation} from "react-i18next"

// DATA contains an array of objects, with each object corresponding to a button
// following the main content. Each button consists of a title and external url to redirect to.
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
/**
 * We create the ContactScreen as a ScrollView containing the Fourth Medical Group Header,
 * a button redirecting users back to the previous screen, pieces of text (with translated text being wrapped in the t function),
 * and a function that converts our DATA array into a series of buttons.
 */
export default function ContactScreen({navigation}) {
    const {t} = useTranslation();
    return ( 
        <ScrollView styles = {styles.container}>
            <Image style = {styles.image} source = {require("../../assets/4MTHeader.png")}/>

            <Button
                title = "Go Back Home"
                onPress = {() => navigation.navigate("Home")}
            />

            <Text style = {[styles.text, {fontWeight: "bold"}]}>{t("Main Clinic")}</Text>
            <Text style = {styles.text}>
                2803 Medical Campus Drive {"\n"}
                Seymour Johnson AFB, NC, 27531 {"\n"}
                {t("Hours of Operation")} {"\n"}
                {t("Monday through Friday")} {"\n"}
                7:30am to 4:30pm {"\n"}
            </Text>

            <Text style = {[styles.text, {fontWeight: "bold"}]}>{t("Dental Clinic")}</Text>
            <Text style = {styles.text}>
                1055 Jabara Avenue {"\n"}
                Goldsboro, NC, 27531 {"\n"}
                {t("Hours of Operation")} {"\n"}
                {t("Monday through Friday")} {"\n"}
                7:15am to 4:30pm {"\n"}
            </Text>

            <Text style = {styles.text}>
                {t("The clinic is closed weekends and federal holidays.")} {"\n"}
                {t("Open with limited services during training days.")} {"\n"}
                {t("Please check the calendar for a list of training days.")} {"\n"}
            </Text>

            <Text style = {styles.text}>
                {t("For more information, you can call our individual services below.")}
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