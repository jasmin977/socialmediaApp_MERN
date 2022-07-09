import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image, TouchableWithoutFeedback, ImageBackground
} from 'react-native';
import { Octicons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import * as usersActions from '../../store/actions/users';
import Colors from '../../constants/Colors';
import { showMessage } from "react-native-flash-message";
import { useNavigation } from '@react-navigation/native';

import ENV from '../../env';
import VerifiedUser from '../../constants/VerifiedUser';


const UserList = (props) => {
    const { item, followHandler } = props;
    const [imageUri, setImageUri] = useState(`${ENV.apiUrl}/user/photo/${item._id}`)


    const loggedInUserId = useSelector(state => state.auth.user._id);
    const allUsers = useSelector(state => state.users.allUsers);
    const loggedInUser = allUsers.filter(u => u._id === loggedInUserId)[0];

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri);
    }

    const checkFollow = (userId) => {
        const isFollowed = loggedInUser.following.filter(f => f._id === userId).length !== 0;
        return isFollowed;
    }

    const followUserHandler = async () => {
        if (checkFollow(item._id)) {
            followHandler(item._id);
            showMessage({
                message: `Your are already following ${item.name}.`,
                type: "success",
                duration: 3000,
                icon: { icon: "success", position: 'left' }
            });
        } else {
            await dispatch(usersActions.followFindPeople(item._id))
            followHandler(item._id);
            showMessage({
                message: `Your are now following ${item.name}.`,
                type: "default",
                duration: 3000,
                icon: { icon: "success", position: 'left' },
                backgroundColor: "black", // background color
                color: Colors.gold, // text color
            });
            await dispatch(usersActions.followUser(item))
        }
    }

    return (

        ////////////

        <TouchableWithoutFeedback
            onPress={() => navigation.navigate('UserProfile', { userId: item._id, name: item.name })}
        >
            <View style={styles.container}>

                <View style={{ height: 80, width: 80, justifyContent: 'center', alignItems: 'center' }}>

                    <ImageBackground source={{ uri: imageUri }} style={{ height: 80, width: 80 }}>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image

                                source={require('../../assets/pic_cover.png')}
                                onError={onImageErrorHandler}
                                style={{ width: 80, height: 80, alignItems: 'center', justifyContent: 'center' }} />
                        </View>

                    </ImageBackground>
                    <View style={styles.text}>
                        <Text
                            style={styles.name}
                        >
                            {item.name + " "}

                            {
                                VerifiedUser.verifiedUsersId.includes(item._id) && <Octicons name="verified" size={20} color={Colors.brightBlue} />
                            }
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>


        //////

    )
}



const styles = StyleSheet.create({

    container: {
        padding: 16,
        justifyContent: 'center',
        margin: 20,
        alignItems: 'center',
    },

    text: {

        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'

    },
    name: {
        fontSize: 15,
        color: Colors.gold_brown,
        flex: 1,
    },

    userImage: {
        height: 120,
        width: 120,


        alignSelf: 'center',

        backgroundColor: '#c2c2c2'
    },

    position: {
        fontSize: 14,
        flex: 1,
        alignSelf: 'center',
        color: "#696969"
    },
    followButton: {
        marginTop: 10,
        height: 35,
        width: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: Colors.brightBlue
    },
    followButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
    },
    icon: {
        height: 20,
        width: 20,
    }
});

export default UserList;