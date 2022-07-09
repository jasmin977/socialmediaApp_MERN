import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,

    View,

    Animated,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { getDistance, getPreciseDistance } from 'geolib';


import { useSelector } from 'react-redux';

import {
    AntDesign, Entypo
} from '@expo/vector-icons';

import { fakeUsersLocations, mapDarkStyle, fakeLocations } from './dataEvents';


import ENV from '../../env';

import { useTheme } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const Map = (props) => {


    const { location } = props;
    const navigation = useNavigation();



    //____________my position________

    const loggedInUserId = useSelector(state => state.auth.user._id);
    const allUsers = useSelector(state => state.users.allUsers);

    //const loggedInUser = allUsers.filter(u => u._id === loggedInUserId)[0];
    //  console.log(loggedInUserId);
    // console.log(location);


    // calcul distance 
    const calculateDistance = (lat, long) => {
        var dis = getDistance(
            { latitude: location.latitude, longitude: location.longitude },
            { latitude: lat, longitude: long }
        );
        return (dis / 1000).toFixed(1); //yraja3 en km wel fixed bech ta3tini 1 num apres virgule
    }
    //_____________ LOAD USERS_________________

    const users = useSelector(state => state.users.allUsers);

    const events = useSelector(state => state.events.allEvents);



    const theme = useTheme();

    const initialMapState = {

        fakeUsersLocations,
        fakeLocations,


        region: {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
    };

    const [state, setState] = useState(initialMapState);

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= events.length) {
                index = events.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const { coordinate } = state.fakeLocations[index];
                    console.log('index ' + index)
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: state.region.latitudeDelta,
                            longitudeDelta: state.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });
    });

    const interpolations = events.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });

        return { scale };
    });
    const _map = useRef(null);
    const _scrollView = useRef(null);

    const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;

        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }

        _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }
    //getNode()

    return (
        <View style={styles.container}>

            <MapView
                ref={_map}
                initialRegion={state.region}
                style={styles.container}
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapDarkStyle}
            >
                {events.map((event, index) => {

                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                            },
                        ],
                    };
                    let i = Math.floor(Math.random() * 12)
                    return (

                        <MapView.Marker key={index}
                            // lena egelocalisation mta3 kol event

                            coordinate={

                                state.fakeLocations[i].coordinate
                            }
                            onPress={(e) => onMarkerPress(e)}>
                            <Animated.View style={[styles.markerWrap]}>

                                <Animated.Image
                                    source={{ uri: `${ENV.apiUrl}/event/photo/${event._id}` }}

                                    style={[{ width: 35, height: 35, borderRadius: 100 }, scaleStyle]}
                                    resizeMode="cover"
                                >

                                </Animated.Image>
                            </Animated.View>
                        </MapView.Marker>
                    );
                })}
            </MapView>


            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
            >
                {events.map((event, index) => {

                    let i = Math.floor(Math.random() * 12)

                    return (

                        <TouchableOpacity style={styles.card} key={index}
                            onPress={() =>

                                navigation.navigate('Event', { event: event, userId: loggedInUserId })}

                        >


                            <View
                                //  source={{ uri: `${ENV.apiUrl}/event/photo/${event._id}` }}

                                style={styles.cardImage}
                                resizeMode="cover"
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                                    }}
                                >
                                    <View
                                        style={{

                                            height: 110, width: 110, borderRadius: 10, marginLeft: 5
                                        }}
                                    >
                                        <Image
                                            source={{ uri: `${ENV.apiUrl}/event/photo/${event._id}` }}
                                            style={styles.cardImage}
                                            resizeMode="cover">

                                        </Image></View>



                                    <View style={{

                                        flex: 1,
                                        justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10
                                    }}>
                                        <Text style={{ color: Colors.gold, fontWeight: '900', fontSize: 16, }}>
                                            SAT ,JUN 15 7:30PM
                                        </Text>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22, marginTop: -5 }}>
                                            {event.title}
                                        </Text>
                                        <Text style={{ color: 'grey', fontWeight: '900', fontSize: 16, }}>
                                            {event.place}
                                        </Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', marginRight: 20 }}>
                                            <Entypo
                                                name='location-pin'
                                                size={17}


                                                color="grey"
                                            />
                                            <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 14 }}>
                                                {calculateDistance(state.fakeLocations[i].coordinate.latitude, state.fakeLocations[i].coordinate.longitude)} KM
                                            </Text>
                                        </View>



                                    </View>



                                </View>
                            </View>




                        </TouchableOpacity>
                    )
                })}

            </Animated.ScrollView>

            <TouchableOpacity style={{
                position: 'absolute',
                width: 40, right: 10, top: 15,
                height: 40, backgroundColor: 'rgba(218,165,32,0.2)'
                , alignItems: 'center', justifyContent: 'center',
            }}
                onPress={() => navigation.pop()}
            >
                <AntDesign

                    name="close"
                    size={24}
                    style={{ margin: 5 }}
                    color={Colors.gold}
                />

            </TouchableOpacity>
        </View>
    );
};

export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        // padding: 10,
        elevation: 2,

        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        justifyContent: 'center', alignItems: 'center',

        height: 120,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
        backgroundColor: '#111', borderRadius: 5
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 40,
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
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
});