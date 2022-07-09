import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GiftedChat, InputToolbar, Send, Bubble } from 'react-native-gifted-chat';

import * as chatActions from '../../store/actions/chat';

import socketIO from 'socket.io-client';
import ENV from '../../env';
import { SimpleLineIcons, MaterialIcons, AntDesign } from '@expo/vector-icons'
import Colors from '../../constants/Colors';
import VerifiedUser from '../../constants/VerifiedUser';


let socket;

const ChatScreen = (props) => {
    const dispatch = useDispatch();
    const { route } = props;
    const user = route.params.user;
    const userId = user._id;
    const loggedUser = useSelector(state => state.auth.user);

    const chats = useSelector(state => state.chat.allChats);
    const currChats = chats.filter(c => (c.sender._id === loggedUser._id && c.reciever._id === userId) || (c.sender._id === userId && c.reciever._id === loggedUser._id))
    // traja3li el chats eli eni b3atht fehom messages weli ba3thouli fehom messages
    const resultChats = currChats.map(c => {
        return {
            key: Math.round(Math.random() * 100000000),
            _id: c._id,
            text: c.message,
            createdAt: new Date(c.time),
            user: {
                _id: c.sender._id,
                username: c.sender.username,
                avatar: require('../../assets/pic_cover.png'),


            }
        }
    }).reverse();

    const [text, setText] = useState('');
    const [messages, setMessages] = useState(resultChats); //contients tous les messages



    const sendPushNotification = async (userName, text) => {
        const message = {
            to: user.notificationToken,
            sound: 'default',
            title: `New message from ${userName}`,
            body: text,
            data: { data: 'goes here' },
            _displayInForeground: true,
        };
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        const res = await response.json();
        // console.log(res);
    };


    useEffect(() => {
        socket = socketIO.connect(ENV.apiUrl)
        socket.on('connect', () => {
            console.log('connected chat screen')
            socket.emit('userInfo', loggedUser);
        })
    }, [])


    useEffect(() => {
        socket.on('message', (newChat) => {
            console.log("New message");
            // if(newChat.sender._id !== loggedUser._id){
            //push notification
            // }

            if (newChat.sender._id === loggedUser._id || newChat.sender._id === userId) {
                let giftedNewChat = {
                    _id: newChat._id,
                    text: newChat.message,
                    createdAt: new Date(newChat.time),
                    user: {
                        _id: newChat.sender._id,
                        username: newChat.sender.username,

                    }
                }
                setMessages(previousMessages => GiftedChat.append(previousMessages, giftedNewChat))
            }
            dispatch(chatActions.addChat(newChat))
        })
    }, [setMessages])

    const onSend = useCallback((messages = []) => {
        socket.emit('sendMessage', messages[0].text, loggedUser, user, () => {

            console.log("NOTIFICATION PUSHING to", user.username)
            sendPushNotification(loggedUser.username, messages[0].text);
            setText('');
            //setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        })
    }, [])


    /////////////////////
    //syling input bar
    const renderInputToolbar = props => {

        return <InputToolbar  {...props}

            containerStyle={{
                backgroundColor: '#111',
                borderTopWidth: 0,
                marginHorizontal: 10,

                // marginLeft: '12%',

            }}
            textInputProps={{
                style: {
                    color: '#fff',
                    fontSize: 17,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 10
                },
                multiline: false,
                returnKeyType: 'go',

            }}
        />

    }





    //styling send button
    const renderSend = props => {


        return <Send {...props}>


            <MaterialIcons
                name="send"
                style={{
                    width: 28, height: 28,
                    marginRight: '0%',
                    marginBottom: '30%',
                }}


                size={30}
                color='grey'>

            </MaterialIcons>

        </Send>



    }



    return (
        <View style={{ flex: 1, backgroundColor: '#000' }} >
            <GiftedChat
                renderInputToolbar={renderInputToolbar} // style lel input
                text={text}
                onInputTextChanged={text => setText(text)}
                messages={messages}
                showUserAvatar={false}
                renderSend={renderSend}
                placeholder="Type your message here..."

                onSend={messages => onSend(messages)}
                user={{
                    _id: loggedUser._id,
                    username: loggedUser.username,
                    avatar: `${ENV.apiUrl}/user/photo/${loggedUser._id}`,


                }}


                renderBubble={props => {
                    return (
                        <Bubble
                            {...props}
                            textStyle={{
                                right: {
                                    color: Colors.gold,
                                    fontSize: 20,

                                },
                                left: {
                                    color: 'white',
                                    fontSize: 20,
                                }
                            }}
                            timeTextStyle={{
                                right: { color: Colors.gold, fontSize: 10 },
                                left: { color: 'grey', fontSize: 10 }


                            }}

                            bottomContainerStyle={{
                                right: {
                                    backgroundColor: 'transparent',

                                },
                                left: {
                                    backgroundColor: '#101010', borderColor: Colors.gold, borderWidth: 0
                                },
                            }}
                            wrapperStyle={{
                                right: { backgroundColor: 'rgba(212, 165, 61, 0.2)', borderColor: Colors.gold, borderWidth: 0.8, marginTop: 5, padding: 5, },
                                left: { backgroundColor: '#101010', borderColor: '#101010', borderWidth: 0.8, marginTop: 5, padding: 5 },
                            }}






                        />
                    );
                }}


                alwaysShowSend={true}

            />
        </View>
    );
};


export const screenOptions = (navData) => {

    const routeParams = navData.route.params;
    return {

        headerTitle: () => (

            <View style={{ flexDirection: 'row', alignItems: 'center', }}>



                <ImageBackground
                    source={{ uri: `${ENV.apiUrl}/user/photo/${routeParams.user._id}` }}

                    style={{ height: 35, width: 35, borderRadius: 50, marginHorizontal: 5, marginLeft: -15 }}>



                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image

                            source={require('../../assets/pic_cover.png')}

                            style={{ width: 35, height: 35, alignItems: 'center', justifyContent: 'center' }} />
                    </View>

                </ImageBackground>
                <Text
                    style={{ color: "white", fontSize: 22 }}
                >
                    {routeParams.user.username}

                </Text>
            </View>
        ),
        headerRight: () => (

            <View style={{ flexDirection: 'row' }}>
                {/**
                 *  <TouchableOpacity
                    style={{ marginRight: 15 }}>
                    <SimpleLineIcons
                        name="phone"


                        size={30}
                        color={Colors.gold}>

                    </SimpleLineIcons>

                </TouchableOpacity>

                <TouchableOpacity style={{ marginRight: 10 }}>
                    <AntDesign
                        name="videocamera"



                        size={30}
                        color={Colors.gold}>

                    </AntDesign>

                </TouchableOpacity>
                 */}

            </View>

        ),
    }
}

export default ChatScreen;