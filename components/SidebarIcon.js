import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import { NightModeContext} from "../NightModeContext"
import Icon from "react-native-vector-icons/FontAwesome"
/**
 * A homemade sidebar icon used in the right. It's cool.
 * See React Context for more details
 */
export default class SidebarIcon extends React.Component{
    constructor(props){
        super(props)
    }
    static contextType = NightModeContext;
    render() {
        return(
            <TouchableWithoutFeedback
                onPress = {() => this.props.navigation.openDrawer()}
                color = {this.context.nightModeOn ? "white" : "black"}  
            >
                <Icon name = "bars" size = {30} color = {this.context.nightModeOn ? "white" : "black"}/>
            </TouchableWithoutFeedback>
        )
    }
}