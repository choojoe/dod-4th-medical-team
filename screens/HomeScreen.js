/**
 * Home Screen - the screen that loads up on default.
 * ROUTE NAME: Home.
 * This screen contains the main buttons we want our users to look at.
 * We create a 2 column grid to hold each of our main buttons, however, each row can hold as many buttons as you like.
 * For the buttonContainer container, you can use either View or ScrollView.
 */
import React from "react"
import { View, StyleSheet } from "react-native"
import { enableScreens } from "react-native-screens"
enableScreens();
// See CustomButton.js for more details on the styling of the button
import CustomHomeButton from "../components/CustomHomeButton"

/**
 * DATA contains the routes and titles of the buttons, 
 * which are converted into buttons via the CustomButton function.
 * route: the appropriate route as defined in App.js for navigator to use
 * title: the caption underneath each icon
 * icon: name of the icon, as detailed on fontawesome.com
 * backgroundColor: the background of the button
 */
const DATA = [
    {
        route: "COVID",
        title: "COVID-19",
        icon: "info",
        backgroundColor: "#5B2A86"
    },
    {
        route: "CallUs",
        title: "Call Us",
        icon: "phone",
        backgroundColor: "#7785AC"
    },
    {
        route: "Portal",
        title: "MyPatientPortal",
        icon: "globe",
        backgroundColor: "#9AC6C5"
    },
    {
        route: "Appts",
        title: "Appointments",
        icon: "calendar-check",
        backgroundColor: "#A5E6BA"
    },
    {
        route: "Map",
        title: "Map",
        icon: "map",
        backgroundColor: "#A32C2C"
    },
    {
        route: "Pharmacy",
        title: "Pharmacy",
        icon: "prescription-bottle",
        backgroundColor: "#5B2A86"
    },
    {
        route: "News",
        title: "News",
        icon: "newspaper",
        backgroundColor: "#7785AC"
    },
    {
        route: "Directory",
        title: "Directory",
        icon: "address-book",
        backgroundColor: "#9AC6C5"
    },
    {
        route: "Calendar",
        title: "Calendar",
        icon: "calendar-alt",
        backgroundColor: "#A5E6BA"
    },
    {
        route: "Classes",
        title: "Classes",
        icon: "notes-medical",
        backgroundColor: "#A32C2C"
    }
]

/**
 * HomeScreen puts custom buttons, taking in data from props, and outputs
 * them, two per row. You can add more rows by using <View style = {styles.row} />
 * and you can create a new button by modifying DATA and calling 
 * <CustomButton {...DATA[index]} navigation = {navigation}/>
 */
 import { Text, ScrollView } from "react-native"

export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View style = {styles.header}>
                <Text>INSERT NEWS HERE</Text>
            </View>
            <View style  = {styles.buttonContainer}>
            <ScrollView>
                <View style = {styles.row}>
                    <CustomHomeButton {...DATA[0]} navigation = {navigation}/>
                    <CustomHomeButton {...DATA[1]} navigation = {navigation}/>
                </View>
                <View style = {styles.row}>
                    <CustomHomeButton {...DATA[2]} navigation = {navigation}/>
                    <CustomHomeButton {...DATA[3]} navigation = {navigation}/>
                </View>
                <View style = {styles.row}>
                    <CustomHomeButton {...DATA[4]} navigation = {navigation}/>
                    <CustomHomeButton {...DATA[5]} navigation = {navigation}/>
                </View>
                <View style = {styles.row}>
                    <CustomHomeButton {...DATA[6]} navigation = {navigation}/>
                    <CustomHomeButton {...DATA[7]} navigation = {navigation}/>
                </View>
                <View style = {styles.row}>
                    <CustomHomeButton {...DATA[8]} navigation = {navigation}/>
                    <CustomHomeButton {...DATA[9]} navigation = {navigation}/>
                </View>
            </ScrollView>
            </View>
        </View>
    );
}

/**
 * Styles for this file. Recommended to leave these alone.
 * Change backgroundColor of container as needed.
 */
const styles = StyleSheet.create({
    header: {
        flex: 2,
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonContainer: {
        flex: 5,
        flexDirection: "column",
        //alignItems: "center",
        //justifyContent: "center"
        //above are useful for scrollview
    },
    row: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
    },
    container: {
        flex: 1,
        flexDirection: "column"
    }
})