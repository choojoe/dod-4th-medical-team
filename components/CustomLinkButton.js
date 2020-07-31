import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
/**
 * A custom button created with TouchableOpacity, each containing an icon and text. 
 * Redirects the user to an external URL - function passed as a prop.
 * Takes in props passed in PortalScreen- see DATA.
 * {screen: props.route} allows us to navigate to the screen within the Main navigator (props.navigation).
 */
export default function CustomLinkButton(props){
    return (
        <TouchableOpacity 
            style = {[styles.button, {backgroundColor: props.backgroundColor}]}
            onPress = {props.onPress}
        >
            <FontAwesome5 name = {props.icon} size = {72} color = "white"/>
            <Text style = {{color : "white"}}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )   
}
/**
 * In case if the button creation fails
 */
import * as Linking from "expo-linking";
CustomLinkButton.defaultProps = {
    icon: "user",
    URL: () => Linking.openURL("https://google.com"),
    title: "Test",
    backgroundColor: "darkred"
}
/**
 * Styles for this file. You can change the styling of the button here.
 */
const styles = StyleSheet.create({
    button: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
})