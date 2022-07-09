import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image, StatusBar,
    Dimensions,
    RefreshControl,
    Alert,
    TouchableOpacity,
    TouchableWithoutFeedback, FlatList,
    Platform, ScrollView, SafeAreaView, ImageBackground,

} from "react-native";
import Card from '../../components/UI/Card';
import moment from "moment";

import { Ionicons, MaterialIcons, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Container, Content, Button } from 'native-base'
var { height, width } = Dimensions.get('window');


import Diamand from '../loader'



import PublicAlbum from './PublicAlbum';
import PrivateAlbum from './PrivateAlbum';


import Colors from '../../constants/Colors';

import * as usersActions from '../../store/actions/users';
import * as postsActions from '../../store/actions/posts';

import { useDispatch, useSelector } from "react-redux";
import ENV from '../../env';
import MenuItem from "../../components/UI/MenuItem";
import ContactMenu from "../../components/UI/ContactMenu";
import JumReqMenu from "../../components/UI/SendJumlageRequestMenu";
import GiveAccessMenu from "../../components/UI/GiveAccessMenu";
import InviteUserMenu from "../../components/UI/InviteUsersMenu";
import ImageMenu from "../../components/UI/ProfileImageMenu";

var { height, width } = Dimensions.get('window');


import { showMessage } from "react-native-flash-message";
import VerifiedUser from "../../constants/VerifiedUser";




const UserProfileScreen = (props) => {
    const { route } = props;


    const myData = useSelector(state => state.auth.user);
    const loggedInUserId = useSelector(state => state.auth.user._id);
    const navigation = useNavigation();
    const albumOptions = [
        { status: 'public', text: 'Public' },
        { status: 'private', text: 'Private' },


    ];
    const [albumStatus, setalbumStatus] = useState('public');

    const setalbumStatusFilter = status => {

        setalbumStatus(status);

    };


    const profileOptions = [
        { status: 'myposts', text: 'Posts' },
        { status: 'albums', text: 'Albums' },
        { status: 'friends', text: 'Friends', },
        { status: 'info', text: 'Infos', },

    ];




    const [status, setStatus] = useState('myposts');
    const setStatusFilter = status => {

        setStatus(status);

    };


    let userId;
    let username;

    if (route.params && route.params.userId) {
        userId = route.params.userId;
        username = route.params.username;
    } else {
        userId = myData._id;
        username = myData.username;
    }

    const users = useSelector(state => state.users.allUsers);
    const friends = useSelector(state => state.friends.myFriends);
    const jumlages = useSelector(state => state.jumlages.allJumlages);
    const images = useSelector(state => state.posts.allImages);

    const album = useSelector(state => state.albums.allAlbums);
    const posts = useSelector(state => state.posts.allPosts);
    const events = useSelector(state => state.events.allEvents);





    const currUser = users.filter(u => u._id === userId)[0];



    const thisUserAlbum = album.filter(a => a.userRef === userId)[0];
    const myAlbum = album.filter(al => al.userRef === loggedInUserId)[0];


    const myEvents = events.filter(e => e.postedBy._id === loggedInUserId);
    const myPost = posts.filter(e => e.postedBy._id === userId);

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageUri, setImageUri] = useState('');



    const dispatch = useDispatch();


    const loadUsers = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await dispatch(usersActions.fetchUsers());
            await dispatch(postsActions.fetchPosts());
            await dispatch(usersActions.fetchMyFriend());
            await dispatch(usersActions.fetchMyAlbum());
            await dispatch(usersActions.fetchJumelages());
        } catch (err) {
            console.log(err);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading]);




    /*
        useEffect(() => {
            setIsLoading(true);
    
            loadUsers()
                .then(() => {
                    setIsLoading(false);
                });
        }, [dispatch, loadUsers])
    
    */


    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }





    const getPostImages = (postId) => {
        return images.filter(i => i.postRef === postId);

    }





    const friendsOfThisDude = (userId) => {

        return friends.filter(f => f.userRef === userId)[0];
    }


    const jumOfThisDude = (userId) => {

        return jumlages.filter(f => f.userRef === userId)[0];
    }


    const checkJumlaged = () => {
        return jumOfThisDude(currUser._id).status;
    }

    //console.log(checkJumlaged())

    const checkFriend = () => {
        let check = friendsOfThisDude(loggedInUserId).friends.indexOf(userId) !== -1;
        return check;
    }


    const checkIfImAuthorizedTohisAlbum = () => {
        let check = thisUserAlbum.authorized.indexOf(loggedInUserId) !== -1 || thisUserAlbum.authorizedone.indexOf(loggedInUserId) !== -1 || thisUserAlbum.authorizedtwo.indexOf(loggedInUserId) !== -1;
        return check;
    }

    const hisBlockedList = (hisId) => {
        let hisBlockedList = [];

        hisBlockedList = friends.filter(u => u.userRef === hisId)[0];
        return hisBlockedList;
    }
    const myBlockedList = () => {
        return friends.filter(u => u.userRef === loggedInUserId)[0];
    }

    const checkIfHeIsBlockingMe = (hisId) => {
        let check = hisBlockedList(hisId).blocked.indexOf(loggedInUserId) !== -1;
        return check;
    }


    const checkIfIBlockedHim = (hisId) => {
        let check = myBlockedList().blocked.indexOf(hisId) !== -1;
        return check;
    }



    const showAlert = () =>
        Alert.alert(
            'You have to be friend with this user to give access.'
        )

    const showInviteAlert = () =>
        Alert.alert(
            'You have to be friend with this user to invite him to your events.'
        )

    const showJumAlert = () => {
        if (checkJumlaged()) {
            Alert.alert(
                'This user is already twinned.'
            )

        }
        if (checkFriend() === false) {
            Alert.alert(
                'You have to be friend with this user to send twinning request.'
            )

        }
    }





    if (isLoading) {
        return (
            <Diamand />
        );
    }

    if (!isLoading && album.length === 0) {
        return (
            <View style={styles.centered} >
                <StatusBar
                    backgroundColor="#000"
                    barStyle='light-content'

                />
                <Text style={{ color: 'white' }}>still fetching album. </Text>


            </View>
        );
    }




    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Content
                    refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={loadUsers} />
                    }
                >



                    {checkIfIBlockedHim(userId) === false && checkIfHeIsBlockingMe(userId) === false &&


                        <View style={{ height: 300, width: 300, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', }}>
                            <ImageBackground
                                source={{ uri: `${ENV.apiUrl}/user/photo/${userId}?${new Date(currUser.updated)}` }}
                                onError={onImageErrorHandler}
                                style={{ flex: 1, height: '100%', width: '100%', alignSelf: 'center', resizeMode: 'cover', justifyContent: 'center', alignItems: 'center' }}>

                                <View style={{ height: 305, width: 300, justifyContent: 'center', alignItems: 'center', }}>
                                    <Image

                                        source={require('../../assets/icons/profil_cover.png')}

                                        style={{ height: '100%', width: '100%', resizeMode: 'cover', alignItems: 'center', justifyContent: 'center' }} />
                                </View>

                            </ImageBackground>
                        </View>
                    }



                    {/** duo btn */}
                    {checkJumlaged() && checkIfIBlockedHim(userId) === false && checkIfHeIsBlockingMe(userId) === false &&

                        <TouchableOpacity
                            onPress={() =>

                                navigation.navigate('Twinning', { userId: userId, myAlbum: myAlbum, myEvents: myEvents })}


                            style={{ position: 'absolute', top: 20, right: 20, backgroundColor: 'rgba(212, 165, 61, 0.2)', borderWidth: 1, borderColor: 'rgba(212, 165, 61, 0.7)', }}>
                            <Text style={{
                                color: Colors.gold, fontSize: 15, letterSpacing: 1,
                                fontWeight: 'bold', margin: 5
                            }}>MY DUO</Text>
                        </TouchableOpacity>

                    }



                    {userId === loggedInUserId &&
                        <View
                            style={{
                                width: '100%',
                                justifyContent: 'center', alignItems: 'center', marginVertical: 25


                            }}>

                            <Text style={{ fontSize: 38, color: 'rgba(248, 200, 92, 0.9)', fontWeight: 'bold', letterSpacing: 1.2 }}>

                                {currUser.username}

                            </Text>



                            {/** edit phto icon */}
                            {userId === loggedInUserId ? (
                                <TouchableOpacity style={{ backgroundColor: 'rgba(218,165,32,0.1)', padding: 5, }}>

                                    <ImageMenu />

                                </TouchableOpacity>
                            ) : (

                                <View >



                                </View>




                            )

                            }


                        </View>
                    }
                    {/** blocked  profile*/}
                    {userId != loggedInUserId && (checkIfIBlockedHim(userId) === true || checkIfHeIsBlockingMe(userId) === true) &&
                        <>

                            <View style={{
                                alignSelf: 'center', marginTop: 40, alignItems: 'center', justifyContent: 'center'

                            }}>

                                <View

                                    style={{

                                        height: 100,
                                        width: 100,

                                    }}

                                >

                                    <Image
                                        style={{
                                            height: '100%',
                                            width: '100%', tintColor: Colors.gold, resizeMode: 'cover'
                                        }}
                                        source={require('../../assets/blocked.png')}
                                    ></Image>


                                </View>

                                <Text style={{ color: 'grey', fontSize: 20, marginTop: 7 }}>User blocked</Text>

                            </View>
                        </>
                    }



                    {/** another profile  profile + mehouch blocked */}

                    {userId != loggedInUserId && checkIfIBlockedHim(userId) === false && checkIfHeIsBlockingMe(userId) === false &&
                        <>


                            <View

                                style={{
                                    width: '100%',
                                    height: 200, marginTop: -50, paddingHorizontal: 10

                                }}

                            >

                                <View style={{
                                    justifyContent: 'center', alignItems: 'center',


                                }}>




                                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', justifyContent: 'space-between' }}>



                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity
                                                style={{ alignItems: 'center', margin: 5, marginRight: 20 }}
                                            >
                                                <ContactMenu friendId={userId} />
                                            </TouchableOpacity>






                                            {checkFriend() ? (
                                                <TouchableOpacity
                                                    style={{ alignItems: 'center', margin: 5, }}>
                                                    <GiveAccessMenu friendId={userId} myAlbum={myAlbum} />
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity onPress={showAlert}
                                                    style={{ alignItems: 'center', margin: 5, }}>
                                                    <View style={{ alignItems: 'center' }}>

                                                        <Image
                                                            style={{
                                                                height: 40,
                                                                width: 40, opacity: 0.5
                                                            }}
                                                            source={require('../../assets/icons/key.png')}
                                                        ></Image>

                                                        <Text style={{ color: Colors.gold, opacity: 0.5, fontSize: 13, fontWeight: 'bold', letterSpacing: 1 }}>Access</Text>

                                                    </View>
                                                </TouchableOpacity>
                                            )}













                                        </View>



                                        <View style={{ flexDirection: 'row', }}>







                                            {checkFriend() ? (
                                                <TouchableOpacity

                                                    style={{ alignItems: 'center', margin: 5, }}>
                                                    <InviteUserMenu myEvents={myEvents} friendId={userId} />
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity onPress={showInviteAlert}
                                                    style={{ alignItems: 'center', margin: 5, }}>
                                                    <View style={{ alignItems: 'center' }}>

                                                        <Image
                                                            style={{
                                                                height: 40,
                                                                width: 40, opacity: 0.5
                                                            }}
                                                            source={require('../../assets/icons/invite.png')}
                                                        ></Image>

                                                        <Text style={{ color: Colors.gold, opacity: 0.5, fontSize: 13, fontWeight: 'bold', letterSpacing: 1 }}>Invite</Text>

                                                    </View>
                                                </TouchableOpacity>
                                            )}













                                            {checkJumlaged() || checkFriend() === false ? (
                                                <TouchableOpacity
                                                    onPress={showJumAlert}

                                                    style={{ alignItems: 'center', margin: 5, marginLeft: 20 }}>
                                                    <View style={{ alignItems: 'center' }}>

                                                        <Image
                                                            style={{
                                                                height: 40,
                                                                width: 40,
                                                                opacity: 0.5
                                                            }}
                                                            source={require('../../assets/icons/jumlage.png')}
                                                        ></Image>




                                                        <Text style={{ color: Colors.gold, opacity: 0.5, fontSize: 13, fontWeight: 'bold', letterSpacing: 1 }}>Twinning</Text>

                                                    </View>

                                                </TouchableOpacity>

                                            ) : (
                                                <TouchableOpacity style={{ alignItems: 'center', margin: 5, marginLeft: 20 }}>
                                                    <JumReqMenu friendId={userId} />

                                                </TouchableOpacity>
                                            )}



                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            width: '100%',
                                            justifyContent: 'center', alignItems: 'center', marginTop: 15


                                        }}>

                                        <Text style={{ fontSize: 38, color: 'rgba(248, 200, 92, 0.9)', fontWeight: 'bold', letterSpacing: 1.2 }}>

                                            {currUser.username}

                                        </Text>




                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('Chat', { user: currUser })}

                                            style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(248, 200, 92, 0.2)', borderWidth: 1, padding: 5, top: 7, width: '80%' }}
                                        >
                                            <View >

                                                <Text style={{ color: Colors.gold, fontSize: 17, fontWeight: '900', letterSpacing: 1, marginVertical: 3, marginHorizontal: 10 }}>Send Message</Text>



                                            </View>



                                        </TouchableOpacity>


                                    </View>

                                </View>



                            </View>



                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >

                                {
                                    profileOptions.map((e, index) => (
                                        <TouchableOpacity key={index}
                                            onPress={() => {
                                                setStatusFilter(e.status)

                                            }}
                                            style={[styles.btn_list, status === e.status && styles.btnActive]}>

                                            <Text style={status === e.status ? ({ color: 'rgba(248, 200, 92, 0.9)', fontSize: 20, letterSpacing: 1, fontWeight: 'bold' }) : ({ color: 'white', fontSize: 20, letterSpacing: 1, fontWeight: '900' })}
                                            > {e.text}</Text>

                                        </TouchableOpacity>
                                    ))
                                }
                            </ScrollView>

                            <View style={{ marginTop: 20 }}>

                            </View>

                            {status === 'myposts' && <>
                                <ScrollView


                                >

                                    <>

                                        {myPost.length === 0 &&
                                            <Text style={{ color: 'grey', fontSize: 17, marginTop: 40, alignSelf: 'center' }}>No posts found .</Text>}

                                    </>

                                    {
                                        myPost.map((post, index) => (

                                            <Card key={index} post={post} userId={loggedInUserId} getPostImages={getPostImages(post._id)} />
                                        ))
                                    }



                                </ScrollView>
                                <View style={{ height: 250 }}>

                                </View>

                            </>}


                            {status === 'albums' && <>


                                <>
                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    >

                                        {
                                            albumOptions.map((e, index) => (
                                                <TouchableOpacity key={index}
                                                    onPress={() => {
                                                        setalbumStatusFilter(e.status)

                                                    }}
                                                    style={[styles.btn_album_list, albumStatus === e.status && styles.btnAlbumActive]}>

                                                    <Text style={albumStatus === e.status ? ({ color: 'rgba(248, 200, 92, 0.9)', fontSize: 20, letterSpacing: 1, fontWeight: 'bold' }) : ({ color: 'white', fontSize: 20, letterSpacing: 1, fontWeight: '900' })}
                                                    > {e.text}</Text>

                                                </TouchableOpacity>
                                            ))
                                        }
                                    </ScrollView>



                                    {albumStatus === 'public' &&
                                        <>
                                            <PublicAlbum userId={userId} />
                                        </>
                                    }


                                    {albumStatus === 'private' &&
                                        <>
                                            <PrivateAlbum userId={userId} checkIfImAuthorizedTohisAlbum={checkIfImAuthorizedTohisAlbum()} />
                                        </>
                                    }


                                    <View style={{ height: 250 }}>

                                    </View>


                                </>

                            </>
                            }



                            {status === 'info' && <>


                                <View style={{
                                    backgroundColor: '#111',
                                }}>


                                    <View style={{
                                        flexDirection: 'row', backgroundColor: '#000', justifyContent: 'flex-start',
                                        alignItems: 'center', borderColor: '#111', borderBottomWidth: 0.7
                                    }}>

                                        <View style={{ width: '90%', marginLeft: 10, marginVertical: 7 }}>
                                            <Text style={{ color: 'white', fontSize: 17, letterSpacing: 1, }}>{currUser.about}</Text>
                                        </View>
                                    </View>

                                    <View style={{
                                        flexDirection: 'row', backgroundColor: '#000', justifyContent: 'flex-start',
                                        alignItems: 'center', height: 45, borderColor: '#111', borderBottomWidth: 0.7
                                    }}>
                                        <View style={{ width: '35%', }}>
                                            <Text style={{ color: 'grey', fontSize: 19, letterSpacing: 1, marginLeft: 10 }}>Full Name</Text>

                                        </View>
                                        <View style={{ width: '65%', }}>
                                            <Text style={{ color: 'white', fontSize: 19, letterSpacing: 1, }}>{currUser.FirstName} {currUser.LastName}</Text>
                                        </View>
                                    </View>


                                    <View style={{
                                        flexDirection: 'row', backgroundColor: '#000', justifyContent: 'flex-start',
                                        alignItems: 'center', height: 45, borderColor: '#111', borderBottomWidth: 0.7
                                    }}>
                                        <View style={{ width: '35%', }}>
                                            <Text style={{ color: 'grey', fontSize: 19, letterSpacing: 1, marginLeft: 10 }}>Username</Text>

                                        </View>
                                        <View style={{ width: '65%', }}>
                                            <Text style={{ color: 'white', fontSize: 19, letterSpacing: 1, }}>{currUser.username}</Text>
                                        </View>
                                    </View>





                                    <View style={{
                                        backgroundColor: '#111',
                                        height: 10,
                                    }}>



                                    </View>

                                    <View style={{
                                        flexDirection: 'row', backgroundColor: '#000', justifyContent: 'flex-start',
                                        alignItems: 'center', height: 45, borderColor: '#111', borderBottomWidth: 0.7
                                    }}>
                                        <View style={{ width: '35%', }}>
                                            <Text style={{ color: 'grey', fontSize: 19, letterSpacing: 1, marginLeft: 10 }}>Email</Text>

                                        </View>
                                        <View style={{ width: '65%', }}>
                                            <Text style={{ color: 'white', fontSize: 19, letterSpacing: 1, }}>{currUser.email}</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row', backgroundColor: '#000', justifyContent: 'flex-start',
                                        alignItems: 'center', height: 45, borderColor: '#111', borderBottomWidth: 0.7
                                    }}>
                                        <View style={{ width: '35%', }}>
                                            <Text style={{ color: 'grey', fontSize: 19, letterSpacing: 1, marginLeft: 10 }}>Phone</Text>

                                        </View>
                                        <View style={{ width: '65%', }}>
                                            <Text style={{ color: 'white', fontSize: 19, letterSpacing: 1, }}>{currUser.phoneNumber}</Text>
                                        </View>
                                    </View>

                                    <View style={{
                                        backgroundColor: '#111',
                                        height: 10,
                                    }}>

                                    </View>

                                    <View style={{
                                        flexDirection: 'row', backgroundColor: '#000', justifyContent: 'flex-start',
                                        alignItems: 'center', height: 45, borderColor: '#111', borderBottomWidth: 0.7
                                    }}>
                                        <View style={{ width: '35%', }}>
                                            <Text style={{ color: 'grey', fontSize: 19, letterSpacing: 1, marginLeft: 10 }}>Gender</Text>

                                        </View>
                                        <View style={{ width: '65%', }}>
                                            <Text style={{ color: 'white', fontSize: 19, letterSpacing: 1, }}>{currUser.Gender}</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row', backgroundColor: '#000', justifyContent: 'flex-start',
                                        alignItems: 'center', height: 45, borderColor: '#111', borderBottomWidth: 0.7
                                    }}>
                                        <View style={{ width: '35%', }}>
                                            <Text style={{ color: 'grey', fontSize: 19, letterSpacing: 1, marginLeft: 10 }}>Date of Birth</Text>

                                        </View>
                                        <View style={{ width: '65%', }}>
                                            <Text style={{ color: 'white', fontSize: 19, letterSpacing: 1, }}>{moment(currUser.BirthDate).format('YYYY-MM-DD')}</Text>
                                        </View>
                                    </View>

                                    <View style={{ height: 50 }}>

                                    </View>

                                </View>

                            </>}






                            {status === 'friends' && <>

                                <ScrollView style={{ width: '100%', }}
                                >
                                    {friendsOfThisDude(userId).friends.map((item, index) => (



                                        <TouchableOpacity key={index} style={{ marginHorizontal: 20, alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center', margin: 7, flexDirection: 'row' }} >




                                            <View style={{ width: 70, height: 70, marginHorizontal: 20 }} >

                                                <ImageBackground
                                                    source={{ uri: `${ENV.apiUrl}/user/photo/${item}` }}

                                                    style={{ height: '100%', width: '100%', resizeMode: 'cover' }}>

                                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                                        <Image

                                                            source={require('../../assets/pic_cover.png')}

                                                            style={{ height: '100%', width: '100%', resizeMode: 'cover', alignItems: 'center', justifyContent: 'center' }} />
                                                    </View>

                                                </ImageBackground>


                                            </View>

                                            <Text style={{ color: 'rgba(248, 200, 92, 0.9)', fontSize: 23, letterSpacing: 1, fontWeight: 'bold' }}> {users.filter(u => u._id === item)[0].username} </Text>



                                        </TouchableOpacity>

                                    )




                                    )}
                                </ScrollView>
                                <View style={{ height: 300, alignItems: 'center' }}>

                                    {friendsOfThisDude(userId).friends.length === 0 &&
                                        <Text style={{ color: 'grey', fontSize: 17, marginTop: 40, alignSelf: 'center' }}>No friends found .</Text>}

                                </View>

                            </>
                            }




                        </>
                    }



                    {/** this is my profile */}
                    {userId === loggedInUserId &&
                        <>

                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >

                                {
                                    profileOptions.map((e, index) => (
                                        <TouchableOpacity key={index}
                                            onPress={() => {
                                                setStatusFilter(e.status)

                                            }}
                                            style={[styles.btn_list, status === e.status && styles.btnActive]}>

                                            <Text style={status === e.status ? ({ color: 'rgba(248, 200, 92, 0.9)', fontSize: 20, letterSpacing: 1, fontWeight: 'bold' }) : ({ color: 'white', fontSize: 20, letterSpacing: 1, fontWeight: '900' })}
                                            > {e.text}</Text>

                                        </TouchableOpacity>
                                    ))
                                }
                            </ScrollView>

                            <View style={{ marginTop: 20 }}>

                            </View>

                            {status === 'myposts' && <>
                                <ScrollView


                                >

                                    <>

                                        {myPost.length === 0 &&
                                            <Text style={{ color: 'grey', fontSize: 17, marginTop: 40, alignSelf: 'center' }}>No posts found .</Text>}

                                    </>

                                    {
                                        myPost.map((post, index) => (

                                            <Card key={index} post={post} userId={loggedInUserId} getPostImages={getPostImages(post._id)} />
                                        ))
                                    }



                                </ScrollView>
                                <View style={{ height: 250 }}>

                                </View>

                            </>}


                            {status === 'albums' && <>


                                <>
                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    >

                                        {
                                            albumOptions.map((e, index) => (
                                                <TouchableOpacity key={index}
                                                    onPress={() => {
                                                        setalbumStatusFilter(e.status)

                                                    }}
                                                    style={[styles.btn_album_list, albumStatus === e.status && styles.btnAlbumActive]}>

                                                    <Text style={albumStatus === e.status ? ({ color: 'rgba(248, 200, 92, 0.9)', fontSize: 20, letterSpacing: 1, fontWeight: 'bold' }) : ({ color: 'white', fontSize: 20, letterSpacing: 1, fontWeight: '900' })}
                                                    > {e.text}</Text>

                                                </TouchableOpacity>
                                            ))
                                        }
                                    </ScrollView>



                                    {albumStatus === 'public' &&
                                        <>
                                            <PublicAlbum userId={userId} />
                                        </>
                                    }


                                    {albumStatus === 'private' &&
                                        <>
                                            <PrivateAlbum userId={userId} checkIfImAuthorizedTohisAlbum={checkIfImAuthorizedTohisAlbum()} />
                                        </>
                                    }


                                    <View style={{ height: 250 }}>

                                    </View>


                                </>

                            </>
                            }



                            {status === 'info' && <>


                                <View style={{
                                    backgroundColor: '#111',
                                }}>


                                    <View style={{
                                        flexDirection: 'row', backgroundColor: '#000', justifyContent: 'flex-start',
                                        alignItems: 'center', borderColor: '#111', borderBottomWidth: 0.7
                                    }}>

                                        <View style={{ width: '90%', marginLeft: 10, marginVertical: 7 }}>
                                            <Text style={{ color: 'white', fontSize: 17, letterSpacing: 1, }}>{currUser.about}</Text>
                                        </View>
                                    </View>

                                    <View style={{
                                        flexDirection: 'row', backgroundColor: '#000', justifyContent: 'flex-start',
                                        alignItems: 'center', height: 45, borderColor: '#111', borderBottomWidth: 0.7
                                    }}>
                                        <View style={{ width: '35%', }}>
                                            <Text style={{ color: 'grey', fontSize: 19, letterSpacing: 1, marginLeft: 10 }}>Full Name</Text>

                                        </View>
                                        <View style={{ width: '65%', }}>
                                            <Text style={{ color: 'white', fontSize: 19, letterSpacing: 1, }}>{currUser.FirstName} {currUser.LastName}</Text>
                                        </View>
                                    </View>


                                    <View style={{
                                        flexDirection: 'row', backgroundColor: '#000', justifyContent: 'flex-start',
                                        alignItems: 'center', height: 45, borderColor: '#111', borderBottomWidth: 0.7
                                    }}>
                                        <View style={{ width: '35%', }}>
                                            <Text style={{ color: 'grey', fontSize: 19, letterSpacing: 1, marginLeft: 10 }}>Username</Text>

                                        </View>
                                        <View style={{ width: '65%', }}>
                                            <Text style={{ color: 'white', fontSize: 19, letterSpacing: 1, }}>{currUser.username}</Text>
                                        </View>
                                    </View>





                                    <View style={{
                                        backgroundColor: '#111',
                                        height: 10,
                                    }}>



                                    </View>

                                    <View style={{
                                        flexDirection: 'row', backgroundColor: '#000', justifyContent: 'flex-start',
                                        alignItems: 'center', height: 45, borderColor: '#111', borderBottomWidth: 0.7
                                    }}>
                                        <View style={{ width: '35%', }}>
                                            <Text style={{ color: 'grey', fontSize: 19, letterSpacing: 1, marginLeft: 10 }}>Email</Text>

                                        </View>
                                        <View style={{ width: '65%', }}>
                                            <Text style={{ color: 'white', fontSize: 19, letterSpacing: 1, }}>{currUser.email}</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row', backgroundColor: '#000', justifyContent: 'flex-start',
                                        alignItems: 'center', height: 45, borderColor: '#111', borderBottomWidth: 0.7
                                    }}>
                                        <View style={{ width: '35%', }}>
                                            <Text style={{ color: 'grey', fontSize: 19, letterSpacing: 1, marginLeft: 10 }}>Phone</Text>

                                        </View>
                                        <View style={{ width: '65%', }}>
                                            <Text style={{ color: 'white', fontSize: 19, letterSpacing: 1, }}>{currUser.phoneNumber}</Text>
                                        </View>
                                    </View>

                                    <View style={{
                                        backgroundColor: '#111',
                                        height: 10,
                                    }}>

                                    </View>

                                    <View style={{
                                        flexDirection: 'row', backgroundColor: '#000', justifyContent: 'flex-start',
                                        alignItems: 'center', height: 45, borderColor: '#111', borderBottomWidth: 0.7
                                    }}>
                                        <View style={{ width: '35%', }}>
                                            <Text style={{ color: 'grey', fontSize: 19, letterSpacing: 1, marginLeft: 10 }}>Gender</Text>

                                        </View>
                                        <View style={{ width: '65%', }}>
                                            <Text style={{ color: 'white', fontSize: 19, letterSpacing: 1, }}>{currUser.Gender}</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row', backgroundColor: '#000', justifyContent: 'flex-start',
                                        alignItems: 'center', height: 45, borderColor: '#111', borderBottomWidth: 0.7
                                    }}>
                                        <View style={{ width: '35%', }}>
                                            <Text style={{ color: 'grey', fontSize: 19, letterSpacing: 1, marginLeft: 10 }}>Date of Birth</Text>

                                        </View>
                                        <View style={{ width: '65%', }}>
                                            <Text style={{ color: 'white', fontSize: 19, letterSpacing: 1, }}>{moment(currUser.BirthDate).format('YYYY-MM-DD')}</Text>
                                        </View>
                                    </View>

                                    <View style={{ height: 50 }}>

                                    </View>

                                </View>

                            </>}






                            {status === 'friends' && <>

                                <ScrollView style={{ width: '100%', }}
                                >
                                    {friendsOfThisDude(userId).friends.map((item, index) => (



                                        <TouchableOpacity key={index} style={{ marginHorizontal: 20, alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center', margin: 7, flexDirection: 'row' }} >




                                            <View style={{ width: 70, height: 70, marginHorizontal: 20 }} >

                                                <ImageBackground
                                                    source={{ uri: `${ENV.apiUrl}/user/photo/${item}` }}

                                                    style={{ height: '100%', width: '100%', resizeMode: 'cover' }}>

                                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                                        <Image

                                                            source={require('../../assets/pic_cover.png')}

                                                            style={{ height: '100%', width: '100%', resizeMode: 'cover', alignItems: 'center', justifyContent: 'center' }} />
                                                    </View>

                                                </ImageBackground>


                                            </View>

                                            <Text style={{ color: 'rgba(248, 200, 92, 0.9)', fontSize: 23, letterSpacing: 1, fontWeight: 'bold' }}> {users.filter(u => u._id === item)[0].username} </Text>



                                        </TouchableOpacity>

                                    )




                                    )}
                                </ScrollView>
                                <View style={{ height: 300, alignItems: 'center' }}>

                                    {friendsOfThisDude(userId).friends.length === 0 &&
                                        <Text style={{ color: 'grey', fontSize: 17, marginTop: 40, alignSelf: 'center' }}>No friends found .</Text>}

                                </View>

                            </>
                            }




                        </>}



                </Content>

            </ScrollView >
        </SafeAreaView >

    );
}





export const screenOptions = (navData) => {

    const routeParams = navData.route.params ? navData.route.params : {};
    if (!routeParams.username) {
        return {
            headerTitle: routeParams.username ? routeParams.username : "Profile",
            /**headerRight: () => (
                <MenuItem />
            )
        }
    */}
    } else {
        return {
            headerTitle: routeParams.username ? routeParams.username : "Profile",



            headerStyle: {
                backgroundColor: 'black',


            },
        }
    }


}







const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    diamond: {
        width: 70,
        height: 70,
        borderRadius: 100 / 2,

    },

    btn_list: {



        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 3,
        backgroundColor: '#111'
        // , borderWidth: 0.3, borderColor: 'white',
        ,
        alignItems: 'center',
        height: 50
    },
    btnActive: {
        borderColor: Colors.gold, borderBottomWidth: 3,
    },


    btn_album_list: {



        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 2,

        // , borderWidth: 0.3, borderColor: 'white',

        alignItems: 'center',
        height: 50
    },
    btnAlbumActive: {
        //   borderColor: 'rgba(212, 165, 61, 0.8)', borderBottomWidth: 3,
    },



    container: {
        flex: 1,
        backgroundColor: '#000',

    },
    text: {
        paddingBottom: 20,
        color: "#fff"
    },
    image: {

        height: '100%',
        width: '100%',


    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },


    pencil: {

        width: 25,
        height: 25,
        transform: [{ rotate: '-45deg' }],
        tintColor: 'white',

    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#efb734",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {

        alignItems: "center",

        flex: 1,
        backgroundColor: 'black',
        width: '100%'
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 130,
        height: 130,
        margin: 5,
        overflow: "hidden",

    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: 200,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "white",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    icons: {
        height: 30,
        width: 30,
        margin: 5,


    },

    activatedicons: {
        height: 25,
        width: 25,
        margin: 5,
        tintColor: Colors.orange
    },
    diasbledEffect: {
        display: 'none'
    },
    centre: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    menuButtons: {
        fontSize: 10,
        color: 'grey',
        alignContent: 'center'

    },
});

export default UserProfileScreen;

