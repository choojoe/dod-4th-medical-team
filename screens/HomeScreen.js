/**
 * Home Screen - the screen that loads up on default. Contains the two-column grid of buttons (main functionalities of the app) and the Header.
 * ROUTE NAME: Home.
 */

//These imports load in necessary components from React and React Native
import React from "react"
import { View, StyleSheet, Text, ScrollView } from "react-native"

// Used to enable navigation between different screens.
import { enableScreens } from "react-native-screens"
enableScreens();

// Used to create the buttons on the main grid.
// https://react-native-elements.github.io/react-native-elements/docs/button for documentation on the button
import { Button } from "react-native-elements"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

// These imports are required for RSS feed generator to work
import * as rssParser from "react-native-rss-parser"
import DomSelector from "react-native-dom-parser"

// import is required to configure multilanguage translation using i18n
import { useTranslation } from "react-i18next"

export default function HomeScreen({ navigation }) {

    const {t} = useTranslation() //allows us to call t translate function in our code
    const iconSize = 72 //icon size used within the buttons...
    return (
        <View style={styles.container}>
            <View
                style={styles.header}
            // HEADER TBD
            >
                <Text>INSERT NEWS HERE</Text>
            </View>
            <View
                style={styles.buttonContainer}
            //the actual button container itself. 
            >
                <ScrollView
                //we use a scrollview to allow us to scroll between the different buttons.
                //we fill this scrollview with different rows of buttons and then place our buttons in those rows.
                >
                    <View style={styles.row}
                    // this is a row of buttons. We place our buttons inside.
                    >
                        <Button
                            /**
                             * title - renders a title. calling t("Title") translates it accordingly to its appropriate language.
                             * buttonStyle - additional styling to change the button (contents).
                             * containerStyle - additional styling to change the button (the actual button container).
                             * icon - the actual Icon component.
                             * onPress - function that is called upon pressing. In this case, we navigate to another screen.
                             */
                            title={t("Online Center")}
                            buttonStyle={{
                                height: "100%", //sets height equal to full container
                                backgroundColor: "#A8DCD1", //filling in additional style sheet with backgroundColor
                                aspectRatio: 1 //makes sure the button is a nice square.
                            }}
                            containerStyle={{
                                flex: 1 //ensures width of button takes as much space as possible (shared w/ other button)
                            }}
                            icon={
                                <FontAwesome5
                                    name="globe" //name of fontAwesome icon
                                    size={iconSize} // iconSize. can be changed above.
                                    color="white" //color of icon.
                                />
                            }
                            onPress={() => navigation.navigate("Online")} //navigation.navigate("route") changes the screen
                        //of the app to another. In this case, we change to another screen.
                        />

                        <Button
                            title={t("Map")}
                            buttonStyle={{
                                height: "100%",
                                backgroundColor: "#F17F29",
                                aspectRatio: 1,
                            }}
                            containerStyle={{
                                flex: 1
                            }}
                            icon={
                                <FontAwesome5
                                    name="map"
                                    size={iconSize}
                                    color="white"
                                />
                            }
                            onPress={() => navigation.navigate("Map")}
                        />
                    </View>
                    <View style={styles.row}>
                        <Button
                            title={t("News")}
                            buttonStyle={{
                                height: "100%",
                                backgroundColor: "#F49852",
                                aspectRatio: 1,
                            }}
                            containerStyle={{
                                flex: 1
                            }}
                            icon={
                                <FontAwesome5
                                    name="newspaper"
                                    size={iconSize}
                                    color="white"
                                />
                            }
                            onPress={() => navigation.navigate("News")}
                        />

                        <Button
                            title={t("Directory")}
                            buttonStyle={{
                                height: "100%",
                                backgroundColor: "#DCE2C8",
                                aspectRatio: 1,
                            }}
                            containerStyle={{
                                flex: 1
                            }}
                            icon={
                                <FontAwesome5
                                    name="address-book"
                                    size={iconSize}
                                    color="white"
                                />
                            }
                            onPress={() => navigation.navigate("Directory")}
                        />
                    </View>
                    <View style={styles.row}>
                        <Button
                            title={t("Classes")}
                            buttonStyle={{
                                height: "100%",
                                backgroundColor: "#A8DCD1",
                                aspectRatio: 2,
                            }}
                            containerStyle={{
                                flex: 1
                            }}
                            icon={
                                <FontAwesome5
                                    name="notes-medical"
                                    size={iconSize}
                                    color="white"
                                />
                            }
                            onPress={() => navigation.navigate("Classes")}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

/**
 * Styles for this file. Recommended to leave these alone.
 */
const styles = StyleSheet.create({
    header: {
        height: 200,
        backgroundColor: "#DCE2C8",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonContainer: {
        flex: 1, //ensures the button container (the two-column grid) takes as much space as possible
        flexDirection: "column" //ensures elements are vertically aligned
    },
    row: {
        width: "100%", //make sure each row takes full width
        flex: 1, //full space
        flexDirection: "row", //and that elements in each row are horizontally aligned
    },
    container: {
        flex: 1, //ensures container takes full space
        flexDirection: "column" //and that elements in container are vertically aligned
    }
})