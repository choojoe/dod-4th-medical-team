/**
 * Home Screen - the screen that loads up on default.
 * ROUTE NAME: Home.
 * This screen contains the 10 main buttons we want our users to look at.
 * We create a 2 column grid to hold each of our main buttons, however, each row can hold as many buttons as you like.
 * If you want to include more buttons and treat this grid as a list, use a ScrollView instead of a View for the main container,
 * however, we discourage this for simplicity sake (keep the number of buttons low).
 * Icons courtesy of FontAwesome5 (instead of FontAwesome)
 */
import React from "react"
import {TouchableOpacity, View, Text, Button, StyleSheet} from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

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
 * HomeScreen puts 10 custom buttons, taking in data from props, and outputs
 * them, two per row. You can add more rows by using <View style = {styles.row} />
 * and you can create a new button by modifying DATA and calling 
 * <CustomButton {...DATA[index]} navigation = {navigation}/>
 */
export default function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
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
      </View>
    );
}

/**
 * A custom button created with TouchableOpacity, each containing an icon and text.
 * Takes in props passed in HomeScreen.
 */
function CustomButton(props) {
    return (
        <TouchableOpacity 
            style = {[styles.button, {backgroundColor: props.backgroundColor}]}
            onClick = {() => props.navigation.navigate(props.route)}
        >
            <FontAwesome5 name = {props.icon} size = {72} color = "black"/>
            <Text>{props.title}</Text>
        </TouchableOpacity>
    )
} 
/**
 * In case if the button creation fails
 */
CustomButton.defaultProps = {
    icon: "user",
    route: "Test",
    title: "Test"
}

/**
 * Styles for this file. You'll want to either change the background color of the container
 * or change the styling of the button.
 * 
 */
const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: "center",
        margin: 10
    },
    row: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
    },
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "honeydew"
    }
})