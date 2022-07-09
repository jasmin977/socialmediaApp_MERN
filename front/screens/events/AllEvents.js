import React, { useState, useCallback, useEffect, useRef } from 'react';

import { View, Animated, StatusBar, Modal, TouchableOpacity, ImageBackground, Button, Dimensions, Image, StyleSheet, Text } from 'react-native';
import Colors from '../../constants/Colors';
import { Container, Input } from 'native-base';

import { useDispatch, useSelector } from 'react-redux';
import EventItem from '../../components/UI/EventItemSearch';
import { HeaderEvents } from '../post/Header';

import {
    AntDesign, Entypo
} from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';


import ENV from '../../env';

import * as eventActions from '../../store/actions/event';
import * as usersActions from '../../store/actions/users';

import Diamand from '../loader'
const getCloser = (value, checkOne, checkTwo) =>
    Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

const { diffClamp } = Animated;
const headerHeight = 58 * 2;


const AllEvents = (props) => {


    const navigation = useNavigation();

    const allevents = useSelector(state => state.events.allEvents);


    const [events, setevents] = useState(allevents);

    const [showModal, setShowModal] = useState(false);




    const categories = useSelector(state => state.events.allCategories);









    const loggedUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch();



    const [searchText, setSearchText] = useState('');




    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const refEvents = useRef(null);






    // scrollable header
    const scrollY = useRef(new Animated.Value(0));
    const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);

    const translateY = scrollYClamped.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -(headerHeight / 2)],
    });

    const translateYNumber = useRef();

    translateY.addListener(({ value }) => {
        translateYNumber.current = value;
    });

    const handleScroll = Animated.event(
        [
            {
                nativeEvent: {
                    contentOffset: { y: scrollY.current },
                },
            },
        ],
        {
            useNativeDriver: false,
        },
    );

    const handleSnap = ({ nativeEvent }) => {
        const offsetY = nativeEvent.contentOffset.y;
        if (
            !(
                translateYNumber.current === 0 ||
                translateYNumber.current === -headerHeight / 2
            )
        ) {
            if (refEvents.current) {
                refEvents.current.scrollToOffset({
                    offset:
                        getCloser(translateYNumber.current, -headerHeight / 2, 0) ===
                            -headerHeight / 2
                            ? offsetY + headerHeight / 2
                            : offsetY - headerHeight / 2,
                });
            }
        }
    };






    // loads all the events
    const loadData = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {

            await dispatch(eventActions.fetchEvents());
            await dispatch(eventActions.fetchParticipants());
            await dispatch(usersActions.fetchUsers());
            await dispatch(eventActions.fetchCategories());
            // setStatus('all');
            //setByCategory(allevents)


        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError])



    const navnav = (category) => {
        setShowModal(false),
            navigation.navigate('Categories', { category: category.cName })

    }

    useEffect(() => {
        setIsLoading(true);

        loadData()
            .then(() => {
                setIsLoading(false);
            });
    }, [dispatch, loadData])

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', loadData);

        return () => {
            unsubscribe();
        };
    }, [loadData])




    const handleSearchTextChange = (text) => {

        if (text.length !== '') {
            let Events = [];


            Events = allevents.filter(item => {
                const lc = item.title.toLowerCase();
                text = text.toLowerCase();

                return lc.includes(text);

            });

            setevents(Events);




        }
        else {

            setevents(allevents);

        }

    }


    useEffect(() => {
        handleSearchTextChange(searchText)
    }, [searchText])


    useEffect(() => {
        setevents(allevents)
    }, [allevents])




    //loading the posts
    if (isLoading) {
        return (
            <Diamand />
        );
    }




    if (!isLoading && allevents.length === 0) {
        return (
            <View style={styles.centered} >
                <StatusBar
                    backgroundColor="#000"
                    barStyle='light-content'

                />
                <Text style={{ color: 'black' }}>No events found.</Text>


            </View>
        );
    }

    return (


        <ImageBackground style={{ backgroundColor: '#000', flex: 1, }}
            source={require('../../assets/stars.jpg')}
        >

            <Modal
                animationType={'fade'}
                transparent={false}
                visible={showModal}
                onRequestClose={() => {
                    console.log('Modal has been closed.');
                }}>
                {/*All views of Modal*/}
                {/*Animation can be slide, slide, none*/}
                <ImageBackground style={{ backgroundColor: '#000', flex: 1, }}
                    source={require('../../assets/stars.jpg')} style={{
                        flex: 1,
                        alignItems: 'center',
                        backgroundColor: '#111', justifyContent: 'center',
                        padding: 20,
                    }}>
                    <View>
                        {categories.map((category, index) => {
                            // console.log(category.cName)
                            return (

                                <TouchableOpacity style={{
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(218,165,32,0.1)', justifyContent: 'center', margin: 7, width: 250,
                                    padding: 10,
                                }}
                                    key={index}
                                    onPress={() => navnav(category)}

                                >
                                    <Text style={{ color: Colors.gold, letterSpacing: 1, fontSize: 20 }}>{category.cName}</Text>
                                </TouchableOpacity>

                            )
                        })}
                    </View>


                    <TouchableOpacity style={{
                        position: 'absolute',
                        width: 40, right: 10, top: 15,
                        height: 40, backgroundColor: 'rgba(218,165,32,0.2)'
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
                </ImageBackground>
            </Modal>

            <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
                <HeaderEvents {...{ headerHeight }} />
            </Animated.View>



            <Animated.FlatList


                ListHeaderComponent={<View style={{
                    backgroundColor: '#141414', flexDirection: 'row', justifyContent: 'center',

                    alignItems: 'center', width: '100%', height: 45,
                }}>
                    <Input
                        style={{ fontSize: 20, color: 'white', height: 40, width: '85%', }}
                        value={searchText}
                        onChangeText={(text) => setSearchText(text)}
                        placeholder="Search"
                        backgroundColor="#141414"


                    />
                    <TouchableOpacity

                        onPress={() => {
                            setShowModal(!showModal);
                        }}


                        style={{ position: 'absolute', right: 20, alignItems: 'center', justifyContent: 'center', width: 30, height: 30 }}>
                        <Image

                            source={require('../../assets/category/list.png')}

                            style={{ height: '100%', width: '100%', tintColor: Colors.gold, resizeMode: 'cover', alignItems: 'center', justifyContent: 'center' }} />

                    </TouchableOpacity>
                </View>}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingTop: 58, paddingBottom: 60 }}
                onScroll={handleScroll}
                ref={refEvents}
                onMomentumScrollEnd={handleSnap}

                data={events}
                keyExtractor={(e, i) => i.toString()}
                onRefresh={loadData}
                refreshing={isRefreshing}
                renderItem={(event) => {
                    //  console.log("event - ", event.item.postedBy);

                    return (

                        <EventItem event={event.item} userId={loggedUser._id} />

                    )

                }}

            />

            <TouchableOpacity

                onPress={() =>

                    navigation.navigate('Map Events')}


                style={{
                    position: 'absolute', right: 20, padding: 8, transform: [{ rotate: '45deg' }], bottom: 20,
                    backgroundColor: 'rgba(0,0,0,0.5)', height: 50, width: 50, borderWidth: 0.5, borderColor: Colors.gold,
                    alignItems: 'center', justifyContent: 'center'
                }}>
                <Image

                    source={require('../../assets/category/pin.png')}

                    style={{ height: '100%', width: '100%', transform: [{ rotate: '-45deg' }], resizeMode: 'cover', alignItems: 'center', justifyContent: 'center', tintColor: Colors.gold }} />

            </TouchableOpacity>
        </ImageBackground>






    );
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        width: '100%',
        backgroundColor: "#111",

        alignItems: 'center',
    },
    header: {
        position: 'absolute',
        backgroundColor: Colors.gold,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1,
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



        flexDirection: 'row',
        justifyContent: 'center',
        width: Dimensions.get('window').width / 3.5,
        alignItems: 'center', marginHorizontal: 7,
        paddingHorizontal: 2, height: 50
    },
    btnActive: {
        borderWidth: 1, borderColor: Colors.gold, backgroundColor: 'rgba(212, 165, 61, 0.1)'
    },
    highlighted: {
        backgroundColor: Colors.gold,
        color: 'white'
    }


});

export default AllEvents;