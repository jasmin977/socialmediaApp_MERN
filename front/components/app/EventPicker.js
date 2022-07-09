import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Alert, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons'

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { showMessage } from "react-native-flash-message";
import { LinearGradient } from 'expo-linear-gradient';

const ImgPicker = props => {

    const [pickedImage, setPickedImage] = useState(props.editImage);
    const navigation = useNavigation();


    const PostImages =
        [{ srcc: require('../../assets/btn.png') }]


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
        <View style={{ alignItems: 'center', width: '100%', }} >



            {!pickedImage ? (

                <View style={{
                    justifyContent: 'center', height: 70, width: '90%', padding: 10, paddingBottom: 90,
                    backgroundColor: '#111',
                }} >


                    <View>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 20, marginTop: 20 }}>
                            + Add Media
    </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>

                        <TouchableOpacity
                            style={{
                                alignItems: 'center', height: 50, marginVertical: 10,
                                width: 50, justifyContent: 'center',
                            }}
                            onPress={
                                takeImageHandler.bind(this, 'camera')

                            }
                        >
                            <Image
                                style={{
                                    height: 35,
                                    width: 45,
                                    margin: 2,
                                    tintColor: Colors.gold

                                }} resizeMode='cover'
                                source={require('../../assets/icons/camera.png')}
                            ></Image>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                alignItems: 'center', height: 50, margin: 10,
                                width: 50, justifyContent: 'center',
                            }}
                            onPress={
                                takeImageHandler.bind(this, 'gallery')

                            }
                        >

                            <Image
                                style={{
                                    height: 35,
                                    width: 35,
                                    margin: 2,
                                    tintColor: Colors.gold

                                }} resizeMode='contain'
                                source={require('../../assets/icons/galery.png')}
                            ></Image>

                        </TouchableOpacity>

                    </View>

                </View>


            ) : (

                <View style={{
                    height: 100, width: '90%',
                    backgroundColor: '#111', flexDirection: 'row'
                }}>

                    <View style={{
                        alignItems: 'center', backgroundColor: '#111', height: 100,
                        width: 100, justifyContent: 'center', padding: 10, alignSelf: 'flex-start'
                    }}  >


                        <Image
                            resizeMode='cover'
                            style={styles.image}
                            source={{ uri: props.previousUpdate ? `${pickedImage.uri}?${new Date(props.previousUpdate)}` : `${pickedImage.uri}` }}
                        />



                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', position: 'absolute', right: 20 }} >


                        <TouchableOpacity
                            style={{
                                alignItems: 'center', height: 50, marginVertical: 10,
                                width: 50, justifyContent: 'center',
                            }}
                            onPress={
                                takeImageHandler.bind(this, 'camera')

                            }
                        >
                            <Image
                                style={{
                                    height: 35,
                                    width: 45,
                                    margin: 2,
                                    tintColor: Colors.gold

                                }} resizeMode='cover'
                                source={require('../../assets/icons/camera.png')}
                            ></Image>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                alignItems: 'center', height: 50, margin: 10,
                                width: 50, justifyContent: 'center',
                            }}
                            onPress={
                                takeImageHandler.bind(this, 'gallery')

                            }
                        >

                            <Image
                                style={{
                                    height: 35,
                                    width: 35,
                                    margin: 2,
                                    tintColor: Colors.gold

                                }} resizeMode='contain'
                                source={require('../../assets/icons/galery.png')}
                            ></Image>

                        </TouchableOpacity>


                    </View>


                </View>

            )}




        </View>
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
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',

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



    },


});

export default ImgPicker;

