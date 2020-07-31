/**
 * Home Screen - the screen that loads up on default. Contains the two-column grid of buttons (main functionalities of the app) and the Header.
 * ROUTE NAME: Home.
 */

 //These imports load in necessary components from React and React Native
import React from "react"
import { View, StyleSheet, Text, ScrollView} from "react-native"

// Used to enable navigation between different screens.
import { enableScreens } from "react-native-screens" 
enableScreens();

// Used to create the buttons on the main grid.
import {Button} from "react-native-elements"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

// These imports are required for RSS feed generator to work
import * as rssParser from "react-native-rss-parser"
import DomSelector from "react-native-dom-parser"

export default class HomeScreen extends React.Component {

    // The state (variable storage) of this screen will be used to store the RSS feed.
    // The state is set to an initial loading state (not the actual feed)
    
    state = {
        feed: [{id: "What", title: "Loading...", description: "News loading...", published: "2020-07-04T14:15:19+00:00"}],
    }

    // Once the component has loaded, begin the process of reading data from the RSS news feed.
    componentDidMount(){
        this.RSS();
    }

    // This function loads the RSS feed into the state (each line is labeled)
     RSS = () => { 
        fetch("http://fetchrss.com/rss/5ef244a08a93f86e288b45675ef2448b8a93f838268b4567.atom") //Make a request for data from our RSS feed (made from Facebook 4th Medical and FetchRSS).
            .then((response) => response.text()) // convert the RSS feed into text
            .then((responseData) => rssParser.parse(responseData)) //convert that text into an easy-to-use object via rssParser
            .then((rss) => {
                // once we have an easy to use object, we store that data into our state.
                this.setState({
                    // rss.items is our key object of interest - it's an array with each element representing a news story.
                    // We convert each item into a new news item containing the properties we want using the map method (creates new array by transforming each item with a function)
                    // The following properties:
                    // - id = the unique identifier of each story. We use the Facebook URL related to the story.
                    // - title = the title of each story. Usually this is just AFMS - 4th Medical Group or equal to the description, so we try to avoid using this (see generateTitle in NewsListItem).
                    // - imageSrc = the URL of the image associated with each story, left undefined if there is no image.
                    // - description = the description of the article - usually ends up giving us the most information
                    // - published = the date the story was published
                    feed: rss.items.map((item) => {
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
                })
            }).catch((e) => {
                //In the case of any error, set the feed equal to an error feed - this will be displayed in place of the normal text.
                this.setState({
                    feed: [{id: "What", title: "Error occurred while loading. Please try again", description: e, published: "2020-07-04T14:15:19+00+00"}]
                })
            }); 
    }
    
    //This is what is actually returned to the user.
    render(){
        const iconSize = 72 //icon size used within the buttons...
        return (
            <View style={styles.container}>
                <View 
                    style = {styles.header}
                    // HEADER TBD
                >
                    <Text>{this.state.feed[0].title}</Text>
                </View>
                <View 
                    style  = {styles.buttonContainer}
                    //the actual button container itself. 
                >
                <ScrollView
                    //we use a scrollview to allow us to scroll between the different buttons.
                    //we fill this scrollview with different rows of buttons and then place our buttons in those rows.
                >
                    <View style = {styles.row}
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
                            title = "Online Center"
                            buttonStyle = {{
                                height: "100%", //sets height equal to full container
                                backgroundColor: "#9AC6C5", //filling in additional style sheet with backgroundColor
                                aspectRatio: 1 //makes sure the button is a nice square.
                            }}
                            containerStyle = {{
                                flex: 1 //ensures width of button takes as much space as possible (shared w/ other button)
                            }}
                            icon = {
                                <FontAwesome5
                                    name = "globe" //name of fontAwesome icon
                                    size = {iconSize} // iconSize. can be changed above.
                                    color = "white" //color of icon.
                                />
                            }
                            onPress = {() => this.props.navigation.navigate("Online")} //navigation.navigate("route") changes the screen
                            //of the app to another. In this case, we change to another screen.
                        />

                        <Button
                            title = "Map"
                            buttonStyle = {{
                                height: "100%", 
                                backgroundColor: "#A32C2C", 
                                aspectRatio: 1,
                            }}
                            containerStyle = {{
                                flex: 1 
                            }}
                            icon = {
                                <FontAwesome5
                                    name = "map"
                                    size = {iconSize}
                                    color = "white"
                                />
                            }
                            onPress = {() => this.props.navigation.navigate("Map")}
                        />
                    </View>
                    <View style = {styles.row}>
                        <Button
                            title = "News"
                            buttonStyle = {{
                                height: "100%", 
                                backgroundColor: "#7785AC", 
                                aspectRatio: 1,
                            }}
                            containerStyle = {{
                                flex: 1 
                            }}
                            icon = {
                                <FontAwesome5
                                    name = "newspaper"
                                    size = {iconSize}
                                    color = "white"
                                />
                            }
                            onPress = {() => this.props.navigation.navigate("News")}
                        />

                        <Button
                            title = "Directory"
                            buttonStyle = {{
                                height: "100%", 
                                backgroundColor: "#9AC6C5", 
                                aspectRatio: 1,
                            }}
                            containerStyle = {{
                                flex: 1 
                            }}
                            icon = {
                                <FontAwesome5
                                    name = "address-book"
                                    size = {iconSize}
                                    color = "white"
                                />
                            }
                            onPress = {() => this.props.navigation.navigate("Directory")}
                        />
                    </View>
                    <View style = {styles.row}>
                        <Button
                            title = "Classes"
                            buttonStyle = {{
                                height: "100%", 
                                backgroundColor: "#A32C2C", 
                                aspectRatio: 1,
                            }}
                            containerStyle = {{
                                flex: 1 
                            }}
                            icon = {
                                <FontAwesome5
                                    name = "notes-medical"
                                    size = {iconSize}
                                    color = "white"
                                />
                            }
                            onPress = {() => this.props.navigation.navigate("Classes")}
                        />
                    </View>
                </ScrollView>
                </View>
            </View>
        );
    }
}

/**
 * Styles for this file. Recommended to leave these alone.
 */
const styles = StyleSheet.create({
    header: {
        height: 200, 
        backgroundColor: "green",
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