import React from "react"
import {NightModeContext} from "../NightModeContext"
import { View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
/**
 * A custom icon used in the drawer, set to a default width, takes in name prop
 * Created by using icons from Font Awesome, set to default height (size)
 * this.context.nightModeOn is taken from NightModeContext, see NightModeContext for more details.
 */
export default class CustomIcon extends React.Component{
    constructor(props){
      super(props);
    }
    static contextType = NightModeContext;
    render() {
      return(
        <View style = {{width: 35}}>
          <Icon name = {this.props.name} focused = "true" size = {30} color = {this.context.nightModeOn ? "white" : "black"}/>
        </View>
      )
    }
  }