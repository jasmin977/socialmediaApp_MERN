import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, Animated, ActivityIndicator, TextInput, Alert, KeyboardAvoidingView, Dimensions } from 'react-native';


import Card from '../../components/UI/Card';

import { timeDifference } from '../../helpers/timeDifference';

import Colors from '../../constants/Colors';
import ENV from '../../env';
import { useDispatch, useSelector } from "react-redux";


const Post = (props) => {
    const { post, userId } = props.route.params;

    const imagess = useSelector(state => state.posts.allImages);

    // const liked = post.likes.indexOf(userId) !== -1;
    const loggedInUserId = useSelector(state => state.auth.user._id);



    const [images, setImages] = useState([]);


    const getPostImages = () => {
        return imagess.filter(i => i.postRef === post._id);

    }
    const getImageUri = (image) => {
        return `${ENV.apiUrl}/media/photo/${image._id}?${new Date(image.updated)}`
    }



    const addUriToMyList = (image) => {

        let check;

        check = images.includes(getImageUri(image));
        // console.log(check)
        if (check === false) {
            setImages(images => [...images, getImageUri(image)]);

        }


    }



    getPostImages().map((image, index) => {

        addUriToMyList(image)
        //console.log(image._id)

    })







    return (
        <ImageBackground
            source={require('../../assets/stars.jpg')}
            style={{
                flex: 1



            }}>
            <ScrollView


            >
                <Card post={post} userId={loggedInUserId} getPostImages={getPostImages(post._id)} />

            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    userIcon: {
        height: 30,
        width: 30,
        borderRadius: 30
    },
    card: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#000'
    },
    root: {
        backgroundColor: "#000",
        marginBottom: 45
    },
    cardTitleHeader: {
        paddingVertical: 15,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardHeader: {
        margin: 5,
        paddingVertical: 10,
        flexDirection: 'row',

    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImageContainer: {
        backgroundColor: '#000',
        flex: 1,
        display: 'flex',

    },
    cardImage: {
        flex: 1,
        height: 400,
        width: null
    },
    /******** card components **************/
    title: {
        fontSize: 18,
        flex: 1,
        color: 'white'
    },
    description: {
        fontSize: 15,
        color: "#fff",
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
    },
    time: {
        fontSize: 13,
        color: "#808080",
        marginTop: 5
    },
    icon: {
        width: 25,
        height: 25,
    },
    iconData: {
        width: 15,
        height: 15,
        marginTop: 5,
        marginRight: 5
    },
    timeContainer: {
        flexDirection: 'row'
    },
    /******** social bar ******************/
    socialBarContainer: {
        flexDirection: 'row'
    },
    socialBarSection: {
        marginRight: 20, color: 'white'
    },
    socialBarlabel: {
        marginLeft: 20
        , color: 'white'
    },
    socialBarButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    postActions: {
        borderTopColor: '#c2c2c2',
        borderTopWidth: 1,
        flexDirection: 'row',
        padding: 15,
    },
    inputs: {
        height: 45,
        width: '70%',
        marginLeft: 16,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        flex: 1,
        fontSize: 22,
        color: 'white',
        position: 'absolute',
        bottom: 10,
        paddingBottom: 5,
        paddingRight: 20
    },
    inputContainer: {

        backgroundColor: '#111',

        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',


    },
    postButtonContainer: {
        position: 'absolute',
        right: 0,
        height: 45,
        width: 45,
        backgroundColor: '#111',
        borderColor: Colors.gold
        , borderWidth: 1,
        padding: 5,
        margin: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Post;