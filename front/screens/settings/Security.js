import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as usersActions from '../../store/actions/users';
import { showMessage } from "react-native-flash-message";

import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';



const Security = () => {

    const dispatch = useDispatch();


    const [password, setPassword] = useState('');
    const [newpass1, setnewpass1] = useState('');
    const [newpass2, setnewpass2] = useState('');


    const [isLoading, setIsLoading] = useState(false);


    const clearForm = () => {
        setPassword('');
        setnewpass1('');
        setnewpass2('');

        setIsLoading(false);
    }


    const validChange = () => {
        const passwordRegex = /\d/

        if (!password) {
            showMessage({
                message: "Please enter the old password.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        if (!newpass1 || newpass1.length === 0) {
            showMessage({
                message: "Please enter the new password.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }


        if (newpass1.length > 0 && newpass1.length < 6) {
            showMessage({
                message: "Password should be atleast 6 characters long.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;

        }
        if (newpass1.length > 0 && !passwordRegex.test(newpass1)) {
            showMessage({
                message: "Password should contain atleast 1 number.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        if (!newpass2 || newpass2.length === 0) {
            showMessage({
                message: "Please confirm your new password.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        if (newpass1 != newpass2) {
            showMessage({
                message: "Confirm password doesnt match.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        return true;
    }

    const updatePassword = async () => {
        setIsLoading(true);
        if (validChange()) {
            try {
                await dispatch(usersActions.changePassword(password, newpass1, newpass2));

                clearForm();
                props.navigation.navigate('Settings', { screen: 'Settings' });
                showMessage({
                    message: "Your password was successfully changed.",
                    type: "success",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' }
                });
            } catch (error) {
                showMessage({
                    message: 'Your current password isnt correct.',
                    type: "danger",
                    icon: { icon: "danger", position: 'left' }
                });

            }
        }
        setIsLoading(false);
    }


    return (

        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: 'black'
        }}>



            <View style={{ marginBottom: 15, width: '90%', alignItems: "flex-start", position: 'absolute', top: 40 }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', letterSpacing: 1 }}>
                    Change Password
</Text>

                <Text style={{ color: 'grey', fontSize: 15, fontWeight: '900', }}>
                    It's a good idea to use a strong password that you are not using elsewhere.
</Text>
            </View>



            <View style={{ marginBottom: 15, width: '100%', alignItems: "center" }}>
                <TextInput
                    style={{
                        height: 60, width: '90%', fontSize: 20, color: 'white', padding: 10,
                        justifyContent: "flex-start", backgroundColor: '#000', borderWidth: 0.3, borderColor: 'grey'
                    }}
                    placeholder="Current Password"
                    placeholderTextColor='grey'
                    underlineColorAndroid='transparent'
                    value={password}
                    onChangeText={(text) => setPassword(text)}

                />
            </View>





            <View style={{ marginBottom: 15, width: '100%', alignItems: "center" }}>
                <TextInput
                    style={{
                        height: 60, width: '90%', fontSize: 20, color: 'white', padding: 10,
                        justifyContent: "flex-start", backgroundColor: '#000', borderWidth: 0.3, borderColor: 'grey'
                    }}
                    placeholder="New Password"
                    placeholderTextColor='grey'
                    underlineColorAndroid='transparent'
                    value={newpass1}
                    onChangeText={(text) => setnewpass1(text)}

                />
            </View>

            <View style={{ marginBottom: 15, width: '100%', alignItems: "center" }}>
                <TextInput
                    style={{
                        height: 60, width: '90%', fontSize: 20, color: 'white', padding: 10,
                        justifyContent: "flex-start", backgroundColor: '#000', borderWidth: 0.3, borderColor: 'grey'
                    }}
                    placeholder="Re-type new password"
                    placeholderTextColor='grey'
                    underlineColorAndroid='transparent'
                    value={newpass2}
                    onChangeText={(text) => setnewpass2(text)}

                />
            </View>






            <TouchableOpacity
                onPress={updatePassword}
                style={{
                    alignItems: 'center',
                    height: 60,
                    borderWidth: 1, borderColor: Colors.gold, backgroundColor: 'rgba(212, 165, 61, 0.1)',

                    width: '90%',
                    position: 'absolute', bottom: 10,
                    justifyContent: 'center',
                }}




            >

                {isLoading ? (
                    <ActivityIndicator size="small" color='black' />
                ) : (
                    <Text style={{
                        color: Colors.gold, fontSize: 20, fontWeight: 'bold', margin: 5, letterSpacing: 1
                    }}>
                        Update Password
                    </Text>
                )}




            </TouchableOpacity>



        </View>
    );
};

export default Security;