/**
 * Home Screen - the screen that loads up on default.
 * ROUTE NAME: Home.
 * This screen contains the main buttons we want our users to look at.
 * We create a 2 column grid to hold each of our main buttons, however, each row can hold as many buttons as you like.
 * If you want to include more buttons and treat this grid as a list, use a ScrollView instead of a View for the main container,
 * however, we discourage this for simplicity sake (keep the number of buttons low).
 */
import React from "react"
import { View, StyleSheet } from "react-native"
import { enableScreens } from "react-native-screens"
enableScreens();
// See CustomButton.js for more details on the styling of the button
import CustomButton from "../components/CustomButton"
import { NightModeContext } from "../NightModeContext";

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
        backgroundColor: "steelblue"
    },
    {
        route: "CallUs",
        title: "Call Us",
        icon: "phone",
        backgroundColor: "turquoise"
    },
    {
        route: "Portal",
        title: "MyPatientPortal",
        icon: "globe",
        backgroundColor: "turquoise"
    },
    {
        route: "Appts",
        title: "Appointments",
        icon: "calendar-check",
        backgroundColor: "steelblue"
    },
    {
        route: "Map",
        title: "Map",
        icon: "map",
        backgroundColor: "steelblue"
    },
    {
        route: "Pharmacy",
        title: "Pharmacy",
        icon: "prescription-bottle",
        backgroundColor: "turquoise"
    },
    {
        route: "News",
        title: "News",
        icon: "newspaper",
        backgroundColor: "turquoise"
    },
    {
        route: "Directory",
        title: "Directory",
        icon: "address-book",
        backgroundColor: "steelblue"
    },
    {
        route: "Calendar",
        title: "Calendar",
        icon: "calendar-alt",
        backgroundColor: "steelblue"
    },
    {
        route: "Classes",
        title: "Classes",
        icon: "notes-medical",
        backgroundColor: "turquoise"
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
    <NightModeContext.Consumer>
    {({nightModeOn}) => (
    <View style={[styles.container, {backgroundColor: nightModeOn ? "black" : "white"}]}>
        <View style = {styles.header}>
            <Text>INSERT NEWS HERE</Text>
        </View>
        <View style  = {styles.buttonContainer}>
        <ScrollView>
            <View style = {styles.row}>
                <CustomButton {...DATA[0]} navigation = {navigation}/>
                <CustomButton {...DATA[1]} navigation = {navigation}/>
            </View>
            <View style = {styles.row}>
                <CustomButton {...DATA[2]} navigation = {navigation}/>
                <CustomButton {...DATA[3]} navigation = {navigation}/>
            </View>
            <View style = {styles.row}>
                <CustomButton {...DATA[4]} navigation = {navigation}/>
                <CustomButton {...DATA[5]} navigation = {navigation}/>
            </View>
            <View style = {styles.row}>
                <CustomButton {...DATA[6]} navigation = {navigation}/>
                <CustomButton {...DATA[7]} navigation = {navigation}/>
            </View>
            <View style = {styles.row}>
                <CustomButton {...DATA[8]} navigation = {navigation}/>
                <CustomButton {...DATA[9]} navigation = {navigation}/>
            </View>
        </ScrollView>
        </View>
    </View>
    )}
    </NightModeContext.Consumer>
    );
}

/**
 * Styles for this file. Recommended to leave these alone.
 * Change backgroundColor of container as needed.
 */
const styles = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonContainer: {
        flex: 4,
        flexDirection: "column",
        //alignItems: "center",
        //justifyContent: "center"
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