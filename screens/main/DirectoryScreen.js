/**
 * A dropdown list of the different departments and services within the clinic. See DropdownList for more details.
 * ROUTE NAME: Directory
 */
import React from "react"
import DropdownList from "../../components/DropdownList"

/**
 * Data must be provided in the exact structure as below. 
 * key is mandatory, while links and content or optional.
 */
const SECTIONS = [
    //SECTIONS is an array of objects, with each object representing a item in the collapsible list.
    //see second element ADAPT for example.
    {
        key: "24hr Nurse Advice Line",
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-800-874-2273",
            }
        ]
    },
    {
        key: "ADAPT [Alcohol and Drug Abuse Prevention and Treatment]", //content is provided as an array, with each element representing one line of text.
        content: [ //content is provided as an array, with each element representing one line of text.
            {
                title: "Location: ", //This is the bolded part of the text
                description: "Thomas Koritz Clinic, Second Floor", //This is the normal part of the text
            }, //the above converts to "Location: Thomas Koritz Clinic, Second Floor"
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm",
            },
            {
                title: "About Us: ",
                description: "ADAPT provides comprehensive services to individuals, in coordination with their commands, who are experiencing problems attributed to substance abuse or misuse. ADAPT serves active duty personnel by offering assessment, intervention education, prevention, outreach, and rehabilitative services. ADAPT also offers Department of Defense employees one-time assessments with referral resources if further care is required or requested. Information and referral resources are also offered to dependents and retirees.",
            }
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1883"
            }
        ]
    },
    {
        key: "BHOP [Behavioral Health Optimization Program]",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic, First Floor"
            },
            {  
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm",
            },
            {
                title: "About Us: ",
                description: "The purpose of BHOP is to offer assistance when habits, behaviors, or emotional concerns begin to interfere with your daily life. It is also provided to help patients who are starting or continuing on medications prescribed by the primary care manager for management of depression, anxiety, and/or PTSD.",
            }
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1802"
            }
        ]
    },
    {
        key: "Benefits Advisor",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic, Second Floor",
            },
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm",
            }
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1988"
            }
        ]
    },
    {
        key: "Bioenvironmental Engineering",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic, First Floor",
            },
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm"
            },
            {
                title: "About Us: ",
                description: "Gas Mask Fit Tests occur Thursdays from 8:15 to 11:45 a.m. and 1:45 to 3:30 p.m., and must be scheduled through your UDM. Please make sure you do not have any makeup or lotions on your face and do not eat, drink or chew gum 30 minutes prior to appointment, to prevent contamination of the air quality in the mask." 
            },
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-5401"
            }
        ]
    },
    {
        key: "Dental",
        content: [
            {
                title: "Location: ",
                description: "Paul Klecker Dental Clinic"
            },
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm",
            },
            {
                title: "About Us: ",
                description: "Priority is given to active duty personnel. Retirees are eligible for stand-by dental care. Emergency care is available through the emergency room at Wayne UNC."
            }
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1933"
            }
        ]
    },
    {
        key: "EFMP [Exceptional Family Member Program]",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic, First Floor"
            },
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm"
            },
            {
                title: "About Us: ",
                description: "The Air Force Exceptional Family Member Program is designed to provide support to military family members with special needs. All branches of the military offer EFMP, and each Service includes a variety of personnel, medical, and family support functions under the EFMP umbrella."
            },
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-0809"
            },
            {
                title: "Learn More",
                URL: "http://www.airforcemedicine.af.mil/EFMP"
            }
        ]
    },
    {
        key: "Family Advocacy",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic, Second Floor",
            },
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm",
            },
            {
                title: "About Us: ",
                description: "We help build healthier families and create more resilient and responsive communities. Our programs center upon prevention and outreach, treatment, victim advocacy, and research. We have a new parent support program, which is voluntary for expectant parents and families with children under the age of 3. The program includes home visitation services as needed. Family Advocacy Strength-Based Treatment (FAST) is another voluntary program for couples and families who desire to change destructive patterns of communication. Outreach services are offered through life-skills classes in parenting, relationship enhancement, emotion regulation and resiliency boosting. Treatment services are offered for individuals, couples and families who have experienced maltreatment. Victim advocacy is a program that offers victims of intimate partner violence supportive services 24 hours a day, 7 days a week.",
            }
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1878"
            }
        ]
    },
    {
        key: "Family Health",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic, First Floor",
            },
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm",
            },
            {
                title: "About Us: ",
                description: 'We provide acute, routine and wellness primary care services.'
            },
            {
                title: "Walk-In Services: ",
                description: "Strep throat, urinary tract infection, depo shots, wound check, suture removal, blood pressure check, B12 injections, testosterone injections, and wart removal.",
            },
            {
                title: "Walk-In Hours: ",
                description: "Monday through Friday, 9:00am to 10:00am, 1:00pm to 2:00pm",
            },
            {
                title: "Walk-In Hours continued: ",
                description: "Closed the second Wednesday of every month from 12:00pm to 4:30pm for required readiness training."
            },
            {
                title: "Pregnancy Testing: ",
                description: "Monday through Friday, 9:00am to 10:00am only"
            },
            {
                title: "Wart Removal: ",
                description: "Friday, 1:00pm to 2:00pm only"
            }
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1802"
            }
        ]
    },
    {
        key: "Flight Medicine",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic, First Floor",
            },
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm",
            },
            {
                title: "Active Duty Sick Call Hours: ",
                description: "Monday through Friday, 7:30am to 8:00am, 1:00pm to 1:30pm",
            },
            {
                title: "Active Duty Sick Call Instructions: ",
                description: "You must be in uniform of the day or physical fitness clothes, and need urgent care only."
            },
            {
                title: "Outside appointments/referral for active duty: ",
                description: "If you see a non-Flight Medicine provider, following-up with Flight Medicine clinic is mandatory no later than the next duty day. Present the Provider Summary Letter below to your off-base provider."
            },
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1802"
            },
            {
                title: "Active Duty Sick Call",
                URL: "tel:1-919-722-1580"
            },
            {
                title: "Provider Summary Letter",
                URL: "http://www.seymourjohnson.af.mil/Portals/105/Documents/MDG%20Docs/provider%20summary%20letter.pdf"
            }
        ]
    },
    {
        key: "Health Promotions",
        content: [
            {
                title: "Location: ",
                description: "Building 2815, Health Promotions Building, next to Dental Clinic",
            },
            {
                title: "Hours (unless otherwise noted below): ",
                description: 'Monday through Friday, 7:30am to 4:15pm'
            },
            {
                title: "Hours (continued): ",
                description: "Closed Tuesday, 10:45am to 12:00pm for smallpox immunizations and Wednesday, 11:45am to 1:00pm for training."
            },
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-0407"
            }
        ]
    },
    {
        key: "Immunizations",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic, First Floor"
            },
            {
                title: "Hours: ",
                description: 'Monday, Wednesday, and Thursday: 7:30AM-11:45AM, 1PM-4:30PM \n' +
                'Tuesday: 8:20AM-11:45AM, 1PM-4:30PM \n' + 
                "Friday: 7:30AM-11:45AM, 1PM-3:30PM \n" + 
                "Friday, smallpox administration: 3:45PM-4:30PM",
            },
            {
                title: "About Us: ",
                description: "We provide all inoculations to active duty personnel, retirees and dependents. Flu shots are administered seasonally to all patients with priority given to active duty. Allergy services, including testing and shots, are available through a primary care manager referral."
            }
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1547"
            }
        ]
    },
    {
        key: "Laboratory",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic, First Floor",
            },
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm",
            },
            {
                title: "About Us: ",
                description: "No appointments necessary. All labs require an order from your primary care manager or authorized civilian physician. Your provider will notify you of abnormal or critical results."
            }
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1817"
            }
        ]
    },
    {
        key: "Medical Records",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic, Second Floor",
            },
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm",
            }
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1951"
            }
        ]
    },
    {
        key: "Mental Health",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic, Second Floor",
            },
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm",
            },
            {
                title: "About Us: ",
                description: "We are available for individual counseling, medication management, psychoeducational groups, and neuropsychological assessment. For after duty hours, contact the emergency department of Wayne Memorial Hospital. An on-call provider will be contacted on your behalf to provide assistance.",
            }
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1802"
            },
            {
                title: "Wayne Memorial Hospital (After Duty Hours)",
                URL: "tel:1-919-736-1110"
            }
        ]
    },
    {
        key: "Optometry",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic, First Floor",
            },
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm",
            },
            {
                title: "About Us: ",
                description: "We offer routine eye care to active duty personnel, as well as, all TRICARE Prime enrollees that have a primary care manager at the 4th Medical Group. Dependents must be at least six years old.",
            }
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1802"
            }
        ]
    },
    {
        key: "Patient Registration",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic, Second Floor",
            },
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm",
            }
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1264"
            }
        ]
    },
    {
        key: "Pediatrics",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic, First Floor",
            },
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm",
            },
            {
                title: "About Us: ",
                description: "We provide scheduled acute, chronic, and preventive medical care for newborn patients to age 17. A case manager is also available in the clinic."
            }
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1802"
            }
        ]
    },
    {
        key: "Pharmacy",
        content: [
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 5:00pm",
            }
        ],
        links: [
            {
                title: "Contact Us (Telephone)",
                URL: "tel:1-919-722-1814"
            },
            {
                title: "Contact Us (Fax)",
                URL: "tel:1-919-722-1895"
            },
            {
                title: "Refill Line (number 1)",
                URL: "tel:1-919-722-1998"
            },
            {
                title: "Refill Line (number 2)",
                URL: "tel:1-800-982-4262"
            },
            {
                title: "Formulary (medication availability for Seymour Johnson Air Force Base)",
                URL: "http://online.lexi.com/lco/splashes/files/pdf/Seymour-Johnson-AFB.pdf"
            },
            {
                title: "Manage Your Prescriptions",
                URL: "http://tricare.mil/CoveredServices/Pharmacy/ManageScripts.aspx?utm_source=i-want-to&utm_medium=organic&utm_campaign=manage-rxs"
            },
            {
                title: "TRICARE Pharmacy Program",
                URL: "http://www.tricare.mil/CoveredServices/Pharmacy.aspx"
            },
            {
                title: "TRICARE Formulary Search Tool",
                URL: "https://www.express-scripts.com/static/formularySearch/2.9.2/#/formularySearch/drugSearch"
            }

        ]
    },
    {
        key: "Physical Therapy",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic",
            },
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm",
            },
            {
                title: "About Us: ",
                description: "Patients can be seen for the following diagnoses: muscular-skeletal evaluation; orthopedic rehabilitation (pre-operative and post-operative), athletic injuries, modalities including cervical and lumbar traction, transcutaneous electrical nerve stimulation, ultrasound, iontophoresis, electrical stimulation, hot and cold packs, muscle testing and rehabilitation training, specialized muscle strengthening, postural correction, range of motion exercises, mobilization (spine and extremity joints), and acute or chronic pain management."
            }
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1802"
            }
        ]
    },
    {
        key: "Public Health",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic, First Floor",
            },
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm",
            },
            {
                title: "About Us: ",
                description: "We conduct preventive medicine and communicable disease control, occupational health, food safety, deployment medicine, and disaster response programs. All post-deployment assessment visits are scheduled through your unit deployment manager, including cancellations. If you are required to have a primary care manager visit as determined by your Form 2796, please call 919-722-1802 to make an appointment. Be sure to provide the specific medical reason and that it has been indicated on your Form 2796.",
            }
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1172"
            }
        ]
    },
    {
        key: "Radiology (Diagnostic Imaging)",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic, First Floor",
            },
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm",
            },
            {
                title: "About Us: ",
                description: "We provide service for six modalities including diagnostic radiology (X-ray), computed tomography, magnetic resonance imaging, diagnostic ultrasound, and nuclear medicine."
            }
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1863"
            }
        ]
    },
    {
        key: "Referral Management Office",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic, First Floor by the Pharmacy",
            },
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm",
            },
            {
                title: "About Us: ",
                description: "TRICARE Prime enrollees can obtain referrals from their primary care manager. When you get a referral from your primary care manager, please come to the Referral Management Center before departing the hospital. We will assist in booking an appointment or provide necessary information to obtain care in the network.",
            }
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1802"
            },
            {
                title: "Provider Summary Letter",
                URL: "https://www.airforcemedicine.af.mil/Portals/1/Documents/MTFs/Seymour%20Johnson/seymour-referral-management.pdf"
            }
        ]
    },
    {
        key: "Women's Health",
        content: [
            {
                title: "Location: ",
                description: "Thomas Koritz Clinic, First Floor",
            },
            {
                title: "Hours: ",
                description: "Monday through Friday, 7:30am to 4:30pm",
            },
            {
                title: "About Us: ",
                description: "We serve TRICARE enrolled personnel, ages 12 to 65 years old. Appointments based on availability. We provide routine and specialty women’s health care to active duty, dependents, and TRICARE Prime enrollees. Other patients are seen on a space-available basis. Initial appointments for gynecology services require a consult from the primary care manager. Available gynecological services include general annual exams with pelvic exams and pap smears, follow-up, pre-operative and post-operative surgical evaluations and treatments. Gynecological surgical procedures offered include tubal ligation, laparoscopy, hysterectomy, urinary incontinence and prolapse surgery, and basic infertility care. Obstetrical services include care for all routine and high-risk pregnant patients. We will refer patients off-base for therapies that are not available at Seymour-Johnson, or are beyond the scope of this clinic. Initial consult is necessary to determine referral status. No referral will be submitted without an initial assessment from 4th Medical Group Women’s Health providers. The following conditions are examples that require referrals (this list is not all inclusive, or exhaustive): fertility conditions, diaphragm fitting, permanent sterilization, fibroid management, chronic pelvic pain that has failed basic interventions, excessive menstrual bleeding that has failed previous clinic interventions, cervical dysplasia greater than Cervical Intraepithelial lesion. Note: Please do NOT bring children that cannot be left unattended to your appointment."
            },
        ],
        links: [
            {
                title: "Contact Us",
                URL: "tel:1-919-722-1802"
            }
        ]
    },
]

export default function DirectoryScreen(){
    return (
        <DropdownList sections = {SECTIONS}/> //We pass the above data into our DropdownList component.
    )
}