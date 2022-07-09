import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground, ActivityIndicator, Platform, Alert, TouchableNativeFeedback, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import HighlightText from '@sanar/react-native-highlight-text';

import Colors from '../../constants/Colors';
import ENV from '../../env';
import { useDispatch } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import VerifiedUser from '../../constants/VerifiedUser';

const EventItem = (props) => {
    const { user, searchText } = props;
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





    return (


        <TouchableOpacity
            onPress={() =>

                navigation.navigate('UserProfile', { userId: user._id, name: user.username })}

        >




            <View style={styles.container}>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                    <ImageBackground
                        source={{ uri: `${ENV.apiUrl}/user/photo/${user._id}` }}
                        style={{ height: 60, width: 60, justifyContent: 'flex-start' }}>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image

                                source={require('../../assets/pic_cover.png')}

                                style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }} />
                        </View>

                    </ImageBackground>



                    <View style={styles.text}>
                        <Text
                            style={styles.name}
                        >
                            <HighlightText
                                highlightStyle={{ backgroundColor: Colors.gold, fontWeight: 'bold', color: 'black' }}
                                searchWords={[searchText]}
                                caseSensitive={true}
                                textToHighlight={user.username}


                            />

                        </Text>
                    </View>
                </View>
            </View>































        </TouchableOpacity>

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
    container: {
        padding: 16,
        justifyContent: 'flex-start',
        margin: 5,
        alignItems: 'flex-start',
    },




    text: {

        width: 100, alignItems: 'center',
        justifyContent: 'center',

    },


    img: {
        height: 50,
        width: 50,
        margin: 0
    },

    timeAgo: {
        fontSize: 12,
        color: "#696969"
    },
    name: {
        fontSize: 15, letterSpacing: 0.5,
        color: Colors.gold,

    }

});

export default EventItem;