/**
 * 4th Medical Clinic Mobile App
 * Created by Team Toucan/Duke Phoenix Project
 * 
 * App.js contains the two navigators that will handle moving between screens.
 * The actual screens are implemented within the screens folder.
 */

//Main libraries include React, React Native, and React Navigation.
//Supplementary (A E S T H E T H I C) libraries include React Native Vector Icons
import React, {useState} from 'react';
//added to resolve bug
import { enableScreens} from "react-native-screens"
enableScreens();
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer} from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome"

/**
 * Drawer navigation is being used to create the sidebar menu.
 * Sidebar menu can be toggled by swiping on the right or hitting the sidebar menu button.
 * Different screens include: Home, Settings, Notifs, FAQs, Contact, Billing.
 * See NightSwitch for more details on nightModeOn, toggleNightMode
 */
const Drawer = createDrawerNavigator();
import BillingScreen from "./screens/sidebar/BillingScreen"
import ContactScreen from "./screens/sidebar/ContactScreen"
import FAQsScreen from "./screens/sidebar/FAQsScreen"
import NotifsScreen from "./screens/sidebar/NotifsScreen"
import SettingsScreen from "./screens/sidebar/SettingsScreen"


export default function App() {
  const [nightModeOn, setNightMode] = useState(false);
  const toggleNightMode = () => setNightMode(previousState => !previousState);
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Main"
        drawerPosition = "right"
        drawerContent = {props => <NightSwitch {...props} nightModeOn = {nightModeOn} toggleNightMode = {toggleNightMode}/>}
        drawerStyle = {{
          backgroundColor : nightModeOn ? "black" : "white"
        }}
        drawerContentOptions = {{
          inactiveTintColor: nightModeOn ? "white" : "black"
        }}
      >
        <Drawer.Screen
          name = "Main"
          component = {MainNavigation}
          options = {{
            title: "Home",
            drawerIcon: () => <Icon name = "home" focused = "true" size = {30} color = {nightModeOn ? "white" : "black"}/>
          }}
        />
        <Drawer.Screen
          name = "Settings"
          component = {SettingsScreen}
          options = {{
            drawerIcon: () => <Icon name = "cog" focused = "true" size = {30} color = {nightModeOn ? "white" : "black"}/>
          }}
        />
        <Drawer.Screen 
          name="Notifs" 
          component = {NotifsScreen}
          options = {{
            title: "Notifications",
            drawerIcon: () => <Icon name = "bell" focused = "true" size = {30} color = {nightModeOn ? "white" : "black"}/>
          }} 
        />
        <Drawer.Screen
          name = "FAQs"
          component = {FAQsScreen}
          options = {{
            drawerIcon: () => <Icon name = "question-circle" focused = "true" size = {30} color = {nightModeOn ? "white" : "black"}/>
          }}
        />
        
        <Drawer.Screen
          name = "Contact"
          component = {ContactScreen}
          options = {{
            title: "Contact Us",
            drawerIcon: () => <Icon name = "user" focused = "true" size = {30} color = {nightModeOn ? "white" : "black"}/>
          }}
        />
        <Drawer.Screen
          name = "Billing"
          component = {BillingScreen}
          options = {{
            title: "Billing Info",
            drawerIcon: () => <Icon name = "credit-card" focused = "true" size = {30} color = {nightModeOn ? "white" : "black"}/>
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
/**
 * How navigators work: A small intro (to be deleted)
 * So given that you've imported all the components you want, it's time to link them together. 
 * In the main app, you will always surround your work with a navigation container and the type of navigation you want, in this case, a drawer.
 * Now that you have a drawer navigator, you can give it some properties and a list of all the screens that you can implement.
 * Think of the navigator almost as the map of the screen - you give it some locations and now you can traverse between them with appropriate calls:
 * Every function screen you implement should include {navigation} as a prop so the screen can interact with the app.
 * navigation.navigate("RouteName") will take your screen to that appropriate route.
 * navigation.goBack() goes back one screen
 * navigation.popToTop() goes back all the way
 * tl;dr The navigator stores all the screens you use, and then you call navigation.navigate() whenever you want to move to another screen.
 */

 /**
  * Stack navigation is being used to create the main app.
  * Starting from the Home screen, the user can click on the 8 main buttons to traverse to the 10 main screens.
  * These screens include: COVID, CallUs, Portal, Appts, Map, Pharmacy, News, Directory, Calendar, Classes.
  * To utilize cool icons, we use react-native-vector-icons.
  */
const Stack = createStackNavigator();
import HomeScreen from "./screens/HomeScreen"
import ApptsScreen from "./screens/main/ApptsScreen"
import CalendarScreen from "./screens/main/CalendarScreen"
import CallUsScreen from "./screens/main/CallUsScreen"
import ClassesScreen from "./screens/main/ClassesScreen"
import COVIDScreen from "./screens/main/COVIDScreen"
import DirectoryScreen from "./screens/main/DirectoryScreen"
import MapScreen from "./screens/main/MapScreen"
import PharmacyScreen from "./screens/main/PharmacyScreen"
import NewsScreen from "./screens/main/NewsScreen"
import PortalScreen from "./screens/main/PortalScreen"
import TestScreen from "./screens/main/TestScreen"
import { Image, TouchableWithoutFeedback } from 'react-native';

/**
 * A homemade logo used in the header. It sucks.
 */
function ArmyLogo() {
  return (
    <Image
      style= {{width: 250, height: 50}}
      source = {require("./assets/logo.png")}
    />
  )
}

/**
 * A homemade sidebar icon used in the right. It's cool.
 */
function SidebarIcon(props) {
  return (
    <TouchableWithoutFeedback
      onPress = {() => props.navigation.toggleDrawer()}
      color = "black"  
    >
      <Icon name = "bars" size = {30} color = "black"/>
    </TouchableWithoutFeedback>
  )
}

/**
 * A homemade tab used in the drawer that inverts the colors. It's cool.
 * Takes in variable nightModeOn and function toggleNightMode, initialized in the App state.
 * Whenever the switch itself is clicked, toggleNightMode is called, which causes nightModeOn to be toggled.
 */
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer"
import {
  Switch
} from "react-native"
function NightSwitch(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem 
        label = "Night Mode" 
        inactiveTintColor = {props.nightModeOn ? "white" : "black"}
        icon = {() => <Switch onValueChange = {props.toggleNightMode} value = {props.nightModeOn}/>} 
        onPress= {() => {alert("Night mode!")}}  //being left as alert for debugging purposes
      />
    </DrawerContentScrollView>
  )
}

/**
 * A closing button used in the drawer that closes the drawer.
 */
function CloseButton(props){
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem 
        label = "" 
        inactiveTintColor = {props.nightModeOn ? "white" : "black"}
        icon = {() => <Icon name = "times" focused = "true" size = {30} color = {props.nightModeOn ? "white" : "black"}/>} 
        onPress= {() => {alert("Night mode!")}}  //being left as alert for debugging purposes
      />
    </DrawerContentScrollView>
  )
}

//temp import
import { Button } from "react-native"
/**
 * As a small note on how the header is designed: 
 * The center contains the logo of 4th Army Medical we will use.
 * The right contains a sidebar toggle button. Sidebar can be drawn out at any time by dragging from right to left
 * The left will contain a left arrow to go back.
 */
function MainNavigation({navigation}) {
  return (
      <Stack.Navigator 
        initialRouteName = "Home"
        screenOptions ={{
            headerTitle: <ArmyLogo/>,
            headerTitleAlign: "center",
            /**
            headerRight: () => (
                <Button
                  title = "TEST"
                  onPress= {() => navigation.toggleDrawer()}
                  color = "black"
                />
            )
            */
            headerRight: () => (<SidebarIcon navigation = {navigation}/>)
        }}
      >
        <Stack.Screen name = "Home" component = {HomeScreen}/>
        <Stack.Screen name = "COVID" component = {COVIDScreen}/>
        <Stack.Screen name = "CallUs" component = {CallUsScreen} />
        <Stack.Screen name = "Portal" component = {PortalScreen}/> 
        <Stack.Screen name = "Appts" component = {ApptsScreen}/>
        <Stack.Screen name = "Map" component = {MapScreen}/> 
        <Stack.Screen name = "Pharmacy" component = {PharmacyScreen} />
        <Stack.Screen name = "News" component = {NewsScreen}/>
        <Stack.Screen name = "Directory" component = {DirectoryScreen} /> 
        <Stack.Screen name = "Calendar" component = {CalendarScreen} />
        <Stack.Screen name = "Classes" component = {ClassesScreen} />
        <Stack.Screen name = "Test" component = {TestScreen} />
      </Stack.Navigator>
  );
}