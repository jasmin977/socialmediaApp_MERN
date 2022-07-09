import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';
import ImgPicker from '../../components/app/ImgPicker';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from "react-native-flash-message";

import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as usersActions from '../../store/actions/users';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
]);
const ImageProfile = (props) => {




    // data jeya ml page eli gbalha

    const { route } = props;


    const Gender = route.params.Gender;
    const FirstName = route.params.FirstName;
    const LastName = route.params.LastName;
    const BirthDate = route.params.BirthDate;

    const about = '';
    const relationship = '';
    const phoneNumber = '';
    const interests = []



    const navigation = useNavigation();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);





    const imagePickedHandler = (base64, imageType) => {
        setBase64Data(base64);
        setImageType(imageType);
    }
    const [clearPickedImage, setClearPickedImage] = useState(false);
    const [base64Data, setBase64Data] = useState('');
    const [imageType, setImageType] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateUpdate = () => {



        if (base64Data.length === 0) {
            showMessage({
                message: "Please select a profile image .",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        } else {
            let strLength = base64Data.length;
            let sizeInBytes = 4 * Math.ceil((strLength / 3)) * 0.5624896334383812;
            let sizeInKb = sizeInBytes / 1000;
            console.log(sizeInKb);
            if (sizeInKb > 150) {
                showMessage({
                    message: "Image size should be less than 150KB.",
                    type: "danger",
                    icon: { icon: "danger", position: 'left' }
                });
                return false;
            }
        }







        return true;
    }

    const completeProfile = async () => {
        setIsLoading(true);
        if (validateUpdate()) {
            try {
                await dispatch(usersActions.updateProfile(FirstName, LastName, user.username, user.email, about, phoneNumber, BirthDate, Gender, relationship, interests, base64Data, imageType));

                //  clearForm();

                showMessage({
                    message: "Your profile was successfully edited.",
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
        <ImageBackground
            source={require('../../assets/galaxy.gif')} style={{
                flex: 1,
                width: '100%',
                backgroundColor: "#000",
                justifyContent: "center",

            }}>


            <View style={{ width: '100%', alignItems: "center", marginVertical: 10 }}>
                <Text style={{ color: Colors.gold, fontSize: 20, letterSpacing: 1, fontWeight: '900', }} >IMPORT PROFILE PICTURE</Text>

            </View>

            <TouchableOpacity style={{ position: 'absolute', top: 30, left: 20 }}
                onPress={() => navigation.goBack()}>
                <AntDesign
                    name='left'
                    size={30}
                    color={Colors.gold}
                />
            </TouchableOpacity>


            <View style={{
                alignItems: 'center',
                justifyContent: "center",

            }}>


                <View style={{ width: '100%', alignItems: "center", }}>



                    <ImgPicker
                        onImageTaken={imagePickedHandler}
                        clearPickedImage={clearPickedImage}

                    />




                </View>





            </View>



            <TouchableOpacity style={{
                alignSelf: 'center', justifyContent: 'center',
                width: '100%',
                alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)',
                height: 60, position: 'absolute', bottom: 20, width: '80%', borderWidth: 1, borderColor: 'rgba(212, 165, 61, 0.7)'
            }}
                onPress={() => {
                    completeProfile(),
                        navigation.navigate('newsfeed')
                }
                }
            >


                <Text style={{ color: Colors.gold, fontSize: 23, letterSpacing: 5, fontWeight: '900' }} >CONTINUE</Text>



            </TouchableOpacity>



        </ImageBackground>
    )
}

export default ImageProfile;


const styles = StyleSheet.create({



    btn_list: {


        borderWidth: 0.5, borderColor: '#111',
        flexDirection: 'row',
        justifyContent: 'center',
        width: Dimensions.get('window').width / 2,
        alignItems: 'center',
        backgroundColor: 'black',
        paddingHorizontal: 10, height: 70
    },
    btnActive: {
        backgroundColor: 'transparent',
    },
    genderIcon: {
        width: 25, height: 25, justifyContent: 'center',
        margin: 8, tintColor: 'white'
    },
    activeGenderIcon: {
        width: 25, height: 25, justifyContent: 'center',
        margin: 8, tintColor: 'white'
    },
    inputContainer: {
        //borderColor: 'grey',
        backgroundColor: '#000',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',

        width: '85%',
        height: 50,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },
    inputs: {

        marginLeft: 16,


        color: '#FFFFFF',
        fontSize: 20,


    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        width: '100%',
        bottom: 0,
        backgroundColor: Colors.gold,

    },

    loginText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
})
