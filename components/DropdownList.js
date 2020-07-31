/**
 * Custom component that creates a dropdown menu given data (sections). Built using the React Native Collapsible library.
 * https://github.com/oblador/react-native-collapsible
 * 
 * Takes in array of objects in format: 
 * {
 *      key: "The title of the section",
 *      content: [
 *          {
 *              //an array of objects in this format
 *              title: "The title of each line (bolded)"
 *              description: "Provides more detail (not bolded)"
 *              //ex - [b]Hours: [/b]Monday through Friday 10:00AM to 4:00PM     
 *          }
 *      ],
 *      links: [
 *          {
 *              title: brief description of the button
 *              //ex: Contact Us
 *              URL: the URL to redirect to upon clicking button
 *              //ex: tel:1-800-874-2273
 *          }     
 *      ]
 * }
 */
// Components needed for formatting.
import React from "react"
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, Button} from "react-native"

//The main package creating the accordion function
import Accordion from "react-native-collapsible/Accordion"

// Used to redirect users to external link upon clicking
import * as Linking from "expo-linking" 

// Used to create the arrow function
import * as Animatable from "react-native-animatable"
import Icon from "react-native-vector-icons/FontAwesome"

/**
 * React Native Collapsible is used in order to create the Accordion/Dropdown menu
 * _renderHeader - prints out the header/title (what is initially displayed)
 * _renderContent - prints out the content/description (the view that pops up on click)
 * _renderFooter - prints out the footer (displayed at the bottom, currently a thin line)
 * _updateSection - updates which section is displayed (only one section is displayed)
 */
export default class DropdownList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeSections: [], //an array represents the currently active sections (tab) being open at a time. currently only allows for only one section to be opened at a time.
        }
    }

    //In addition to displaying the title, we want to display an arrow on the end that will open and close depending on the state of the arrow.
    _renderHeader = (section, index, isActive) => {
        //animation pointing arrow from down to up
        const customRotateOpen = {
            from: {
                rotate: "0deg"
            },
            to: {
                rotate: "180deg"
            }
        }
        //animation pointing arrow from up to down
        const customRotateClosed = {
            from: {
                rotate: "180deg"
            },
            to: {
                rotate: "360deg"
            }
        }
        // Return a view containing the title/key on the left and the arrow on the right.
        // Note to maintainer: Potentially come up with a better key to label each item - I just chose something random. (key = unique identifer for each React element)
        return (
            <View style = {styles.header} key = {section.name+"header"}>
                <Text style = {styles.headerText}>{section.key}</Text>
                <Animatable.View animation = {isActive ? customRotateOpen : customRotateClosed}><Icon name="caret-down" focused = "true" size = {50} color = "black" /></Animatable.View>
            </View>
        )
    }

    //Render the inner content of the tab/item
    //Note to maintainer: Potentially come up with a better key to label each item - I just chose something random. (key = unique identifer for each React element)
    _renderContent = (section, index, isActive) => {
        //Render the view only if the section is active.
        if (!isActive){
            return ;
        }
        const infoContent = !section.content ? <View></View> : //this line sets infoContent to blank if section.content doesn't exist
        <View>
            {
                section.content.map(item => 
                    <Text style = {styles.contentText} key = {item.title+" dropdowninfo"}>
                        {/**display all lines in format [b]title[/b] description */}
                        <Text style = {{fontWeight: "bold"}}>{item.title}</Text> 
                        <Text>{item.description}</Text>
                    </Text>
                )
                //map all each item in content into a single text line as described above
            }
        </View>
        const linkContent = !section.links ? <View></View> : //this line sets linkContent to blank if section.links doesn't exist
        <View style = {{paddingBottom: 5}}>
            {
                section.links.map(item => 
                    <View style = {{paddingTop: 10}} key = {item.title+" dropdownlink"}>
                        {/**display a button with corresponding title and onpress function to redirect user */}
                        <Button 
                            title = {item.title}
                            onPress = {() => Linking.openURL(item.URL)}
                        />
                    </View>
                )
            }
        </View>
        //display the results below: infoContent first, then linkContent.
        return (
            <View style = {styles.container}>
                <View>
                    {infoContent}
                </View>
                <View>
                    {linkContent}
                </View>
            </View>
        )
    }

    //what is displayed at the bottom of each item. currently a thin black line.
    _renderFooter = () => {
        return (
            <View 
                style = {{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                }}
            />
        )
    }
    
    //updates the active section.
    _updateSections = activeSections => {
        this.setState({ activeSections })
    }

    render() {
        return (
            <ScrollView>  
                <Accordion
                    sections = {this.props.sections}
                    activeSections = {this.state.activeSections}
                    renderSectionTitle = {this._renderSectionTitle}
                    renderHeader = {this._renderHeader}
                    renderContent = {this._renderContent}
                    renderFooter = {this._renderFooter}
                    onChange = {this._updateSections}
                    touchableComponent = {
                        TouchableOpacity
                        //We change each list item into a touchableopacity, which dims upon clicking.
                    } 
                    containerStyle = {{
                        //this modifies the actual container above, in this case, it'd be the header.
                        padding: 20
                    }}
                />
            </ScrollView>
        )
    }
}


/**
 * Styles used for this file. Change these instead of the code above (except for containerStyle)
 * containerStyle in Accordion above changes the style of the overall screen.
 * headerText formats the text themselves.
 */
const styles = StyleSheet.create({
    container: {
        height: "100%" //full height
    },
    header: {
        paddingVertical: 10, //adds padding on top and bottom
        flexDirection: "row" //rearranges elements inside (arrow + )
    },
    headerText: {
        flex: 1, //takes up as much space as possible, leaving as small room for the arrow as possible
        fontSize: 24, //fontsize.
    }
})