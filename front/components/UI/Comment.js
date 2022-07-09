import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity, ImageBackground,
    Image
} from 'react-native';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { useSelector } from "react-redux";

import ENV from '../../env';
import { timeDifference } from '../../helpers/timeDifference';
import VerifiedUser from '../../constants/VerifiedUser';
import Colors from '../../constants/Colors';


const Comment = (props) => {

    const { comment, deleteCommentHandler, userId } = props;
    const [imageUri, setImageUri] = useState('')


    const users = useSelector(state => state.users.allUsers);
    const currUser = users.filter(u => u._id === comment.postedBy._id)[0];

    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }

    const deleteComment = () => {
        deleteCommentHandler(comment);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { }}>


                <ImageBackground
                    source={{ uri: imageUri || `${ENV.apiUrl}/user/photo/${comment.postedBy._id}?${new Date(comment.postedBy.updated)}` }}
                    onError={onImageErrorHandler}
                    style={{ height: 60, width: 60 }}>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image

                            source={require('../../assets/pic_cover.png')}
                            onError={onImageErrorHandler}
                            style={{ width: 65, height: 65, alignItems: 'center', justifyContent: 'center' }} />
                    </View>

                </ImageBackground>






            </TouchableOpacity>
            <View style={styles.content}>
                <View style={styles.contentHeader}>
                    {/** {console.log(currUser.username)} */}
                    <Text style={styles.name}>

                        {currUser.username}

                    </Text>
                    <Text style={styles.time}>
                        {timeDifference(new Date(), new Date(comment.created))}
                    </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }} >
                    <Text rkType='primary3 mediumLine' style={{ color: 'grey' }}>{comment.text}</Text>
                    {comment.postedBy._id === userId && (
                        <TouchableOpacity
                            style={{ position: 'absolute', right: 0 }}
                            onPress={deleteComment}
                        >
                            <MaterialCommunityIcons
                                name="delete"
                                size={20}
                                color={Colors.gold}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={{ borderColor: '#111', borderWidth: 1, width: '100%' }}>

                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 19,
        paddingRight: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    content: {
        marginLeft: 16,
        flex: 1,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 20,
    },
    time: {
        fontSize: 11,
        color: "#808080",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: 'white'
    },
});

export default Comment;