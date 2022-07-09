import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, ImageBackground, ActivityIndicator, Platform, Alert, TouchableNativeFeedback, Dimensions } from 'react-native';
import {
    FontAwesome, AntDesign, Entypo,
    Octicons
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";



import { timeDifference } from '../../helpers/timeDifference';

import Colors from '../../constants/Colors';
import ENV from '../../env';
import { useDispatch, useSelector } from "react-redux";
import HighlightText from '@sanar/react-native-highlight-text';
import * as postActions from '../../store/actions/posts';

import VerifiedUser from '../../constants/VerifiedUser';
import PostMenu from "./PostMenu";
import ReportMenu from "./ReportMenuu";

import { SliderBox } from "react-native-image-slider-box";

const Card = (props) => {
    const { post, userId, getPostImages, fromUserProfile } = props;
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const [images, setImages] = useState([]);


    const dispatch = useDispatch();

    // const liked = post.likes.indexOf(userId) !== -1;


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



    getPostImages.map((image, index) => {

        addUriToMyList(image)
        //console.log(image._id)

    })





    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageUri, setImageUri] = useState('')
    const [showFullBody, setShowFullBody] = useState(false);
    const [imgWidth, setImgWidth] = useState();
    const [imgHeight, setImgHeight] = useState();




    const users = useSelector(state => state.users.allUsers);
    const currUser = users.filter(u => u._id === post.postedBy._id);


    const currentValue = new Animated.Value(2)
    const AnimatedIcon = Animated.createAnimatedComponent(AntDesign)
    const [visibleIcon, setVisibleIcon] = useState(false)


    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }


    let TouchableComp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback;
    }




    const checkLike = () => {
        let match = post.likes.indexOf(userId) !== -1;
        return match;
    }


    const isAuthorized = () => {
        // Check if the logged in user id exists in the authorized list of the post
        let accees = post.authorized.indexOf(userId) !== -1;

        return accees;
    }

    const isRequested = () => {
        // Check if the logged in user id exists in the requested list of the post
        let accees = post.requested.indexOf(userId) !== -1;

        return accees;
    }
    const text = () => {
        // Check if the logged in user id exists in the requested list of the post
        let hh;
        if (isRequested()) {
            hh = 'SENT'
        }
        else {
            hh = 'SEND HEART REQUEST'
        }
        return hh;
    }


    const [msg, setMsg] = useState(text())


    useEffect(() => {
        text()
    }, [])

    // console.log(post);


    const toggleLikeHandler = async (postId, isLiked, friendId) => {

        try {
            if (isLiked) {
                await dispatch(postActions.unlikePost(postId))
            } else {
                await dispatch(postActions.likePost(postId, friendId))
            }
        } catch (error) {
            console.log("ERROR ", error)
        }
    }



    const toggleLike = async (friendId) => {
        toggleLikeHandler(post._id, checkLike(), friendId);
    }





    useEffect(() => {
        if (checkLike()) {

            Animated.spring(currentValue, {
                toValue: 2,
                friction: 2,
                useNativeDriver: true,

            }).start(() => {
                Animated.spring(currentValue, {
                    toValue: 1,
                    useNativeDriver: true,

                }).start(() => {
                    setVisibleIcon(false)
                })
            })
        }
    }, [checkLike()])

    const heartRequest = async (postId, friendId) => {
        setIsLoading(true);
        try {

            await dispatch(postActions.heartRequest(postId, friendId));


        }
        catch (error) {
            console.log("ERROR ", error)
        }
        setIsLoading(false);
        setMsg('SENT..')

    }




    return (
        <View
        >
            <View style={styles.card}>




                <TouchableComp
                    background={Platform.OS === 'ios' ? undefined : TouchableNativeFeedback.Ripple('#000')}
                    onPress={() =>

                        navigation.navigate('UserProfile', { userId: post.postedBy._id, username: currUser[0].username })}
                    style={styles.cardTitleHeader}>
                    <View style={{ display: 'flex', flex: 1, flexDirection: 'row', marginLeft: 10 }} >
                        <View style={styles.timeContainer}>
                            <ImageBackground
                                source={{ uri: imageUri || `${ENV.apiUrl}/user/photo/${post.postedBy._id}?${new Date(post.postedBy.updated)}` }}
                                onError={onImageErrorHandler}
                                style={{ height: 60, width: 60 }}>

                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image

                                        source={require('../../assets/pic_cover.png')}
                                        onError={onImageErrorHandler}
                                        style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }} />
                                </View>

                            </ImageBackground>


                            <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginHorizontal: 10 }}>
                                <Text
                                    style={{ fontSize: 18, color: 'white' }}
                                    onPress={() => navigation.navigate('UserProfile', { userId: post.postedBy._id, username: currUser[0].username })}
                                >
                                    {currUser[0].username}

                                </Text>
                                <Text style={{ color: 'grey', fontWeight: '900' }}>{timeDifference(new Date(), new Date(post.created))} </Text>
                            </View>
                        </View>
                        <View style={{ position: 'absolute', right: 0, display: 'flex', flexDirection: 'row' }}>
                            {post.postedBy._id === userId ? (

                                <TouchableOpacity

                                    style={{
                                        alignSelf: 'flex-end', marginRight: 1, marginTop: 5,
                                        width: 45, height: 45, alignItems: 'center', justifyContent: 'center'
                                    }}
                                >
                                    <PostMenu post_id={post._id} />
                                </TouchableOpacity>



                            ) : (
                                <TouchableOpacity

                                    style={{
                                        alignSelf: 'flex-end', marginRight: 1, marginTop: 5,
                                        width: 45, height: 45, alignItems: 'center', justifyContent: 'center'
                                    }}
                                >
                                    <Entypo
                                        name="dots-three-horizontal"

                                        size={20}

                                        color={Colors.gold}
                                    />

                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </TouchableComp>


                {/** if its a post with a photo or its just a boring status */}
                {post.mediaRef.length != 0 ? (


                    <>

                        {/** if its my own post posts */}
                        {post.postedBy._id === userId ? (
                            <View style={styles.cardImageContainer} >


                                {/** description */}

                                <View style={{ marginHorizontal: 5, marginVertical: 7 }}>
                                    {post.body.length > 25 ? (
                                        <View>
                                            {showFullBody ? (
                                                <Text style={styles.description}>
                                                    {post.body}
                                                    <Text
                                                        style={{ color: 'white', fontWeight: 'bold' }} onPress={() => setShowFullBody((prevState) => !prevState)}
                                                    >
                                                        _Read Less
                                                    </Text>
                                                </Text>
                                            ) : (
                                                <Text style={styles.description}>
                                                    {post.body.substring(0, 25)}
                                                    <Text
                                                        style={{ color: 'white', fontWeight: 'bold' }} onPress={() => setShowFullBody((prevState) => !prevState)}
                                                    > ...Read More</Text>
                                                </Text>
                                            )}


                                            {post.tags.map((tag, index) => (
                                                <Text key={index} style={styles.tags}>
                                                    #{tag}

                                                </Text>
                                            ))}

                                        </View>
                                    ) : (
                                        <>
                                            <Text style={styles.description}>

                                                {post.body}

                                            </Text>
                                            {post.tags.map((tag, index) => (
                                                <Text key={index} style={styles.tags}>
                                                    #{tag}

                                                </Text>
                                            ))}
                                        </>
                                    )}

                                </View>



                                <View style={{ width: '100%', height: 400, }}>
                                    <SliderBox
                                        images={images}
                                        sliderBoxHeight={400}
                                        dotColor={Colors.gold}
                                        inactiveDotColor="grey"
                                        resizeMode={'cover'}


                                    />

                                </View>







                                {/** likes and coments */}

                                <View style={styles.cardHeader}>

                                    {/** block lel like icon wel length of likes */}
                                    <View style={{ marginHorizontal: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>


                                        {Platform.OS === 'ios' ?
                                            <TouchableOpacity style={styles.socialBarButton}
                                                onPress={() => {
                                                    if (checkLike() == false) {
                                                        setVisibleIcon(true);
                                                    }
                                                    toggleLike()
                                                }} >
                                                <AntDesign
                                                    name={checkLike() ? 'heart' : "hearto"}
                                                    size={25}
                                                    color="white"
                                                />
                                            </TouchableOpacity>
                                            :
                                            <TouchableNativeFeedback
                                                style={styles.socialBarButton}
                                                onPress={() => {
                                                    if (checkLike() == false) {
                                                        setVisibleIcon(true);
                                                    }
                                                    toggleLike()
                                                }}>
                                                <AntDesign
                                                    name={checkLike() ? 'heart' : "hearto"}
                                                    size={25}
                                                    color="white"
                                                />
                                            </TouchableNativeFeedback>}







                                        {post.likes.length > 0 && <TouchableOpacity
                                            onPress={() => navigation.navigate('Likes', { postId: post._id, userId: userId })}

                                            style={{}}>
                                            <Text style={{
                                                paddingHorizontal: 15, color: 'white', fontSize: 20, fontWeight: '900'
                                            }}>{post.likes.length} likes</Text>
                                        </TouchableOpacity>}

                                    </View>






                                    {/** block lel coment icon wel length of comment */}
                                    <View style={{ marginHorizontal: 50, flexDirection: 'row', alignItems: 'center', }}>
                                        <TouchableOpacity
                                            style={styles.socialBarButton}
                                            onPress={() => navigation.navigate('Comments', { postId: post._id, userId: userId })}
                                        >
                                            <Image style={{ width: 25, height: 25, justifyContent: 'center', tintColor: 'white' }}
                                                source={require('../../assets/settingsIcons/messenger.png')}
                                            ></Image>

                                            {post.comments.length > 0 ? (
                                                <Text style={{ paddingHorizontal: 5, color: 'white', fontSize: 20, fontWeight: '900' }} >{post.comments.length}</Text>
                                            ) : (
                                                <Text > </Text>
                                            )}

                                        </TouchableOpacity>
                                    </View>





                                    {post.privacy && <TouchableOpacity
                                        onPress={() => navigation.navigate('Requested', { postId: post._id, userId: userId })}


                                        style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', right: 10, top: 2, position: 'absolute' }}>

                                        {post.requested.length > 0 ? (
                                            <Text style={{
                                                color: 'white', fontSize: 20, fontWeight: '900', paddingHorizontal: 5
                                            }}>{post.requested.length}</Text>) :
                                            (
                                                <Text
                                                > </Text>
                                            )}

                                        <Image style={{
                                            width: 25,
                                            tintColor: 'white',
                                            height: 25,
                                        }}
                                            source={require('../../assets/icons/accept.png')}>
                                        </Image>

                                    </TouchableOpacity>}





                                </View>











                                {/** animation ki tenzel heart */}
                                {visibleIcon &&
                                    <AnimatedIcon
                                        name='heart'
                                        size={60}
                                        style={{
                                            position: 'absolute', elevation: 4, zIndex: 3,
                                            left: '40%', top: 200,
                                            transform: [
                                                { scale: currentValue }
                                            ]
                                        }}
                                        color={Colors.gold}
                                    />
                                }

                            </View>
                        ) :
                            // if its other people's posts */
                            (
                                <View style={styles.cardImageContainer} >
                                    {post.privacy === true ?



                                        (<>

                                            {isAuthorized() ? (
                                                <>





                                                    {/** description */}

                                                    <View style={{ marginHorizontal: 5, marginVertical: 7 }}>
                                                        {post.body.length > 25 ? (
                                                            <View>
                                                                {showFullBody ? (
                                                                    <Text style={styles.description}>
                                                                        {post.body}
                                                                        <Text
                                                                            style={{ color: 'white', fontWeight: 'bold' }} onPress={() => setShowFullBody((prevState) => !prevState)}
                                                                        >
                                                                            _Read Less
                                                                        </Text>
                                                                        {post.tags.map((tag, index) => (
                                                                            <Text key={index} style={styles.tags}>
                                                                                #{tag}

                                                                            </Text>
                                                                        ))}
                                                                    </Text>
                                                                ) : (
                                                                    <Text style={styles.description}>
                                                                        {post.body.substring(0, 25)}
                                                                        <Text
                                                                            style={{ color: 'white', fontWeight: 'bold' }} onPress={() => setShowFullBody((prevState) => !prevState)}
                                                                        > ...Read More</Text>
                                                                    </Text>
                                                                )}

                                                            </View>
                                                        ) : (
                                                            <>
                                                                <Text style={styles.description}>

                                                                    {post.body}
                                                                </Text>
                                                                {post.tags.map((tag, index) => (
                                                                    <Text key={index} style={styles.tags}>
                                                                        #{tag}

                                                                    </Text>
                                                                ))}
                                                            </>
                                                        )}
                                                    </View>

                                                    <View style={{ width: '100%', height: 400, }}>
                                                        <SliderBox
                                                            images={images}
                                                            sliderBoxHeight={400}
                                                            dotColor={Colors.gold}
                                                            inactiveDotColor="grey"
                                                            resizeMode={'cover'}


                                                        />
                                                    </View>








                                                    {/** likes and coments */}

                                                    <View style={styles.cardHeader}>

                                                        {/** block lel like icon wel length of likes */}
                                                        <View style={{ marginHorizontal: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                                            <TouchableOpacity
                                                                style={styles.socialBarButton}
                                                                onPress={() => {
                                                                    if (checkLike() == false) {
                                                                        setVisibleIcon(true);
                                                                    }
                                                                    toggleLike(post.postedBy._id)
                                                                }} >
                                                                <AntDesign
                                                                    name={checkLike() ? 'heart' : "hearto"}
                                                                    size={25}
                                                                    color="white"
                                                                />

                                                            </TouchableOpacity>

                                                            {post.likes.length > 0 && <TouchableOpacity
                                                                onPress={() => navigation.navigate('Likes', { postId: post._id, userId: userId })}

                                                                style={{}}>
                                                                <Text style={{
                                                                    paddingHorizontal: 15, color: 'white', fontSize: 20, fontWeight: '900'
                                                                }}>{post.likes.length} likes</Text>
                                                            </TouchableOpacity>}
                                                        </View>




                                                        {/** block lel coment icon wel length of comment */}
                                                        <View style={{ marginHorizontal: 50, flexDirection: 'row', alignItems: 'center' }}>
                                                            <TouchableOpacity
                                                                style={styles.socialBarButton}
                                                                onPress={() => navigation.navigate('Comments', { postId: post._id, userId: userId })}
                                                            >
                                                                <Image style={{ width: 25, height: 25, justifyContent: 'center', tintColor: 'white' }}
                                                                    source={require('../../assets/settingsIcons/messenger.png')}
                                                                ></Image>

                                                                {post.comments.length > 0 ? (
                                                                    <Text style={{ paddingHorizontal: 5, color: 'white', fontSize: 20, fontWeight: '900' }} >{post.comments.length}</Text>
                                                                ) : (
                                                                    <Text > </Text>
                                                                )}

                                                            </TouchableOpacity>
                                                        </View>





                                                    </View>






                                                </>


                                            ) :
                                                (

                                                    <>

                                                        <ImageBackground
                                                            style={{
                                                                flex: 1,
                                                                height: 450, borderRadius: 5, margin: 7,
                                                                width: null
                                                            }} resizeMode='cover'

                                                            blurRadius={20}
                                                            source={{ uri: `${ENV.apiUrl}/media/photo/${getPostImages[0]._id}?${new Date(getPostImages[0].updated)}` }}
                                                        >

                                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                                <ImageBackground

                                                                    source={require('../../assets/cd2.png')}

                                                                    resizeMode='cover'
                                                                    style={{
                                                                        width: '100%',
                                                                        backgroundColor: 'rgba(218,165,32,0.3)',
                                                                        height: 450, alignItems: 'center', justifyContent: 'center'
                                                                    }}
                                                                >



                                                                    {/** i need to check keni deja be3tha demand my id chtkoon fel requested list donc el text chy9oli rak deja be3eth
     * sinn ya3tini send buttom 
    */}
                                                                    <TouchableOpacity
                                                                        onPress={() => { heartRequest(post._id, post.postedBy._id) }}

                                                                        style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center', }}>


                                                                        {isLoading ? (
                                                                            <ActivityIndicator size="small" color="white" />
                                                                        ) : (
                                                                            <>
                                                                                <Image

                                                                                    source={require('../../assets/ccc.png')}

                                                                                    resizeMode='cover'
                                                                                    style={{
                                                                                        width: '100%',

                                                                                        height: '100%', resizeMode: 'cover', alignItems: 'center', justifyContent: 'center'
                                                                                    }}
                                                                                ></Image>

                                                                            </>

                                                                        )}

                                                                    </TouchableOpacity>
                                                                    <Text style={{ color: '#F7EA96', fontSize: 15, fontWeight: 'bold', letterSpacing: 2 }}>

                                                                        {/** lenna chntesti kn cet id fel requested array bech nraja3 sended text */}
                                                                        {msg}
                                                                    </Text>


                                                                    {/** */}
                                                                </ImageBackground>

                                                            </View>

                                                        </ImageBackground>

                                                    </>
                                                )

                                            }




                                        </>)




                                        :


                                        // kenou post public w jawou behi
                                        (

                                            <>

                                                {/** description */}

                                                <View style={{ marginHorizontal: 5, marginVertical: 7 }}>
                                                    {post.body.length > 25 ? (
                                                        <View>
                                                            {showFullBody ? (
                                                                <>
                                                                    <Text style={styles.description}>
                                                                        {post.body}
                                                                        <Text
                                                                            style={{ color: 'white', fontWeight: 'bold' }} onPress={() => setShowFullBody((prevState) => !prevState)}
                                                                        >
                                                                            _Read Less
                                                                        </Text>
                                                                    </Text>
                                                                    {post.tags.map((tag, index) => (
                                                                        <Text key={index} style={styles.tags}>
                                                                            #{tag}

                                                                        </Text>
                                                                    ))}
                                                                </>
                                                            ) : (
                                                                <Text style={styles.description}>
                                                                    {post.body.substring(0, 25)}
                                                                    <Text
                                                                        style={{ color: 'white', fontWeight: 'bold' }} onPress={() => setShowFullBody((prevState) => !prevState)}
                                                                    > ...Read More</Text>
                                                                </Text>
                                                            )}

                                                        </View>
                                                    ) : (
                                                        <>
                                                            <Text style={styles.description}>

                                                                {post.body}
                                                            </Text>
                                                            {post.tags.map((tag, index) => (
                                                                <Text key={index} style={styles.tags}>
                                                                    #{tag}

                                                                </Text>
                                                            ))}
                                                        </>
                                                    )}
                                                </View>


                                                <View style={{ width: '100%', height: 400, }}>
                                                    <SliderBox
                                                        images={images}
                                                        sliderBoxHeight={400}
                                                        dotColor={Colors.gold}
                                                        inactiveDotColor="grey"
                                                        resizeMode={'cover'}


                                                    />
                                                </View>




                                                {/** likes and coments */}

                                                <View style={styles.cardHeader}>

                                                    {/** block lel like icon wel length of likes */}
                                                    <View style={{ marginHorizontal: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                                        <TouchableOpacity
                                                            style={styles.socialBarButton}
                                                            onPress={() => {
                                                                if (checkLike() == false) {
                                                                    setVisibleIcon(true);
                                                                }
                                                                toggleLike(post.postedBy._id)
                                                            }} >
                                                            <AntDesign
                                                                name={checkLike() ? 'heart' : "hearto"}
                                                                size={25}
                                                                color="white"
                                                            />

                                                        </TouchableOpacity>
                                                        {post.likes.length > 0 && <TouchableOpacity
                                                            onPress={() => navigation.navigate('Likes', { postId: post._id, userId: userId })}

                                                            style={{}}>
                                                            <Text style={{
                                                                paddingHorizontal: 15, color: 'white', fontSize: 20, fontWeight: '900'
                                                            }}>{post.likes.length} likes</Text>
                                                        </TouchableOpacity>}
                                                    </View>





                                                    {/** block lel coment icon wel length of comment */}
                                                    <View style={{ marginHorizontal: 50, flexDirection: 'row', alignItems: 'center' }}>
                                                        <TouchableOpacity
                                                            style={styles.socialBarButton}
                                                            onPress={() => navigation.navigate('Comments', { postId: post._id, userId: userId })}
                                                        >
                                                            <Image style={{ width: 25, height: 25, justifyContent: 'center', tintColor: 'white' }}
                                                                source={require('../../assets/settingsIcons/messenger.png')}
                                                            ></Image>

                                                            {post.comments.length > 0 ? (
                                                                <Text style={{ paddingHorizontal: 5, color: 'white', fontSize: 20, fontWeight: '900' }} >{post.comments.length}</Text>
                                                            ) : (
                                                                <Text > </Text>
                                                            )}

                                                        </TouchableOpacity>
                                                    </View>





                                                </View>



                                            </>


                                        )
                                    }



                                    {/** animation ki tenzel heart */}
                                    {visibleIcon &&
                                        <AnimatedIcon
                                            name='heart'
                                            size={60}
                                            style={{
                                                position: 'absolute', elevation: 4, zIndex: 3,
                                                left: '50%', top: 200,
                                                transform: [
                                                    { scale: currentValue }
                                                ]
                                            }}
                                            color={Colors.gold}
                                        />
                                    }

                                </View>

                            )
                        }

                    </>
                ) :
                    (

                        <>
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 15, marginTop: 10 }}>

                                {/** status */}

                                <Text style={styles.description}>
                                    {post.body}
                                </Text>
                                {post.tags.map((tag, index) => (
                                    <Text key={index} style={styles.tags}>
                                        #{tag}

                                    </Text>
                                ))}


                                {/** likes and coments */}

                                <View style={styles.cardHeader}>

                                    {/** block lel like icon wel length of likes */}
                                    <View style={{ marginHorizontal: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>

                                        <TouchableOpacity
                                            style={styles.socialBarButton}
                                            onPress={() => {
                                                if (checkLike() == false) {
                                                    setVisibleIcon(true);
                                                }
                                                toggleLike(post.postedBy._id)
                                            }} >
                                            <AntDesign
                                                name={checkLike() ? 'heart' : "hearto"}
                                                size={25}
                                                color="white"
                                            />

                                        </TouchableOpacity>
                                        {post.likes.length > 0 ? (
                                            <Text style={{
                                                paddingHorizontal: 5, color: 'white', fontSize: 16, fontWeight: '900'
                                            }}>{post.likes.length}</Text>) : (
                                            <Text > </Text>
                                        )}
                                    </View>


                                    {/** block lel coment icon wel length of comment */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                        <TouchableOpacity
                                            style={styles.socialBarButton}
                                            onPress={() => navigation.navigate('Comments', { postId: post._id, userId: userId })}
                                        >
                                            <Image style={{ width: 23, height: 23, justifyContent: 'center', tintColor: 'white' }}
                                                source={require('../../assets/settingsIcons/messenger.png')}
                                            ></Image>

                                            {post.comments.length > 0 ? (
                                                <Text style={{ paddingHorizontal: 5, color: 'white', fontSize: 16, fontWeight: '900' }} >{post.comments.length} Comments</Text>
                                            ) : (
                                                <Text > </Text>
                                            )}

                                        </TouchableOpacity>
                                    </View>
                                    {post.likes.length > 0 && <TouchableOpacity
                                        onPress={() => navigation.navigate('Likes', { postId: post._id, userId: userId })}

                                        style={{ position: 'absolute', right: 10 }}>
                                        <Text style={{
                                            paddingHorizontal: 5, color: 'white', fontSize: 16, fontWeight: '900'
                                        }}>{post.likes.length} likes</Text>
                                    </TouchableOpacity>}



                                </View>



                            </View>

                        </>

                    )}

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    userIcon: {
        height: 30,
        width: 30,
        borderRadius: 30
    },
    card: {
        paddingTop: 5,
        width: '100%',
        padding: 5,

        marginVertical: 10,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    cardTitleHeader: {
        paddingVertical: 15,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardHeader: {
        marginTop: 7,
        marginBottom: 15, paddingBottom: 15,
        alignItems: 'center',
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

        flex: 1, marginTop: 15,
        display: 'flex',
        height: 500
    },
    cardImage: {
        flex: 1,
        height: 400, borderRadius: 5, margin: 7,
        width: null
    },
    /******** card components **************/
    title: {
        fontSize: 18,
        flex: 1,
        color: 'white'
    },
    description: {
        fontSize: 17, lineHeight: 23,
        color: "#fff", textAlign: 'justify'


    },
    tags: {
        fontSize: 16,
        color: "grey", textAlign: 'justify'


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
        color: 'white'
    },
    socialBarlabel: {
        marginLeft: 20
        , color: 'white'
    },
    socialBarButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    postActions: {
        borderTopColor: '#c2c2c2',
        borderTopWidth: 1,
        flexDirection: 'row',
        padding: 15,
    }
})

export default Card;