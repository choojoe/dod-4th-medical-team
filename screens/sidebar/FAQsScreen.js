/**
 * This screen provides a collapsible list of all the frequently asked questions at the clinic and their answers. See DropdownList for more details.
 * ROUTE NAME: FAQs
 */
import React from "react"
import {View, Button, StyleSheet} from "react-native"
import DropdownList from "../../components/DropdownList"
import Constants from "expo-constants"

/**
 * Data must be provided in the exact structure as below. If you do not have content or links to provide, you may omit either.
 */
const SECTIONS = [
    //SECTIONS is an array of objects, with each object representing a item in the collapsible list.
    //see below example "Can I bring my...?"
    {
        key: "Can I bring my stepson/stepdaughter to an appointment?", //This is the title of each element in the list.
        content: [ //content is provided as an array, with each element representing one line of text.
            {
                title: "Answer: ", //This is the bolded part of the text
                description: "Only if you have a Power of Attorney (In Loco Parentis) for the healthcare of the child." //This is the normal part of the text
            } //the above converts to "Answer: Only if you have ..."
            //Please see ClassesScreen or DirectoryScreen if you'd like to include links within the FAQ section.
        ]
    },
    {
        key: "How do I get my lab results?",
        content: [
            {
                title: "Method 1: ",
                description: "Patient Portal through TRICARE Online"
            },
            {
                title: "Method 2: ",
                description: "Through your Primary Care Manager (PCM)"
            },
            {
                title: "Method 3: ",
                description: "Visit the lab, fill a release of information form and receive a copy of your results. Laboratory personnel is not authorized to interpret your results. Please contact your PCM for interpretation."
            }
        ]
    }
]

export default function FAQsScreen({navigation}) {
    return (
        //This view contains a button redirecting our user to the home screen.
        //Afterwards, we pass the above data into our DropdownList component.
        <View style = {styles.container}> 
            <Button
                title = "Go Back Home"
                onPress = {() => navigation.navigate("Home")}
            />
            <DropdownList sections = {SECTIONS}/>
        </View>
    )
}

const styles = StyleSheet.create({
    //we use Constants.statusBarHeight - this ensures that the contents of the container are not blocked by the statusBar.
    container: {
        paddingTop: Constants.statusBarHeight
    }
})