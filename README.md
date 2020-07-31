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

## Contact Us!
- GitHub usernames: @choojoe, @guitartist42, @Sophiapatterson, @whydaniel