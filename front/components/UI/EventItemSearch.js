import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground, ActivityIndicator, Platform, Alert, TouchableNativeFeedback, Dimensions } from 'react-native';
import {
    Entypo, AntDesign, MaterialCommunityIcons,
    Octicons
} from '@expo/vector-icons';


import { useNavigation } from '@react-navigation/native';

import { timeDifference } from '../../helpers/timeDifference';
import Colors from '../../constants/Colors';
import ENV from '../../env';

import { useDispatch, useSelector } from 'react-redux';

const EventItem = (props) => {
    const { event, userId } = props;
    // event howa lobjet event lkol 
    // userId howa id ta3 luser connectee


    const navigation = useNavigation();
    const dispatch = useDispatch();

    const participants = useSelector(state => state.events.allParticipants);
    const partss = participants.filter(e => e.refevent === event._id)[0];

    const [isImageLoading, setIsImageLoading] = useState(true);

    let TouchableComp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback;
    }



    // console.log('partss.parts.length' + partss.parts.length)
    /////////////////////////


    return (


        <View style={{
            flex: 1, alignSelf: 'center',
            width: '95%', margin: 2,
            backgroundColor: Colors.gold,
            marginVertical: 10,
            alignItems: 'center',
        }}>


            <TouchableOpacity
                style={{
                    width: '100%', height: 290, borderWidth: 0.8, borderColor: '#111', backgroundColor: '#000',
                    alignContent: 'center', justifyContent: 'flex-start', borderRadius: 15
                }}

                onPress={() =>

                    navigation.navigate('Event', { event: event, userId: userId })}
            >
                <ImageBackground
                    source={{ uri: `${ENV.apiUrl}/event/photo/${event._id}?${new Date(event.updated)}` }}
                    onLoad={() => setIsImageLoading(false)}
                    style={{ width: '100%', height: 160, alignItems: 'center' }} resizeMode='cover'>


                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Image

                            source={require('../../assets/bg_event.png')}

                            style={{ width: '100%', height: 160, alignItems: 'center', justifyContent: 'center' }} />
                    </View>

                </ImageBackground>


                <View>
                    <View

                        style={{
                            width: '100%',
                            height: 108,
                            justifyContent: 'flex-start', flexDirection: 'row',
                            backgroundColor: '#000'
                        }}

                    >
                        <View style={{ flexDirection: 'column', marginLeft: 5, }}>
                            <Text style={{ color: Colors.gold, fontSize: 15, fontWeight: 'bold', letterSpacing: 1, paddingTop: 10, }}>

                                {event.date} AT {event.starttime}
                            </Text>
                            <Text style={{
                                color: 'white', fontSize: 25, fontWeight: 'bold',
                            }}>
                                {event.title}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>

                                <Entypo
                                    name='location-pin'
                                    size={17}


                                    color="grey"
                                />
                                <Text style={{
                                    color: 'grey', fontSize: 15, fontWeight: '800',
                                }}>
                                    {event.place}
                                </Text>
                            </View>


                            <Text style={{
                                color: 'grey', fontSize: 15, fontWeight: 'bold', marginLeft: 5
                            }}>
                                {event.category}
                            </Text>


                        </View>

                    </View>
                </View>
            </TouchableOpacity>




        </View>

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