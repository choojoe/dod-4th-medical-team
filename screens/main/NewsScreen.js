import React from "react"
import { View, Text, FlatList, TouchableHighlight} from "react-native"
import * as rssParser from "react-native-rss-parser"
import Swiper from "react-native-swiper"
import DomSelector from "react-native-dom-parser"

/**
 * Initial code inspired by this response: https://stackoverflow.com/questions/60318318/implement-rss-feed-in-react-native
 * ROUTE NAME: News
 */

 import {TouchableOpacity} from "react-native"

 import * as Linking from "expo-linking"
export default class NewsScreen extends React.Component {
    state = {
        feed: [{id: "What", title: "Loading...", description: "News loading...", published: "2020-07-04T14:15:19+00:00"}],
    }

    componentDidMount(){
        this.RSS();
    }

    //http://fetchrss.com/rss/5ef244a08a93f86e288b45675ef2448b8a93f838268b4567.atom
    //https://rss.app/feeds/gjBMMHatgQaKEgcy.xml
     RSS = () => { //loads the RSS feed into the state
        fetch("http://fetchrss.com/rss/5ef244a08a93f86e288b45675ef2448b8a93f838268b4567.atom") //make a request for data. old: 
            .then((response) => response.text()) //convert that response into text
            .then((responseData) => rssParser.parse(responseData)) //convert that text into an easy-to-use object via rssParser
            .then((rss) => {
                this.setState({
                    feed: rss.items.map((item) => {
                        const {id, title, content, published} = item; 
                        
                        const rootNode = DomSelector(content);
                        const image = rootNode.getElementsByTagName("img")[0]
                        const textNode = rootNode.children.find(ele => ele.constructor.name === "TextNode") //need to manually search for text nodes :(
                        const imageSrc = image ? decodeURI(image.attributes.src) : undefined //TODO: for some reason, URI isn't decoding. image

                        const description = textNode ? textNode.text : undefined

                        return {id, title, imageSrc, description, published, content} //content is the original content - leaving it in for comparison sake
                    }) //todo: take subset of each item
                    //subset: id = link, title, imageUrl, description, content, published
                })//set the state (update variables) with appropriate values from the parsed RSS feed
            }).catch((e) => {
                this.setState({
                    feed: [{id: "What", title: "Error occurred while loading. Please try again", description: e, published: "2020-07-04T14:15:19+00+00"}]
                })
            }); 
            //Note that the above lines will run one after the other. JavaScript is normally synchronous (run one instruction at a time) 
            //but async allows us to handle more complex things, like web requests.
    }

    render(){
        return (
            <View style = {styles.container}>
                <Text>Screen under construction.</Text>
                <Text>News</Text>
                <Swiper style={styles.wrapper} height={200} horizontal={true} autoplay>
                    <View style={styles.slide1} onPress = {() => Linking.openURL("https://google.com")}>
                         <Text style={styles.text}>Hello Swiper</Text>
                    </View>
                    <View style={styles.slide2} onPress = {() => Linking.openURL("https://google.com")}>
                        <Text style={styles.text}>Beautiful</Text>
                    </View>
                    <View style={styles.slide3} onPress = {() => Linking.openURL("https://google.com")}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                </Swiper>
                {console.log(this.state.feed)}
                <View>
                    <FlatList
                        data = {this.state.feed}
                        renderItem = {({item}) => <NewsListItem item = {item}/>}
                        keyExtractor={item => item.id} //temporary fix
                    />
                </View>
            </View>
            
        )
    }
}

import { Image, StyleSheet} from "react-native"
function NewsListItem(props){
    const item = props.item;
    return (
        <TouchableOpacity style = {styles.newsContainer}>
            <Image source = {{uri: item.imageSrc}} style = {{width: 150, height: 300}} />
            <View style = {styles.newsRightContainer}>
                <Text style = {styles.newsText}>{item.description ? generateTitle(item.description) : item.title}</Text> 
                <Text style = {styles.newsDate}>{generateDate(item.published)}</Text>
            </View>
        </TouchableOpacity>
    )
}
//<Text style = {styles.text}>{item.content ? generateTitle(item.content) : item.title}</Text> 

function generateTitle(content){
    if (content.length > 100){
        return content.substring(0, 100) + "..."
    }
    return content
}

function generateDate(utcDate){
    var d = new Date(utcDate);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString()
}

const styles = StyleSheet.create({
    newsContainer: {
        flexDirection: "row",
    },
    newsRightContainer: {
        flex: 1
    },
    newsDate: {
        color: "blue"
    },
    newsText: {
        color: "blue"
    },
    container: {
        flex: 1
    },
    wrapper: {
        
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
})