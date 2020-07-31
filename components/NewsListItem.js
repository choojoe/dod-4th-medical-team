import React from "react"
import { Image, StyleSheet, TouchableOpacity, View, Text} from "react-native"
import { NightModeContext } from "../NightModeContext";
/**
 * Used in the creation of the NewsScreen. A clickable item that navigates the user to a full display of each item.
 * See NewsModalScreen.js for more info.
 */

export default function NewsListItem(props){
    //store the item into a constant item for convenience.
    const item = props.item;
    return (
        <NightModeContext.Consumer>
            {({nightModeOn}) => (
            <TouchableOpacity 
                // TouchableOpacity allows us to click on the container and take us to somewhere else
                // see styles for descriptions
                style = {[styles.newsContainer, {backgroundColor: nightModeOn ? "black" : "white"}]} 
                onPress = {() => props.navigation.navigate("NewsModal", {item})} //upon clicking, navigate to NewsModalScreen - a full screen that displays the title, text, etc...
                //the second parameter is item - which we pass in as an additional parameter that the NewsModalScreen will use to generate itself (the data behind NewsModalScreen).
            >
                <Image 
                    source = {{uri: item.imageSrc}} //display the image as defined in NewsScreen, see this.RSS()
                    style = {{width: 150, height: 150}} //display the image with fixed height and width.
                /> 
                <View style = {styles.newsRightContainer}>
                    <Text style = {[styles.newsText, {color: nightModeOn ? "white" : "blue"}]}>
                        {
                            item.description ? generateTitle(item.description) : item.title
                            //if there is a description, use that to generate the title (see generateTitle)
                            //note that the description is usually more detailed than the title.
                            //otherwise, stick to the default title.
                        }
                    </Text> 
                    <Text style = {[styles.newsDate, {color: nightModeOn ? "white" : "blue"}]}>
                        {
                            generateDate(item.published)
                            //see generateDate
                        }
                    </Text>
                </View>
            </TouchableOpacity>
            )}
        </NightModeContext.Consumer>
       
    )
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
        flexDirection: "row",
        paddingBottom: 10
        //put some padding on the bottom between each item and make sure the Image and RightContainer are displayed in a row.
    },
    newsRightContainer: {
        flex: 1,
        paddingLeft: 10,
        //the RightContainer should take as much space (flex: 1) as possible - usually equivalent to the height of the image. 
        //there should also be some distance betweeen the image and the text (hence paddingLeft: 10)
    },
})