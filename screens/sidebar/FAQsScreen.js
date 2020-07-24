/**
 * A list of frequently asked questions and their answers.
 * POTENTIAL IMPLEMENTATION: Search Bar to search through FAQs.
 * NECESSARY DATA GRAB: More FAQs
 * ROUTE NAME: FAQs
 */
import React from "react"
import DropdownList from "../../components/DropdownList"
import {View, Button} from "react-native"

const SECTIONS = [
    {
        key: "Can I bring my stepson/stepdaughter to an appointment?",
        content: [
            {
                title: "Answer: ",
                description: "Only if you have a Power of Attorney (In Loco Parentis) for the healthcare of the child."
            }
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
        <View>
            <Button
                title = "Go Back Home"
                onPress = {() => navigation.navigate("Home")}
            />
            <DropdownList sections = {SECTIONS}/>
        </View>
    )
}