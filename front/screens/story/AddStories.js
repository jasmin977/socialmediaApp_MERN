import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon, AntDesign, MaterialIcons as MIcon } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { showMessage } from "react-native-flash-message";

const AddStory = props => {

    const [pickedImage, setPickedImage] = useState(props.editImage);
    const navigation = useNavigation();

    const [clearPickedImage, setClearPickedImage] = useState(false);

    const [base64Data, setBase64Data] = useState('');
    const [imageType, setImageType] = useState('');

    const imagePickedHandler = (base64, imageType) => {
        setBase64Data(base64);
        setImageType(imageType);
    }


    const clearStory = () => {
        setClearPickedImage(true);
        setBase64Data('');
        setImageType('');

    }

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


        <View style={{ marginLeft: 10, alignItems: 'center' }}>

            {!pickedImage ? (
                <TouchableOpacity

                    //  onPress={takeImageHandler.bind(this, 'camera')}
                    style={{
                        width: 66,
                        height: 66,
                        borderRadius: 100,
                        borderColor: '#1D1D1D',
                        borderWidth: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Icon name='plus' color={'#1D1D1D'} size={40} />
                </TouchableOpacity>
            ) : (

                // navigation.navigate('ConfirmStory', { pickedImage: pickedImage }),



                <TouchableOpacity


                    style={{
                        width: 66,
                        height: 66,
                        borderRadius: 100,

                        borderColor: '#d4a53d',

                        borderWidth: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}

                >
                    <Image
                        style={{
                            width: 66,
                            height: 66,
                            borderRadius: 100,

                        }}

                        source={{ uri: props.previousUpdate ? `${pickedImage.uri}?${new Date(props.previousUpdate)}` : `${pickedImage.uri}` }}

                    />
                </TouchableOpacity>

            )}

            <View style={{ marginTop: 5, alignItems: 'center' }}>
                <Text style={{ marginTop: 4, color: 'white', fontSize: 12 }}>
                    Your Story
                             </Text>
            </View>
        </View>



    );

};



export default AddStory;