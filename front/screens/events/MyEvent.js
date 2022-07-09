import React, { useState, useCallback, useEffect, useRef } from 'react';

import { View, Animated, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions, Image, StyleSheet, Text } from 'react-native';
import Colors from '../../constants/Colors';
import { Col, Container, Input } from 'native-base';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import EventItem from '../../components/UI/EventItemSearch';


const MyEvents = () => {





    const navigation = useNavigation();

    const loggedInUserId = useSelector(state => state.auth.user._id);


    const participants = useSelector(state => state.events.allParticipants);

    const users = useSelector(state => state.users.allUsers);
    const events = useSelector(state => state.events.allEvents);
    const me = users.filter(u => u._id === loggedInUserId)[0];
    const myEvents = events.filter(e => e.postedBy._id === loggedInUserId);



    const partOfTheEvent = (eventId) => {
        return participants.filter(e => e.refevent === eventId)[0];
    }




    return (



        <View style={{ backgroundColor: 'black', justifyContent: 'center', flex: 1 }}>
            <View style={{ marginTop: 10 }}>



                {myEvents.length === 0 &&

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
                        <Text style={{ fontSize: 20, color: "grey", letterSpacing: 1.2 }} >No Events</Text>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Add Event')}
                            style={{
                                alignItems: 'center',
                                backgroundColor: 'rgba(218,165,32,0.1)', justifyContent: 'center', width: 250,
                                padding: 10, marginTop: 20, height: 45
                            }}
                        >
                            <Text style={{ color: Colors.gold, fontWeight: '900', fontSize: 17, padding: 5, }} >Create One</Text>
                        </TouchableOpacity>


                    </View>}




                <FlatList

                    data={myEvents}
                    keyExtractor={(e, i) => i.toString()}

                    renderItem={(event) => {
                        //{oneItem.item.searchBy}
                        return (

                            <EventItem event={event.item} userId={loggedInUserId} thisEvent={partOfTheEvent(event.item._id)} />

                        )

                    }}

                />




            </View>
        </View>






    );
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        width: '100%',
        backgroundColor: "#000",

        alignItems: 'center',
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
    btn_list: {
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        width: Dimensions.get('window').width / 4,

        margin: 5
    },
    btnActive: {
        backgroundColor: Colors.gold, borderRadius: 10,
    },
    highlighted: {
        backgroundColor: Colors.gold,
        color: 'white'
    }


});

export default MyEvents;