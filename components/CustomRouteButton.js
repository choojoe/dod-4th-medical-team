import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
/**
 * A custom button created with TouchableOpacity, each containing an icon and text.
 * Redirects the user to another route within the app.
 * {screen: props.route} allows us to navigate to the screen within the Main navigator (props.navigation).
 */
export default class CustomRouteButton extends React.Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <TouchableOpacity 
                style = {[styles.button, {backgroundColor: this.props.backgroundColor}]}
                onPress = {() => this.props.navigation.navigate(this.props.route)}
            >
                <FontAwesome5 name = {this.props.icon} size = {72} color = "white"/>
                <Text style = {{color : "white"}}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        )   
    }
}
/**
 * In case if the button creation fails
 */
CustomRouteButton.defaultProps = {
    icon: "user",
    route: "Test",
    title: "Test",
    backgroundColor: "darkred"
}
/**
 * Styles for this file. You can change the styling of the button here.
 */
const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    }
})