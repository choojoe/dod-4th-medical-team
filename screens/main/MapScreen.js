/**
 * TBC
 * ROUTE NAME: Map
 */
import React from "react"
import { Text, Button, View, Dimensions, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import {MapView, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
// import Geolocation from '@react-native-community/geolocation';
const GOOGLE_MAPS_APIKEY = "AIzaSyAHX61bmDFYT3zxGPgJrYGb2FuB8E0_zAM"

const { width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 35.362014
const LONGITUDE = -77.959780
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = 0.0421
// Geolocation.setRNConfiguration(config);

export default class MapScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            latitude: 35.362835,
            longitude: -77.960997, 
            location: null,
            loading: false
        };
    }

    // async componentDidMount(){
    //     const { status } = await Permissions.getAsync(Permissions.LOCATION)

    //     if (status != 'granted'){
    //         const response = await Permissions.askAsync(Permissions.LOCATION)
    //     }
    //     GetLocation.getCurrentPosition(LocationConfig)(
    //     // navigator.geolocation.getCurrentPosition(
    //             ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }), () => console.log('State: ', this.state),
    //             (error) => console.log('Error: ', error)
    //         )
    // }

    // _requestLocation() {
    //     this.setState({ latitude: 35.362835, longitude: -77.960997, loading: true, });
    //     console.log(this.state.loading)
    //     this.setState({ location: null, loading: true, });

    //     GetLocation.getCurrentPosition({
    //         enableHighAccuracy: true,
    //         timeout: 150000,
    //     })
    //         .then(location => {
    //             console.log(location)
    //             this.setState({
    //                 latitude: location.latitude,
    //                 longitude: location.longitude,
    //                 location,
    //                 loading: false,
    //             });
    //         })
    //         .catch(ex => {
    //             const { code, message } = ex;
    //             console.log(ex)
    //             console.warn(code, message);
    //             if (code === 'CANCELLED') {
    //                 Alert.alert('Location cancelled by user or by another request');
    //             }
    //             if (code === 'UNAVAILABLE') {
    //                 Alert.alert('Location service is disabled or unavailable');
    //             }
    //             if (code === 'TIMEOUT') {
    //                 Alert.alert('Location request timed out');
    //             }
    //             if (code === 'UNAUTHORIZED') {
    //                 Alert.alert('Authorization denied');
    //             }
    //             this.setState({
    //                 latitude: 35.362835,
    //                 longitude: -77.960997,
    //                 location: null,
    //                 loading: false,
    //             });
    //         });
    // }

      render() {
          const { location, loading } = this.state;
        return (
            <View style ={styles.container}>
                <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: 35.362835,
                    longitude: -77.960997,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                >
                </MapView>
                <Text> To get location, press the button: </Text>
                <View style={styles.button}>
                    <Button
                        disabled={loading}
                        title="Get Location"
                        onPress = {() => this._requestLocation()}
                    />
                </View>
                {loading ? (
                    <ActivityIndicator />
                ) : null}
                {location ? (
                    <Text style={styles.location}>
                        {JSON.stringify(location, 0, 2)}
                    </Text>
                ) : null}
            </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        flex: 2
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    button: {
        flex: 2,
    },
    location: {
        color: '#333333',
    }
});

