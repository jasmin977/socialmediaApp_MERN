import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList, Text, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as chatActions from '../../store/actions/chat';
import Colors from '../../constants/Colors';
import ChatListItem from '../../components/UI/ChatListItem';

import SwitchSelector from './react-native-switch-selector';

import ActiveUsers from '../activeUsers/ActiveUsers';

import Diamand from '../loader'
import Chat from '../chatLoader'

import { Container, Header, Item, Input, Icon, Col } from 'native-base';




const ChatListScreen = (props) => {




    const loggedUser = useSelector(state => state.auth.user);
    const chatList = useSelector(state => state.chat.chatList);
    const allChats = useSelector(state => state.chat.allChats);
    const onlineUsers = useSelector(state => state.chat.onlineUsers); // list of connected users
    let allUsers = useSelector(state => state.users.allUsers);

    // remove logged user from the list
    allUsers = allUsers.filter(item => item._id !== loggedUser._id);

    const getLastmessage = (conversation) => {
        let lastMessage = conversation[conversation.length - 1];
        return {

            text: lastMessage.message,
            createdAt: new Date(lastMessage.time),

        }
    };






    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState(chatList);


    const dispatch = useDispatch();
    useEffect(() => {
        setData(chatList)
    }, [chatList])

    const loadChatList = useCallback(async () => {
        setIsRefreshing(true);
        try {
            const result = await dispatch(chatActions.fetchChatList()); //te5ou chat list mel front
            await dispatch(chatActions.fetchChats());
            await dispatch(chatActions.getOnlineUsers());
            setData(result);
        } catch (err) {
            console.log(err)
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading])

    const loadChats = useCallback(async () => {
        try {
            await dispatch(chatActions.fetchChats());
            await dispatch(chatActions.getOnlineUsers());
        } catch (err) {
            console.log(err)
        }
    }, [dispatch, setIsLoading])


    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', e => {
            setSearchText('');
            loadChatList();
        });
        return () => {
            unsubscribe();
        };
    }, [])

    useEffect(() => {

        setIsLoading(true);
        loadChats()
            .then(() => {
                setIsLoading(false);
            });
    }, [dispatch, loadChats])

    const handleSearchTextChange = (text) => {
        setSearchText(text);
        if (text.length !== '') {
            let filteredData = []
            let currData = allUsers;

            filteredData = currData.filter(item => {
                const lc = item.username.toLowerCase();
                text = text.toLowerCase();
                return lc.includes(text);
            });
            setData(filteredData);
        } else {
            setData(chatList);
        }
    }


    if (isLoading) {
        return (
            <Diamand />
        );
    }




    //  console.log('chats ' + chatList.length)

    if (!isLoading && data.length === 0) {
        return (
            <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 150, height: 150, marginTop: -20 }}>
                    <Image source={require('../../assets/msg.png')}
                        style={{ width: '100%', height: '100%', tintColor: Colors.gold, resizeMode: 'cover' }} />

                </View>
                <TouchableOpacity onPress={loadChatList}>
                    <Text style={{ color: 'white', fontSize: 20, letterSpacing: 1 }}>No messages yet!</Text>

                </TouchableOpacity>

                <Text style={{ color: 'grey', fontSize: 16, marginTop: 5 }}>When you get a message you'll see it here.</Text>

            </View>

        );
    }


    return (
        <Container style={{ backgroundColor: Colors.brightBlue }}>
            <StatusBar
                backgroundColor="#000"
                barStyle='light-content'

            />
            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginVertical: 10 }}>
                <Text style={{ fontWeight: '900', color: 'white', fontSize: 20, letterSpacing: 2, }}>  MESSAGES</Text>



            </View>
            <Header style={{
                backgroundColor: '#141414', flexDirection: 'row', justifyContent: 'center',

                alignItems: 'center', width: '100%', height: 45,
            }} searchBar
            >


                <Input
                    style={{ fontSize: 20, color: 'white', height: 40, width: '100%', }}
                    value={searchText}
                    onChangeText={(text) => handleSearchTextChange(text)}
                    placeholder="Search"
                    backgroundColor="#141414"


                />

            </Header>



            <FlatList
                data={data}

                style={{ marginTop: 10 }}
                refreshing={isRefreshing}
                onRefresh={loadChatList}
                keyExtractor={(item) => item._id}
                renderItem={(user) => {

                    let check = user.item.deactivate;
                    return (
                        // check === false &&

                        <ChatListItem user={user.item} onlineUsers={onlineUsers} getLastmessage={getLastmessage} />
                    )
                }}
            />




        </Container>
    );
};


export const screenOptions = {
    headerTitle: 'Messages'
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', letterSpacing: 1, fontWeight: '900', fontStyle: 'italic',
        backgroundColor: '#000'

    },
    row: {

        justifyContent: "space-around"
    }
})

export default ChatListScreen;