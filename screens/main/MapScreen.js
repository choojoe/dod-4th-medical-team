/**
 * TBC
 * ROUTE NAME: Map
 */
import React from "react"
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class MapScreen extends React.Component {
    render = () => {
        return (

                <MapView
                    style={{ flex: 1}}
                    initialRegion={{
                        latitude: 35.362014,
                        longitude: -77.959780,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
        );
    }
}
