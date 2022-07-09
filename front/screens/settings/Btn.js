import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import * as userActions from '../../store/actions/users';
import { showMessage } from "react-native-flash-message";

import { useDispatch, useSelector } from "react-redux";


const LocationButton = (props) => {

    const dispatch = useDispatch();
    const { location } = props;

    console.log(location)
    const myLocation = async (lat, long) => {
        try {
            await dispatch(userActions.getLocation(lat, long));
            showMessage({
                message: `Get Location.`,
                type: "default",
                duration: 3000,
                icon: { icon: "success", position: 'left' },

                backgroundColor: Colors.gold, // background color
                color: 'black', // text color
            });

        }
        catch (error) {
            console.log("ERROR ", error)
        }
    }



    return (



        <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={['#000', Colors.gold, '#000']}
            style={{
                alignItems: 'center',
                height: 60,
                position: 'absolute', bottom: 10,
                width: '100%',

                justifyContent: 'center',
            }}>
            <TouchableOpacity
                onPress={() => myLocation(location.latitude, location.longitude)}
                style={{
                    alignItems: 'center',
                    height: 60,

                    width: '100%',
                    justifyContent: 'center',
                }} >
                <Text style={{
                    textAlign: 'center',
                    fontWeight: '900',
                    fontSize: 20, fontStyle: 'italic',
                    color: "#fff", letterSpacing: 1
                }}>
                    Get my Location
                        </Text>
            </TouchableOpacity>
        </LinearGradient>


    );
}
export default LocationButton;


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