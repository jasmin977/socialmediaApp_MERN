import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, ImageBackground, FlatList, Image, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

import { useSelector, useDispatch } from "react-redux";
import ENV from '../../env';
import * as userActions from '../../store/actions/users';
import { showMessage } from "react-native-flash-message";
import Diamand from '../loader'

const BlockedUsers = () => {

    const loggedInUserId = useSelector(state => state.auth.user._id);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const friends = useSelector(state => state.friends.myFriends);
    const myBlockedList = friends.filter(u => u.userRef === loggedInUserId)[0];
    const users = useSelector(state => state.users.allUsers);

    const dispatch = useDispatch();




    // loads all the users
    const loadData = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {


            await dispatch(userActions.fetchUsers());
            await dispatch(userActions.fetchMyFriend());


        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError])





    useEffect(() => {
        setIsLoading(true);

        loadData()
            .then(() => {
                setIsLoading(false);
            });
    }, [dispatch, loadData])


    // console.log(myBlockedList.blocked)
    const getUsername = (id) => {
        return users.filter(u => u._id === id)[0].username;
    }



    {/** unblocking */ }
    const unblock = async (friendId) => {

        try {
            await dispatch(userActions.unblockFriend(friendId));
            showMessage({
                message: "Unblocked",
                type: "default",
                duration: 3000,

                icon: { icon: "success", position: 'left' },
                backgroundColor: Colors.gold, // background color
                color: 'black', // text color
            });

        } catch (error) {
            console.log("ERROR ", error)
        }
    }


    if (isLoading) {
        return (
            <Diamand />
        );
    }




    if (!isLoading && friends.length === 0) {
        return (
            <View style={styles.centered} >

                <Text style={{ color: 'white' }}>No users found.</Text>


            </View>
        );
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',

            backgroundColor: 'black'
        }}>







            <View style={{ marginTop: 1 }} >

                <FlatList
                    ListHeaderComponent={
                        <View style={{ width: '90%', alignItems: "flex-start", paddingHorizontal: 10, marginBottom: 20 }}>
                            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', letterSpacing: 1 }}>
                                Blocked People
    </Text>

                            <Text style={{ color: 'grey', fontSize: 15, fontWeight: '900', }}>
                                Once you block someone,that person can longer see things you post on your Timeline,invite you to events,start a conversation with you,or add you as a friend.
    </Text>
                        </View>


                    }
                    data={myBlockedList.blocked}
                    keyExtractor={(item, index) => index.toString()}



                    renderItem={(user) => {

                        return (
                            <View style={{ width: '100%' }}>


                                <View style={{ flexDirection: 'row', width: 350, alignItems: 'center', marginVertical: 5, }}>
                                    <ImageBackground
                                        source={{ uri: `${ENV.apiUrl}/user/photo/${user.item}` }}

                                        style={{ height: 60, width: 60, marginHorizontal: 15 }}>

                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image

                                                source={require('../../assets/pic_cover.png')}

                                                style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }} />
                                        </View>

                                    </ImageBackground>

                                    <Text style={{ color: 'white', fontWeight: '900', fontSize: 20, marginHorizontal: 10 }}>{getUsername(user.item)}</Text>

                                    <TouchableOpacity
                                        onPress={() => unblock(user.item)}
                                        style={{ position: 'absolute', right: 10 }}>
                                        <Text style={{ color: 'grey', fontWeight: '900', fontSize: 18 }}>UNBLOCK</Text>

                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}

                />

            </View>













        </View>
    );
};

export default BlockedUsers;