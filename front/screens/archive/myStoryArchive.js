import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image, ImageBackground,
    ActivityIndicator,
} from 'react-native';


import { Feather, Ionicons, Entypo } from '@expo/vector-icons'

import { useDispatch, useSelector } from 'react-redux';
import * as storiesAction from '../../store/actions/stories';
import Colors from '../../constants/Colors';

import { useNavigation } from '@react-navigation/native';


import ENV from '../../env';
import Diamand from '../loader'



import { Container, Header, Item, Input, Icon, Button } from 'native-base';




const numColumns = 2;

const Archive = (props) => {

    const navigation = useNavigation();



    //console.log(loggedInUserId);
    const archive = useSelector(state => state.archives.allArchive);

    const loggedInUserId = useSelector(state => state.auth.user._id);

    const myArchive = archive.filter(s => s.postedBy._id === loggedInUserId);


    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const refArchive = useRef(null);




    const dispatch = useDispatch();


    const loadArchive = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(storiesAction.fetchArchive());



        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError])



    useEffect(() => {
        setIsLoading(true);
        loadArchive()
            .then(() => {
                setIsLoading(false);
            });
    }, [dispatch, loadArchive])










    if (isLoading) {
        return (
            <Diamand />
        );
    }



    return (
        <Container style={styles.background}  >

            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', letterSpacing: 1 }}>
                My Archive {myArchive.length}
            </Text>

            <FlatList
                ref={refArchive}
                data={myArchive}
                keyExtractor={(item) => item._id}
                style={styles.container}
                renderItem={(story, index) => {
                    //  console.log("story - ", story.index);
                    return (



                        <View
                            style={{
                                width: '47%',
                                alignItems: 'center', justifyContent: 'center',
                                height: 250, margin: '1%', borderRadius: 50
                            }}>



                            <ImageBackground
                                source={{ uri: `${ENV.apiUrl}/archive/photo/${story.item._id}` }}
                                resizeMode='cover'
                                style={{ height: 250, width: '100%', }}>

                                <Image

                                    source={require('../../assets/bg_event.png')}
                                    resizeMode='cover'
                                    style={{ height: 250, width: '100%', }}>



                                </Image>

                            </ImageBackground>


                        </View>

                    );




                }}

                numColumns={numColumns}
            />

        </Container>
    );
};





const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
        backgroundColor: "#000",


    },
    container: {
        width: '100%',
        marginTop: 50,

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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        width: '100%',
    },



});

export default Archive;

