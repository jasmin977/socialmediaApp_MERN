import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, Switch, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Tags from "react-native-tags";

import * as postActions from '../../store/actions/posts';
import ImgPicker from '../../components/app/EditPostPicker';
import Colors from '../../constants/Colors';

import ENV from '../../env';
import { showMessage } from "react-native-flash-message";

const EditPostScreen = (props) => {

    const navigation = useNavigation();

    const images = useSelector(state => state.posts.allImages);

    const [tags, setTags] = useState([]);

    const postId = props.route.params.postId;
    const selectedPost = useSelector(state =>
        state.posts.allPosts.find(post => post._id === postId)
    );

    const famaPhotos = selectedPost.mediaRef.length;
    // console.log(selectedPost)


    const getPostImages = () => {
        return images.filter(i => i.postRef === postId);

    }


    const [editImage, setEditImage] = useState({
        uri: `${ENV.apiUrl}/post/photo/${postId}`
    });
    const [previousUpdate, setPreviousUpdate] = useState(selectedPost.updated);
    const [body, setBody] = useState(selectedPost.body);
    const [privacy, setPrivate] = useState(selectedPost.privacy);
    const toggleSwitch = () => setPrivate(previousState => !previousState);



    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const clearForm = () => {

        setBody('');

        setIsLoading(false);
    }

    const validatePost = () => {

        if (!body || body.length === 0) {
            showMessage({
                message: "Please enter a body.",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        return true;
    }

    const updatePost = async () => {
        setIsLoading(true);
        if (validatePost()) {
            try {
                await dispatch(postActions.updatePost(postId, privacy, body, tags, famaPhotos));
                clearForm();
                props.navigation.goBack();
                showMessage({
                    message: "Your post was successfully edited.",
                    type: "success",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' }
                });
            } catch (error) {
                showMessage({
                    message: error.message,
                    type: "warning",
                    duration: 3000,
                    icon: { icon: "danger", position: 'left' }
                });
                console.log("ERROR ", error.message);
            }
        }
        setIsLoading(false);
    }




    return (

        <View style={{ flex: 1, backgroundColor: 'black' }}>


            <ScrollView style={styles.container} >
                <View style={{
                    justifyContent: 'center', flex: 1,
                    alignItems: 'center', width: '100%',
                }}>




                    <View

                        style={{
                            width: '90%',
                            height: 150,
                            backgroundColor: '#111', padding: 10,
                            marginBottom: '10%',
                            alignItems: 'flex-start'
                        }}

                    >
                        <TextInput style={{
                            margin: 10,
                            color: '#fff',
                            fontSize: 20,
                        }}
                            placeholder="What's on your mind ?"
                            multiline={true}
                            placeholderTextColor='grey'

                            numberOfLines={4}
                            underlineColorAndroid='transparent'
                            value={body}
                            onChangeText={(text) => setBody(text)}
                        />
                    </View>

                    <ImgPicker
                        editImage={editImage}
                        selectedPost={selectedPost}
                        previousUpdate={previousUpdate}

                    />


                    <>
                        <Text style={{
                            fontSize: 17, color: 'white', fontWeight: 'bold', letterSpacing: 1, alignSelf: 'flex-start', marginHorizontal: 20, marginVertical: 5, marginTop: 20
                        }}>TAGS
                        </Text>
                        <View style={{ width: '90%', alignItems: "center", backgroundColor: '#111', padding: 5 }}>

                            <Tags
                                initialText=""
                                textInputProps={{
                                    placeholder: "e.g: fun"
                                }}
                                initialTags={tags}
                                onChangeTags={tags => setTags(tags)}
                                onTagPress={(index, tagLabel, event, deleted) =>
                                    console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                                }
                                containerStyle={{ justifyContent: "center", }}
                                inputStyle={{
                                    fontSize: 20, color: 'white', padding: 5,
                                    justifyContent: "flex-start", backgroundColor: '#000',
                                }}
                                inputContainerStyle={{
                                    height: 50, width: '100%',
                                }}
                                renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                                    <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
                                        <Text style={{ color: 'white', fontSize: 20, backgroundColor: 'rgba(212, 165, 61, 0.5)', margin: 5, padding: 7, fontWeight: '900' }}>{tag}</Text>
                                    </TouchableOpacity>
                                )}
                            />


                        </View>

                    </>

                    <Text style={{
                        fontSize: 17, color: 'white', fontWeight: 'bold', letterSpacing: 1, alignSelf: 'flex-start', marginHorizontal: 20, marginVertical: 5, marginTop: 20
                    }}>PRIVACY</Text>
                    <View style={{
                        flexDirection: 'row', width: '90%', marginBottom: 20,
                        height: 50, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '900', position: 'absolute', left: 20 }}>
                            Private post
                        </Text>
                        <Switch
                            style={{ position: 'absolute', right: 20 }}
                            trackColor={{ false: "#767577", true: Colors.gold }}
                            thumbColor={privacy ? '#9D6C18' : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={privacy}
                        />
                    </View>




                </View>
            </ScrollView >



            <TouchableOpacity disabled={isLoading}
                onPress={updatePost}
                style={{
                    alignItems: 'center',
                    borderColor: Colors.gold, borderWidth: 1, marginVertical: 10, backgroundColor: 'rgba(0, 0, 0, 1)', alignSelf: 'center',
                    height: 60, width: '90%', justifyContent: 'center',
                }} >

                {
                    isLoading ? (
                        <ActivityIndicator size="small" color={Colors.gold} />

                    ) : (
                        <Text style={{
                            color: Colors.gold, fontSize: 23, letterSpacing: 5, fontWeight: '900'
                        }} >
                            UPDATE
                        </Text >
                    )}
            </TouchableOpacity >

        </View>
    );
};


export const screenOptions = {
    headerTitle: 'Edit Post',
    headerTitleAlign: 'center',
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,


        backgroundColor: "#000",
    },
    container: {

        backgroundColor: "#000",
        flex: 1,
    },


})

export default EditPostScreen;