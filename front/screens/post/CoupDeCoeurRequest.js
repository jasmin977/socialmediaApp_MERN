import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ImageBackground, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';

import Comment from '../../components/UI/Comment';
import { useSelector, useDispatch } from 'react-redux';
import ENV from '../../env';
import {
    FontAwesome, MaterialIcons, MaterialCommunityIcons,
    Octicons
} from '@expo/vector-icons';
import * as postActions from '../../store/actions/posts';
import Colors from '../../constants/Colors';
import { showMessage } from "react-native-flash-message";

import {
    Feather
} from '@expo/vector-icons';

const CoupDeCoeurRequests = (props) => {


    const [isRefreshing, setIsRefreshing] = useState(false);

    const { route } = props;
    const postId = route.params.postId;


    const dispatch = useDispatch();

    const posts = useSelector(state => state.posts.allPosts);
    const postIndex = posts.findIndex(post => post._id === postId);
    const requests = posts[postIndex].requested;  // yraja3li list mta3 requests lel post mte3i []
    const [imageUri, setImageUri] = useState('')



    const users = useSelector(state => state.users.allUsers);




    const getRequesterUser = (requesterId) => {

        let requester = users.filter(u => u._id === requesterId)[0];
        return requester;
    }


    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }



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



    // bech ta3ti lacces mta3 lcoeu de coeur l user u need post's id and the requester's id
    // that way that requester chyetnaha mn request list w yedzed fel authorized lis
    const acceptHeart = async (friendId) => {

        try {
            await dispatch(postActions.acceptCoupDeCoeur(postId, friendId));
            showMessage({
                message: "Access given",
                type: "default",
                duration: 3000,
                icon: { icon: "success", position: 'left' },

                backgroundColor: Colors.gold, // background color
                color: 'white', // text color
            });

        }
        catch (error) {
            console.log("ERROR ", error)
        }
    }

    const declineHeart = async (friendId) => {

        try {
            await dispatch(postActions.declineCoupDeCoeur(postId, friendId));
            showMessage({
                message: "Decline Acces",
                type: "default",
                duration: 3000,
                textStyle: { fontSize: 25 },
                backgroundColor: Colors.gold, // background color
                color: 'black', // text color
            });

        }
        catch (error) {
            console.log("ERROR ", error)
        }
    }

    return (
        <View style={{ flex: 1 }} >


            <FlatList
                style={styles.root}
                onRefresh={loadPosts}
                refreshing={isRefreshing}
                data={requests}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={styles.separator} />
                    )
                }}
                keyExtractor={(item, index) => index.toString()}

                renderItem={(request, index) => {
                    const requestId = request.item; // presente l id ta3 el requester
                    // console.log(requestId);
                    return (

                        < View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, width: '100%' }} >

                            <View style={{ height: 80, width: '20%', marginHorizontal: 5 }}>
                                <ImageBackground
                                    source={{ uri: `${ENV.apiUrl}/user/photo/${requestId}` || imageUri }}
                                    onError={onImageErrorHandler}
                                    style={{ height: '100%', width: '100%', }}>

                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image

                                            source={require('../../assets/pic_cover.png')}

                                            style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }} />
                                    </View>

                                </ImageBackground>
                            </View>


                            <Text style={{ color: 'white', fontSize: 20, marginHorizontal: 20, letterSpacing: 2, fontWeight: '900', }}>{getRequesterUser(requestId).username}  </Text>



                            <View style={{ flexDirection: 'row', position: 'absolute', right: 10, }}>
                                <TouchableOpacity

                                    onPress={() => acceptHeart(requestId)}

                                    style={{ backgroundColor: 'rgba(218,165,32,0.2)', width: 50, height: 50, justifyContent: 'center', marginRight: 3, alignItems: 'center' }}>
                                    <MaterialIcons name="check" size={30} color={Colors.gold} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => declineHeart(requestId)}
                                    style={{ backgroundColor: '#111', width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name="close" size={30} color='grey' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
            />

        </View>
    );
};


export const screenOptions = {
    headerTitle: 'Requested'
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#000",
        flex: 1
    },

});

export default CoupDeCoeurRequests;