/**
 * nightModeOn and setNightMode are the boolean that keeps track on whether or not
 * the app is in night mode and the function that sets nightModeOn, respectively.
 * These variables are initialized in the App state and stored in the NightModeContext variable.
 * See React Context in the README for more details.
 * Default values don't really matter, we override them.
*/
import React from "react"
export const NightModeContext = React.createContext({
    nightModeOn: false,
    toggleNightMode: () => {},
});