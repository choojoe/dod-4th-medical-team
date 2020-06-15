/**
 * A dropdown list of the different departments and services within the clinic.
 * ROUTE NAME: Directory
 * react-native-collapsible is used in order to create the dropdown menu effect.
 */
import React from "react"
import {View, StyleSheet, Text} from "react-native"
import Accordion from "react-native-collapsible/Accordion"
const SECTIONS = [
    {
        title: "24hr Nurse Advice Line",
        content: "Lorem ipsum"
    },
    {
        title: "App IT Support",
        content: "Lorem ipsum"
    },
    {
        title: "Dental",
        content: "Lorem ipsum"
    }
]
export default class DirectoryScreen extends React.Component {
    state = {
        activeSections: [],
    };

    _renderSectionTitle = section => {
        return (
            <View style = {styles.content}>
                <Text>{section.content}</Text>
            </View>
        )
    }

    _renderHeader = section => {
        return (
            <View style = {styles.header}>
                <Text style = {styles.headerText}>{section.title}</Text>
            </View>
        )
    }

    _renderContent = section => {
        return (
            <View style = {styles.content}>
                <Text>{section.content}</Text>
            </View>
        )
    }
    
    _updateSections = activeSections => {
        this.setState({ activeSections })
    }

    render() {
        return (
            <Accordion
                sections = {SECTIONS}
                activeSections = {this.state.activeSections}
                renderSectionTitle = {this._renderSectionTitle}
                renderHeader = {this._renderHeader}
                renderContent = {this._renderContent}
                onChange = {this._updateSections}
            />
        )
    }
}

const styles = StyleSheet.create({
    content: {

    },
    header: {

    },
    headerText: {

    }
})