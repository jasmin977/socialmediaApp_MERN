import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/auth';

import * as usersActions from '../../store/actions/users';
import { showMessage } from "react-native-flash-message";

import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';



const Desactivate = () => {

    const dispatch = useDispatch();


    const [password, setPassword] = useState('');



    const [isLoading, setIsLoading] = useState(false);


    const clearForm = () => {
        setPassword('');


        setIsLoading(false);
    }



    const desactivateAccount = async () => {
        setIsLoading(true);


        await dispatch(usersActions.desactivation(password));






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
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', letterSpacing: 1 }}>
                        Deactivating your Golden Meet account
</Text>

                    <Text style={{ color: 'grey', fontSize: 15, fontWeight: '900', }}>
                        If you want to take a Golden Break, you can deactivate your account.</Text>




                </View>



                <View style={{ marginBottom: 15, width: '100%', alignItems: "center" }}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '900', marginVertical: 5, marginHorizontal: 15, alignSelf: 'flex-start' }}>
                        Check Password</Text>
                    <TextInput
                        style={{
                            height: 60, width: 350, fontSize: 20, color: 'white', padding: 10,
                            backgroundColor: '#000', borderWidth: 0.3, borderColor: 'grey'
                        }}
                        placeholder="Current Password"
                        placeholderTextColor='grey'
                        underlineColorAndroid='transparent'
                        value={password}
                        onChangeText={(text) => setPassword(text)}

                    />
                </View>





            </View>





            <TouchableOpacity
                onPress={desactivateAccount}
                style={{
                    alignItems: 'center',
                    height: 60,
                    borderWidth: 1, borderColor: Colors.gold, backgroundColor: 'rgba(212, 165, 61, 0.1)',
                    width: '90%',
                    borderRadius: 3
                    , justifyContent: 'center',
                }}




            >

                {isLoading ? (
                    <ActivityIndicator size="small" color='black' />
                ) : (
                    <Text style={{
                        color: Colors.gold, fontSize: 20, fontWeight: 'bold', margin: 5, letterSpacing: 1

                    }}>
                        Desactivate
                    </Text>
                )}




            </TouchableOpacity>





        </View>
    );
};

export default Desactivate;