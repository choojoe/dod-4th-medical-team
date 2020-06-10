import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { NightModeContext } from "../NightModeContext"
/**
 * A custom button created with TouchableOpacity, each containing an icon and text.
 * Takes in props passed in HomeScreen - see DATA.
 * {screen: props.route} allows us to navigate to the screen within the Main navigator (props.navigation).
 */
export default class CustomButton extends React.Component {
    constructor(props){
        super(props)
    }
    static contextType = NightModeContext;
    render () {
        const textColor = this.context.nightModeOn ? "white" : "black";
        return (
            <TouchableOpacity 
                style = {[styles.button, {backgroundColor: this.props.backgroundColor}]}
                onPress = {() => this.props.navigation.navigate("Main", {screen: this.props.route})}
            >
                <FontAwesome5 name = {this.props.icon} size = {72} color = {textColor}/>
                <Text style = {{color : textColor}}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        )   
    }
}
/**
 * In case if the button creation fails
 */
CustomButton.defaultProps = {
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
        margin: 2
    }
})