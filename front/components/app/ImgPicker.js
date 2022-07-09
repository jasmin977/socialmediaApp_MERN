import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
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
        <View style={styles.imagePicker} >
            <TouchableOpacity
                onPress={
                    takeImageHandler.bind(this, 'gallery')

                } style={styles.imagePreview} >
                {!pickedImage ? (
                    <Text style={{ fontSize: 18, color: 'grey' }} >No Image Picked</Text>
                ) : (

                    <Image
                        style={styles.image} resizeMode='cover'
                        source={{ uri: props.previousUpdate ? `${pickedImage.uri}?${new Date(props.previousUpdate)}` : `${pickedImage.uri}` }}
                    />


                )}
            </TouchableOpacity>

        </View >
    );

};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'flex-end',
        marginBottom: 15, justifyContent: 'center', alignItems: 'center'
        , width: '100%'
    },
    imagePreview: {
        width: '90%',
        height: 400,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',

        borderColor: 'rgba(212, 165, 61, 0.2)', borderWidth: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    image: {
        width: '100%',
        height: '100%',
        margin: 10

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


});

export default ImgPicker;