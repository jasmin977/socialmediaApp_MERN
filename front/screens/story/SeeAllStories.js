import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
    View, Text, Modal, StyleSheet, ImageBackground, ScrollView, Image, TouchableOpacity, FlatList, StatusBar, ActivityIndicator, Button, Platform, AsyncStorage
} from 'react-native';
import * as storiesActions from '../../store/actions/stories';
import * as usersActions from '../../store/actions/users';
import ENV from '../../env';



// import Modal from 'react-native-modalbox';
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation';

import StoryContainer from '../../components/StoryComponents/StoryContainer';



import AddStory from './AddStories';
import Colors from '../../constants/Colors';





const SeeAllStories = (props) => {



    const [isLoading, setIsLoading] = useState(false);
    const refStories = useRef(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();


    const stories = useSelector(state => state.stories.allStories);



    const dispatch = useDispatch();
    const navigation = useNavigation();




    // bech na3rfou username mta3 chkoun hat el story
    const users = useSelector(state => state.users.allUsers);







    const [isModelOpen, setModel] = useState(false);
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [currentScrollValue, setCurrentScrollValue] = useState(0);
    const modalScroll = useRef(null);



    const loadStories = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(storiesActions.fetchStories());


        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError])





    useEffect(() => {
        const ac = new AbortController();

        setIsLoading(true);
        loadStories()
            .then(() => {
                setIsLoading(false);
            });
        return () => ac.abort();

    }, [dispatch, loadStories])






    const onStorySelect = (index) => {
        setCurrentUserIndex(index);
        setModel(true);
    };

    const onStoryClose = () => {
        setModel(false);
    };



    const onStoryNext = (isScroll) => {
        const newIndex = currentUserIndex + 1;
        if (stories.length - 1 > currentUserIndex) {
            setCurrentUserIndex(newIndex);
            if (!isScroll) {
                modalScroll.current.scrollTo(newIndex, true);
            }
        } else {
            setModel(false);
        }
    };

    const onStoryPrevious = (isScroll) => {
        const newIndex = currentUserIndex - 1;
        if (currentUserIndex > 0) {
            setCurrentUserIndex(newIndex);
            if (!isScroll) {
                modalScroll.current.scrollTo(newIndex, true);
            }
        }
    };

    const onScrollChange = (scrollValue) => {
        if (currentScrollValue > scrollValue) {
            onStoryNext(true);
            console.log('next');
            setCurrentScrollValue(scrollValue);
        }
        if (currentScrollValue < scrollValue) {
            onStoryPrevious();
            console.log('previous');
            setCurrentScrollValue(scrollValue);
        }
    };



    ///////////////////////////////













    if (error) {
        return (
            <View style={styles.centered} >
                <Text>An error occured.</Text>
                <Button title="Try again" onPress={loadStories} color={Colors.gold_brown} />
            </View>
        );
    }

    if (!isLoading && stories.length === 0) {
        return (
            <View style={styles.centered} >
                <Text>No stories found. Maybe start adding some!</Text>
            </View>
        );
    }


    if (isLoading) {
        return (
            <View style={styles.centered} >
                <ActivityIndicator size='large' color={Colors.gold_brown} />
            </View>
        );
    }





    return (
        <View style={styles.container}>



            <FlatList
                ref={refStories}
                style={{ width: '100%', }}
                onRefresh={loadStories}
                refreshing={isRefreshing}
                data={stories}
                keyExtractor={(item) => item._id}

                renderItem={({ item, index }) => (


                    <TouchableOpacity onPress={() => onStorySelect(index)}
                        style={{
                            width: '47%',
                            alignItems: 'center', justifyContent: 'center',
                            height: 250, margin: '1%', borderRadius: 50
                        }}>



                        <ImageBackground
                            source={{ uri: `${ENV.apiUrl}/story/photo/${item._id}` }}
                            resizeMode='cover'
                            style={{ height: 250, width: '100%', borderRadius: 50 }}>

                            <ImageBackground

                                source={require('../../assets/bg_event.png')}
                                resizeMode='cover'
                                style={{ height: 250, width: '100%', borderRadius: 50 }}>

                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.title}>{item.postedBy.username}</Text>
                                </View>

                            </ImageBackground>

                        </ImageBackground>


                    </TouchableOpacity>
                )}

                numColumns={2}
            />





            {/** modal lel stories bech yeslidi binethom */}

            <Modal
                animationType="slide"
                transparent={false}
                visible={isModelOpen}
                style={styles.modal}
                onShow={() => {
                    if (currentUserIndex > 0) {
                        modalScroll.current.scrollTo(currentUserIndex, false);
                    }
                }}
                onRequestClose={onStoryClose}
            >

                <CubeNavigationHorizontal callBackAfterSwipe={g => onScrollChange(g)} ref={modalScroll} style={styles.container}>
                    {stories.map((item, index) => (

                        <StoryContainer key={index}
                            onClose={onStoryClose}
                            onStoryNext={onStoryNext}
                            onStoryPrevious={onStoryPrevious}
                            user={item}
                            isNewStory={index !== currentUserIndex}
                        />
                    ))}
                </CubeNavigationHorizontal>
            </Modal>








        </View>


    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#000',
    },
    circle: {
        width: 66,
        margin: 8,
        height: 66,
        borderRadius: 100,

        borderWidth: 4,
        borderColor: '#000',
    },
    modal: {
        flex: 1,
    },
    title: {
        fontSize: 15, textAlign: 'center', color: 'white', fontWeight: 'bold'
    },
});


export default SeeAllStories;