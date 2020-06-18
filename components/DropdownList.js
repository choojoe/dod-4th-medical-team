/**
 * Custom component that creates a dropdown menu given data (sections).
 */
import React from "react"
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, Button} from "react-native"
import Accordion from "react-native-collapsible/Accordion"
import {NightModeContext} from "../NightModeContext"
import * as Linking from "expo-linking" //CURRENTLY USING LINKING FROM EXPO! Feel free to change as we export.
import * as Animatable from "react-native-animatable"
import Icon from "react-native-vector-icons/FontAwesome"

/**
 * React Native Collapsible is used in order to create the Accordion/Dropdown menu
 * _renderHeader - prints out the header/title (what is initially displayed)
 * _renderContent - prints out the content/description (the view that pops up on click)
 * _renderFooter - prints out the footer (displayed at the bottom, currently a horizontal line)
 * _updateSection - updates which section is displayed (only one section is displayed)
 */
export default class DropdownList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeSections: [],
        }
    }

    static contextType = NightModeContext;

    //integrate isActive

    _renderHeader = (section, index, isActive) => {
        const customRotateOpen = {
            from: {
                rotate: "0deg"
            },
            to: {
                rotate: "180deg"
            }
        }
        const customRotateClosed = {
            from: {
                rotate: "180deg"
            },
            to: {
                rotate: "360deg"
            }
        }
        return (
            <View style = {styles.header} key = {section.name+"header"}>
                <Text style = {[styles.headerText, this.context.nightModeOn ? styles.whiteText : styles.blackText]}>{section.key}</Text>
                <Animatable.View animation = {isActive ? customRotateOpen : customRotateClosed}><Icon name="caret-down" focused = "true" size = {50} color = {this.context.nightModeOn ? "white" : "black"}/></Animatable.View>
            </View>
        )
    }

    _renderContent = (section, index, isActive) => {
        if (!isActive){
            return ;
        }
        console.log(section.key)
        const infoContent = !section.content ? <View></View> : //this line sets infoContent to blank if section.content doesn't exist
        <View>
            {
                section.content.map(item => 
                    <Text style = {[styles.contentText, this.context.nightModeOn ? styles.whiteText : styles.blackText]} key = {item.title+" info"}>
                        <Text style = {{fontWeight: "bold"}}>{item.title}</Text> 
                        <Text>{item.description}</Text>
                    </Text>
                )
            }
        </View>
        const linkContent = !section.links ? <View></View> : //this line sets linkContent to blank if section.links doesn't exist
        <View style = {{paddingBottom: 5}}>
            {
                section.links.map(item => 
                    <View style = {{paddingTop: 10}} key = {item.title+" link"}>
                        <Button 
                            title = {item.title}
                            onPress = {() => Linking.openURL(item.URL)}
                        />
                    </View>
                )
            }
        </View>
        return (
            <View style = {styles.content}>
                <View>
                    {infoContent}
                </View>
                <View>
                    {linkContent}
                </View>
            </View>
        )
    }

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
                    touchableComponent = {TouchableOpacity} 
                    containerStyle = {{
                        backgroundColor: this.context.nightModeOn ? "black" : "white",
                        padding: 20
                    }}
                    
                    //Above line changes the container for each list item into a touchableopacity, which dims upon clicking.
                />
            </ScrollView>
        )
    }
}


/**
 * Styles used for this file. Change these instead of the code above (except for containerStyle)
 * containerStyle in Accordion above changes the style of the overall screen.
 * headerText and contentText format the text themselves.
 * TODO: Change contentButton, headerText, contentText
 * Formatting should be changed here, not in the DirectoryScreen class.
 */
const styles = StyleSheet.create({
    header: {
        paddingVertical: 10,
        flexDirection: "row"
    },
    headerText: {
        flex: 1,
        fontSize: 24,
    },
    whiteText: {
        color: "white"
    },
    blackText: {
        color: "black"
    }
})