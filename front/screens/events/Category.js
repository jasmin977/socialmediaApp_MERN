import React, { useState, useCallback, useEffect, useRef } from 'react';

import { View, Animated, StatusBar, SafeAreaView, TouchableOpacity, ImageBackground, ScrollView, Dimensions, Image, StyleSheet, Text } from 'react-native';
import Colors from '../../constants/Colors';
import { Container, Input } from 'native-base';

import { LinearGradient } from 'expo-linear-gradient';
import { HeaderCategories } from '../post/Header';
import EventItem from '../../components/UI/EventItemSearch';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import Diamand from '../loader'

const getCloser = (value, checkOne, checkTwo) =>
    Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

const { diffClamp } = Animated;
const headerHeight = 58 * 2;


const Categories = (props) => {

    const [searchText, setSearchText] = useState('');

    const navigation = useNavigation();
    const loggedUser = useSelector(state => state.auth.user);

    const { route } = props;
    let categorie;
    let eventByCategory;
    const allevents = useSelector(state => state.events.allEvents);


    if (route.params && route.params.category) {
        categorie = route.params.category;
        eventByCategory = allevents.filter(e => e.category === categorie);

    }

    const [byCategory, setByCategory] = useState(eventByCategory);


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
            useNativeDriver: true,
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





    const handleSearchTextChange = (text) => {

        if (text.length !== '') {
            let Events = [];


            Events = eventByCategory.filter(item => {
                const lc = item.title.toLowerCase();
                text = text.toLowerCase();
                return lc.includes(text);
            });


            setByCategory(Events);

        }
        else {

            setByCategory(eventByCategory);
        }
    }


    useEffect(() => {
        handleSearchTextChange(searchText)
    }, [searchText])



    useEffect(() => {
        setByCategory(eventByCategory)
    }, [eventByCategory])




    return (



        <View style={{ backgroundColor: '#000', flex: 1 }}>



            <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
                <HeaderCategories categorie={categorie} />
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
                </View>}

                scrollEventThrottle={16}
                contentContainerStyle={{ paddingTop: 58 }}
                onScroll={handleScroll}
                ref={refEvents}
                onMomentumScrollEnd={handleSnap}

                data={byCategory}
                keyExtractor={(e, i) => i.toString()}

                renderItem={(event) => {
                    //  console.log("event - ", event.item.postedBy);

                    return (
                        <EventItem event={event.item} userId={loggedUser._id} />
                    )

                }}

            />
        </View>






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




        justifyContent: 'center',
        width: '95%', alignSelf: 'center',
        alignItems: 'center', margin: 10, marginVertical: 10,
        height: 200, borderRadius: 20
    },
    btnActive: {
        borderWidth: 1, borderColor: Colors.gold, backgroundColor: 'rgba(212, 165, 61, 0.1)'
    },
    highlighted: {
        backgroundColor: Colors.gold,
        color: 'white'
    }


});

export default Categories;