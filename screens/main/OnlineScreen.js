/**
 * A screen redirecting users to the MyPatientPortal screen or to the SecureMessaging screen.
 * Two big clickable buttons (react-native-elements), each with icon (FontAwesome5), title, and onPress function redirecting people to their route.
 * Documentation:
 * https://fontawesome.com - search up icons. Their names will translate to icons.
 * https://react-native-elements.github.io/react-native-elements/docs/button.html - custom buttons with more properties.
 * 
 * ROUTE: Online
 */
import React from "react"
import {View, StyleSheet} from "react-native"
import {Button} from "react-native-elements" //main component to create buttons
import FontAwesome5 from "react-native-vector-icons/FontAwesome5" //main component to create icons
import {useTranslation} from "react-i18next" //translation library

export default function OnlineScreen({navigation}) { //provide navigation prop so we can redirect user to another screen.
    const iconSize = 66 //icon size here.
    const {t} = useTranslation(); //Extracting the t function allows us to translate the title depending on the language.
    return (
        <View style = {styles.container}> 
            <Button 
                /**
                 * title - renders a title. calling t("Title") translates it accordingly to its appropriate language.
                 * titleProps - additional props to modify text.
                 * buttonStyle - additional styling to change the button (contents).
                 * containerStyle - additional styling to change the button (the actual button container).
                 * icon - the actual Icon component.
                 * onPress - function that is called upon pressing. In this case, we navigate to another screen.
                 */
                title = {t("MyPatientPortal")}
                titleProps = {{
                    adjustsFontSizeToFit: true //ensures text fits on each button (iOS)
                }}
                buttonStyle = {{
                    height: "100%", //sets height equal to full container
                    backgroundColor: "#582A86" //filling in additional style sheet with backgroundColor
                }}
                containerStyle = {{
                    flex: 1 //ensures width of button takes as much space as possible (shared w/ other button)
                }}
                icon = {
                    <FontAwesome5 
                        name = "clinic-medical" //name of fontAwesome icon
                        size = {iconSize} // iconSize. can be changed above.
                        color = "white" //color of icon.
                    />
                }
                onPress = {() => navigation.navigate("MyPatientPortal")} //navigation.navigate("route") changes the screen
                //of the app to another. In this case, we change to another screen.
            />
            <Button
                title = {t("SecureMessaging")}
                titleProps = {{
                    adjustsFontSizeToFit: true
                }}
                buttonStyle = {{
                    height: "100%", 
                    backgroundColor: "#87B6A7" 
                }}
                containerStyle = {{
                    flex: 1 
                }}
                icon = {
                    <FontAwesome5
                        name = "envelope"
                        size = {iconSize}
                        color = "white"
                    />
                }
                onPress = {() => navigation.navigate("SecureMessaging")}
            />
        </View>
    )
}

/**
 * Styling used in this screen.
 */
const styles = StyleSheet.create({
    container: {
        flex: 1, //ensures container takes up full screen (height)
        flexDirection: "row", //ensures buttons are horizontally aligned
        alignItems: "center", //centers the buttons along main axis (row)
        justifyContent: "center", //centers the buttons along secondary axis (column)
        width: "100%" //full width
    }
})