import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator, Dimensions, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ENV from '../../env';


import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

import * as postsActions from '../../store/actions/posts';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import Diamand from '../loader'


var { height, width } = Dimensions.get('window');

const PrivateAlbum = (props) => {

    let counter = 0;

    const checkIfImAuthorized = props.checkIfImAuthorizedTohisAlbum;
    const [isLoading, setIsLoading] = useState(false);

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const refUserPosts = useRef(null);

    const { userId } = props;

    const loggedInUserId = useSelector(state => state.auth.user._id);
    const allPosts = useSelector(state => state.posts.allPosts);
    const ppp = allPosts.filter(p => p.postedBy._id === userId);
    const myPrivatePosts = ppp.filter(p => p.privacy === true && p.mediaRef != 0);

    const images = useSelector(state => state.posts.allImages);


    //  console.log(myPrivatePosts)

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


    const publickImageFromPublicPost = (postRef) => {
        let check = true;
        let p = 0;
        if (myPrivatePosts.length === 0) {
            return false;
        }
        while (check === true && p < myPrivatePosts.length) {

            check = myPrivatePosts[p]._id === postRef
            //  console.log(myPrivatePosts[p]._id)
            // console.log(postRef)
            if (check === true) {
                counter = counter + 1;

            }
            p++;
            return check;
        }

        return check;


    }
    // console.log(checkIfImAuthorized)

    const renderPhotos = () => {

        return images.map((image, index) => (


            publickImageFromPublicPost(image.postRef) && (

                <TouchableOpacity
                    key={index}
                >
                    <View style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }, index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }]}>


                        {checkIfImAuthorized ? (
                            <>
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
                            </>
                        ) : (


                            <ImageBackground
                                style={{
                                    flex: 1,
                                    alignSelf: 'stretch',
                                    width: undefined,
                                    height: undefined,
                                    backgroundColor: Colors.gold
                                }}
                                blurRadius={20}
                                source={
                                    image.updated ? (
                                        { uri: `${ENV.apiUrl}/media/photo/${image._id}?${new Date(image.updated)}` }
                                    ) : (
                                        { uri: `${ENV.apiUrl}/media/photo/${image._id}` }
                                    )
                                }
                            >

                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ImageBackground

                                        source={require('../../assets/cd2.png')}

                                        resizeMode='cover'
                                        style={{
                                            width: '100%', height: '100%',
                                            //  backgroundColor: 'rgba(218,165,32,0.3)',
                                            alignItems: 'center', justifyContent: 'center'
                                        }}
                                    >
                                    </ImageBackground>
                                </View>
                            </ImageBackground>

                        )}


                    </View>
                </TouchableOpacity>
            )


        ))

    }

    const renderAlbum = () => {
        return (
            <>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {renderPhotos()}
                </View>
                {counter === 0 &&
                    <Text style={{ color: 'grey', fontSize: 17, marginTop: 40, alignSelf: 'center' }}>No photos found in this album.</Text>}

            </>
        )
    }


    if (isLoading) {
        return (
            <ActivityIndicator size="small" color="#efb734" />
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

            {renderAlbum()}
        </View>
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

export default PrivateAlbum;