/**
 * TBC
 * ROUTE NAME: News
 */
import React from "react"
import {View, Text, StyleSheet} from "react-native"
import Slider from './';

const images = [
    'https://images.pexels.com/photos/2283352/pexels-photo-2283352.jpeg?cs=srgb&dl=brown-concrete-building-2283352.jpg&fm=jpg',
    'https://images.pexels.com/photos/3022403/pexels-photo-3022403.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    'https://images.pexels.com/photos/4671456/pexels-photo-4671456.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
]

export default class NewsScreen extends React.Component{
    render(){
    return (
        <View style={style.container}>
        <Text> Hello Slider </Text>
        <Slider images={images}/> 
        </View>
    )
    }  
}

const style = StyleSheet.create({
container: { 
    marginTop: 50
}
})