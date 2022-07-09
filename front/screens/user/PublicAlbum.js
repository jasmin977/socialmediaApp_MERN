import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator, Dimensions, Modal, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ENV from '../../env';


import {
    AntDesign
} from '@expo/vector-icons';
import Colors from '../../constants/Colors';

import * as postsActions from '../../store/actions/posts';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import Diamand from '../loader'


var { height, width } = Dimensions.get('window');

const PublicAlbum = (props) => {




    let counter = 0;

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const [showModal, setShowModal] = useState(false);
    const [biggerImg, setBiggerImg] = useState();


    const { userId } = props;


    const loggedInUserId = useSelector(state => state.auth.user._id);
    const allPosts = useSelector(state => state.posts.allPosts);
    const myPublicPosts = allPosts.filter(p => p.postedBy._id === userId && p.privacy === false && p.mediaRef != 0);

    const images = useSelector(state => state.posts.allImages);


    // console.log(myPublicPosts.length)

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const loadPosts = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await dispatch(postsActions.fetchPosts());
            await dispatch(postsActions.fetchMedia());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading])



    useEffect(() => {
        const ac = new AbortController();

        setIsLoading(true);
        loadPosts()
            .then(() => {
                setIsLoading(false);
            });

        return () => ac.abort();
    }, [dispatch, loadPosts])

    const hhhh = (image) => {
        setBiggerImg(image._id),
            setShowModal(true)
    }
    const publickImageFromPublicPost = (postRef) => {
        let check = true;
        let p = 0;
        if (myPublicPosts.length === 0) {
            return false;
        }
        while (check === true && p < myPublicPosts.length) {

            check = myPublicPosts[p]._id === postRef
            //  console.log(myPublicPosts[p]._id)
            // console.log(check)
            if (check === true) {
                counter = counter + 1;

            }
            p++;
            return check;
        }


        return check;


    }
    // console.log(myPublicPosts)





    if (isLoading) {
        return (
            <ActivityIndicator size="small" color={Colors.gold} />
        );
    }

    if (!isLoading && allPosts.length === 0 || !isLoading && images.length === 0) {
        return (
            <View style={styles.centered} >

                <Text style={{ color: 'white' }}>mezel yfetchi</Text>


            </View>
        );
    }



    return (
        <View style={styles.screen} >

            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {images.map((image, index) => (


                    publickImageFromPublicPost(image.postRef) === true && (

                        <TouchableOpacity
                            onPress={() =>

                                hhhh(image)

                            }
                            key={index}
                        >
                            <View style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }, index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }]}>
                                <Image
                                    style={{
                                        flex: 1,
                                        alignSelf: 'stretch',
                                        width: undefined,
                                        height: undefined,
                                        backgroundColor: Colors.gold
                                    }}
                                    source={
                                        image.updated ? (
                                            { uri: `${ENV.apiUrl}/media/photo/${image._id}?${new Date(image.updated)}` }
                                        ) : (
                                            { uri: `${ENV.apiUrl}/media/photo/${image._id}` }
                                        )
                                    }
                                />
                            </View>
                        </TouchableOpacity>

                    )


                ))}



            </View>
            <>

                {counter === 0 &&
                    <Text style={{ color: 'grey', fontSize: 17, marginTop: 40, alignSelf: 'center' }}>No photos found in this album.</Text>}

            </>
            <Modal
                animationType={'slide'}
                //     transparent={false}
                visible={false}
            >

                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        backgroundColor: 'black', justifyContent: 'center',

                    }}>
                    <View
                        style={{
                            height: 400, alignItems: 'center',
                            backgroundColor: 'black', justifyContent: 'center',
                            width: 400,

                        }}

                    >
                        <TouchableOpacity
                            onPress={() =>
                                // setShowModal(false),
                                console.log("clicked")
                            }
                            style={{
                                height: 300,
                                width: 300,

                            }}

                        >

                            <Image
                                style={{
                                    height: '100%',
                                    width: '100%', resizeMode: 'cover'
                                }}
                                source={

                                    { uri: `${ENV.apiUrl}/media/photo/${biggerImg}` }

                                }
                            ></Image>


                        </TouchableOpacity>



                    </View>
                </View>

            </Modal>


        </View >
    );
};

export const screenOptions = {
    headerTitle: 'Posts'
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',

        backgroundColor: 'black'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        width: '100%',
    },
    separator: {
        marginTop: 10,
    },

})

export default PublicAlbum;