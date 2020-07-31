/**
 * 4th Medical Clinic Mobile App
 * Created by Team Toucan/Duke Phoenix Project
 * 
 * App.js contains the two navigators that will handle moving between screens.
 * The actual screens are implemented within the screens folder.
 */

//Main libraries include React, React Native, and React Navigation.
//Supplementary (A E S T H E T H I C) libraries include React Native Vector Icons
import React from 'react';
import {enableScreens} from "react-native-screens"
enableScreens();
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer} from '@react-navigation/native';

//Allows us to use react-i18n.
import "./i18n"
import {useTranslation} from "react-i18next"

//Custom Icon used in the drawer. 
import Icon from "react-native-vector-icons/FontAwesome"

//Image package used in order to create our ArmyLogo.
import {Image} from "react-native"

const Drawer = createDrawerNavigator();
import ContactScreen from "./screens/sidebar/ContactScreen"
import FAQsScreen from "./screens/sidebar/FAQsScreen"
import SettingsScreen from "./screens/sidebar/SettingsScreen"
/**
 * The main app. The top layer of the app is a sidebar, which we set up in the App function with drawer navigation.
 * Sidebar menu can be toggled by swiping on the right or hitting the sidebar menu button.
 * Different screens include: Home, Settings, Notifs, FAQs, Contact, Billing.
 * Each screen comes with a route name, an optional title (that is actually displayed in the drawer), a
 * corresponding screen as imported above, and an icon as used from the Font Awesome library (see CustomIcon for more details)
 * 
 * Settings in drawer navigation aare being used to set to alternate between colors and give drawer full height. See CustomDrawer for the actual drawer being constructed.
 */
export default function App() {
  /**
   * Use custom translations in App.js - see drawer title
   */
  const {t, i18n} = useTranslation()
  const sidebarIconSize = 30
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Main"
        drawerPosition = "right"
        drawerContentOptions = {{
          contentContainerStyle : {
              height: "100%",
              justifyContent: "center"
          }
        }}
      >
        <Drawer.Screen
          name = "Main"
          component = {MainNavigation}
          options = {{
            title: t("Home"),
            drawerIcon: () => <Icon name = "home" focused = "true" size = {sidebarIconSize} color = "black"/>
          }}
        />
        <Drawer.Screen
          name = "Settings"
          component = {SettingsScreen}
          options = {{
            title: t("Settings"),
            drawerIcon: () => <Icon name = "cog" focused = "true" size = {sidebarIconSize} color = "black"/>
          }}
        />
        <Drawer.Screen
          name = "FAQs"
          component = {FAQsScreen}
          options = {{
            title: t("FAQs"),
            drawerIcon: () => <Icon name = "question-circle" focused = "true" size = {sidebarIconSize} color = "black"/>
            }}
        />
        <Drawer.Screen
          name = "Contact"
          component = {ContactScreen}
          options = {{
            title: t("Contact Us"),
            drawerIcon: () => <Icon name = "user" focused = "true" size = {sidebarIconSize} color = "black"/>
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

 /**
  * Stack navigation is being used to create the main app.
  * Starting from the Home screen, the user can click on the 8 main buttons to traverse to the different main screens.
  */
const Stack = createStackNavigator();
import HomeScreen from "./screens/HomeScreen"
import ClassesScreen from "./screens/main/ClassesScreen"
import DirectoryScreen from "./screens/main/DirectoryScreen"
import MapScreen from "./screens/main/MapScreen"
import NewsModalScreen from "./screens/main/NewsModalScreen"
import NewsScreen from "./screens/main/NewsScreen"
import OnlineScreen from "./screens/main/OnlineScreen"
import TestScreen from "./screens/main/TestScreen"
import MyPatientPortalScreen from "./screens/main/MyPatientPortalScreen"
import SecureMessagingScreen from "./screens/main/SecureMessagingScreen"

/**
 * Homemade components used in the creation of the header.
 */
import {TouchableWithoutFeedback} from "react-native"

/**
 * As a small note on how the header is designed: 
 * The center contains the logo of 4th Army Medical we will use.
 * The right contains a sidebar toggle button. Sidebar can be drawn out at any time by dragging from right to left
 * The left will contain a left arrow to go back.
 * 
 * settings center the title logo (ArmyLogo), add a sidebar to the right, and set the color to alternate between black and white.
 * in addition, height and padding are set accordingly.
 */
import Constants from "expo-constants"
function MainNavigation({navigation}) {
  const hamburgerIconSize = 30
  const headerLogoSize = 50
  return (
    <Stack.Navigator 
      initialRouteName = "Home"
      screenOptions ={{
        headerTitle: () => <Image style = {{width: headerLogoSize, height: headerLogoSize}} source = {require("./assets/4MTEmblem.png")}/>,
        headerTitleAlign: "center",
        headerRight: () => 
          <TouchableWithoutFeedback onPress = {() => navigation.openDrawer()}>
            <Icon name = "bars" size = {hamburgerIconSize} color = "black" />
          </TouchableWithoutFeedback>,
        headerStyle: {
          height: headerLogoSize + Constants.statusBarHeight
        },
        headerTitleContainerStyle: {
          paddingBottom: 10
        },
      }}
    >
      <Stack.Screen name = "Home" component = {HomeScreen}/>
      <Stack.Screen name = "Online" component = {OnlineScreen}/> 
      <Stack.Screen name = "Map" component = {MapScreen}/> 
      <Stack.Screen name = "News" component = {NewsScreen}/>
      <Stack.Screen name = "Directory" component = {DirectoryScreen} /> 
      <Stack.Screen name = "Classes" component = {ClassesScreen} />
      <Stack.Screen name = "Test" component = {TestScreen} />
      <Stack.Screen name = "MyPatientPortal" component = {MyPatientPortalScreen}/>
      <Stack.Screen name = "SecureMessaging" component = {SecureMessagingScreen}/>
      <Stack.Screen name = "NewsModal" component = {NewsModalScreen} />
    </Stack.Navigator>
  )
}