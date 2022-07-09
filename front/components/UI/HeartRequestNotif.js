import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';
import {
    FontAwesome, AntDesign, MaterialCommunityIcons,
    Octicons
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Feather, Ionicons, Entypo } from '@expo/vector-icons'


import { timeDifference } from '../../helpers/timeDifference';

import Colors from '../../constants/Colors';
import ENV from '../../env';
import { useDispatch, useSelector } from "react-redux";
import HighlightText from '@sanar/react-native-highlight-text';

import VerifiedUser from '../../constants/VerifiedUser';
import PostMenu from "./PostMenu";
import ReportMenu from "./ReportMenuu";
import { TransText, TranslationConsumer } from 'react-native-translation';



const msg = {
    "en-US": " sent u a coup de coeur",
    "fr-FR": " b3athlk coup de coeur",
}



const HeartRequestNotif = (props) => {
    const { notif } = props;
    const navigation = useNavigation();


    let username;
    const dispatch = useDispatch();





    const users = useSelector(state => state.users.allUsers);
    const posts = useSelector(state => state.posts.allPosts);
    const loggedUser = useSelector(state => state.auth.user);

    const currUser = users.filter(u => u._id === notif.friend)[0];
    username = currUser.username;


    // notif.post hiya id ta3 lpost 
    const post = posts.filter(p => p._id === notif.post)[0];

    //console.log(post)

    return (
        <TouchableHighlight underlayColor="white"


        //    navigation.navigate('Post', { post: post, userId: loggedUser._id, toggleLikeHandler: toggleLikeHandler })}


        >
            <View style={styles.unseenNotif}>


                <View style={{
                    flexDirection: 'column', marginHorizontal: 15
                }}>

                    <View style={{
                        justifyContent: 'center', alignContent: 'center', borderRadius: 10,
                        width: 10, height: 10, alignSelf: 'center', backgroundColor: Colors.gold,
                    }}>

                    </View>
                    <View style={{
                        justifyContent: 'center', alignContent: 'center',
                        width: 2.5, height: 100, alignSelf: 'center', backgroundColor: '#111',
                    }}>

                    </View>

                </View>
                <View style={{
                    flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center',
                    width: '100%', backgroundColor: '#111', height: 90, marginHorizontal: 15, marginLeft: -5
                }}>


                    <View style={{ flexDirection: 'column', marginHorizontal: 20, marginVertical: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', color: Colors.gold, fontSize: 16 }}>{username}</Text>
                            <TransText style={{ fontWeight: '300', color: 'white', fontSize: 15 }} dictionary={msg} />


                        </View>


                        <Text style={{ fontWeight: 'bold', color: 'grey', marginVertical: 5 }}>{timeDifference(new Date(), new Date(notif.created))}</Text>

                    </View>

                    <TouchableOpacity style={{ position: 'absolute', right: 10, top: 10 }}>
                        <Entypo
                            name="dots-three-horizontal"

                            size={17}

                            color='white'
                        /></TouchableOpacity>




                </View>


            </View>

        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,


    },
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    row: {

        justifyContent: "space-around"
    },
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: "#000",

        alignItems: 'center',
    },
    unseenNotif: {

        backgroundColor: '#000',
        width: '100%',
        marginVertical: 5,
        height: 90,
        alignSelf: 'center',
        flexDirection: 'row'


    },
    seenNotif: {
        flex: 1,
        backgroundColor: '#000',
        width: '100%',
        marginVertical: 5,
        height: 90,
        alignSelf: 'center',

    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        width: '100%',
    },

})

export default HeartRequestNotif;