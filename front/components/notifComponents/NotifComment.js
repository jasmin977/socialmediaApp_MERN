import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableHighlight, ActivityIndicator } from 'react-native';
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

import { TransText, TranslationConsumer } from 'react-native-translation';

import * as postsActions from '../../store/actions/posts';

import * as notifAcctions from '../../store/actions/notifs';

const msg = {
    "en-US": " commented on your post",
    "fr-FR": " a commenté votre publication",
}

const NotifComment = (props) => {
    const { notif } = props;
    const navigation = useNavigation();


    let username;
    const dispatch = useDispatch();


    const toggleLikeHandler = async (postId, isLiked) => {

        try {
            if (isLiked) {
                await dispatch(postsActions.unlikePost(postId))
            } else {
                await dispatch(postsActions.likePost(postId))
            }
        } catch (error) {
            console.log("ERROR ", error)
        }
    }




    const users = useSelector(state => state.users.allUsers);
    const posts = useSelector(state => state.posts.allPosts);
    const loggedUser = useSelector(state => state.auth.user);

    const currUser = users.filter(u => u._id === notif.commentor)[0];
    username = currUser.username;


    // notif.post hiya id ta3 lpost 
    const post = posts.filter(p => p._id === notif.post)[0];


    const vuNotif = async (notifId) => {
        try {
            await dispatch(notifAcctions.commentNotifSeen(notifId));
        } catch (err) {
            console.log(err);
        }

    }

    const touch = () => {
        vuNotif(notif._id),
            navigation.navigate('Post', { post: post, userId: loggedUser._id, toggleLikeHandler: toggleLikeHandler })
    }


    return (
        <TouchableHighlight

            onPress={() => touch()}>

            <View style={notif.VuPostComment ? styles.unseennotif : styles.notif}>



                <View style={{
                    marginLeft: 10, justifyContent: 'center'
                }}>



                    <ImageBackground
                        source={{ uri: `${ENV.apiUrl}/user/photo/${notif.commentor}` }}

                        style={{ height: 65, width: 65 }}>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image

                                source={notif.VuPostComment ? require('../../assets/pic_cover.png') : require('../../assets/pic_cover_stars.png')}

                                style={{ width: 65, height: 65, alignItems: 'center', justifyContent: 'center' }} />
                        </View>

                    </ImageBackground>

                </View>



                <View style={styles.seenNotif}>


                    <View style={{ flexDirection: 'column', marginHorizontal: 13, marginVertical: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', color: Colors.gold, fontSize: 16 }}>{username}</Text>
                            <TransText style={{ fontWeight: '300', color: 'white', fontSize: 15 }} dictionary={msg} />


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

export default NotifComment;