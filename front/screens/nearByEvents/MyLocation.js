import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { mapDarkStyle } from './dataEvents';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";

import Map from './Map';


export default class MyLocationEvents extends React.Component {

    state = {
        location: null,
        geocode: null,
        errorMessage: "",

    }
    componentDidMount() {
        this.getLocationAsync()
    }
    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation });
        const { latitude, longitude } = location.coords
        this.getGeocodeAsync({ latitude, longitude })
        this.setState({ location: { latitude, longitude } });

    };
    getGeocodeAsync = async (location) => {
        let geocode = await Location.reverseGeocodeAsync(location)
        this.setState({ geocode })
    }


    render() {
        const { location, geocode, errorMessage } = this.state;

        return (
            <View style={{ flex: 1 }}>
                {location &&
                    <Map location={location} />
                }
            </View>



        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    overlay: {
        backgroundColor: "#000",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    heading1: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 30,
        margin: 20
    },
    heading2: {
        color: "#fff",
        margin: 5,
        fontWeight: "bold",
        fontSize: 15
    },
    heading3: {
        color: "#fff",
        margin: 5
    }
});