import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Switch,
    ScrollView
} from 'react-native';
import { useDispatch } from 'react-redux';
import Tags from "react-native-tags";

import * as postActions from '../../store/actions/posts';
import ImgPicker from '../../components/app/PostPicker';
import Colors from '../../constants/Colors';
import { showMessage } from "react-native-flash-message";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';



const AddPostScreen = (props) => {

    const navigation = useNavigation();




    const [clearPickedImage, setClearPickedImage] = useState(false);
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);


    const [pickedImages, setPickedImages] = useState([]);



    const [base64Data, setBase64Data] = useState('');
    const [imageType, setImageType] = useState('');





    console.log(pickedImages.length)




    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();


    const [privacy, setPrivate] = useState(false);
    const toggleSwitch = () => setPrivate(previousState => !previousState);

    const clearForm = () => {
        setClearPickedImage(true);
        setBody('');
        setBase64Data('');
        setImageType('');
        setIsLoading(false);
    }


    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', clearForm);

        return () => {
            unsubscribe();
        };
    }, [clearForm])

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

    const createPost = async () => {
        setIsLoading(true);
        if (validatePost()) {
            console.log("VALID POST")
            try {
                await dispatch(postActions.createPost(body, tags, privacy, pickedImages));

                //  await dispatch(postActions.importImages(pickedImages));



                clearForm();
                props.navigation.navigate('AllPosts')
                showMessage({
                    message: "Your post was successfully created.",
                    type: "success",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' }
                });
            } catch (error) {
                showMessage({
                    message: error.message,
                    type: "danger",
                    duration: 3000,
                    icon: { icon: "danger", position: 'left' }
                });
                console.log("ERROR ", error.message);
            }
        }
        setIsLoading(false);
    }










    const createStatus = async () => {
        setIsLoading(true);
        if (validatePost()) {
            console.log("VALID STATUS")
            try {
                await dispatch(postActions.createStatus(body, tags));
                clearForm();
                props.navigation.navigate('AllPosts')
                showMessage({
                    message: "Your status was successfully created.",
                    type: "success",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' }
                });
            } catch (error) {
                showMessage({
                    message: error.message,
                    type: "danger",
                    duration: 3000,
                    icon: { icon: "danger", position: 'left' }
                });
                console.log("ERROR ", error.message);
            }
        }
        setIsLoading(false);
    }



    const addToOurList = (object) => {
        setPickedImages(pickedImages => [...pickedImages, object])
    }


    const removeFromOurList = (index) => {
        if (index > -1) {
            pickedImages.splice(index, 1);
        }

    }

    // console.log(pickedImages.length)

    return (

        <View style={{
            flex: 1,
            backgroundColor: '#000'
        }}>
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

                        addToOurList={addToOurList}
                        clearPickedImage={clearPickedImage}
                    />




                    <>
                        <Text style={{
                            fontSize: 17, color: 'white', fontWeight: 'bold', letterSpacing: 1, alignSelf: 'flex-start', marginHorizontal: 20, marginVertical: 5, marginTop: 20
                        }}>TAGS</Text>
                        <View style={{ width: '90%', alignItems: "center", backgroundColor: '#111', padding: 5 }}>

                            <Tags
                                initialText=""
                                textInputProps={{
                                    placeholder: "add tags"
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




            {/** base64Data.length === 0 means there is no selected photo  */}
            <TouchableOpacity disabled={isLoading}
                onPress={(pickedImages.length === 0) ? createStatus : createPost}
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
                            POST
                        </Text >
                    )}
            </TouchableOpacity >

        </View>);
};


export const screenOptions = {
    headerTitle: 'Create Post',
    headerTitleAlign: 'center',
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: 'black',



    },

}

const styles = StyleSheet.create({

    container: {
        flex: 1,


        backgroundColor: "#000",

    },

    errorMsgContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#D8000C',
        backgroundColor: "#FFBABA",
        color: "#D8000C",
        borderRadius: 25,
    },
    msgText: {
        fontSize: 15,
    },
    msgIcon: {
        width: 30,
        height: 30,
        // marginLeft: 15,
        justifyContent: 'center'
    },




})

export default AddPostScreen;