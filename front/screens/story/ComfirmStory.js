import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import ImgPicker from '../../components/app/StoryPicker';

import * as storyActions from '../../store/actions/stories';
import { useDispatch } from 'react-redux';

import { showMessage } from "react-native-flash-message";
import Colors from '../../constants/Colors';


import {
    AntDesign
} from '@expo/vector-icons';


const ConfirmStory = (props) => {


    const [base64Data, setBase64Data] = useState('');
    const [imageType, setImageType] = useState('');

    const [clearPickedImage, setClearPickedImage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const imagePickedHandler = (base64, imageType) => {
        setBase64Data(base64);
        setImageType(imageType);
    }


    const clearStory = () => {
        setClearPickedImage(true);
        setBase64Data('');
        setImageType('');
        setIsLoading(false);

    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', clearStory);

        return () => {
            unsubscribe();
        };
    }, [clearStory])


    const validateStory = () => {
        let strLength = base64Data.length;
        let sizeInBytes = 4 * Math.ceil((strLength / 3)) * 0.5624896334383812;
        let sizeInKb = sizeInBytes / 1000;
        console.log(sizeInKb);


        if (sizeInKb > 150) {
            showMessage({
                message: "Image size should be less than 150KB.",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        if (base64Data.length === 0) {
            showMessage({
                message: "Please select an image to post.",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        return true;
    }

    const createStoryRn = async () => {
        setIsLoading(true);
        if (validateStory()) {

            try {
                await dispatch(storyActions.createStoryRn(base64Data, imageType));
                props.navigation.navigate('AllPosts')
                showMessage({
                    message: "Your story was successfully created.",
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


    return (


        <View style={styles.container}>




            <ImgPicker

                onImageTaken={imagePickedHandler}
                clearPickedImage={clearPickedImage}
            />

            <TouchableOpacity style={{
                position: 'absolute',
                width: 40,
                height: 40, backgroundColor: 'black'
                , alignItems: 'center',
                justifyContent: 'center',
                right: 10,
                top: 10,


            }}
                onPress={() => navigation.pop()}
            >

                <AntDesign

                    name="close"


                    size={24}
                    style={{ margin: 5 }}
                    color={Colors.gold}
                />

            </TouchableOpacity>


            {base64Data.length != 0 &&
                <View style={{
                    position: 'absolute',
                    width: '100%', bottom: 10,

                    alignItems: 'center',
                    justifyContent: 'center', height: 60,
                }}>

                    <TouchableOpacity disabled={isLoading}
                        onPress={createStoryRn}
                        style={{
                            borderWidth: 1, padding: 5, width: '80%', height: 60,


                            alignItems: 'center',
                            justifyContent: 'center',



                            backgroundColor: 'rgba(0,0,0,0.8)',
                            borderColor: Colors.gold,


                        }}>


                        {isLoading ? (
                            <ActivityIndicator size="small" color={Colors.gold} />
                        ) : (
                            <Text style={{

                                color: base64Data.length === 0 ? 'transparent' : Colors.gold,
                                fontSize: 20, fontWeight: '900', letterSpacing: 1
                            }}>
                                Add Story
                            </Text>
                        )}
                    </TouchableOpacity>

                </View>
            }



        </View>



    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },

})

export default ConfirmStory;