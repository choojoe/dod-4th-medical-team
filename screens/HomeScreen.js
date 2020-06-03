/**
 * Home Screen - the screen that loads up on default.
 * ROUTE NAME: Home.
 * This screen contains the 8 main buttons we want our users to look at.
 * Formatting to be completed soon.
 */
import React from "react"
import {View, Button, StyleSheet} from "react-native"
export default function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Button
            onPress={() => navigation.navigate("Test")}
            title = "COVID-19"
        />
        <Button
            onPress= {() => navigation.navigate("Test")}
            title = "News"
        />
        <Button
            onPress= {() => navigation.navigate("Test")}
            title = "Online Center"
        />
        <Button
            onPress= {() => navigation.navigate("Test")}
            title = "Appointments"
        />
        <Button
            onPress= {() => navigation.navigate("Test")}
            title = "Calendar"
        />
        <Button
            onPress= {() => navigation.navigate("Test")}
            title = "Directory"
        />
        <Button
            onPress= {() => navigation.navigate("Test")}
            title = "Billing Info"
        />
        <Button
            onPress= {() => navigation.navigate("Test")}
            title = "Call Us"
        />
      </View>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        alignContent: "stretch",
        justifyContent: "center",
        flexWrap: "wrap"
    }
})