import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import ImgPicker from '../../components/app/StoryPicker';

import * as usersActions from '../../store/actions/users';
import { useDispatch } from 'react-redux';

import { showMessage } from "react-native-flash-message";
import Colors from '../../constants/Colors';


import {
    AntDesign
} from '@expo/vector-icons';


const UpdateProfilePic = (props) => {


    const [base64Data, setBase64Data] = useState('');
    const [imageType, setImageType] = useState('');
    const FirstName = '';
    const LastName = '';
    const username = '';
    const email = '';
    const about = '';
    const phoneNumber = '';
    const BirthDate = '';
    const Gender = '';
    const relationship = '';
    const interests = '';


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


    const validatePicture = () => {
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


    const updateProfilPicture = async () => {
        setIsLoading(true);
        if (validatePicture()) {
            try {
                await dispatch(usersActions.updateProfile(FirstName, LastName, username, email, about, phoneNumber, BirthDate, Gender, relationship, interests, base64Data, imageType));

                navigation.goBack();
                showMessage({
                    message: "Your profile picture was successfully edited.",
                    type: "success",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' }
                });
            } catch (error) {
                showMessage({
                    message: error.message,
                    type: "danger",
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
                height: 40, backgroundColor: '#111', opacity: 0.6
                , alignItems: 'center',
                justifyContent: 'center',
                right: 10,
                top: 15,


            }}
                onPress={() => navigation.pop()}
            >

                <AntDesign

                    name="close"


                    size={24}
                    style={{ margin: 5 }}
                    color='white'
                />

            </TouchableOpacity>

            <TouchableOpacity
                onPress={updateProfilPicture}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: 60
                    , alignItems: 'center',
                    justifyContent: 'center',
                    // borderColor: '#111', borderWidth: 3,
                    bottom: 0,

                    backgroundColor: base64Data.length === 0 ? 'transparent' : '#111',


                }}>


                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={{

                        color: base64Data.length === 0 ? 'transparent' : '#fff',

                        fontWeight: '900', fontStyle: 'italic',
                        fontSize: 23
                    }}>
                        SAVE
                    </Text>
                )}
            </TouchableOpacity>





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

export default UpdateProfilePic;