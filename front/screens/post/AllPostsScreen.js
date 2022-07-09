import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, ImageBackground, ScrollView, Image, SafeAreaView, FlatList, StatusBar, ActivityIndicator, Button, Platform, AsyncStorage } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from './Header';


import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

import { FloatingAction } from "react-native-floating-action";

import addActions from '../../constants/AddButton';
import MyStories from '../../screens/story/AllStories';





import * as postsActions from '../../store/actions/posts';
import * as usersActions from '../../store/actions/users';
import * as storiesActions from '../../store/actions/stories';
import * as notifActions from '../../store/actions/notifs';
import * as categoriesAction from '../../store/actions/event';

import Diamand from '../loader'
import Friends from '../noFriendsAnimation'
import { TouchableOpacity } from 'react-native-gesture-handler';

const getCloser = (value, checkOne, checkTwo) =>
    Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

const { diffClamp } = Animated;
const headerHeight = 58 * 2;



const AllPostsScreen = (props) => {

    const navigation = useNavigation();



    const [isLoading, setIsLoading] = useState(false);

    const allUsers = useSelector(state => state.users.allUsers);

    const loggedInUserId = useSelector(state => state.auth.user._id);

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const refPosts = useRef(null);

    const posts = useSelector(state => state.posts.allPosts);
    const images = useSelector(state => state.posts.allImages);
    const loggedUser = useSelector(state => state.auth.user);
    const currUserPosts = posts.filter(p => p.postedBy._id === loggedUser._id);

    const dispatch = useDispatch();


    const myData = allUsers.filter(u => u._id === loggedInUserId)[0];






    ////////////////////////// scrollable header/////////////////////
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
            if (refPosts.current) {
                refPosts.current.scrollToOffset({
                    offset:
                        getCloser(translateYNumber.current, -headerHeight / 2, 0) ===
                            -headerHeight / 2
                            ? offsetY + headerHeight / 2
                            : offsetY - headerHeight / 2,
                });
            }
        }
    };

    ///////////////////////////////////////////



    const loadPosts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(usersActions.fetchUsers());

            await dispatch(postsActions.fetchPosts());
            await dispatch(postsActions.fetchMedia());
            await dispatch(usersActions.fetchMyFriend());
            await dispatch(usersActions.fetchMyAlbum());
            await dispatch(usersActions.fetchJumelages());
            await dispatch(usersActions.fetchLocations());
            await dispatch(notifActions.fetchNotifs());
            await dispatch(categoriesAction.fetchCategories());
            await dispatch(storiesActions.fetchStories());

        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError])




    useEffect(() => {
        const ac = new AbortController();

        setIsLoading(true);
        loadPosts()
            .then(() => {
                setIsLoading(false);
            });

        return () => ac.abort();
    }, [dispatch, loadPosts])

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', loadPosts);

        return () => {
            unsubscribe();
        };
    }, [loadPosts])




    const checkFriend = (userId) => {
        let check = myData.friends.indexOf(userId) !== -1;
        return check;
    }

    const getPostImages = (postId) => {
        return images.filter(i => i.postRef === postId);

    }


    if (error) {
        return (
            <View style={styles.centered} >
                <Text>An error occured.</Text>
                <Button title="Try again" onPress={loadPosts} color={Colors.gold_brown} />
            </View>
        );
    }


    if (isLoading) {
        return (
            <Diamand />
        );
    }


    if (!isLoading && allUsers.length === 0) {
        return (
            <View style={styles.centered} >
                <StatusBar
                    backgroundColor="#000"
                    barStyle='light-content'

                />
                <Text style={{ color: 'white' }}>No users found. </Text>

                <FloatingAction
                    actions={addActions}
                    color={Colors.gold}


                    overlayColor='rgba(0, 0, 0, 0.6)'
                    onPressItem={name => {
                        // console.log(`selected button: ${name}`);

                        navigation.navigate(name);

                    }}
                />
            </View>
        );
    }




    if (!isLoading && posts.length === 0 || !isLoading && images.length === 0) {
        return (
            <View style={styles.centered} >
                <StatusBar
                    backgroundColor="#000"
                    barStyle='light-content'

                />
                <Text style={{ color: 'white' }}>No posts found. Maybe start adding some!</Text>

                <FloatingAction
                    actions={addActions}
                    color={Colors.gold}


                    overlayColor='rgba(0, 0, 0, 0.6)'
                    onPressItem={name => {
                        // console.log(`selected button: ${name}`);

                        navigation.navigate(name);

                    }}
                />
            </View>
        );
    }

    if (!isLoading && currUserPosts.length === 0 && myData.friends.length === 0) {
        return (
            <ImageBackground
                source={require('../../assets/stars.jpg')}
                style={styles.centered} >
                <StatusBar
                    backgroundColor="#000"
                    barStyle='light-content'

                />

                <Image source={require('../../assets/nofriends.gif')}
                    style={{ width: 400, height: 300, }} />

                <Text style={{ color: 'white', fontSize: 16, letterSpacing: 1 }}>Your friend list is empty!</Text>

                <TouchableOpacity onPress={() =>

                    navigation.navigate('Search')}

                    style={{ borderColor: Colors.gold, borderWidth: 1, marginVertical: 20, backgroundColor: 'rgba(212, 165, 61, 0.5)' }}>
                    <Text style={{ color: 'white', fontSize: 16, letterSpacing: 1, margin: 10 }}>ADD FRIENDS </Text>

                </TouchableOpacity>

                <FloatingAction
                    actions={addActions}
                    color='rgba(212, 165, 61, 0.5)'


                    overlayColor='rgba(0, 0, 0, 0.6)'
                    onPressItem={name => {
                        // console.log(`selected button: ${name}`);

                        navigation.navigate(name);

                    }}
                />
            </ImageBackground>
        );
    }

    //console.log('media table' + images.length)

    return (
        <ImageBackground
            source={require('../../assets/stars.jpg')}
            style={{
                flex: 1,
                backgroundColor: '#000',


            }}>
            <StatusBar
                backgroundColor="#000"
                barStyle='light-content'

            />
            <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
                <Header {...{ headerHeight }} />
            </Animated.View>




            <Animated.FlatList
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingTop: 58 }}
                onScroll={handleScroll}

                onMomentumScrollEnd={handleSnap}
                ref={refPosts}
                ListHeaderComponent={<MyStories checkFriend={checkFriend} />}
                onRefresh={loadPosts}
                refreshing={isRefreshing}
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={(post) => {
                    return (

                        checkFriend(post.item.postedBy._id) || (post.item.postedBy._id === loggedUser._id) ?
                            (<Card post={post.item} userId={loggedUser._id} getPostImages={getPostImages(post.item._id)} />) : (
                                <View>
                                </View>
                            )
                    )
                }}
            />






            <FloatingAction
                actions={addActions}
                color='rgba(212, 165, 61, 0.5)'


                overlayColor='rgba(0, 0, 0, 0.6)'
                onPressItem={name => {
                    // console.log(`selected button: ${name}`);

                    navigation.navigate(name);

                }}
            />

        </ImageBackground >
    );
};


export const screenOptions = {
    headerTitle: 'Home',
    headerTitleAlign: 'center',

    headerTintColor: "white",


    headerStyle: {
        backgroundColor: 'black',

    },


}


const styles = StyleSheet.create({
    screen: {
        flex: 1,

        backgroundColor: '#000'
    },
    header: {
        position: 'absolute',
        backgroundColor: Colors.gold,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    list: {
        width: '100%',
    },


    feed: {
        marginHorizontal: 16
    },




})

export default AllPostsScreen;