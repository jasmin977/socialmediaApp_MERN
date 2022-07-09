import React, { useState, useCallback, useEffect, useRef } from 'react';

import { View, Animated, FlatList, Button, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions, Image, StyleSheet, Text } from 'react-native';
import Colors from '../../constants/Colors';
import { Container, Input } from 'native-base';

import { useDispatch, useSelector } from 'react-redux';
import EventItem from '../../components/UI/EventItemSearch';
import UserItem from '../../components/UI/UserItem';
import Card from '../../components/UI/Card';

import Highlighter from 'react-native-highlight-words';

import { useNavigation } from '@react-navigation/native';

import ENV from '../../env';
import Diamand from '../loader'

import * as postsActions from '../../store/actions/posts';
import * as eventActions from '../../store/actions/event';
import * as usersActions from '../../store/actions/users';



const Search = () => {

    const users = useSelector(state => state.users.allUsers);
    const loggedInUserId = useSelector(state => state.auth.user._id);

    const friends = useSelector(state => state.friends.myFriends);




    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const [searchText, setSearchText] = useState('');
    const [peopleData, setPeopleData] = useState(users);


    const dispatch = useDispatch();



    const loggedUser = useSelector(state => state.auth.user);


    const loadData = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {


            await dispatch(usersActions.fetchUsers());
            await dispatch(usersActions.fetchMyFriend());

            setPeopleData(users);



        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        const ac = new AbortController();

        setIsLoading(true);
        loadData()
            .then(() => {
                setIsLoading(false);
            });
        return () => ac.abort();

    }, [dispatch, loadData])



    useEffect(() => {
        setPeopleData(users)
    }, [users])



    const handleSearchTextChange = (text) => {
        setSearchText(text);
        if (text.length != '') {
            let filteredPeopleData = [];

            let alldata = users;


            filteredPeopleData = alldata.filter(item => {
                const lc = item.username.toLowerCase();
                text = text.toLowerCase();
                return lc.includes(text);
            });
            setPeopleData(filteredPeopleData);
        } else {

            setPeopleData(users);

        }
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



    //  console.log(users.length)

    if (error) {
        return (
            <View style={styles.centered} >
                <Text>An error occured.</Text>
                <Button title="Try again" onPress={loadData} color={Colors.gold_brown} />
            </View>
        );
    }

    //loading everything
    if (isLoading) {
        return (
            <Diamand />
        );
    }



    if (!isLoading && users.length === 0) {

        <Text>An error occured.</Text>

    }
    if (!isLoading && !friends) {

        console.log('friends is undefined')

    }



    // console.log(friends)

    ///////////////////


    return (


        <Container style={styles.background}  >

            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} >

                <View style={{ height: 50, width: '100%', margin: 5, backgroundColor: '#141414', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <Input
                        style={{ fontSize: 17, color: 'white', height: 40, width: '85%', }}
                        value={searchText}

                        onChangeText={(text) => handleSearchTextChange(text)}
                        placeholder="Search"
                        backgroundColor="#141414"


                    />
                </View>


            </View>


            {peopleData.length === 0 &&
                <Text style={{ color: 'grey', fontSize: 17, alignSelf: 'center', marginTop: 20 }}>No User found.</Text>}




            <FlatList

                data={peopleData}
                numColumns={3}                  // set number of columns 
                columnWrapperStyle={{ justifyContent: "space-around" }}  // space them out evenly
                keyExtractor={(e, i) => i.toString()}
                onRefresh={loadData}
                refreshing={isRefreshing}


                renderItem={(user) => {

                    let check = user.item.deactivate;


                    return (
                        check === false && loggedUser._id != user.item._id && checkIfIBlockedHim(user.item._id) === false && checkIfHeIsBlockingMe(user.item._id) === false &&
                        //  check === false && loggedUser._id != user.item._id &&

                        (<UserItem user={user.item} searchText={searchText} />)


                    )
                }}

            />








        </Container >


    );
}

const styles = StyleSheet.create({

    background: {
        flex: 1,

        backgroundColor: "#000",


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
    btn_list: {
        padding: 5,

        flexDirection: 'row',
        justifyContent: 'center',
        width: Dimensions.get('window').width / 4,

        margin: 5
    },
    btnActive: {
        backgroundColor: Colors.gold, color: 'black'
    },
    highlighted: {
        backgroundColor: Colors.gold,
        color: 'white'
    }


});

export default Search;