import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ImageBackground, Modal, ActivityIndicator, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { EvilIcons, AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import * as eventsAction from '../../store/actions/event';
import { showMessage } from "react-native-flash-message";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import Diamand from '../loader';

import { timeDifference, upComingEvents } from '../../helpers/timeDifference';
import ENV from '../../env';
import EventMenu from "../../components/UI/EventMenu";
import { Platform } from 'react-native';

const Event = (props) => {
    const { route } = props;



    let userId;
    let event;



    const allAarticipants = useSelector(state => state.events.allParticipants);
    const friendsTabs = useSelector(state => state.friends.myFriends);
    const users = useSelector(state => state.users.allUsers);




    // event howa lobjet event lkol 
    // userId howa id ta3 luser connectee
    // thisEvent ymathal table participaction ta3 levent hadha bech ne5dhou menhom lparticipants


    if (route.params.event && route.params.userId) {
        userId = route.params.userId;
        event = route.params.event;


    } else {
        userId = props.userId;
        event = props.event;



    }


    const participants = allAarticipants.filter(e => e.refevent === event._id)[0];


    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [error, setError] = useState();

    const [isRefreshing, setIsRefreshing] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isParticipateLoading, setIsParticipateLoading] = useState(false);
    const [invitingLoading, setInvitingLoading] = useState(false);
    const loggedInUserId = useSelector(state => state.auth.user._id);

    const [showModal, setShowModal] = useState(false);

    const loadData = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(eventsAction.fetchParticipants());
            await dispatch(eventsAction.fetchEvents());

        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError])



    useEffect(() => {
        setIsLoading(true);

        loadData()
            .then(() => {
                setIsLoading(false);
            });
    }, [dispatch, loadData])




    const checkParticipation = (user_id) => {
        let checkPart = participants.parts.indexOf(user_id) !== -1;
        return checkPart;
    }



    const checkFriend = (userId) => {
        let check = friendsTabs.filter(f => f.userRef === loggedInUserId)[0].friends.indexOf(userId) !== -1;
        return check;
    }

    const getUserItem = (userId) => {
        return users.filter(u => u._id === userId)[0];

    }

    const toggleParticipate = async (eventId, friendId) => {



        setIsParticipateLoading(true);
        try {
            if (checkParticipation(loggedInUserId)) {

                await dispatch(eventsAction.unParticipate(eventId));
                showMessage({
                    message: "Cancel participation for this event.",
                    type: "default",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' },
                    backgroundColor: Colors.gold, // background color
                    color: 'black', // text color
                });


            } else {

                await dispatch(eventsAction.participate(eventId, friendId));
                showMessage({
                    message: "You had participated in this event.",
                    type: "default",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' },
                    backgroundColor: Colors.gold, // background color
                    color: 'black', // text color
                });

            }


        } catch (error) {
            console.log("ERROR ", error)
        }

        setIsParticipateLoading(false);

    }




    const toggleParts = async (friendId) => {
        toggleParticipate(event._id, friendId);
    }


    const inviteFriend = async (user) => {
        let eventId = event._id;
        let friendId = user._id;
        setInvitingLoading(true)
        try {
            await dispatch(eventsAction.inviteToMyEvent(eventId, friendId));
            showMessage({
                message: `You have invited this ${user.username} to your event.`,
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

        setInvitingLoading(false)
    }



    const checkInvitation = (userId) => {
        let checkInvite = event.invitedUsers.indexOf(userId) !== -1;
        return checkInvite;
    }
    //{ console.log(participants) }


    if (isLoading) {
        return (
            <Diamand />
        );
    }




    if (!isLoading && participants.length === 0) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'black',
                justifyContent: "center"
            }} >

                <Text style={{ color: 'white' }}>No participant found. </Text>


            </View>
        );
    }



    return (

        <View
            style={{
                flex: 1,
                backgroundColor: 'black',
                justifyContent: "center"
            }}>
            <Modal
                animationType={'fade'}
                transparent={false}
                visible={showModal}
            >
                <View

                    style={{
                        flex: 1,
                        alignItems: 'center',
                        backgroundColor: '#000', justifyContent: 'center',
                        padding: 20,
                    }}>
                    <View>
                        {users.map((user, index) => (
                            // console.log(category.cName)

                            user._id != loggedInUserId && (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 7 }} key={index}>
                                    <View style={{ width: 70, height: 70, marginHorizontal: 15 }}>
                                        <ImageBackground
                                            source={{ uri: `${ENV.apiUrl}/user/photo/${user._id}` }}

                                            style={{ height: '100%', width: '100%', resizeMode: 'cover' }}>

                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image

                                                    source={require('../../assets/pic_cover.png')}

                                                    style={{ width: '100%', height: '100%', resizeMode: 'cover', alignItems: 'center', justifyContent: 'center' }} />
                                            </View>

                                        </ImageBackground>
                                    </View>

                                    <View style={{
                                        alignItems: 'center', marginHorizontal: 15
                                        , justifyContent: 'center', margin: 7,

                                    }}



                                    >
                                        <Text style={{ color: Colors.gold, letterSpacing: 1, fontSize: 20 }}>{user.username}</Text>
                                    </View>

                                    <TouchableOpacity onPress={() =>
                                        inviteFriend(user)

                                    }
                                        style={{
                                            alignItems: 'center', justifyContent: 'center', borderColor: Colors.gold, borderWidth: 1, marginHorizontal: 15, width: 100

                                        }}

                                    >

                                        {


                                            checkInvitation(user._id) ? (
                                                <AntDesign style={{ marginHorizontal: 15 }}

                                                    name="check"


                                                    size={24}

                                                    color={Colors.gold}
                                                />
                                            ) : (
                                                <Text style={{ color: Colors.gold, fontWeight: '900', letterSpacing: 3, textTransform: 'capitalize', fontSize: 17, marginHorizontal: 15 }}>Invite</Text>

                                            )

                                        }

                                    </TouchableOpacity>

                                </View>


                            )
                        ))}
                    </View>


                    <TouchableOpacity style={{
                        position: 'absolute',
                        width: 40, right: 10, top: 15,
                        height: 40, backgroundColor: 'rgba(218,165,32,0.1)'
                        , alignItems: 'center', justifyContent: 'center',
                    }}
                        onPress={() => {
                            setShowModal(!showModal);
                        }}
                    >
                        <AntDesign

                            name="close"
                            size={24}
                            style={{ margin: 5 }}
                            color={Colors.gold}
                        />

                    </TouchableOpacity>
                </View>
            </Modal>
            <ScrollView
                contentContainerStyle={{
                    backgroundColor: '#000'
                }}
            >




                <ImageBackground
                    source={{ uri: `${ENV.apiUrl}/event/photo/${event._id}?${new Date(event.updated)}` }}
                    resizeMode='cover'
                    style={{
                        width: '100%',
                        height: 300
                    }} >

                    {/** IMAGE HEADER */}




                    {/** image shadow */}

                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end'
                        }}
                    >

                        <LinearGradient
                            colors={['transparent', 'black']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={{
                                width: '100%',
                                height: 100,
                                justifyContent: 'flex-end'
                            }}

                        >

                            <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', margin: 20, marginBottom: 10, marginTop: -50 }}>




                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>{event.title} </Text>

                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                    <Text style={{ color: Colors.gold, fontSize: 15, fontWeight: 'bold', letterSpacing: 1 }}>{event.date} AT {event.starttime}</Text>


                                    {event.postedBy._id === userId ? (
                                        <TouchableOpacity

                                            style={{
                                                alignSelf: 'flex-end', position: 'absolute', right: 10, top: 1, alignItems: 'flex-end'

                                            }}
                                        >
                                            <EventMenu event_id={event._id} />
                                        </TouchableOpacity>
                                    ) : (
                                        <View
                                        >
                                        </View>
                                    )}
                                </View>






                            </View>

                        </LinearGradient>


                    </View>

                </ImageBackground>

                {/**                  <Text style={{ color: 'grey', marginTop: 20 }}>{upComingEvents(new Date(event.date), new Date())}</Text>
*/}


                <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 50, marginBottom: 10, alignItems: 'center' }}>
                    <View style={{ width: 10, marginHorizontal: 5, height: 10, backgroundColor: Colors.gold, transform: [{ rotate: '45deg' }], }}>

                    </View>
                    <Text style={{ color: Colors.gold, fontSize: 15, fontWeight: 'bold', }} >DETAILS</Text>
                </View>

                <View style={{

                    marginHorizontal: 30,

                }}>

                    <Text style={{ lineHeight: 22, color: 'white', fontSize: 16, textAlign: 'justify' }}> {event.description} </Text>

                </View>




















                <View
                    style={{
                        height: 250, margin: 30, borderRadius: 30
                    }}>


                    <View style={{

                        marginTop: -10, marginBottom: 5

                    }}>
                        <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                            <View style={{ width: 10, marginHorizontal: 5, height: 10, backgroundColor: Colors.gold, transform: [{ rotate: '45deg' }], }}>

                            </View>
                            <Text style={{ color: Colors.gold, fontSize: 15, fontWeight: 'bold', }} >PLACE</Text>
                        </View>

                    </View>
                    <MapView
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        style={{
                            height: 250,
                        }}
                        minZoomLevel={15}
                        customMapStyle={mapDarkStyle}
                        provider={PROVIDER_GOOGLE}

                    >
                        <Marker coordinate=
                            {{
                                latitude: 37.78825,
                                longitude: -122.4324,
                            }}
                            pinColor={Colors.gold}

                        />
                    </MapView>
                    <Text style={{ color: 'white', fontSize: 16, }}> {event.place} </Text>

                </View>


                <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 50, marginBottom: 10, alignItems: 'center' }}>
                    <View style={{ width: 10, marginHorizontal: 5, height: 10, backgroundColor: Colors.gold, transform: [{ rotate: '45deg' }], }}>

                    </View>
                    <Text style={{ color: Colors.gold, fontSize: 15, fontWeight: 'bold', }} >WHO'S GOING ?</Text>
                </View>


                {/** my participant friend list */}

                <View style={{ marginHorizontal: 10, marginBottom: 10 }}>


                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', left: 20 }} >
                        <Text style={{ color: 'white', fontSize: 14, fontWeight: '900', }} >FRIENDS..</Text>

                    </View>

                    <ScrollView horizontal style={{ width: '90%', width: 70 }}
                    >
                        {participants.parts.map((item, index) => (


                            checkFriend(item) &&
                            (<TouchableOpacity key={index} style={{ justifyContent: 'center', alignItems: 'center', margin: 7 }} >



                                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{getUserItem(item).username}</Text>

                                <View style={{ width: 55, height: 55, marginVertical: 7 }} >

                                    <ImageBackground
                                        source={{ uri: `${ENV.apiUrl}/user/photo/${item}` }}

                                        style={{ height: '100%', width: '100%', resizeMode: 'cover' }}>

                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image

                                                source={require('../../assets/pic_cover.png')}

                                                style={{ width: '100%', height: '100%', resizeMode: 'cover', alignItems: 'center', justifyContent: 'center' }} />
                                        </View>

                                    </ImageBackground>


                                </View>



                            </TouchableOpacity>)

                        )




                        )}
                    </ScrollView>

                </View>





                {/** non friend list participant */}
                <View style={{ marginHorizontal: 10 }}>


                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', left: 20 }} >
                        <Text style={{ color: 'white', fontSize: 14, fontWeight: '900', }} >OTHER USERS..</Text>

                    </View>

                    <ScrollView horizontal style={{ width: '90%' }}
                    >
                        {participants.parts.map((item, index) => (


                            checkFriend(item) === false && item != loggedInUserId &&
                            (<TouchableOpacity key={index} style={{ justifyContent: 'center', alignItems: 'center', margin: 7 }} >



                                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{getUserItem(item).username}</Text>

                                <View style={{ width: 55, height: 55, marginVertical: 7 }} >

                                    <ImageBackground
                                        source={{ uri: `${ENV.apiUrl}/user/photo/${item}` }}

                                        style={{ height: '100%', width: '100%', resizeMode: 'cover' }}>

                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image

                                                source={require('../../assets/pic_cover.png')}

                                                style={{ width: '100%', height: '100%', resizeMode: 'cover', alignItems: 'center', justifyContent: 'center' }} />
                                        </View>

                                    </ImageBackground>


                                </View>
                            </TouchableOpacity>)

                        )




                        )}
                    </ScrollView>

                </View>





                <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 30, marginBottom: 10, alignItems: 'center' }}>
                    <View style={{ width: 10, marginHorizontal: 5, height: 10, backgroundColor: Colors.gold, transform: [{ rotate: '45deg' }], }}>

                    </View>
                    <Text style={{ color: Colors.gold, fontSize: 15, fontWeight: 'bold', }} >HOSTED BY</Text>
                </View>

                {/** posted by */}
                <View style={{ marginTop: 10, marginBottom: 100, width: '100%', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }} >


                    <View style={{ width: 70, height: 70 }}>
                        <ImageBackground
                            source={{ uri: `${ENV.apiUrl}/user/photo/${event.postedBy._id}` }}

                            style={{ height: '100%', width: '100%', resizeMode: 'cover' }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image

                                    source={require('../../assets/pic_cover.png')}

                                    style={{ width: '100%', height: '100%', resizeMode: 'cover', alignItems: 'center', justifyContent: 'center' }} />
                            </View>

                        </ImageBackground>
                    </View>


                    <View style={{ marginLeft: 10, width: '30%', height: 60, justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '900' }} >{event.postedBy.username}</Text>

                    </View>

                    {event.postedBy._id != userId &&
                        <TouchableOpacity
                            onPress={() =>

                                navigation.navigate('UserProfile', { userId: event.postedBy._id, username: event.postedBy.username })}

                            style={{ width: '40%', height: 45, position: 'absolute', justifyContent: 'center', alignItems: 'center', right: 20, borderWidth: 1, borderColor: Colors.gold, backgroundColor: 'rgba(212, 165, 61, 0.1)' }}>


                            <Text style={{ color: Colors.gold, fontSize: 15, fontWeight: 'bold', margin: 5, }} >VIEW PROFILE</Text>



                        </TouchableOpacity>}




                </View>






            </ScrollView>


            {event.postedBy._id === loggedInUserId &&
                (
                    <View style={{ width: '27%', height: 50, alignSelf: 'center', position: 'absolute', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', top: 5, right: 5, borderWidth: 1, borderColor: Colors.gold, }}>



                        <TouchableOpacity onPress={() => {
                            setShowModal(!showModal);
                        }}
                            style={{
                                width: '100%', flexDirection: 'row', height: '100%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center'

                            }}
                        // onPress={() => toggleParts(event.postedBy._id)}
                        >
                            <AntDesign
                                name='plus'
                                size={17}
                                color={Colors.gold}
                            />

                            <Text style={{ color: Colors.gold, fontWeight: '900', letterSpacing: 3, textTransform: 'capitalize', fontSize: 17 }}>Invite</Text>

                        </TouchableOpacity>


                    </View>

                )}


            {event.postedBy._id != userId &&
                (
                    <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', position: 'absolute', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', bottom: 5, borderWidth: 1, borderColor: Colors.gold, }}>

                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['rgba(212, 165, 61, 0.1)', 'rgba(212, 165, 61, 0.1)']}
                            style={{
                                alignItems: 'center', marginHorizontal: '5%',
                                height: 50,

                                width: '100%',
                                alignSelf: 'center'
                                , justifyContent: 'center',
                            }}>

                            <TouchableOpacity
                                style={{
                                    width: '90%', height: '100%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center'

                                }}
                                onPress={() => toggleParts(event.postedBy._id)}
                            >

                                <Text style={{ color: Colors.gold, fontWeight: '900', letterSpacing: 3, textTransform: 'capitalize', fontSize: 20 }}>{checkParticipation(loggedInUserId) ? 'Cancel participation' : 'Participate'}</Text>

                            </TouchableOpacity>

                        </LinearGradient>
                    </View>

                )}


        </View >
    );

};

const styles = StyleSheet.create({

    avatar: {
        width: 25,
        height: 25,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'black',
        marginLeft: -5
    },

})


const mapDarkStyle = [
    {
        elementType: "geometry",
        stylers: [
            {
                color: "#212121",
            },
        ],
    },
    {
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#212121",
            },
        ],
    },
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        featureType: "administrative.country",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9e9e9e",
            },
        ],
    },
    {
        featureType: "administrative.land_parcel",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#bdbdbd",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#181818",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#616161",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#1b1b1b",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#2c2c2c",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#8a8a8a",
            },
        ],
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
            {
                color: "#373737",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                color: "#3c3c3c",
            },
        ],
    },
    {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [
            {
                color: "#4e4e4e",
            },
        ],
    },
    {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#616161",
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#000000",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#3d3d3d",
            },
        ],
    },
];

export default Event;