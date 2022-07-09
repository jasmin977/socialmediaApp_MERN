import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/auth';

import * as usersActions from '../../store/actions/users';
import { showMessage } from "react-native-flash-message";

import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';



const DeleteAccount = () => {

    const dispatch = useDispatch();


    const [password, setPassword] = useState('');



    const [isLoading, setIsLoading] = useState(false);





    const deleteAccount = async () => {
        setIsLoading(true);

        try {
            await dispatch(usersActions.deleteaccount(password));
            await dispatch(authActions.logout());


            showMessage({
                message: "Account deactivated. Login again to activate it.",
                type: "success",
                duration: 3000,
                icon: { icon: "success", position: 'left' }
            });
        } catch (error) {
            showMessage({
                message: 'password is incorrect. try again.',
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });

        }

        setIsLoading(false);
    }


    return (

        <View style={{
            flex: 1,

            alignItems: 'center',

            backgroundColor: 'black'
        }}>


            <View style={{
                flex: 9,
            }}>



                <View style={{ marginBottom: 70, width: '90%', alignItems: "flex-start", }}>
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', letterSpacing: 1 }}>
                        Delete my account Golden Meet
</Text>

                    <Text style={{ color: 'grey', fontSize: 15, fontWeight: '900', }}>
                        If you do not think you will use Golden Meet again and would like your account deleted, we can take care of this for you.
                       Keep in mind that you will not be able to reactivate your account or retrieve any of the content or information you have added.</Text>




                </View>



                <View style={{ marginBottom: 15, width: '100%', alignItems: "center" }}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '900', marginVertical: 5, marginHorizontal: 15, alignSelf: 'flex-start' }}>
                        Check Password</Text>
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





            </View>



            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#000', Colors.gold, '#000']}
                style={{
                    alignItems: 'center',
                    height: 60,
                    flex: 1,
                    width: '100%',
                    backgroundColor: '#111', borderRadius: 3
                    , justifyContent: 'center',
                }}>


                <TouchableOpacity
                    onPress={deleteAccount}
                    style={{
                        alignItems: 'center',
                        height: 60,

                        width: '100%',
                        borderRadius: 3
                        , justifyContent: 'center',
                    }}




                >

                    {isLoading ? (
                        <ActivityIndicator size="small" color='black' />
                    ) : (
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 20,
                            color: "#fff", letterSpacing: 1
                        }}>
                            Delete my account
                        </Text>
                    )}




                </TouchableOpacity>



            </LinearGradient>

        </View>
    );
};

export default DeleteAccount;