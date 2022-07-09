import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as usersActions from '../../store/actions/users';
import ImgPicker from '../../components/app/ImgPicker';
import Colors from '../../constants/Colors';

import ENV from '../../env';
import { showMessage } from "react-native-flash-message";

const EditProfileScreen = (props) => {

    const loggedUser = useSelector(state => state.auth.user);
    const users = useSelector(state => state.users.allUsers);
    const userDetails = users.filter(u => u._id === loggedUser._id)[0];

    const [name, setName] = useState(userDetails.name);
    const [email, setEmail] = useState(userDetails.email);
    const [about, setAbout] = useState(userDetails.about);
    const [password, setPassword] = useState('');

    const [editImage, setEditImage] = useState({
        uri: `${ENV.apiUrl}/user/photo/${userDetails._id}`
    });
    const [previousUpdate, setPreviousUpdate] = useState(userDetails.updated);
    const [base64Data, setBase64Data] = useState('');
    const [imageType, setImageType] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const clearForm = () => {
        setName('');
        setEmail('');
        setAbout('');
        setPassword('');
        setIsLoading(false);
    }

    const validatePost = () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordRegex = /\d/

        let strLength = base64Data.length;
        let sizeInBytes = 4 * Math.ceil((strLength / 3)) * 0.5624896334383812;
        let sizeInKb = sizeInBytes / 1000;
        console.log(sizeInKb);
        if (sizeInKb > 800) {
            showMessage({
                message: "Image size should be less than 150KB.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        if (!name) {
            showMessage({
                message: "Please enter a valid name.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        if (name && name.length < 2) {
            showMessage({
                message: "Please enter a valid name.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        if (!about || about.length === 0) {
            showMessage({
                message: "Please enter something in About field.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        if (!emailRegex.test(email.toLowerCase())) {
            showMessage({
                message: "Please enter a valid email.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        if (password.length > 0 && password.length < 6) {
            showMessage({
                message: "Password should be atleast 6 characters long.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;

        }
        if (password.length > 0 && !passwordRegex.test(password)) {
            showMessage({
                message: "Password should contain atleast 1 number.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        return true;
    }

    const updatePost = async () => {
        setIsLoading(true);
        if (validatePost()) {
            try {
                await dispatch(usersActions.updateProfile(name, email, about, password, base64Data, imageType));

                clearForm();
                props.navigation.navigate('UserProfile', { screen: 'UserProfile' });
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

    const imagePickedHandler = (base64, imageType) => {
        setBase64Data(base64);
        setImageType(imageType);
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView style={styles.screen} >



                <ImgPicker
                    onImageTaken={imagePickedHandler}
                    editImage={editImage}
                    previousUpdate={previousUpdate}
                />









                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Username"
                        placeholderTextColor='grey'
                        underlineColorAndroid='transparent'
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>


                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="About"
                        placeholderTextColor='grey'
                        underlineColorAndroid='transparent'
                        value={about}
                        onChangeText={(text) => setAbout(text)}
                    />
                </View>


                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Email"
                        placeholderTextColor='grey'
                        underlineColorAndroid='transparent'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>



                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        placeholderTextColor='grey'
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={updatePost}
                >

                    {isLoading ? (
                        <ActivityIndicator size="small" color='black' />
                    ) : (
                        <Text style={styles.loginText}>
                            Update
                        </Text>
                    )}

                </TouchableOpacity>



            </KeyboardAvoidingView>

        </ScrollView>
    );
};

export const screenOptions = {
    headerTitle: 'Edit Profile'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'black'
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

export default EditProfileScreen;