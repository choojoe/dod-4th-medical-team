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

//Allows us to use vars nightModeOn and toggleNightMode from any screen. 
//See React Context and NightModeContext for more details.
import {NightModeContext} from "./NightModeContext"

//Custom Icon used in the drawer. See CustomIcon for more details.
import CustomIcon from "./components/CustomIcon"

//Custom drawer used instead of the normal drawer. See CustomDrawer for more details.
import CustomDrawer from "./components/CustomDrawer"

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
 * 
 * Settings in drawer navigation aare being used to set to alternate between colors and give drawer full height. See CustomDrawer for the actual drawer being constructed.
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
  * Stack navigation is being used to create the main app.
  * Starting from the Home screen, the user can click on the 8 main buttons to traverse to the 10 main screens.
  * These screens include: COVID, CallUs, Portal, Appts, Map, Pharmacy, News, Directory, Calendar, Classes.
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
import OnlineScreen from "./screens/main/OnlineScreen"
import TestScreen from "./screens/main/TestScreen"
import MyPatientPortalScreen from "./screens/main/MyPatientPortalScreen"
import SecureMessagingScreen from "./screens/main/SecureMessagingScreen"

/**
 * Homemade components used in the creation of the header.
 */
import ArmyLogo from "./components/ArmyLogo"
import SidebarIcon from "./components/SidebarIcon"

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
        <Stack.Screen name = "Online" component = {OnlineScreen}/> 
        <Stack.Screen name = "Appts" component = {ApptsScreen}/>
        <Stack.Screen name = "Map" component = {MapScreen}/> 
        <Stack.Screen name = "Pharmacy" component = {PharmacyScreen} />
        <Stack.Screen name = "News" component = {NewsScreen}/>
        <Stack.Screen name = "Directory" component = {DirectoryScreen} /> 
        <Stack.Screen name = "Calendar" component = {CalendarScreen} />
        <Stack.Screen name = "Classes" component = {ClassesScreen} />
        <Stack.Screen name = "Test" component = {TestScreen} />
        <Stack.Screen name = "MyPatientPortal" component = {MyPatientPortalScreen}/>
        <Stack.Screen name = "SecureMessaging" component = {SecureMessagingScreen}/>
      </Stack.Navigator>
    )}
    </NightModeContext.Consumer>
  );
}