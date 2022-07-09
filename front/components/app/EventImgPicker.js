import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons'
import AwesomeButton from "react-native-really-awesome-button";

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { showMessage } from "react-native-flash-message";
import Slider from "react-native-hook-image-slider";

const ImgPicker = props => {

    const [pickedImage, setPickedImage] = useState(props.editImage);
    const navigation = useNavigation();

    const [EventImages, setEventImages] = useState([]);



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            if (!props.editImage) {
                setPickedImage()
            }
        });

        return () => {
            unsubscribe();
        };
    }, [])


    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async (type) => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        let image;
        try {
            if (type === 'gallery') {
                image = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    base64: true,
                    // aspect: [16, 9],
                    quality: 0.4,
                });
            } else {
                image = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    base64: true,
                    // aspect: [16, 9],
                    quality: 0.4,
                });
            }
            if (!image.cancelled) {
                setPickedImage(image);
                let res = image.uri.split('.');
                let imageExtenstion = res[res.length - 1];
                let imageType = `${image.type}/${imageExtenstion}`;

                props.onImageTaken(image.base64, imageType);



            }
        } catch (error) {
            console.log("Image Error -", error)
        }
    };

    return (
        <View  >

            <View  >
                {!pickedImage ? (





                    <TouchableOpacity
                        onPress=

                        {() => {
                            takeImageHandler.bind(this, 'gallery');
                            EventImages.push(`${pickedImage.uri}`);
                        }}


                    >
                        <Feather name="image" size={25} color="white"
                        >
                        </Feather>
                    </TouchableOpacity>



                ) : (

                    <View>
                        <AwesomeButton
                            progress
                            backgroundColor={Colors.grey}
                            raiseLevel={0}
                            onPress={next => {

                                takeImageHandler('gallery');
                                EventImages.push(`${pickedImage.uri}`);

                                next();
                            }}
                        >
                            <Feather name="image" size={25} color="white"
                            >
                            </Feather>
                        </AwesomeButton>







                        <View style={{ width: 300, height: 300 }}>



                            <Slider

                                activeDotColor='#d4a53d'
                                emptyDotColor='#111'
                                separatorColor='#111'

                                images={EventImages}
                            />


                        </View>




                    </View>
                )}



            </View>

        </View>
    );

};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15,
    },
    imagePreview: {
        width: 300,
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,

        backgroundColor: '#000'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    buttonContainer: {
        backgroundColor: Colors.gold,
        height: 50,
        width: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginRight: 10,

        borderRadius: 30,

    },
    inputContainer: {
        //borderColor: 'grey',
        backgroundColor: Colors.grey,
        borderColor: Colors.gold,

        borderBottomWidth: 1,

        paddingLeft: 10,
        width: 300,
        height: 50,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',

    }, icons: {
        height: 25,
        width: 25,
        margin: 5
    },


});

export default ImgPicker;