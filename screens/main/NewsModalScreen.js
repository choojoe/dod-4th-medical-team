import React from "react"
import {View, ScrollView, Text, Image, StyleSheet, Button, Share, Dimensions} from "react-native"
import * as Linking from "expo-linking" //feel free to change!

/**
 * Given the data passed in from NewsListItem, we display the information in this screen.
 * ROUTE: NewsModal
 * See: NewsScreen.js, NewsListItem.js
 */

export default class NewsModalScreen extends React.Component{
    constructor(props){
        super(props)
        //we store image dimensions here and update them as the image loads in.
        this.state = {
            width: 0,
            height: 0,
        }
    }

    onShare = async () => {
        try {
            const {item} = this.props.route.params
            const title = item.description ? generateTitle(item.description) : item.title
            const urlToShare = item.id
            const result = await Share.share({
                message: title+"\n\nSee more at: "+urlToShare
            })
        } catch(error){
            console.log(error)
        }
    }

    componentDidMount () {
        Image.getSize(this.props.route.params.item.imageSrc, (width, height) => {
            const ratio = Dimensions.get("window").width*0.8/width
            this.setState({
               width: width * ratio,
               height: height * ratio
            })
        })
        
    }
    
    render(){
        const {item} = this.props.route.params
        const {width, height} = this.state
        return (
            <ScrollView>
                <View>
                    <Text style = {styles.title}> {item.description ? generateTitle(item.description) : item.title}</Text>
                    <Text style = {styles.date}> {generateDate(item.published)}</Text>
                    <View style = {{alignItems: "center"}}>
                        <Image style = {{width, height}} source = {{uri: item.imageSrc}}/>
                    </View>
                    <Text style = {styles.description}> {item.description}</Text>
                </View>
                <View>
                    <Button
                        title = "More"
                        onPress = {() => {Linking.openURL(item.id)}}
                    />
                    <Button
                        title = "Share"
                        onPress = {this.onShare} //to be filled in 
                    />
                </View>
            </ScrollView>
        )
    }
}

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
    title: {
        fontSize: 24,
        paddingBottom: 10
    },
    date: {
        paddingBottom: 10
    },
    description: {
        paddingBottom: 10
    }
})