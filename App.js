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
 */
const Drawer = createDrawerNavigator();
import BillingScreen from "./screens/sidebar/BillingScreen"
import ContactScreen from "./screens/sidebar/ContactScreen"
import FAQsScreen from "./screens/sidebar/FAQsScreen"
import NotifsScreen from "./screens/sidebar/NotifsScreen"
import SettingsScreen from "./screens/sidebar/SettingsScreen"

/**
 * nightModeOn and setNightMode are the boolean that keeps track on whether or not
 * the system is in night mode and the function that sets nightModeOn, respectively.
 * These variables are initialized in the App state, so the night mode toggle
 * can be accessed from all screens. See CustomDrawer for more details.
 * 
 * The drawer comes with a couple of background styles, primarily to toggle between black and white.
 * 
 * Each screen comes with a route name, an optional title (that is actually displayed in the drawer), a
 * corresponding screen as imported above, and an icon as used from the Font Awesome library.
 * 
 * color = {nightModeOn ? "white" : "black"} means that the color will be set to white if nightModeOn is true,
 * and black if nightModeOn is false. This allows for color switching. [Ternary operator]
 * 
 * See note on Context below
 */

const NightModeContext = React.createContext({
  nightModeOn: false,
  toggleNightMode: (prevState) => {!prevState},
});

export default function App() {
  const [nightMode, setNightMode] = useState(false);
  const toggleNight = () => setNightMode(previousState => !previousState);

  return (
    <NightModeContext.Provider value = {{nightModeOn: nightMode, toggleNightMode: toggleNight}}>
    <NightModeContext.Consumer>
      {({nightModeOn}) =>
      (<NavigationContainer>
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
      </NavigationContainer>)}
    </NightModeContext.Consumer>
    </NightModeContext.Provider>
  );
}
/**
 * A custom icon, set to default width, takes in name prop
 * got rid of width 120 - put it back if it actually does something
 */
function CustomIcon(props){
  return (
    <NightModeContext.Consumer>
    {({nightModeOn}) => (
      <View style = {{width: 35}}>
        <Icon name = {props.name} focused = "true" size = {30} color = {nightModeOn ? "white" : "black"}/>
      </View>
    )}
    </NightModeContext.Consumer>
  )
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
 * A homemade custom drawer that adds in two more tabs in addition to the screens above.
 * Top tab closes the drawer.
 * Middle tabs comes from the screens defined in Drawer initialization.
 * Bottom tab inverts the colors. It's cool.
 * Nightmode tab takes in variable nightModeOn and function toggleNightMode, initialized in the App state.
 * Whenever the switch itself is clicked, toggleNightMode is called, which causes nightModeOn to be toggled.
 * 
 * color = {nightModeOn ? "white" : "black"} means that the color will be set to white if nightModeOn is true,
 * and black if nightModeOn is false. This allows for color switching. [Ternary operator]
 * 
 * See note on Context below
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
 * See note on Context below
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
 * Note on React Context: In order to access the variable nightModeOn from functions outside of App.js,
 * we need to use React Context. In order to do that, we store the variables in NightModeContext
 * and whenever we want to access this data, we wrap whatever we want to return in a Consumer as such:
 * 
 * <NightModeContext.Consumer>
 *  {({nightModeOn, toggleNightMode}) => (
 *    INSERT CODE HERE
 *  )}
 * </NightModeContext.Consumer>
 * 
 * I recommend typing the code you want and then wrapping it in these 4 lines. They're short and annoying but do a lot.
 */