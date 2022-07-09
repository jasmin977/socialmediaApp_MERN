import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground, ActivityIndicator, Platform, Alert, TouchableNativeFeedback, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons'
import moment from "moment";
import HighlightText from '@sanar/react-native-highlight-text';

import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { timeDifference } from '../../helpers/timeDifference';
import Colors from '../../constants/Colors';
import ENV from '../../env';
import { useDispatch } from 'react-redux';
import * as eventActions from '../../store/actions/event';
import { showMessage } from "react-native-flash-message";


const EventItem = (props) => {
    const { event, userId, searchText } = props;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // const liked = post.likes.indexOf(userId) !== -1;

    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageUri, setImageUri] = useState('')

    const [imgWidth, setImgWidth] = useState();
    const [imgHeight, setImgHeight] = useState();


    //default image handler
    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }


    let TouchableComp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback;
    }

    // messages you recieve when you are about to delete a post
    const deleteHandler = (id) => {
        Alert.alert(
            'Are you sure?',
            'Do you really want to delete this Event?',
            [
                { text: 'No', style: 'default' },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: async () => {
                        await dispatch(eventActions.deleteEvent(id))
                        showMessage({
                            message: "Your post was successfully deleted.",
                            type: "success",
                            icon: { icon: "success", position: 'left' },
                            duration: 3000
                        });
                    }
                }
            ]
        )
    };

    // checks if we have any likes

    {/** 
    const checkLike = () => {
        let match = event.likes.indexOf(userId) !== -1;
        return match;
    }


    // like a post
    const toggleLike = async () => {
        props.toggleLikeHandler(event._id, checkLike());
    }
*/}


   

    let datee = (event.date + '');
    let month = datee.substring(6, 8);
    let annee = datee.substring(1, 5);
    let dayy = datee.substring(9, 11);

    switch (month) {

        case '01':
            month = 'Jan'
            break;

        case '02':
            month = 'Fevrier'
            break;

        case '03':
            month = 'Mars'
            break;

        case '04':
            month = 'Avp'
            break;

        case '05':
            month = 'Mai'

            break;
        case '06':
            month = 'Juin'
            break;

        case '07':
            month = 'Juillet'
            break;

        case '08':
            month = 'Aout'
            break;

        case '09':
            month = 'Sep'
            break;

        case '10':
            month = 'Oct'
            break;

        case '11':
            month = 'Nov'
            break;

        case '12':
            month = 'Dec'
            break;


        default:


    }
    /////////////////////////


    return (


        <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>


            <TouchableOpacity
                onPress={() =>
                    //  navigation.navigate('Event', { userId: post.postedBy._id, name: post.postedBy.name })}

                    navigation.navigate('Event', { eventObject: event, userId: userId })}


                style={{ width: '100%', height: 250, marginVertical: 20, alignSelf: 'center' }}
            >
                <View

                    style={{
                        backgroundColor: "#000",
                        margin: 10,
                        paddingBottom: 80,
                        flexDirection: 'column', borderBottomWidthWidth: 0.5, borderBottomColor: 'grey'

                    }}

                >



                    <ImageBackground
                        source={{ uri: `${ENV.apiUrl}/event/photo/${event._id}?${new Date(event.updated)}` }}

                        onLoad={() => setIsImageLoading(false)}
                        style={{ width: '100%', height: 200 }} resizeMode='cover'
                    >

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                resizeMode='cover'
                                source={require('../../assets/bg_event.png')}

                                style={{ width: '100%', height: 200, alignItems: 'center', justifyContent: 'center' }} />
                        </View>

                    </ImageBackground>


                    <View
                        style={{
                            alignSelf: 'flex-end', justifyContent: 'flex-end', width: 80, height: 30, marginBottom: -50, margin: 20,
                            alignItems: 'center', justifyContent: 'center',
                        }}
                    >

                        <Text style={{ color: '#DDAB4B', fontWeight: 'bold', fontSize: 25 }}>SEP</Text>
                        <Text style={{ color: '#DDAB4B', fontWeight: '200', fontSize: 25, marginTop: -10 }}>12</Text>


                    </View>



                    <ActivityIndicator
                        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        animating={isImageLoading}
                        size='large'
                        color={Colors.brightBlue}
                    />












                    <View style={{ flexDirection: 'column', marginLeft: 2, marginTop: 5, }}>
                        <Text style={{
                            color: 'white', fontSize: 30, fontWeight: 'bold',
                        }}>
                            <HighlightText
                                highlightStyle={{ backgroundColor: Colors.gold, color: 'black' }}
                                searchWords={[searchText]}
                                caseSensitive={true}
                                textToHighlight={event.title}


                            />
                        </Text>


                        <Text style={{ color: 'grey', fontSize: 20, marginTop: -10 }}>

                            {event.place}
                        </Text>
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