/**
 * This screen reads data from a RSS feed and then displays it in a neat list format.
 * ROUTE NAME: News
 */
// Necessary components for this file.
import React from "react"
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet} from "react-native"

// Parses an RSS feed into an easily readable object
import * as rssParser from "react-native-rss-parser"

// Utilized to parse the HTML content provided by the RSS feed.
import DomSelector from "react-native-dom-parser"

// We import PowerTranslator so we can translate the news feed using Google Translate API.
import {PowerTranslator} from "react-native-power-translator"


export default class NewsScreen extends React.Component {
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

    render(){
        //Return the following based off the above.
        return (
            <View 
                style = {{flex: 1}} //flex: 1 = take up as much space as possible
            > 
                <View>
                    <FlatList
                        data = {this.state.feed} //will be populated by the this.RSS() method
                        //renderItem: given the data, take each item and convert it into a nice news list item.
                        renderItem = {({item}) => 
                            <TouchableOpacity 
                                // TouchableOpacity allows us to click on the container and take us to somewhere else. also dims the container upon clicking.
                                // see styles for descriptions
                                style = {styles.newsContainer} 
                                onPress = {() => this.props.navigation.navigate("NewsModal", {item})} //upon clicking, navigate to NewsModalScreen - a full screen that displays the title, text, etc...
                                //the second parameter is item - which we pass in as an additional parameter that the NewsModalScreen will use to generate itself (the data behind NewsModalScreen).
                            >
                                <Image 
                                    source = {{uri: item.imageSrc}} //display the image as defined in NewsScreen, see this.RSS()
                                    style = {{width: 150, height: 150}} //display the image with fixed height and width.
                                /> 
                                <View style = {styles.newsRightContainer}>
                                    <PowerTranslator 
                                        style = {styles.newsText} 
                                        text = {item.description ? generateTitle(item.description) : item.title}
                                        //if there is a description, use that to generate the title (see generateTitle)
                                            //note that the description is usually more detailed than the title.
                                            //otherwise if there isn't a description, stick to the default title.
                                    />
                                    <Text style = {styles.newsDate}>
                                        {
                                            generateDate(item.published)
                                            //We convert the UTC date into a local date and time. We do not translate this.
                                        }
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        } 
                        keyExtractor={item => item.id} //give each item an unique identifier. TODO: Change this to something more robust.
                    />
                </View>
            </View>
            
        )
    }
}


//truncates the description to 100 characters if the title is long, or keeps the original title.
function generateTitle(content){
    if (content.length > 100){
        return content.substring(0, 100) + "..."
    }
    return content
}

//neatly formats the RSS date into a DD/MM/YYYY HOUR:MIN AM/PM format.
function generateDate(utcDate){
    var d = new Date(utcDate);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString()
}

/**
 * The following styles help to develop the above screen
 */
const styles = StyleSheet.create({
    newsContainer: {
        flexDirection: "row", //arranges contents in a row format
        paddingBottom: 10 //padding on the bottom
    },
    newsRightContainer: {
        flex: 1, //right container takes as much vertical space as possible (usually equivalent to the height of the image)
        paddingLeft: 10, //there should also be some distance betweeen the image and the text (hence paddingLeft: 10)
    },
})