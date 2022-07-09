import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';

import Comment from '../../components/UI/Comment';
import { useSelector, useDispatch } from 'react-redux';

import * as postsActions from '../../store/actions/posts';
import Colors from '../../constants/Colors';
import { showMessage } from "react-native-flash-message";

import {
    Feather
} from '@expo/vector-icons';

const CommentsScreen = (props) => {

    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { route } = props;
    const postId = route.params.postId;
    const userId = route.params.userId;
    const friendId = route.params.friendId;


    const dispatch = useDispatch();

    const posts = useSelector(state => state.posts.allPosts);
    const postIndex = posts.findIndex(post => post._id === postId);
    const comments = posts[postIndex].comments;


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

    const createCommentHandler = async (friendId) => {
        if (text.length === 0) {
            Alert.alert(
                'Please enter some text',
                'Cannot create empty comment',
                [{ text: 'Okay' }]
            );
        } else {
            setIsLoading(true);
            try {
                await dispatch(postsActions.commentPost(postId, text, friendId))
            } catch (error) {
                Alert.alert(
                    'Error, cannot comment',
                    error.message,
                    [{ text: 'Okay' }]
                );
            }
            setText('');
            setIsLoading(false);
        }
    }


    const deleteCommentHandler = async (comment) => {
        Alert.alert(
            'Are you sure?',
            'Do you really want to delete this comment?',
            [
                { text: 'No', style: 'default' },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            showMessage({
                                message: `Your comment was deleted.`,
                                type: "warning",
                                duration: 3000,
                                icon: { icon: "warning", position: 'left' }
                            });
                            await dispatch(postsActions.uncommentPost(postId, comment))
                        } catch (error) {
                            Alert.alert(
                                'Error, cannot delete this comment',
                                error.message,
                                [{ text: 'Okay' }]
                            );
                        }
                    }
                }
            ]
        );
    };


    return (
        <View style={{ flex: 1 }} >
            <FlatList
                style={styles.root}
                onRefresh={loadPosts}
                refreshing={isRefreshing}
                data={comments}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={styles.separator} />
                    )
                }}
                keyExtractor={(item) => {
                    return item._id;
                }}
                renderItem={(item) => {
                    const comment = item.item;
                    return (
                        <Comment comment={comment} deleteCommentHandler={deleteCommentHandler} userId={userId} />
                    );
                }}
            />
            <KeyboardAvoidingView style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Type..."
                        value={text}
                        onChangeText={(value) => setText(value)}
                    />
                    <View
                        style={styles.postButtonContainer}
                    >
                        <TouchableOpacity
                            onPress={() => createCommentHandler(friendId)}

                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color={Colors.gold} />
                            ) : (
                                <Feather

                                    name="send"


                                    size={24}

                                    color={Colors.gold}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>

        </View>
    );
};


export const screenOptions = {
    headerTitle: 'Comments'
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#000",
        marginBottom: 45
    },
    inputs: {
        height: 45,
        width: '70%',
        marginLeft: 16,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        flex: 1,
        fontSize: 22,
        color: 'white',
        position: 'absolute',
        bottom: 10,
        paddingBottom: 5,
        paddingRight: 20
    },
    inputContainer: {

        backgroundColor: '#111',

        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',


    },
    postButtonContainer: {
        position: 'absolute',
        right: 0,
        height: 45,
        width: 45,
        backgroundColor: 'rgba(212, 165, 61, 0.1)', borderWidth: 1, borderColor: 'rgba(212, 165, 61, 0.7)',

        padding: 5,
        margin: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CommentsScreen;