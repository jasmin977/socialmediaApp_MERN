import React, { useState, useCallback, useEffect, useRef } from 'react';

import { View, Animated, FlatList, SafeAreaView, ImageBackground, ActivityIndicator, ScrollView, Dimensions, Image, StyleSheet, Text } from 'react-native';
import Colors from '../../constants/Colors';
import { Container, Input } from 'native-base';

import { useDispatch, useSelector } from 'react-redux';


import { useNavigation } from '@react-navigation/native';

import ENV from '../../env';

import * as usersActions from '../../store/actions/users';
import { TouchableOpacity } from 'react-native-gesture-handler';



const ActiveUsers = () => {



    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();




    //_____________ LOAD USERS_________________

    const users = useSelector(state => state.users.allUsers);
    //_____________________





    const loggedUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigation = useNavigation();


    // loads all the posts
    const loadData = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(usersActions.fetchUsers());

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



    if (isLoading) {
        return (
            <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }} >
                <ActivityIndicator size='large' color={Colors.gold_brown} />
            </View>
        );
    }




    return (






        <FlatList
            style={{ marginHorizontal: 10 }}
            data={users}
            keyExtractor={(e, i) => i.toString()}
            horizontal
            onRefresh={loadData}
            refreshing={isRefreshing}
            renderItem={(user) => {
                //{oneItem.item.searchBy}
                return (

                    <View style={{

                        alignItems: 'center', justifyContent: 'center', height: 150,

                    }}>

                        <View style={{
                            width: 10, height: 10, transform: [{ rotate: '45deg' }],
                            backgroundColor: Colors.gold
                        }}>

                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Chat', { user: user.item })}>
                            <ImageBackground
                                source={{ uri: `${ENV.apiUrl}/user/photo/${user.item._id}` }}

                                style={{ height: 66, width: 66, marginHorizontal: 10, marginVertical: 5 }}>

                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                    <Image

                                        source={require('../../assets/pic_cover.png')}

                                        style={{ width: 66, height: 66, alignItems: 'center', justifyContent: 'center' }} />
                                </View>

                            </ImageBackground>
                        </TouchableOpacity>


                        <Text style={{
                            fontSize: 15,
                            color: 'white'
                        }}>{user.item.username}</Text>



                    </View>

                )

            }}

        />



    );
}



export default ActiveUsers;