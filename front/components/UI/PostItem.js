import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground, ActivityIndicator, Platform, Alert, TouchableNativeFeedback, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Colors from '../../constants/Colors';
import ENV from '../../env';
import { useDispatch } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import VerifiedUser from '../../constants/VerifiedUser';

const EventItem = (props) => {
    const { post } = props;
    const navigation = useNavigation();
    const dispatch = useDispatch();



    //default image handler
    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }


    let TouchableComp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback;
    }




    return (


        <TouchableOpacity style={{
            flexDirection: 'row', width: 350,
            backgroundColor: '#000', marginVertical: 5,
            justifyContent: 'flex-start', alignItems: 'center'
        }}
            onPress={() =>

                navigation.navigate('UserProfile', { userId: user._id, name: user.username })}

        >


            <ImageBackground
                source={{ uri: `${ENV.apiUrl}/user/photo/${user._id}` }}
                // onError={onImageErrorHandler}
                style={{ height: 60, width: 60, justifyContent: 'flex-start' }}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image

                        source={require('../../assets/pic_cover.png')}

                        style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }} />
                </View>

            </ImageBackground>

            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginHorizontal: 10 }}>
                {user.username}</Text>

            <TouchableOpacity style={{
                position: 'absolute', right: 10,



            }}>
                <Image
                    style={{
                        height: 25,
                        width: 25,
                        margin: 5
                    }}
                    source={require('../../assets/icons/added.png')}
                ></Image>
            </TouchableOpacity>
        </TouchableOpacity>

    );
};






const styles = StyleSheet.create({
    event: {
        height: 400,
        width: '100%',


        backgroundColor: '#1D1D1D'



    },
    join: {
        backgroundColor: '#111',
        borderRadius: 50,
        width: 44,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 25,


    },
    private: {
        backgroundColor: 'grey',
        borderRadius: 50,
        width: 44,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 25,


    },
    name: {



    }

});

export default EventItem;