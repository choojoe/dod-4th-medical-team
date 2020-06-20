/**
 * TBC
 * ROUTE NAME: Contact
 */
import React from "react"
import {View, Image, StyleSheet, Text, Button} from "react-native"
import * as Linking from "expo-linking"

export default function ContactScreen() {
    return ( //insert image down
        <View styles = {styles.container}>
            <Text style = {styles.text}>
                <Text style = {{fontWeight: "bold"}}>Main Clinic</Text>
                <Text>2803 Medical Campus Drive</Text>
                <Text>Seymour Johnson AFB, NC, 27531</Text>
                <Text>Hours of Operation</Text>
                <Text>Monday through Friday, 7:30am to 4:30pm</Text>
            </Text>
            <Text style = {styles.text}>
                <Text style = {{fontWeight: "bold"}}>Dental Clinic</Text>
                <Text>1055 Jabara Avenue</Text>
                <Text>Goldsboro, NC, 27534</Text>
                <Text>Hours of Operation</Text>
                <Text>Monday through Friday, 7:15am to 4:30pm</Text>
            </Text>
            <Text style = {styles.text}>
                The clinic is closed weekends and federal holidays.
            </Text>
            <Text style = {styles.text}>
                Open with limited services during training days.
            </Text>
            <Text style = {styles.text}>
                Please check the calendar for a list of training days.
            </Text>
            <Button
                title = "Call Us"
                onPress = {() => Linking.openURL("tel:1-919-722-1802")}
            />
            <Button
                title = "Base Operator"
                onPress = {() => Linking.openURL("tel:1-919-722-1212")}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        alignItems: "center"
    }
})