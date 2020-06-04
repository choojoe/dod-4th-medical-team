/**
 * Home Screen - the screen that loads up on default.
 * ROUTE NAME: Home.
 * This screen contains the 10 main buttons we want our users to look at.
 * Formatting to be completed soon.
 */
import React from "react"
import {ScrollView, View,  Button, StyleSheet} from "react-native"
export default function HomeScreen({ navigation }) {
    return (
      <ScrollView style={styles.container}>
        <View style = {styles.row}>
            <Button
                style = {styles.button}
                onPress={() => navigation.navigate("COVID")}
                title = "COVID-19"
            />
            <Button
                style = {styles.button}
                onPress= {() => navigation.navigate("CallUs")}
                title = "Call Us"
            />
        </View>
        <View style = {styles.row}>
            <Button
                style = {styles.button}
                onPress= {() => navigation.navigate("Portal")}
                title = "MyPatientPortal"
            />
            <Button
                style = {styles.button}
                onPress= {() => navigation.navigate("Appts")}
                title = "Appointments"
            />
        </View>
        <View style = {styles.row}>
            <Button 
                style = {styles.button}
                onPress= {() => navigation.navigate("Map")}
                title = "Map"
            />
            <Button
                style = {styles.button}
                onPress= {() => navigation.navigate("Pharmacy")}
                title = "Pharmacy"
            />
        </View>
        <View style = {styles.row}>
            <Button
                style = {styles.button}
                onPress= {() => navigation.navigate("News")}
                title = "News"
            />
            <Button
                style = {styles.button}
                onPress= {() => navigation.navigate("Directory")}
                title = "Directory"
            />
        </View>
        <View style = {styles.row}>
            <Button
                style = {styles.button}
                onPress= {() => navigation.navigate("Calendar")}
                title = "Calendar"
            />
            <Button
                sytle = {styles.button}
                onPress= {() => navigation.navigate("Classes")}
                title = "Attend A Class"
            />
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "stretch"
    },
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }
})
