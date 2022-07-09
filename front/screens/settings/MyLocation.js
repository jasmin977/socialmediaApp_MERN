import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { mapDarkStyle } from '../nearByUsers/mapData';
import Colors from '../../constants/Colors';
import LocationButton from './Btn'


export default class Locationn extends React.Component {


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


            <View style={styles.overlay}>

                <View
                    style={{
                        height: 300, margin: 30, borderColor: Colors.gold, borderWidth: 0.5, width: '90%'
                    }}>

                    {location &&
                        <MapView

                            initialRegion={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            style={{
                                height: 300
                            }}
                            minZoomLevel={15}
                            customMapStyle={mapDarkStyle}
                            provider={PROVIDER_GOOGLE}

                        >
                            <Marker coordinate=
                                {{ latitude: location.latitude, longitude: location.longitude }}
                                pinColor={Colors.gold}
                                title={"Me"}
                            />
                        </MapView>
                    }


                </View>
                <Text style={styles.heading1}>{geocode ? `${geocode[0].city}, ${geocode[0].isoCountryCode}` : ""}</Text>
                <Text style={styles.heading2}>{geocode ? geocode[0].street : ""}</Text>
                <Text style={styles.heading3}>{location ? `${location.latitude}, ${location.longitude}` : ""}</Text>
                <Text style={styles.heading2}>{errorMessage}</Text>

                <LocationButton location={location} />


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
        width: '100%',
        justifyContent: "flex-start",
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