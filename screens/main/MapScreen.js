/**
 * MapScreen manages the Map Screen which can be navigated to via the Home Screen.
 * ROUTE NAME: Map
 */

//Import React and basic React Native Components 
import React from "react"
import { Text, Button, View, Dimensions, StyleSheet, Alert, ActivityIndicator } from 'react-native';

//This is the Map layout of our choice. MapView is the Map Frame, Marker is the red pins located on the MapvView. Importing Map information from Google Maps.
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
//Permissions allows us to ask users if we can have permission to retrieve their device's location.
import * as Permissions from 'expo-permissions';
//Location is a tool that allows us to actually retrieve the user's device location.
import * as Location from 'expo-location';
//MapViewDirections is the package that allows us to obtain directions from one coordinate to another.
import MapViewDirections from 'react-native-maps-directions';
//Our API Key 
const GOOGLE_MAPS_APIKEY = "AIzaSyAHX61bmDFYT3zxGPgJrYGb2FuB8E0_zAM"

//Sets width to the screen width, height to screen height, aspect ratio to the ratio of w:h.
const { width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
//Constants representing the coordinates of the 4th Medical Group.
const LATITUDE = 35.362014
const LONGITUDE = -77.959780
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
//Title used to label coordinates above ^.
const DESTINATION_TITLE = "4th Medical Group"

//The main class of the MapScreen. Export default ensures that the contents of this class are returned
//when the Map button is pressed and the MapScreen is called.
export default class MapScreen extends React.Component {
    //Initialize the class as well as its initial state.
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

    //This is called on when the user enters this screen. The purpose of this is to determine
    //whether the user gives permission for this function to view the device's location.
    //throws error if unable to obtain permission.
    async componentDidMount(){
        let { status } = await Location.requestPermissionsAsync();
        console.log(status)
        if (status !== 'granted') {
            this.setState( {
                loading: false,
                error: 'Permission to access location was denied',
            })
        }

    //Function used to actually obtain the device's coordinates, store them in state.
    let location = Location.getCurrentPositionAsync({}).then(data =>
            {this.setState({
                latitude: data.coords.latitude,
                longitude: data.coords.longitude,
                location: data,
                loading: false,
                })
            }
        )
    }
    //renders the MapScreen visual components. 
      render() {
        let text = 'Waiting..';
        if (this.state.error) {
          text = this.state.error;
        }else if (this.state.location) {
          text = "";
        }
        //User first enters screen, hasn't requested directions yet to views the following:
        //A MapView showing the 4th Medical Group Region and a "Directions" button that, on click, sets this.state.directions to true,
        //and will return directions.
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
        //if this.state.directions is true, this code will run and 
        //return a MapView with directions from the device location to the 4th Medical Group.
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
                    rotateEnabled={true} //allows you to rotate mapview
                    scrollEnabled={true} //allows user to scroll through map on tap
                    zoomEnabled={true} //allows user to zoom in
                    showsCompass={true} //should show a compass - doesn't work 
                    followsUserLocation={true} //follows user's location after they move
                    showsUserLocation={true} //shows blue dot 
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

//Style sheets that determine styling for the screen.
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

