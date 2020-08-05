/**
 * 4th Medical Clinic Mobile App
 * Created by Team Toucan/Duke Phoenix Project
 * 
 * App.js contains the two navigators that will handle moving between screens.
 * The actual screens are implemented within the screens folder.
 */

// Main libraries include React, React Native, and React Navigation.
// These libraries enable switching between different screens (React Navigation)
// https://reactnavigation.org/
import React from 'react';
import {enableScreens} from "react-native-screens"
enableScreens();
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer} from '@react-navigation/native';

// Allows us to use react-i18n - a translator component. Importing i18n configures i18n for our app.
import "./i18n"
import {useTranslation} from "react-i18next"

// Allows us to use Power Translator - a google cloud translator component.
import {ProviderTypes, TranslatorConfiguration} from "react-native-power-translator"

// Custom Icon used in the drawer. 
import Icon from "react-native-vector-icons/FontAwesome"

// Image package used in order to create our ArmyLogo.
import {Image} from "react-native"

// Used to create the sidebar logo.
import {TouchableWithoutFeedback} from "react-native"
import Constants from "expo-constants"

// These are the screens that will go into the drawer of the component (whenever you click the sidebar, the drawer will open)
const Drawer = createDrawerNavigator();
import ContactScreen from "./screens/sidebar/ContactScreen"
import FAQsScreen from "./screens/sidebar/FAQsScreen"
import SettingsScreen from "./screens/sidebar/SettingsScreen"

/**
 * The main app. The top layer of the app is a sidebar, which we set up in the App function with drawer navigation.
 * Sidebar menu can be toggled by swiping on the right or hitting the sidebar menu button.
 * Each screen comes with a route name, an optional title (that is actually displayed in the drawer), a
 * corresponding screen as imported above, and an icon as used from the Font Awesome library.
 * 
 * Here, we associate each screen to a route name, for example, FAQs to FAQsScreen. Whenever we call
 * navigation.navigate("routeName"), the app will switch to the associated screen.
 * 
 * If you have a screen that will be displayed within the secondary portion of the app, add it here.
 */
export default function App() {
  const {t, i18n} = useTranslation() // IMPORTANT! this line allows us to use the t translate function from react-i18n. see i18n.js for more info
  TranslatorConfiguration.setConfig(ProviderTypes.Google, "OurGoogleAPI", "en") // IMPORTANT! This line allows us to translate certain screens using our Google Translate API key. 
  //THE API KEY IS SET BLANK BECAUSE TRANSLATION IS NOT BEING USED RN
  const sidebarIconSize = 30 //the size of the sidebar icon.
  return (
    <NavigationContainer
      //we have to wrap our navigator within a navigation container!
    >
      <Drawer.Navigator 
        initialRouteName="Main" //upon opening the app, redirect the users to route Main.
        drawerPosition = "right" //drawer opens from the right
        drawerContentOptions = {{
          contentContainerStyle : {
              height: "100%", //drawer takes full screen
              justifyContent: "center" //centers the items
          }
        }}
      >
        <Drawer.Screen
          name = "Main" //name of the route
          component = {MainNavigation} //name of the screen (this screen MainNavigation is defined below, all others are imported above)
          options = {{
            title: t("Home"), //set the title equal to custom translation
            drawerIcon: () => <Icon name = "home" focused = "true" size = {sidebarIconSize} color = "black"/> //set the drawer icon equal to the custom icon.
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
  * Starting from the Home screen, the user can click on the main buttons to traverse to the different main screens.
  * If you have a screen that will be displayed within the main portion of the app, add it here.
  */
const Stack = createStackNavigator();
import HomeScreen from "./screens/HomeScreen"
import ClassesScreen from "./screens/main/ClassesScreen"
import DirectoryScreen from "./screens/main/DirectoryScreen"
import MapScreen from "./screens/main/MapScreen"
import NewsModalScreen from "./screens/main/NewsModalScreen"
import NewsScreen from "./screens/main/NewsScreen"
import OnlineScreen from "./screens/main/OnlineScreen"
import PHAQsScreen from "./screens/main/PHAQsScreen"
import TestScreen from "./screens/main/TestScreen"
import MyPatientPortalScreen from "./screens/main/MyPatientPortalScreen"
import SecureMessagingScreen from "./screens/main/SecureMessagingScreen"

/**
 * As a small note on how the header is designed: 
 * The center contains the logo of 4th Army Medical we will use.
 * The right contains a sidebar toggle button. Sidebar can be drawn out at any time by dragging from right to left
 * The left will contain a left arrow to go back.
 * 
 * settings center the title logo (ArmyLogo), add a sidebar to the right, and set the color to alternate between black and white.
 * in addition, height and padding are set accordingly.
 */
function MainNavigation({navigation}) {
  const hamburgerIconSize = 30 //size of the sidebar logo
  const headerLogoSize = 50 //size of the 4th army logo
  return (
    <Stack.Navigator 
      initialRouteName = "Home" //whenever the MainNavigation screen shows up, we redirect to Home automatically.
      screenOptions ={{
        headerTitle: () => <Image style = {{width: headerLogoSize, height: headerLogoSize}} source = {require("./assets/4MTEmblem.png")}/>, //displays a logo with specified dimensions
        headerTitleAlign: "center",
        headerRight: () => 
          <TouchableWithoutFeedback 
            onPress = {() => navigation.openDrawer()} //call on the navigation object (React Navigation) to open the drawer.
          > 
            <Icon 
              name = "bars" size = {hamburgerIconSize} color = "black" //describes what icon we want. the name corresponds to it's corresponding font awesome icon. Search fontawesome.com for icon names.
              style = {{paddingRight: 10}} //add some slight padding to the right of the sidebar icon
            /> 
          </TouchableWithoutFeedback>,
        headerStyle: {
          height: headerLogoSize + Constants.statusBarHeight //change the height of the header accordingly.
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
      <Stack.Screen name = "PHAQs" component = {PHAQsScreen}/>
    </Stack.Navigator>
  )
}