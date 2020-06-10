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
import {enableScreens} from "react-native-screens"
enableScreens();
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer} from '@react-navigation/native';

//TO GET RID OF
import Icon from "react-native-vector-icons/FontAwesome"

//Allows us to use vars nightModeOn and toggleNightMode from any screen. 
//See React Context and NightModeContext for more details.
import {NightModeContext} from "./NightModeContext"

//Custom Icon used in the drawer. See CustomIcon for more details.
import CustomIcon from "./components/CustomIcon"

const Drawer = createDrawerNavigator();
import BillingScreen from "./screens/sidebar/BillingScreen"
import ContactScreen from "./screens/sidebar/ContactScreen"
import FAQsScreen from "./screens/sidebar/FAQsScreen"
import NotifsScreen from "./screens/sidebar/NotifsScreen"
import SettingsScreen from "./screens/sidebar/SettingsScreen"
/**
 * The main app. The top layer of the app is a sidebar, which we set up in the App function with drawer navigation.
 * Sidebar menu can be toggled by swiping on the right or hitting the sidebar menu button.
 * Different screens include: Home, Settings, Notifs, FAQs, Contact, Billing.
 * Each screen comes with a route name, an optional title (that is actually displayed in the drawer), a
 * corresponding screen as imported above, and an icon as used from the Font Awesome library (see CustomIcon for more details)
 */
export default function App() {
  const [nightModeOn, setNightMode] = useState(false);
  const toggleNightMode = () => setNightMode(previousState => !previousState);
  return (
    <NightModeContext.Provider value = {{nightModeOn: nightModeOn, toggleNightMode: toggleNightMode}}> 
    <NightModeContext.Consumer>
    {({nightModeOn}) => (
      <NavigationContainer>
        <Drawer.Navigator 
          initialRouteName="Main"
          drawerPosition = "right"
          drawerContent = {props => <CustomDrawer {...props}/>}
          drawerContentOptions = {{
            inactiveTintColor: nightModeOn ? "white" : "black",
            contentContainerStyle : {
              backgroundColor : nightModeOn ? "black" : "white",
              height: "100%"
            }
          }}
        >
          <Drawer.Screen
            name = "Main"
            component = {MainNavigation}
            options = {{
              title: "Home",
              drawerIcon: () => <CustomIcon name = "home" />
            }}
          />
          <Drawer.Screen
            name = "Settings"
            component = {SettingsScreen}
            options = {{
              drawerIcon: () => <CustomIcon name = "cog" />
            }}
          />
          <Drawer.Screen 
            name="Notifs" 
            component = {NotifsScreen}
            options = {{
              title: "Notifications",
              drawerIcon: () => <CustomIcon name = "bell"/>
            }} 
          />
          <Drawer.Screen
            name = "FAQs"
            component = {FAQsScreen}
            options = {{
              drawerIcon: () => <CustomIcon name = "question-circle" />
            }}
          />
          
          <Drawer.Screen
            name = "Contact"
            component = {ContactScreen}
            options = {{
              title: "Contact Us",
              drawerIcon: () => <CustomIcon name = "user" />
            }}
          />
          <Drawer.Screen
            name = "Billing"
            component = {BillingScreen}
            options = {{
              title: "Billing Info",
              drawerIcon: () => <CustomIcon name = "credit-card"/>
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    )}
    </NightModeContext.Consumer>
    </NightModeContext.Provider>
  );
}

/**
 * A homemade custom drawer that adds in two more tabs in addition to the screens above.
 * Top tab closes the drawer.
 * Middle tabs comes from the screens defined in Drawer initialization.
 * Bottom tab inverts the colors. It's cool.
 * Nightmode tab takes in variable nightModeOn and function toggleNightMode, initialized in the App state.
 * Whenever the switch itself is clicked, toggleNightMode is called, which causes nightModeOn to be toggled.
 */
import {DrawerContentScrollView, DrawerItemList, DrawerItem} from "@react-navigation/drawer"
import {Switch, View} from "react-native"
function CustomDrawer(props) {
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
              onPress= {() => {alert("Night mode!")}}  //being left as alert for debugging purposes
            />
          </View>
      </DrawerContentScrollView>    
      )}
    </NightModeContext.Consumer>
  )
}

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
      style= {{width: 214, height: 50}}
      source = {require("./assets/logo.png")}
    />
  )
}

/**
 * A homemade sidebar icon used in the right. It's cool.
 * See note on Context below
 */
function SidebarIcon(props) {
  return (
    <NightModeContext.Consumer>
      {({nightModeOn}) => (
          <TouchableWithoutFeedback
          onPress = {() => props.navigation.openDrawer()}
          color = {nightModeOn ? "white" : "black"}  
        >
          <Icon name = "bars" size = {30} color = {nightModeOn ? "white" : "black"}/>
        </TouchableWithoutFeedback>
      )}
    </NightModeContext.Consumer>
  )
}

/**
 * As a small note on how the header is designed: 
 * The center contains the logo of 4th Army Medical we will use.
 * The right contains a sidebar toggle button. Sidebar can be drawn out at any time by dragging from right to left
 * The left will contain a left arrow to go back.
 */
import Constants from "expo-constants"
function MainNavigation({navigation}) {
  return (
    <NightModeContext.Consumer>
    {({nightModeOn}) => (
      <Stack.Navigator 
        initialRouteName = "Home"
        screenOptions ={{
          headerTitle: props => <ArmyLogo {...props}/>,
          headerTitleAlign: "center",
          headerRight: () => (<SidebarIcon navigation = {navigation}/>),
          headerStyle: {
            backgroundColor: nightModeOn ? "black" : "white",
            height: 70 + Constants.statusBarHeight
          },
          headerTitleContainerStyle: {
            paddingBottom: 10
          },
          headerTintColor: nightModeOn ? "white" : 'black'
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
    )}
    </NightModeContext.Consumer>
  );
}

/**
 * This defines the style sheet being used. 
 */
import { StyleSheet } from "react-native"
const styles = StyleSheet.create({

})