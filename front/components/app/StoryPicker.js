import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Alert, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons'

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { showMessage } from "react-native-flash-message";

const ImgPicker = props => {

    const [pickedImage, setPickedImage] = useState(props.editImage);
    const navigation = useNavigation();



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

        <ImageBackground

            resizeMode='cover'

            source={require('../../assets/gold.jpg')} blurRadius={0}
            style={{
                flex: 1,
                width: '100%',
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
            }} >



            {!pickedImage ? (

                <View style={{ flexDirection: 'row' }} >

                    <TouchableOpacity
                        style={{
                            alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)', height: 110,
                            width: 160, justifyContent: 'center', margin: 10,
                        }}
                        onPress={
                            takeImageHandler.bind(this, 'gallery')

                        }
                    >

                        <Image
                            style={{
                                height: 30,
                                width: 30,
                                margin: 5,
                                tintColor: Colors.gold

                            }}
                            resizeMode='contain'
                            source={require('../../assets/icons/galery.png')}
                        ></Image>

                        <Text style={{ color: Colors.gold, fontSize: 15, fontWeight: '900', letterSpacing: 1, marginVertical: 5 }} >Open Gallery</Text>

                    </TouchableOpacity>





                    <TouchableOpacity
                        style={{
                            alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)', height: 110,
                            width: 160, justifyContent: 'center', margin: 10,
                        }}
                        onPress={
                            takeImageHandler.bind(this, 'camera')

                        }
                    >

                        <Image
                            style={{
                                height: 30,
                                width: 40,
                                margin: 5,
                                tintColor: Colors.gold

                            }}
                            resizeMode='contain'
                            source={require('../../assets/icons/camera.png')}
                        ></Image>

                        <Text style={{ color: Colors.gold, fontSize: 15, fontWeight: '900', letterSpacing: 1, marginVertical: 5 }} >Open Camera </Text>

                    </TouchableOpacity>


                </View>


            ) : (


                <View style={{
                    width: '100%',
                    height: '60%',
                    flex: 1,
                }}>

                    <Image
                        resizeMode="cover"
                        style={{
                            width: '100%',
                            height: '100%',
                            flex: 1,
                        }}
                        source={{ uri: props.previousUpdate ? `${pickedImage.uri}?${new Date(props.previousUpdate)}` : `${pickedImage.uri}` }}
                    />
                </View>




            )}




        </ImageBackground>
    );

};

const styles = StyleSheet.create({

    imagePreview: {
        width: 300,
        height: 300,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',



        backgroundColor: '#111'
    },



});

export default ImgPicker;

