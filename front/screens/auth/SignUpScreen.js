import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Vibration,
    Platform,
    Alert,
    Button, TouchableWithoutFeedback, ImageBackground
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';
import { showMessage } from "react-native-flash-message";
import * as authActions from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';


import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


const AuthScreen = (props) => {

    const [isSignup, setIsSignUp] = useState(false);
    const [username, setUsername] = useState('');


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState({});

    const dispatch = useDispatch();
    let token;
    let _notificationSubscription;

    const registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                Alert.alert(
                    'Failed !',
                    'Failed to get push token for push notification!',
                    [{ text: 'Okay' }]
                );
                return;
            }
            try {
                token = await Notifications.getExpoPushTokenAsync();
            } catch (err) {
                showMessage({
                    message: `ERROR - ${err.message}`,
                    description: `${err}`,
                    type: "warning",
                    icon: { icon: "danger", position: 'left' },
                    duration: 3000
                });
            }
            console.log(token);
            setExpoPushToken(token);
        } else {
            Alert.alert(
                'Error !',
                'Must use physical device for Push Notifications',
                [{ text: 'Okay' }]
            )
        }
        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('default', {
                name: 'default',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            });
        }
    };

    useEffect(() => {
        registerForPushNotificationsAsync();
        console.log(expoPushToken);
        _notificationSubscription = Notifications.addListener(_handleNotification);
    }, [])


    const _handleNotification = notification => {
        Vibration.vibrate();
        setNotification(notification);
    };






    const validateAuthForm = () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordRegex = /\d/
        if (isSignup && !username) {
            showMessage({
                message: "Please enter a valid Username.",
                type: "warning",
                icon: { icon: "danger", position: 'left' },
                duration: 3000
            });
            setIsLoading(false);
            return false;
        }
        if (isSignup && username && username.length < 2) {
            showMessage({
                message: "Please enter a valid username.",
                type: "warning",
                icon: { icon: "danger", position: 'left' },
                duration: 3000
            });
            setIsLoading(false);
            return false;
        }
        if (!emailRegex.test(email.toLowerCase())) {
            showMessage({
                message: "Please enter a valid email.",
                type: "warning",
                backgroundColor: "purple",
                icon: { icon: "danger", position: 'left' },
                duration: 3000
            });
            setIsLoading(false);
            return false;
        }
        if (!password || password.length === 0) {
            showMessage({
                message: "Please enter your password.",
                type: "warning",
                icon: { icon: "danger", position: 'left' },
                duration: 3000
            });
            setIsLoading(false);
            return false;
        }
        if (isSignup && password.length < 6) {
            showMessage({
                message: "Password should be atleast 6 characters long.",
                type: "warning",
                icon: { icon: "danger", position: 'left' },
                duration: 3000
            });
            setIsLoading(false);
            return false;

        }
        if (isSignup && !passwordRegex.test(password)) {
            showMessage({
                message: "Password should contain atleast 1 number.",
                type: "warning",
                icon: { icon: "danger", position: 'left' },
                duration: 3000
            });
            setIsLoading(false);
            return false;
        }
        return true;
    }


    const AuthHandler = async () => {
        setIsLoading(true);
        if (validateAuthForm()) {
            if (isSignup) {
                try {
                    const msg = await dispatch(authActions.signup(username, email, password,phoneNumber, expoPushToken))
                    showMessage({
                        message: "Signup Success",
                        description: 'Please Login !',
                        type: "success",
                        icon: { icon: "success", position: 'left' },
                        duration: 3000
                    });
                    setIsSignUp(false);
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    setphoneNumber('');
                } catch (error) {
                    showMessage({
                        message: error.message,
                        type: "warning",
                        icon: { icon: "danger", position: 'left' },
                        duration: 3000
                    });
                }
                setIsLoading(false);
            } else {
                try {
                    await dispatch(authActions.signin(username, password, expoPushToken))
                    showMessage({
                        message: "Signed in success",
                        type: "success",
                        icon: { icon: "success", position: 'left' },
                        duration: 3000
                    });
                } catch (error) {
                    showMessage({
                        message: error.message,
                        type: "warning",
                        icon: { icon: "danger", position: 'left' },
                        duration: 3000
                    });
                    setIsLoading(false);
                }
            }
        }
    };

    const inputChangeHandler = (text, inputField) => {
        if (inputField === 1) {
            setUsername(text)
        }
        else if (inputField === 2) {
            setphoneNumber(text)}

        else if (inputField === 3) {
            setEmail(text)
        } else if (inputField === 4) {
            setPassword(text)
        }
    }


    return (
        <View style={styles.container}>



            {isSignup ? (
                <Text style={styles.logo}>Inscription </Text>


            ) : (

                /* 
            <View style={styles.titleContainer} >
                    <Image style={styles.title}
                        source={require('../../assets/logo.png')} />
                </View> */

                <Text style={styles.logo}>LOGIN </Text>

            )}




            { isSignup && (
                <View>
                   
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="username"
                            placeholderTextColor="#3a3a3a"
                            underlineColorAndroid='transparent'
                            value={username}
                            onChangeText={(text) => inputChangeHandler(text, 1)}
                        />

                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="phoneNumber"
                            placeholderTextColor="#3a3a3a"
                            underlineColorAndroid='transparent'
                            value={phoneNumber}
                         onChangeText={(text) => inputChangeHandler(text, 2)}
                        />

                    </View>
                </View>

            )}

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="email"
                    placeholderTextColor="#3a3a3a"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    value={email}
                    onChangeText={(text) => inputChangeHandler(text, 3)}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="Password"
                    placeholderTextColor="#3a3a3a"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    value={password}
                    onChangeText={(text) => inputChangeHandler(text, 4)}
                />
            </View>


            {isSignup ? (
                <Text>.</Text>


            ) : (

                <TouchableOpacity
                    onPress={() => props.navigation.navigate('ForgotPassword')}
                    style={styles.btnForgotPassword}
                >
                    <Text style={styles.btnText}>Forgot your password?</Text>
                </TouchableOpacity>
            )}







            <LinearGradient
                // Button Linear Gradient
                colors={['#efb734', '#efb734', '#ffed9a', '#ffed9a', '#efb734']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={AuthHandler}
                >

                    {isLoading ? (
                        <ActivityIndicator size="small" color="#efb734" />
                    ) : (
                        <Text style={styles.text}>
                            { isSignup ? "Register" : "Login"}
                        </Text>
                    )}

                </TouchableOpacity>
            </LinearGradient>




            <LinearGradient
                colors={['#efb734', '#efb734', '#ffed9a', '#633826', '#ffed9a', '#efb734']}
                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                style={{ height: 48, width: 298, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}
            >
                <TouchableWithoutFeedback
                    style={styles.buttonContainer}
                    onPress={() => {
                        setIsSignUp(prevState => !prevState);
                    }}
                >
                    <Text style={styles.buttonText} >
                        {isSignup ? "Login" : "Register"}
                    </Text>
                </TouchableWithoutFeedback>

            </LinearGradient>


            {/**
                 * kenou mehouch inscri register icons yodhhrou **/}

            {isSignup == false ? (
                <Text  >.</Text>
            ) : (
                <View style={{ margin: 20 }}>
                    <LinearGradient
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        colors={['#d4a53d', '#633826', '#ffed9a']}
                        style={styles.icon}
                    >
                        <TouchableOpacity>
                            <FontAwesome name="google-plus-official" size={50} color="#000"  ></FontAwesome>

                        </TouchableOpacity>

                    </LinearGradient>


                </View>

            )}


            {       /**  <ImageBackground style={styles.bgImage} source={require('../../assets/bg.png')} />
 */ }
        </View>
    );
}


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Auth',
    }
}




const resizeMode = 'center';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    titleContainer: {
        marginBottom: 20,
        marginTop: 30
    },
    title: {

        width: 500,
        height: 90,


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
        borderColor: '#d4a53d',

        backgroundColor: "#FFBABA",
        color: "#d4a53d",
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

        backgroundColor: '#141414',

        borderWidth: 1,
        width: 300,
        height: 45,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',


    },
    inputs: {
        height: 45,
        marginLeft: 16,
        color: '#ffed9a',
        flex: 1,
        fontSize: 20,
    },

    buttonContainer: {
        width: 300,
        height: 45,
        alignItems: 'center',
        backgroundColor: '#000',
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
        position: 'relative',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%',
        bottom: 0
    },
    btnText: {
        color: "white",
        fontWeight: 'bold'
    },





    buttonText: {
        textAlign: 'center',
        color: '#efb734',
        fontSize: 30,


        width: 297,
        height: 45,
        backgroundColor: '#141414'
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

        fontSize: 30,
        color: '#000',
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {
        fontSize: 40,
        color: Colors.gold_brown,
        textAlign: 'left',
        margin: 10,
    },
});






export default AuthScreen;