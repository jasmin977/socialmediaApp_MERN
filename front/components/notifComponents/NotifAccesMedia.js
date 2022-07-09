import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight, ImageBackground, ActivityIndicator, Platform, Alert, TouchableNativeFeedback, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import * as notifAcctions from '../../store/actions/notifs';
import ENV from '../../env';

import { TransText } from 'react-native-translation';

import { timeDifference } from '../../helpers/timeDifference';

import Colors from '../../constants/Colors';

const access = {
    "en-US": "You can now access to ",
    "fr-FR": "Vous pouvez accéder à l'album privé de  ",
}
const privatee = {
    "en-US": " 's  ",
    "fr-FR": " ",
}
const album = {
    "en-US": " private album.",
    "fr-FR": " ",
}

const NotifAccesMedia = (props) => {
    const { notif } = props;
    const navigation = useNavigation();

    const dispatch = useDispatch();


    let username;


    const users = useSelector(state => state.users.allUsers);



    const currUser = users.filter(u => u._id === notif.AcceMedia)[0];
    username = currUser.username;



    const vuNotif = async (notifId) => {
        try {
            await dispatch(notifAcctions.accessMediaNotifSeen(notifId));
        } catch (err) {
            console.log(err);
        }

    }

    const touch = () => {
        vuNotif(notif._id),
            navigation.navigate('UserProfile', { userId: notif.AcceMedia, username: username })
    }


    return (
        <TouchableHighlight
            onPress={() => touch()}>
            <View style={notif.VuAcceMed ? styles.unseennotif : styles.notif}>



                <View style={{
                    marginLeft: 10, justifyContent: 'center'
                }}>



                    <ImageBackground
                        source={{ uri: `${ENV.apiUrl}/user/photo/${notif.AcceMedia}` }}

                        style={{ height: 65, width: 65 }}>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image

                                source={notif.VuAcceMed ? require('../../assets/pic_cover.png') : require('../../assets/pic_cover_stars.png')}

                                style={{ width: 65, height: 65, alignItems: 'center', justifyContent: 'center' }} />
                        </View>

                    </ImageBackground>

                </View>



                <View style={styles.seenNotif}>

                    <View style={{ flexDirection: 'column', marginHorizontal: 13, marginVertical: 10, width: '90%', }}>
                        <View style={{ flexDirection: 'row', }}>
                            <TransText style={{ fontWeight: '300', color: 'white', fontSize: 15 }} dictionary={access} ></TransText>
                            <Text style={{ fontWeight: 'bold', color: Colors.gold, fontSize: 16 }}>{username}</Text>
                            <TransText style={{ fontWeight: '300', color: 'white', fontSize: 15 }} dictionary={privatee}>  </TransText>





                        </View>
                        <TransText style={{ fontWeight: '300', color: 'white', fontSize: 15 }} dictionary={album}></TransText>

                        <Text style={{ fontWeight: '900', color: 'rgba(255,255,255,0.7)', marginVertical: 5 }}>{timeDifference(new Date(), new Date(notif.created))}</Text>


                    </View>



                </View>


            </View>

        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({


    row: {

        justifyContent: "space-around"
    },

    notif: {

        backgroundColor: 'rgba(218,165,32,0.2)',
        width: '95%',
        marginVertical: 5, borderColor: 'rgba(218,165,32,0.6)', borderWidth: 0.4,
        height: 90,
        alignSelf: 'center',
        flexDirection: 'row'


    },
    unseennotif: {

        backgroundColor: 'rgba(0,0,0,0.4)',
        width: '95%',
        marginVertical: 5, borderColor: 'rgba(255,255,255,0.3)', borderWidth: 0.4,
        height: 90,
        alignSelf: 'center',
        flexDirection: 'row'


    },
    seenNotif: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        height: 90,
        marginHorizontal: 10,
        marginLeft: -5,
        width: '100%',

    },



})

export default NotifAccesMedia;