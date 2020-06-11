# 4th Army Medical Application
- Made with React Native + React Navigation.
- Created Summer 2020 by Team Toucan/Duke Phoenix Project

## Details
- Utilized the drawer navigation example via create-react-native-app as a base.
- Icons provided by Font Awesome + React Native Vector Icons
- Project is in progress as part of a 10-week summer internship program, the Duke Phoenix Project, meant to give Duke undergraduates internships to replace ones lost due to the COVID-19 pandemic.

## Notes for Maintainers
- The following is being written as a brief introduction to the libraries and tools we used to maintain our app.
### How navigators work: A small intro
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
### React Context: How to access variables from any screen
* Note on React Context: In order to access the variable nightModeOn from functions/files outside of App.js,
* we need to use React Context, set below. In order to do that, we store the variables in NightModeContext.

NOTE: Import NightModeContext like this (change path to NightModeContext as needed)

    import {NightModeContext} from "../NightModeContext"

* and whenever we want to access this data from a FUNCTION COMPONENT, we wrap whatever we want to return in a Consumer. 

Here's the template for the code:

    <NightModeContext.Consumer>
        {({nightModeOn, toggleNightMode}) => (
        //INSERT CODE HERE
        )}
    </NightModeContext.Consumer>

* See CustomDrawer as an example of the above.

* Note that ReactNavigation really likes to work with functions rather than classes, however, the two can be easily converted between each other.
 * If you are trying to access data from a CLASS COMPONENT, we have to do some basic setting via initalizing contextType.

 Here's the template for the code:

    class className extends React.Component {
        constructor(props){ //use props only if you have props to pass in 
            super(props)
        }
        static contextType = NightModeContext
        render(){
            return (//Whatever you want, access context via this.context.nightModeOn and props via this.props.insertPropHere)
        }
    }

* See CustomIcon as an example of the above.
More specifically, the below line (Producer) allows any Consumer to access the data, even if the Consumer is in a subfunction.
    <NightModeContext.Provider value = {{nightModeOn: nightMode, toggleNightMode: toggleNight}}>
 * Normally you'd have to pass these as props to subfunctions but Context allows us to bypass that.
### Ternary operators: {boolean ? "value if true" : "value if false"}
    color = {nightModeOn ? "white" : "black"} 
* The above line means that the color will be set to white if nightModeOn is true and black if nightModeOn is false. This allows for color switching. 

## Contact Us!
- GitHub usernames: @choojoe, @guitartist42, @Sophiapatterson, @whydaniel
