/**
 * Given the data passed in from NewsListItem, we display the information in this screen.
 * See NewsScreen.js for more details.
 * ROUTE: NewsModal
 */

 //Necessary components to create the screen. Linking allows us to visit other links.
 import React from "react"
 import {View, ScrollView, Text, Image, StyleSheet, Button, Share, Dimensions} from "react-native"
 import * as Linking from "expo-linking"
 
 export default class NewsModalScreen extends React.Component{
     constructor(props){
         super(props)
         //we store image dimensions here and update them as the image loads in.
         //note that React Native requires you to specify width and height of an image to display the image - it kinda sucks.
         this.state = {
             width: 0,
             height: 0,
         }
     }
 
     //on clicking the button, we use the Share function from react-native to share our content.
     //In NewsScreen.js, we call () => this.props.navigation.navigate("NewsModal", {item})
     //the above means that we can access item from this.props.route.params.
     //in other words, const item = this.props.route.params.item.
     //Using this item, we share some content as defined in the try block.
     onShare = async () => {
         //try the following code, and if something goes wrong, go to the catch block.
         try {
             const {item} = this.props.route.params
             //from the above item, we find the title and url to share with the user.
             const title = item.description ? generateTitle(item.description) : item.title
             const urlToShare = item.id
             //now that we have our content, we share it below.
             const result = await Share.share({
                 message: title+"\n\nSee more at: "+urlToShare
             })
         } catch(error){
             console.log(error)
         }
     }
 
     //Upon mounting the component, we update the width and height of the image and save those
     //parameters in this.state.width and this.state.height
     //Note that in onShare, item is stored as this.props.route.params.item.
     //We grab the imageSrc off that item and use it to find the width and height.
     componentDidMount () {
         Image.getSize(this.props.route.params.item.imageSrc, (width, height) => {
             //assuming successful call of Image.getSize, the width and height of the image will be stored here.
             //we calculate the ratio as newWidth/width, with newWidth being 80% of the original screen's width.
             const ratio = Dimensions.get("window").width*0.8/width
             this.setState({
                 //with the above ratio, we can multiply our width and height accordingly.
                 width: width * ratio,
                 height: height * ratio
             })
         })
         
     }
     
     render(){
         //In NewsScreen.js, we call () => this.props.navigation.navigate("NewsModal", {item})
         //the above means that we can access item from this.props.route.params.
         //in other words, const item = this.props.route.params.item.
         const {item} = this.props.route.params
         //We also grab the width and height from the state.
         const {width, height} = this.state
 
         /**
          * As you see here, we print the formatted title, the formatted date, an image of specified width and height, 
          * and the full description of the news item.
          * Afterwards, you'll see two buttons redirecting users to the full news story and sharing the content with other users.
          * 
          * Note that the description is usually more descriptive than the title, so we default to using that to generate the title.
          * The date is in a UTC format, so we need to neatly format it.
          */
         return (
             <ScrollView>
                 <View>
                     <Text style = {styles.title}> {item.description ? generateTitle(item.description) : item.title}</Text>
                     <Text style = {styles.date}> {generateDate(item.published)}</Text>
                     <View style = {styles.image}>
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
                         onPress = {this.onShare} 
                     />
                 </View>
             </ScrollView>
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
     title: {
         fontSize: 24, //fontsize of the title
         paddingBottom: 10 //adds some extra space on the bottom
     },
     date: {
         paddingBottom: 10 //adds some extra space on the bottom
     },
     description: {
         paddingBottom: 10 //adds some extra space on the bottom
     },
     image: {
         alignItems: "center" //centers the image
     }
 })
