import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from 'react-native';

import ENV from '../../env';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { timeDifference } from '../../helpers/timeDifference';
import { Octicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';




const ChatListItem = (props) => {
    const { user, onlineUsers, getLastmessage } = props;

    const [isLoading, setIsLoading] = useState(false);

    const loggedInUserId = useSelector(state => state.auth.user._id);
    const allUsers = useSelector(state => state.users.allUsers);

    const allChats = useSelector(state => state.chat.allChats);


    const conversation = allChats.filter(c => (c.sender._id === loggedInUserId && c.reciever._id === user._id) || (c.sender._id === user._id && c.reciever._id === loggedInUserId))


    const navigation = useNavigation();

    const chechConnected = (userId) => {

        for (var i = 0; i < onlineUsers.length; i++) {
            if (onlineUsers[i].user._id === userId._id) {
                return true;
            }
            else return false;
        }

    }


    const [imageUri, setImageUri] = useState(`${ENV.apiUrl}/user/photo/${user._id}`);


    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }



    return (



        <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Chat', { user: user })}
        >
            <View style={styles.container}>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '100%' }}>

                    <ImageBackground source={{ uri: imageUri }} style={{ height: 66, width: 60, marginRight: 20 }}>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image

                                source={require('../../assets/pic_cover.png')}
                                onError={onImageErrorHandler}
                                style={{ width: 66, height: 66, alignItems: 'center', justifyContent: 'center' }} />
                        </View>

                        {chechConnected(user) &&
                            <View style={{ backgroundColor: Colors.gold, height: 13, width: 13, borderRadius: 50, position: 'absolute', right: 10, bottom: 10 }}>
                            </View>
                        }
                    </ImageBackground>


                    {conversation.length === 0 ? (
                        <View style={{ width: '80%' }}>

                            <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginVertical: 5, }}>



                                <Text
                                    style={{
                                        fontSize: 18, letterSpacing: 1,
                                        color: 'grey',
                                    }}
                                >
                                    {user.username}

                                </Text>





                            </View>


                        </View>
                    ) : (
                        <View style={{ width: '80%' }}>

                            <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginVertical: 5, }}>



                                <Text
                                    style={{
                                        fontSize: 22, letterSpacing: 1,
                                        color: 'white',
                                    }}
                                >
                                    {user.username}

                                </Text>
                                <Text
                                    style={{

                                        fontSize: 13, letterSpacing: 1, position: 'absolute', right: 10,
                                        color: 'grey',
                                    }}
                                >
                                    {timeDifference(new Date(), new Date(getLastmessage(conversation).createdAt))}


                                </Text>




                            </View>
                            <Text
                                style={{
                                    fontSize: 18, letterSpacing: 1,
                                    color: 'grey',

                                }}
                            >
                                {getLastmessage(conversation).text}

                            </Text>

                        </View>


                    )}







                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        justifyContent: 'flex-start',
        margin: 5,
        alignItems: 'flex-start',
    },




    text: {

        alignItems: 'center', flexDirection: 'row',
        justifyContent: 'center',

    },


    img: {
        height: 50,
        width: 50,
        margin: 0
    },

    timeAgo: {
        fontSize: 12,
        color: "#696969"
    },
    name: {
        fontSize: 18,
        color: Colors.gold,

    }
})

export default ChatListItem;