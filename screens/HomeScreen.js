/**
 * Home Screen - the screen that loads up on default. Contains the two-column grid of buttons (main functionalities of the app) and the Header.
 * ROUTE NAME: Home.
 */

//These imports load in necessary components from React and React Native
import React, {useState, useEffect} from "react"
import { View, StyleSheet, Text, ScrollView, Image, ImageBackground, Dimensions} from "react-native"

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

// Used to create news header swiper
import Swiper from "react-native-swiper"

// import useTranslation is required to configure multilanguage translation using i18n
import { useTranslation } from "react-i18next"

// we import PowerTranslator to translate the text on the slides.
import {PowerTranslator} from "react-native-power-translator"

// used to configure the width of each of the slides
const {width} = Dimensions.get("window")

export default function HomeScreen({ navigation }) {
    // The state (variable storage) of this screen will be used to store the RSS feed.
    // The state is set to an initial loading state (not the actual feed)
    // the state hook allows us to use state (variable storage) within a functional component.
    // More specifically, it defines a variable that we initialize to the array below, along with a function used to update the feed
    const [feed, setFeed] = useState([{ id: "What", title: "Loading...", description: "News loading...", published: "2020-07-04T14:15:19+00:00" }]);

    const { t } = useTranslation() //allows us to call t translate function in our code
    const iconSize = 72 //icon size used within the buttons...

    //This code loads in the RSS feed. See NewsScreen for more details. The main difference is
    // that we set the state by calling setFeed.
    useEffect(() => {
        fetch("http://fetchrss.com/rss/5ef244a08a93f86e288b45675ef2448b8a93f838268b4567.atom") //Make a request for data from our RSS feed (made from Facebook 4th Medical and FetchRSS).
            .then((response) => response.text()) // convert the RSS feed into text
            .then((responseData) => rssParser.parse(responseData)) //convert that text into an easy-to-use object via rssParser
            .then((rss) => {
                // once we have an easy to use object, we store that data into our state.
                setFeed(
                    // rss.items is our key object of interest - it's an array with each element representing a news story.
                    // We convert each item into a new news item containing the properties we want using the map method (creates new array by transforming each item with a function)
                    // The following properties:
                    // - id = the unique identifier of each story. We use the Facebook URL related to the story.
                    // - title = the title of each story. Usually this is just AFMS - 4th Medical Group or equal to the description, so we try to avoid using this (see generateTitle in NewsListItem).
                    // - imageSrc = the URL of the image associated with each story, left undefined if there is no image.
                    // - description = the description of the article - usually ends up giving us the most information
                    // - published = the date the story was published
                    rss.items.map((item) => {
                        // from each item we take the title, the raw HTML content, and the published date
                        const {title, content, published} = item; 
                        // we also take the id from each item using the links property
                        const id = item.links[0].url

                        // Isolate the imageSrc and description
                        // take the raw html content and place it into a DomSelector. Take out the imageNode and the first (should be only) text node of the content.
                        // Also take out the textNode (which we find by searching the children of the rootNode - i.e, the HTML element representation of our item)
                        const rootNode = DomSelector(content);
                        const imageNode = rootNode.getElementsByTagName("img")[0]
                        const textNode = rootNode.children.find(ele => ele.constructor.name === "TextNode") 

                        // If there is an image - get the image URL from the imageNode (decoded via external library he)
                        var he = require("he")
                        var imageSrc = imageNode ? he.decode(imageNode.attributes.src) : undefined //set the image URL equal to undefined in case that there is no imageNode
                        // If there is a piece of text - get the piece of text from textNode!
                        const description = textNode ? textNode.text : undefined // set the text equal to undefined in case there is no textNode

                        return {id, title, imageSrc, description, published} // return these properties - these will be stored in this.state.feed
                    }) 
                )
            }).catch((e) => {
                //In the case of any error, set the feed equal to an error feed - this will be displayed in place of the normal text.
                setFeed([{id: "What", title: "Error occurred while loading. Please try again", description: e, published: "2020-07-04T14:15:19+00+00"}])
            }); 
        })
    //truncates our news title, see newsscreen for more details.
    const generateTitle = function (content) {
        if (content.length > 100){
            return content.substring(0, 100) + "..."
        }
        return content
    } 
    return (
        <View style={styles.container}>
            <View style = {styles.header}>
                <Swiper 
                    height={200} //sets the height of the swiper to 200px
                    horizontal={true} //sets the scrolling direction to horizontal
                    autoplay = {true} //the header moves on its own
                    //more props https://github.com/leecade/react-native-swiper
                >
                {
                    //the below takes each item in our feed and converts it into a slide,
                    //each containing an image spanning the whole background and covered by
                    //a title on the front, generated from the RSS feed as seen above.
                    //we use an imagebackground so the image takes up the whole space.
                    feed.map((item) => 
                        <View style = {styles.slide} key = {item.title + "homescreentitle"}>
                            <ImageBackground source={{uri: item.imageSrc}} style={styles.image}>
                                <View style = {styles.darkenImg}>
                                    <PowerTranslator style={styles.text} text = {item.description ? generateTitle(item.description) : item.title}/>
                                    <Text style={styles.text}>{t("Please click the News Screen for more!")}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                    )
                }
                </Swiper>
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
                                backgroundColor: "#9AC6C5", //filling in additional style sheet with backgroundColor
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
                                backgroundColor: "#A32C2C",
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
                                backgroundColor: "#7785AC",
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
                                backgroundColor: "#9AC6C5",
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
                                backgroundColor: "#A5E6BA",
                                aspectRatio: 1,
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
                        <Button
                            title={t("PHAQs")}
                            buttonStyle={{
                                height: "100%",
                                backgroundColor: "#A32C2C",
                                aspectRatio: 1,
                            }}
                            containerStyle={{
                                flex: 1
                            }}
                            icon={
                                <FontAwesome5
                                    name="clipboard"
                                    size={iconSize}
                                    color="white"
                                />
                            }
                            onPress={() => navigation.navigate("PHAQs")}
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
        height: 200 //ensures that the view surrounding our swiper is height 200. Otherwise, the swiper
        //tries to grow on its own.
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
    },
    slide: {
        flex: 1, //takes full space
        justifyContent: 'center', //ensures everything is centered
        alignItems: 'center', //ensures everything is centered
        backgroundColor: '#9DD6EB' //default color for background
    },
    image: {
        width, //set the width of the image equal to the width of the window (calculated above (const {width} = Dimensions.get("window")))
        flex: 1, //takes full space
        resizeMode: "cover", //ensures image covers the slide without distorting it
        justifyContent: "center", //centers things
    },
    text: {
        color: '#fff', //sets text color to white
        fontSize: 20, //sets text size to 20
        fontWeight: 'bold', //sets text weight to bold
        textAlign: "center", //centers text
    },
    darkenImg: {
        flex: 1, //takes as much space
        backgroundColor: "rgba(0, 0, 0, 0.3);" //adding a darker filter allows us to see the text more clearly.
    }
})