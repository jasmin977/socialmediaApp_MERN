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

    const [icon, setIcon] = useState('eye-off');
    const [passwordIcon, setPasswordIcon] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState({});

    const changeIcon = () => {

        icon === 'eye' ? setIcon('eye-off') : setIcon('eye')
            ,
            setPasswordIcon(!passwordIcon)
    }

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
        const ac = new AbortController();

        registerForPushNotificationsAsync();
        console.log(expoPushToken);
        _notificationSubscription = Notifications.addListener(_handleNotification);
        return () => ac.abort();
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
                message: "Please enter a valid username.",
                type: "warning",
                icon: { icon: "danger", position: 'left' },
                duration: 3000
            });
            setIsLoading(false);
            return false;
        }
        if (username && username.length < 2) {
            showMessage({
                message: "Please enter a valid username.",
                type: "warning",
                icon: { icon: "danger", position: 'left' },
                duration: 3000
            });
            setIsLoading(false);
            return false;
        }
        if (isSignup && !emailRegex.test(email.toLowerCase())) {
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
                    const msg = await dispatch(authActions.signup(username, email, password, phoneNumber, expoPushToken))
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
        } else if (inputField === 2) {
            setphoneNumber(text)
        }

        else if (inputField === 3) {
            setEmail(text)
        } else if (inputField === 4) {
            setPassword(text)
        }
    }


    return (
        <ImageBackground
            source={require('../../assets/galaxy.gif')}
            style={{
                flex: 1,
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',

            }}>



            <View style={{
                width: '80%',
                height: 100, marginTop: 40, marginBottom: -50
            }}>

                <Image source={require('../../assets/LOGOOOO.png')}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover'
                    }}>

                </Image>
            </View>

            <View style={{



                // borderColor: Colors.gold,

                width: '95%',
                height: 500,
                //  backgroundColor: 'rgba(0,0,0,0.3)',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>






                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Username"
                        placeholderTextColor='rgba(255,255,255,0.6)'
                        underlineColorAndroid='transparent'
                        value={username}
                        onChangeText={(text) => inputChangeHandler(text, 1)}
                    />

                </View>

                {isSignup && (
                    <View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                placeholder="Email"
                                placeholderTextColor='rgba(255,255,255,0.6)'
                                keyboardType="email-address"
                                underlineColorAndroid='transparent'
                                value={email}
                                onChangeText={(text) => inputChangeHandler(text, 3)}
                            />
                        </View>


                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                placeholder="Phone Number"
                                placeholderTextColor='rgba(255,255,255,0.6)'
                                keyboardType={'phone-pad'}
                                underlineColorAndroid='transparent'
                                value={phoneNumber}
                                onChangeText={(text) => inputChangeHandler(text, 2)}
                            />

                        </View>
                    </View>

                )}



                <View style={styles.inputContainer}>




                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        placeholderTextColor='rgba(255,255,255,0.6)'
                        secureTextEntry={passwordIcon}
                        underlineColorAndroid='transparent'
                        value={password}
                        onChangeText={(text) => inputChangeHandler(text, 4)}

                    />
                    <Feather name={icon} style={{ marginRight: 10 }} size={20} color={icon === 'eye' ? 'white' : 'gray'} onPress={() => changeIcon()} />
                </View>





                {isSignup ? (
                    <View style={{
                        flexDirection: 'row', marginVertical: 10, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Text style={{
                            textAlign: 'center', fontWeight: '900',
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: 15, letterSpacing: 1,
                        }}>Have an account already?</Text>
                        <TouchableOpacity
                            // style={styles.buttonContainer}
                            onPress={() => {
                                setIsSignUp(prevState => !prevState);
                            }}
                        >
                            <Text style={{
                                textAlign: 'center', fontWeight: 'bold',
                                color: '#f8c85c',
                                fontSize: 14, letterSpacing: 1,
                            }}> Login</Text>
                        </TouchableOpacity>
                    </View>
                ) : (

                    <View style={{
                        flexDirection: 'row', marginVertical: 10, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Text style={{
                            textAlign: 'center', fontWeight: '900',
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: 14, letterSpacing: 1,
                        }}>Don't have an account?</Text>
                        <TouchableOpacity
                            // style={styles.buttonContainer}
                            onPress={() => {
                                setIsSignUp(prevState => !prevState);
                            }}
                        >
                            <Text style={{
                                textAlign: 'center', fontWeight: 'bold',
                                color: '#f8c85c',
                                fontSize: 15, letterSpacing: 1,
                            }}> Register Now</Text>
                        </TouchableOpacity>
                    </View>
                )
                }











                <TouchableOpacity style={{
                    alignSelf: 'center', justifyContent: 'center',

                    alignItems: 'center',
                    height: 50, position: 'absolute', bottom: 10, width: '80%', borderWidth: 1, borderColor: 'rgba(212, 165, 61, 0.5)'
                }}
                    onPress={AuthHandler}
                >

                    {isLoading ? (
                        <ActivityIndicator size="small" color="#f8c85c" />
                    ) : (
                        <Text style={{ color: '#f8c85c', fontSize: 23, letterSpacing: 5, fontWeight: 'bold', }}>
                            { isSignup ? "REGISTER" : "LOGIN"}
                        </Text>
                    )}





                </TouchableOpacity>




            </View>






            {isSignup ? (
                <Text>.</Text>


            ) : (

                <View style={{
                    flexDirection: 'row', marginVertical: 10, justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={{
                        textAlign: 'center', fontWeight: '900',
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: 14, letterSpacing: 1,
                    }}>Forgot your password?</Text>
                    <TouchableOpacity
                        // style={styles.buttonContainer}
                        onPress={() => props.navigation.navigate('ForgotPassword')}

                    >
                        <Text style={{
                            textAlign: 'center', fontWeight: 'bold',
                            color: '#f8c85c',
                            fontSize: 15, letterSpacing: 1,
                        }}> Recover Here</Text>
                    </TouchableOpacity>
                </View>

            )}







        </ImageBackground>
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
        width: 300,
        height: 200,
        position: 'absolute',
        backgroundColor: 'black',
        top: 10
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',


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

        backgroundColor: 'rgba(218,165,32,0.1)',

        width: '90%',
        height: 60,
        borderTopColor: '#111',
        borderTopWidth: 0.7,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    inputs: {
        height: 45,
        justifyContent: 'center',
        margin: 10,
        color: 'rgba(255,255,255,0.9)',
        flex: 1,
        fontSize: 20,
    },

    buttonContainer: {
        width: 200,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    btnForgotPassword: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,

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
        color: "#C3A95A",
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
        fontWeight: 'bold',
        fontSize: 25,
        color: '#C3A95A',
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