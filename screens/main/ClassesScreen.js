/**
 * This screen provides a collapsible list of all of the different classes at the clinic. See DropdownList for more details.
 * ROUTE NAME: Classes
 */
import React from "react"
import DropdownList from "../../components/DropdownList"

/**
 * Data must be provided in the exact structure as below. If you do not have content or links to provide, you may omit either.
 */
const SECTIONS = [
    //SECTIONS is an array of objects, with each object representing a item in the collapsible list.
    //see below example "Sign Up Information"
    {
        key: "Sign Up Information", //This is the title of each element in the list.
        content: [ //content is provided as an array, with each element representing one line of text.
            {
                title: "From the Clinic: ", //This is the bolded part of the text
                description: "If you or a familly member are interested in attending any of the classes listed below, please contact us through the number below." //This is the normal part of the text
            } //the above converts to "From the Clinic: If you or a family member..."
        ],
        links: [ //links is provided as an array, with each element representing one link
            { //each element in this format will be converted into a button that redirects users to the provided URL.
                title: "Sign Up For A Class",
                URL: "tel:1-919-722-1878"
            }
        ]
    },
    {
        key: "Anger Group",
        content: [
            {
                title: "Location: ",
                description: "Family Life Center"
            },
            {
                title: "Hours: ",
                description: "Every Friday, 10:00am to 12:00pm"
            }
        ]
    },
    {
        key: "Breast Feeding Workshop",
        content: [
            {
                title: "Location: ",
                description: "Family Life Center",
            }
        ]
    },
    {
        key: "Couples Communication Workshop",
        content: [
            {
                title: "Location: ",
                description: "Family Life Center"
            },
            {
                title: "Hours: ",
                description: "Wednesdays, 9:00am to 2:00pm"
            }
        ]
    },
    {
        key: "DADS 101",
        content: [
            {
                title: "Location: ",
                description: "Family Life Center"
            },
            {
                title: "This course is for: ",
                description: "Expectant/New Dads"
            },
            {
                title: "Hours: ",
                description: "12:00pm to 4:30pm"
            }
        ]
    },
    {
        key: "How to Avoid Marrying a Jerk/Jerkette",
        content: [
            {
                title: "Location: ",
                description: "Family Life Center"
            },
            {
                title: "Hours: ",
                description: "12:30pm to 4:30pm"
            }
        ]
    },
    {
        key: "Moms, Pops, & Tots",
        content: [
            {
                title: "Location: ",
                description: "Family Life Center"
            },
            {
                title: "About Us: ",
                description: "Playgroup for children ages 3 and under"
            },
            {
                title: "Hours: ",
                description: "Mondays, 10:00am to 12:00pm"
            }
        ]
    },
    {
        key: "OB Briefing",
        content: [
            {
                title: "Location: ",
                description: "Family Life Center"
            },
            {
                title: "About Us: ",
                description: "Children and partners welcome. Briefing conducted by Tri-Care, Health and Wellness Center, New Parents Support Program, and Housing"
            },
            {
                title: "Hours: ",
                description: "Every first and third Thursday, 9:30am to 11:30am"
            }
        ]
    },
    {
        key: "Parenting with Love and Logic",
        content: [
            {
                title: "Location: ",
                description: "Family Life Center"
            },
            {
                title: "This course is for: ",
                description: "Ages 13 to 18 years"
            },
            {
                title: "Hours: ",
                description: "Wednesday, 9:30am to 2:00pm"
            }
        ]
    },
    {
        key: "Prenatal",
        content: [
            {
                title: "This course is for: ",
                description: "Expectant/new parents. Please contact Family Advocacy below."
            }
        ],
        links: [
            {
                title: "Contact Family Advocacy",
                URL: "tel:1-919-722-1878"
            }
        ]
    }
]

export default function ClassesScreen() {
    return (
        <DropdownList sections = {SECTIONS}/> //We pass the above data into our DropdownList component.
    )
}