import React from "react"
import { Image } from "react-native"
/**
 * A homemade logo used in the header. It sucks.
 */
export default function ArmyLogo() {
    return (
      <Image
        style= {{width: 214, height: 50}}
        source = {require("../assets/logo.png")}
      />
    )
  }