import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image, ImageBackground,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { showMessage } from "react-native-flash-message";
import { Ionicons } from '@expo/vector-icons'
import * as authActions from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';

const ForgotPasswordScreen = () => {

    const [email, setEmail] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const validateAuthForm = () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email.toLowerCase())) {
            showMessage({
                message: "Please enter a valid email.",
                type: "danger",
                icon: { icon: "danger", position: 'left' },
                duration: 3000
            });
            return false;
        }

        return true;
    }


    const AuthHandler = async () => {
        setIsLoading(true);
        if (validateAuthForm()) {
            try {
                const msg = await dispatch(authActions.forgotPassword(email))
                showMessage({
                    message: msg,
                    type: "success",
                    icon: { icon: "success", position: 'left' },
                    duration: 4000
                });
                setEmail('');
            } catch (error) {
                showMessage({
                    message: error.message,
                    type: "danger",
                    icon: { icon: "danger", position: 'left' },
                    duration: 3000
                });
            }
        }
        setIsLoading(false);
    };


    return (



        <ImageBackground
            source={require('../../assets/galaxy.gif')}
            style={{
                flex: 1,
                backgroundColor: '#000',
                justifyContent: 'flex-start', paddingTop: 70,
                alignItems: 'center',

            }}>


            <View style={styles.container}>
                <Text style={{
                    textAlign: 'center', fontWeight: '900',
                    color: 'rgba(255,255,255,0.8)', letterSpacing: 1,
                    fontSize: 17, marginVertical: 30
                }}>Enter the email associated with your account and we'll send an email with instructions to reset your password. </Text>


                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Email address"
                        keyboardType="email-address"
                        placeholderTextColor="grey"
                        underlineColorAndroid='transparent'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>










            </View>

            <TouchableOpacity style={{
                alignSelf: 'center', justifyContent: 'center',

                alignItems: 'center',
                height: 50, backgroundColor: 'rgba(218,165,32,0.1)', position: 'absolute', bottom: 25, width: '80%', borderWidth: 1, borderColor: 'rgba(212, 165, 61, 0.5)'
            }} onPress={AuthHandler}>


                {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text style={{ color: Colors.gold, fontSize: 23, letterSpacing: 1, fontWeight: '900' }}>


                        Send Link

                    </Text>
                )}

            </TouchableOpacity>
        </ImageBackground>);
}


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Reset Password',

    }
}

const resizeMode = 'center';

const styles = StyleSheet.create({
    container: {

        backgroundColor: 'rgba(0,0,0,0.1)',


        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
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
    successMsgContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#4F8A10',
        backgroundColor: "#DFF2BF",
        color: "#4F8A10",
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

        backgroundColor: 'rgba(218,165,32,0.1)',

        width: '80%',
        height: 60,
        borderTopColor: '#111',
        borderTopWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputs: {
        height: 45,
        justifyContent: 'center',
        margin: 10,
        color: '#ffed9a',
        flex: 1,
        fontSize: 20,

    },
    inputIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    btnForgotPassword: {
        height: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 10,
        width: 300,
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: "#00b5ec",

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    registerButton: {
        backgroundColor: Colors.lightPrimary,

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    loginText: {
        color: 'white',
    },
    bgImage: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    btnText: {
        color: "white",
        fontWeight: 'bold'
    },
    button: {

        alignItems: 'center',
        height: 48,
        width: 300,
        borderColor: '#633826',
        borderWidth: 2,
    },
    text: {
        textAlign: 'center',

        fontSize: 28,
        color: '#000',
    }
});


export default ForgotPasswordScreen;