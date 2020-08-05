/**
 * TBC
 * ROUTE NAME: Map
 */
import React from "react"
import { Text, Button, View, Dimensions, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

// import Geolocation from '@react-native-community/geolocation';
const GOOGLE_MAPS_APIKEY = "AIzaSyAHX61bmDFYT3zxGPgJrYGb2FuB8E0_zAM"

const { width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 35.362014
const LONGITUDE = -77.959780
const LATITUDE_DELTA = 0.0922
const DESTINATION_TITLE = "4th Medical Group"
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// Geolocation.setRNConfiguration(config);

export default class MapScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            latitude: 35.362835,
            longitude: -77.960997, 
            location: null,
            loading: false,
            error: null,
            directions: false,
            markers: [
                {
                    coordinate: {
                        latitude: 35.362835,
                        longitude: -77.960997
                    },
                    title: "4th Medical Group",
                    id: 1
                },
            ]
        };
    }

    async componentDidMount(){
        let { status } = await Location.requestPermissionsAsync();
        console.log(status)
        if (status !== 'granted') {
            this.setState( {
                loading: false,
                error: 'Permission to access location was denied',
            })
        }

    let location = Location.getCurrentPositionAsync({}).then(data =>
            {this.setState({
                latitude: data.coords.latitude,
                longitude: data.coords.longitude,
                location: data,
                loading: false,
                })
            }
        )
        console.log(this.state.location)
    }

      render() {
        let text = 'Waiting..';
        console.log("set text to waiting")
        if (this.state.error) {
          text = this.state.error;
          console.log(text)
        }else if (this.state.location) {
          text = "";
          console.log("stringified location")
          console.log(text)
          console.log(this.state.latitude)
        }
        if (!this.state.directions) {
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
                }}>
                </MapView>
                <Button
                    title = "Directions"
                    onPress={() => {
                        this.setState({
                            directions: true,
                    })}
                    }
                />
            </View>
            )
        }
        else{
            return (
                <View style ={styles.container}>
                    <MapView
                    ref={MapView => (this.MapView = MapView)}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: 35.362835,
                        longitude: -77.960997,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={StyleSheet.absoluteFill}
                    ref={c => this.mapView = c}
                    onPress={this.onMapPress}
                    rotateEnabled={true}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    showsCompass={true}
                    followsUserLocation={true}
                    showsUserLocation={true}
                    onMapReady={() => {
                        PermissionsAndroid.request(
                          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                        ).then(granted => {
                          alert(granted) // just to ensure that permissions were granted
                        });
                      }}
                    >
                    {this.state.markers.map((marker:any)  => (  
                        <MapView.Marker
                          key={marker.id}
                          coordinate={marker.coordinate}
                          title={marker.title}
                          description={marker.description}
                        />
                    )
                    )}
                    <MapViewDirections
                        origin={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                        }}
                        destination={{
                            latitude: LATITUDE,
                            longitude: LONGITUDE,
                        }}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="red"
                        optimizeWaypoints={true}
                        
                        onReady={result => {
                            console.log(`Distance: ${result.distance} km`)
                            console.log(`Duration: ${result.duration} min.`)
              
                            this.mapView.fitToCoordinates(result.coordinates, {
                              edgePadding: {
                                right: (width / 20),
                                bottom: (height / 20),
                                left: (width / 20),
                                top: (height / 20),
                              }
                            });
                        }}
                        onError={(errorMessage) => {
                          // console.log('GOT AN ERROR');
                        }}
                    />
                    </MapView>
                    <Text> {text} </Text>
                    <Button
                    title = "Undo Directions"
                    onPress={() => {
                        this.setState({
                            directions: false,
                        })}
                    }
                    />
                </View>
            );
        }
        
      }
}
/* <View style={styles.button}>
                    <Button
                        disabled={loading}
                        title="Get Location"
                        // onPress = {() => this._requestLocation()}
                    />
                </View> */
                /* {loading ? (
                    <ActivityIndicator />
                ) : null}
                {location ? (
                    <Text style={styles.location}>
                        {JSON.stringify(location, 0, 2)}
                    </Text>
                ) : null} */
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

