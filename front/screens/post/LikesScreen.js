import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ImageBackground, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';

import Comment from '../../components/UI/Comment';
import { useSelector, useDispatch } from 'react-redux';

import * as postsActions from '../../store/actions/posts';
import * as usersActions from '../../store/actions/users';
import ENV from '../../env';

import Colors from '../../constants/Colors';
import { showMessage } from "react-native-flash-message";

import {
    Feather
} from '@expo/vector-icons';

const LikesScreen = (props) => {

    const [imageUri, setImageUri] = useState('')

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { route } = props;
    const postId = route.params.postId;
    const userId = route.params.userId;



    const dispatch = useDispatch();
    const loggedInUserId = useSelector(state => state.auth.user._id);

    const posts = useSelector(state => state.posts.allPosts);
    const allUsers = useSelector(state => state.users.allUsers);
    const myData = allUsers.filter(u => u._id === loggedInUserId)[0];

    const postIndex = posts.findIndex(post => post._id === postId);
    const likesIds = posts[postIndex].likes;


    const loadPosts = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await dispatch(postsActions.fetchPosts());



        } catch (err) {
            Alert.alert(
                'Error',
                error.message,
                [{ text: 'Okay' }]
            );
        }
        setIsRefreshing(false);
    }, [dispatch])



    const getUser = (userId) => {
        return allUsers.filter(u => u._id === userId)[0];

    }

    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }
    const checkFriend = (userId) => {
        let check = myData.friends.indexOf(userId) !== -1;
        return check;
    }


    return (
        <View style={{ flex: 1 }} >
            <FlatList
                style={styles.root}
                onRefresh={loadPosts}
                refreshing={isRefreshing}
                data={likesIds}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={styles.separator} />
                    )
                }}
                keyExtractor={(userId) => {
                    return userId.item;
                }}
                renderItem={(userId) => {

                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <ImageBackground
                                source={{ uri: `${ENV.apiUrl}/user/photo/${userId.item}?${new Date(getUser(userId.item).updated)}` || imageUri }}
                                onError={onImageErrorHandler}
                                style={{ height: 70, width: 70, marginHorizontal: 15, marginVertical: 10 }}>

                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image

                                        source={require('../../assets/pic_cover.png')}

                                        style={{ width: 70, height: 70, alignItems: 'center', justifyContent: 'center' }} />
                                </View>

                            </ImageBackground>
                            <Text style={{ color: 'white', fontSize: 19, letterSpacing: 1 }}>{getUser(userId.item).username}</Text>



                            {checkFriend(userId.item) ? (
                                <TouchableOpacity

                                    style={{
                                        alignItems: 'center',
                                        right: 20, position: 'absolute', alignSelf: 'center',
                                        height: 40, width: '35%', justifyContent: 'center',

                                    }} >
                                    {/**   <Image style={{
                                        width: 26, marginRight: 5,
                                        tintColor: Colors.gold,
                                        height: 26,
                                    }}
                                        source={require('../../assets/settingsIcons/messenger.png')}>
                                    </Image>*/}


                                </TouchableOpacity >
                            ) : (
                                <>
                                    {userId.item != loggedInUserId &&
                                        <TouchableOpacity

                                            style={{
                                                alignItems: 'center',
                                                borderColor: Colors.gold, borderWidth: 1, right: 20, position: 'absolute', backgroundColor: 'rgba(212, 165, 61, 0.2)', alignSelf: 'center',
                                                height: 40, width: '35%', justifyContent: 'center',

                                            }} >

                                            <Text style={{
                                                color: 'white', fontSize: 15, letterSpacing: 1, margin: 10
                                            }} >
                                                Add friend
                                            </Text >

                                        </TouchableOpacity >}
                                </>
                            )}



                        </View>
                    );
                }}
            />

        </View>
    );
};


export const screenOptions = {
    headerTitle: 'Likes'
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#000",

    },

});

export default LikesScreen;