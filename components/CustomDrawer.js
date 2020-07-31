import React from "react"
import {DrawerContentScrollView, DrawerItemList, DrawerItem} from "@react-navigation/drawer"
import {Switch, View} from "react-native"
import {NightModeContext} from "../NightModeContext"
import CustomIcon from "./CustomIcon"
/**
 * A homemade custom drawer that adds in two more tabs in addition to the screens above.
 * Top tab closes the drawer.
 * Middle tabs comes from the screens defined in Drawer initialization. [DrawerItemList]
 * Bottom tab inverts the colors. It's cool.
 * Nightmode tab takes in variable nightModeOn and function toggleNightMode, initialized in the App state.
 * Whenever the switch itself is clicked, toggleNightMode is called, which causes nightModeOn to be toggled.
 */
export default function CustomDrawer(props) {
  return (
    <NightModeContext.Consumer>
      {({nightModeOn, toggleNightMode}) => (
        <DrawerContentScrollView {...props}>
          <DrawerItem
            label = ""
            inactiveTintColor = {nightModeOn ? "white" : "black"}
            icon = {() => <CustomIcon name = "times"/>}
            onPress = {() => {props.navigation.closeDrawer()}}
          />
          <View style = {{flex: 1, justifyContent: "center"}}>
            <DrawerItemList {...props} />
            <DrawerItem 
              label = "Night Mode" 
              inactiveTintColor = {nightModeOn ? "white" : "black"}
              icon = {() => <View style = {{width: 35}}><Switch onValueChange = {toggleNightMode} value = {nightModeOn}/></View>} 
              onPress= {() => {toggleNightMode()}}
            />
          </View>
      </DrawerContentScrollView>    
      )}
    </NightModeContext.Consumer>
  )
}