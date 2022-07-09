import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign } from '@expo/vector-icons'
import ENV from '../../env';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { showMessage } from "react-native-flash-message";
import { LinearGradient } from 'expo-linear-gradient';

const ImgPicker = props => {

    const [ImagesUri, setImagesUri] = useState([]);





    const removeImage = (index) => {

        if (index > -1) {
            ImagesUri.splice(index, 1);
        }
    };
    const pickedImagesList = () => {



        return ImagesUri.map((item, index) => {

            return (<View key={index} style={{
                alignItems: 'center', backgroundColor: '#111', height: 100,
                width: 100, justifyContent: 'center', padding: 5, margin: 3, alignSelf: 'flex-start'
            }} >


                <Image
                    resizeMode='cover'
                    style={styles.image}
                    source={{ uri: `${item.uri}` }}
                />
                <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0 }}
                    onPress={() => removeImage(index)}>
                    <AntDesign

                        name='closecircle'
                        size={20}
                        color='white'
                    />
                </TouchableOpacity>



            </View>

            )
        })



    }














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
        let imgObject = {};
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

                let base64 = image.base64;

                // we gonna check ken hal base64 > 150 sinn mene5dhouch lphoto 
                // lexpo neee9es
                let strLength = base64.length;
                let sizeInBytes = 4 * Math.ceil((strLength / 3)) * 0.5624896334383812;
                let sizeInKb = sizeInBytes / 1000;
                if (sizeInKb > 100) {
                    showMessage({
                        message: "Image size should be less than 150KB.",
                        type: "danger",
                        duration: 3000,
                        icon: { icon: "danger", position: 'left' }
                    });
                } else {

                    let res = image.uri.split('.');
                    let imageExtenstion = res[res.length - 1];
                    let imageType = `${image.type}/${imageExtenstion}`;

                    imgObject = { base64, imageType }

                    props.addToOurList(imgObject)

                    setImagesUri(ImagesUri => [...ImagesUri, image])


                }







            }
        } catch (error) {
            console.log("Image Error -", error)
        }
    };

    //console.log(pickedImages.length)
    return (
        <View style={{ alignItems: 'center', width: '100%', }} >

            <Text style={{
                fontSize: 17, color: 'white', fontWeight: 'bold', letterSpacing: 1, alignSelf: 'flex-start', marginHorizontal: 20, marginVertical: 5
            }}>PHOTOS</Text>


            {ImagesUri.length === 0 ? (
                <>
                    <View style={{
                        justifyContent: 'center', alignItems: 'center', width: '90%',
                        backgroundColor: '#111',
                    }} >

                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center', marginVertical: 15
                            }}
                            onPress={
                                takeImageHandler.bind(this, 'gallery')

                            }
                        >

                            <AntDesign

                                name='plus'
                                size={30}
                                color='grey'
                            />
                            <View>
                                <Text style={{ color: 'grey', fontSize: 20, marginVertical: 5 }}>
                                    Add photos
                                </Text>
                            </View>
                        </TouchableOpacity>



                    </View>

                </>
            ) : (
                <>
                    <View style={{
                        height: 120, width: '90%',
                        backgroundColor: '#111', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                    }}>


                        <ScrollView horizontal style={{ width: '90%' }}
                        >


                            {pickedImagesList()}

                        </ScrollView>



                    </View>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center', height: 50, marginTop: -15, marginRight: 30, alignSelf: 'flex-end',
                            width: 50, justifyContent: 'center', backgroundColor: 'rgba(218,165,32,0.2)'
                        }}
                        onPress={
                            takeImageHandler.bind(this, 'gallery')

                        }
                    >

                        <AntDesign

                            name='plus'
                            size={30}
                            color={Colors.gold}
                        />

                    </TouchableOpacity>
                </>

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
        height: '100%', borderRadius: 10,
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

