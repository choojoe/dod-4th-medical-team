import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
/**
 * A custom button created with TouchableOpacity, each containing an icon and text.
 * Takes in props passed in HomeScreen - see DATA.
 * {screen: props.route} allows us to navigate to the screen within the Main navigator (props.navigation).
 */
export default function CustomButton(props) {
    return (
        <TouchableOpacity 
            style = {[styles.button, {backgroundColor: props.backgroundColor}]}
            onPress = {() => props.navigation.navigate("Main", {screen: props.route})}
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
    title: "Test",
}
/**
 * Styles for this file. You can change the styling of the button here.
 */
const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 2
    }
})