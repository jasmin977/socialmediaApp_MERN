import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    ImageBackground,
} from 'react-native';



import { useDispatch, useSelector } from 'react-redux';
import * as usersActions from '../../store/actions/users';
import * as notifActions from '../../store/actions/notifs';
import * as eventActions from '../../store/actions/event';
import * as postsActions from '../../store/actions/posts';


import Colors from '../../constants/Colors';



import NotifEvent from '../../components/notifComponents/NotifEvent';
import NotifPost from '../../components/notifComponents/NotifPost';
import NotifComment from '../../components/notifComponents/NotifComment';
import NotifFriendRequest from '../../components/notifComponents/NotifFriendRequest';
import NotifFriendAccept from '../../components/notifComponents/NotifFriendAccept';
import NotifHeartRequest from '../../components/notifComponents/NotifHeartRequest';
import NotifHeartAccept from '../../components/notifComponents/NotifHeartAccept';
import NotifJumRequest from '../../components/notifComponents/NotifJumRequest';
import NotifJumtAccept from '../../components/notifComponents/NotifJumtAccept';
import NotifAccesMedia from '../../components/notifComponents/NotifAccesMedia';
import NotifEventInvi from '../../components/notifComponents/NotifEventInvi';





import Diamand from '../loader'



import { Container, Header, Item, Input, Icon, Button } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';





const Notifs = (props) => {

    const dispatch = useDispatch();

    const [myAllAllNotifs, setArrsetMyAllAllNotifs] = useState([]);


    let myNotif
    const loggedInUserId = useSelector(state => state.auth.user._id);

    const notifs = useSelector(state => state.notifs.allNotifs);
    myNotif = notifs.filter(n => n.userRef === loggedInUserId)[0];




    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const refNotifs = useRef(null);







    const addNotif = (notif) => {
        let check;
        // console.log(notif)
        check = myAllAllNotifs.includes(notif);
        if (check === false) {
            setArrsetMyAllAllNotifs(myAllAllNotifs => [...myAllAllNotifs, notif]);
        }


    }

    const getMyNotifs = () => {

        setArrsetMyAllAllNotifs([]);

        if (myNotif) {

            if (myNotif.postLike.length != 0) { // si 3andou des likes notif
                myNotif.postLike.map((likeNotif, index) => {

                    addNotif(likeNotif)

                })

            }
            if (myNotif.postComment.length != 0) { // si 3andou des coment notif
                myNotif.postComment.map((commentNotif, index) => {

                    addNotif(commentNotif)

                })

            }
            if (myNotif.eventPart.length != 0) { // si 3andou des participation
                myNotif.eventPart.map((partNotif, index) => {

                    addNotif(partNotif)

                })

            }
            if (myNotif.friendReq.length != 0) { // si 3andou des friendReq
                myNotif.friendReq.map((friendReqNotif, index) => {

                    addNotif(friendReqNotif)

                })

            }
            if (myNotif.friendAccept.length != 0) { // si fama chkoun accepteh as a friend
                myNotif.friendAccept.map((friendAcceptNotif, index) => {

                    addNotif(friendAcceptNotif)

                })

            }

            if (myNotif.heartReq.length != 0) { // si had b3athlou coup de coeur
                myNotif.heartReq.map((heartReqNotif, index) => {

                    addNotif(heartReqNotif)

                })

            }
            if (myNotif.heartAccept.length != 0) { // si had 9belou lcoup de coeur
                myNotif.heartAccept.map((heartAcceptNotif, index) => {

                    addNotif(heartAcceptNotif)

                })

            }
            if (myNotif.jumlageReq.length != 0) { // si 3andou jum req
                myNotif.jumlageReq.map((jumlageReqNotif, index) => {

                    addNotif(jumlageReqNotif)

                })

            }
            if (myNotif.jumlageAccept.length != 0) { // si 3andou jum accept
                myNotif.jumlageAccept.map((jumlageAcceptNotif, index) => {

                    addNotif(jumlageAcceptNotif)

                })

            }
            if (myNotif.AcceToMedia.length != 0) { // si 3andou req lacces ta3 album
                myNotif.AcceToMedia.map((accessReq, index) => {

                    addNotif(accessReq)

                })

            }
            if (myNotif.eventInv.length != 0) { // si had inveteh levent
                myNotif.eventInv.map((eventInv, index) => {

                    addNotif(eventInv)

                })

            }

        } else {
            console.log('didnt fetch notif yet')
        }



    }
    useEffect(() => {
        myNotif = notifs.filter(n => n.userRef === loggedInUserId)[0];
        getMyNotifs()
    }, [notifs])


    // console.log(myNotif)



    // loads all the posts
    const loadData = useCallback(async () => {

        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(notifActions.fetchNotifs());
            await dispatch(usersActions.fetchUsers());
            await dispatch(usersActions.fetchMyAlbum());
            await dispatch(postsActions.fetchPosts());
            await dispatch(postsActions.fetchMedia());

            await dispatch(usersActions.fetchMyFriend());
            await dispatch(usersActions.fetchJumelages());
            await dispatch(eventActions.fetchEvents());

        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError])





    useEffect(() => {

        setIsLoading(true);
        // console.log('set loading ')
        loadData().then(() => {
            // getMyNotifs();

            setIsLoading(false);

        });

    }, [dispatch, loadData])






    const sortNotification = (list) => {

        return list.sort(function (a, b) {
            return new Date(b.created) - new Date(a.created);
        })



    }

    if (error) {
        return (
            <View style={styles.container} >
                <Text>An error occured.</Text>
                <Button title="Load notifs" onPress={loadData} color={Colors.gold_brown} />
            </View>
        );
    }



    if (isLoading) {
        return (
            <Diamand />
        );
    }


    if (!isLoading && notifs.length === 0) {
        return (
            <View style={styles.centered} >

                <Text style={{ color: 'white' }}>No notif found.</Text>


            </View>
        );
    }

    if (!isLoading && myAllAllNotifs.length === 0) {
        return (
            <View

                style={styles.centered} >
                <Text style={{ fontWeight: '900', color: 'white', fontSize: 25, letterSpacing: 2, position: 'absolute', top: 10, left: 2 }}>  Notifications</Text>





                <Image source={require('../../assets/noNotif.gif')}
                    style={{ width: 400, height: 300, }} />
                <TouchableOpacity onPress={loadData}>
                    <Text style={{ color: 'white', fontSize: 16, letterSpacing: 1, alignSelf: 'center' }}>No notifications yet!</Text>
                    <Text style={{ color: 'grey', fontSize: 15, letterSpacing: 1, alignSelf: 'center' }}>Refresh to get notifications</Text>


                </TouchableOpacity>




            </View>
        );
    }


    return (
        <ImageBackground style={styles.background}
            source={require('../../assets/stars.jpg')}
        >



            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginVertical: 10 }}>
                <Text style={{ fontWeight: '900', color: 'white', fontSize: 25, letterSpacing: 2, }}>  Notifications</Text>



            </View>



            <FlatList

                data={sortNotification(myAllAllNotifs)}
                style={styles.list}
                onRefresh={loadData}
                refreshing={isRefreshing}
                ref={refNotifs}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={true}
                marginTop={10}

                renderItem={(notif) => {

                    //   console.log(notif)

                    if (notif.item.liker) { //ya3ni ken hal notif hiya likedPost
                        return <NotifPost notif={notif.item} />

                    }
                    if (notif.item.inviter) {
                        return <NotifEventInvi notif={notif.item} />

                    }
                    if (notif.item.participant) { //ya3ni ken hal notif hiya participation
                        return <NotifEvent notif={notif.item} />

                    }
                    if (notif.item.commentor) { //ya3ni ken hal notif hiya comentaire 3la post
                        return <NotifComment notif={notif.item} />

                    }
                    if (notif.item.friendrequester) { //ya3ni ken hal notif hiya 7ad b3athlk invi
                        return <NotifFriendRequest notif={notif.item} />

                    }
                    if (notif.item.friendaccepter) { //ya3ni ken hal notif hiya 7ad 9eblk as a friend
                        return <NotifFriendAccept notif={notif.item} />

                    }
                    if (notif.item.heartrequester) { //ya3ni ken hal notif hiya kn had b3athlk coup de coeur
                        return <NotifHeartRequest notif={notif.item} />

                    }
                    if (notif.item.heartaccepter) { //ya3ni ken hal notif hiya had 9belek el coup de coeur
                        return <NotifHeartAccept notif={notif.item} />

                    }
                    if (notif.item.jumlagerequester) { //ya3ni ken hal notif hiya had b3athlk demande jumlage
                        return <NotifJumRequest notif={notif.item} />

                    }
                    if (notif.item.jumlageaccepter) { //ya3ni ken hal notif hiya lo5er 9bel ya3ml jumlage m3ak
                        return <NotifJumtAccept notif={notif.item} />

                    }
                    if (notif.item.AcceMedia) {
                        return <NotifAccesMedia notif={notif.item} />

                    }





                }}



            />



        </ImageBackground>
    );
};





const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: "#000",


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
        flex: 1,
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

    list: {
        width: '100%',
    },



});

export default Notifs;

