import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ImageBackground, ActivityIndicator, Platform, Alert, TouchableNativeFeedback, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Feather, Ionicons, Entypo } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux';

import { TransText } from 'react-native-translation';

import { timeDifference } from '../../helpers/timeDifference';

import Colors from '../../constants/Colors';
import ENV from '../../env';

import * as notifAcctions from '../../store/actions/notifs';
const twin = {
    "en-US": " accepted your twinning request.",
    "fr-FR": " a accepté votre demande de jumelage",
}
const NotifJumtAccept = (props) => {
    const { notif } = props;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // var notif lenna ymathal l id mta3 eli b3ath demande
    let username;


    const users = useSelector(state => state.users.allUsers);

    const loggedInUserId = useSelector(state => state.auth.user._id);


    const currUser = users.filter(u => u._id === notif.jumlageaccepter)[0];
    username = currUser.username;



    const vuNotif = async (notifId) => {
        try {
            await dispatch(notifAcctions.jumlageAcceptNotifSeen(notifId));
        } catch (err) {
            console.log(err);
        }

    }

    const touch = () => {
        vuNotif(notif._id),
            navigation.navigate('UserProfile', { userId: notif.jumlageaccepter, username: username })
    }



    return (
        <TouchableHighlight
            onPress={() => touch()}>
            <View style={notif.VuJumlageAcc ? styles.unseennotif : styles.notif}>



                <View style={{
                    marginLeft: 10, justifyContent: 'center'
                }}>



                    <ImageBackground
                        source={{ uri: `${ENV.apiUrl}/user/photo/${notif.jumlageaccepter}` }}

                        style={{ height: 65, width: 65 }}>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image

                                source={notif.VuJumlageAcc ? require('../../assets/pic_cover.png') : require('../../assets/pic_cover_stars.png')}

                                style={{ width: 65, height: 65, alignItems: 'center', justifyContent: 'center' }} />
                        </View>

                    </ImageBackground>

                </View>



                <View style={styles.seenNotif}>

                    <View style={{ flexDirection: 'column', marginHorizontal: 13, marginVertical: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', color: Colors.gold, fontSize: 16 }}>{username}</Text>
                            <TransText style={{ fontWeight: '300', color: 'white', fontSize: 15 }} dictionary={twin}>

                            </TransText>


                        </View>

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


export default NotifJumtAccept;