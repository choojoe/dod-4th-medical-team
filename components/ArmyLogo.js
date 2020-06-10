import React from "react"
import { Image } from "react-native"
/**
 * A homemade logo used in the header. It sucks.
 * See React Context from more details
 */

export default function ArmyLogo() {
  return (
    <Image style = {{width: 57, height: 54}} source = {require("../assets/4MTLogo.png")}/>
  )
}

/**
export default class ArmyLogo extends React.Component{
  constructor(props){
    super(props)
  }
  static contextType = NightModeContext;
  render() {
    if (this.context.nightModeOn){
      return (
        <Image
          style= {{width: 214, height: 50}}
          source = {require("../assets/logonight.png")}
        />
      )
    }
    return (
      <Image
        style= {{width: 214, height: 50}}
        source = {require("../assets/logo.png")}
      />
    )
  }
}
*/