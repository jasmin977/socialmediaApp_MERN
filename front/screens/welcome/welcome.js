import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Picker, Dimensions, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'
const Welcome = () => {

    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require('../../assets/galaxy.gif')} style={{
                flex: 1,
                width: '100%',
                backgroundColor: "#000",
                justifyContent: "center",

            }}>


            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 9, marginBottom: 30 }}>
                <View style={{ width: 70, height: 40, marginVertical: 10 }}
                >
                    <Image style={{ width: '100%', height: '100%', justifyContent: 'center', }}
                        source={require('../../assets/icona.png')}
                    ></Image>
                </View>

                <View style={{ marginTop: 0, alignSelf: 'center', flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                    <Text style={{ fontSize: 23, color: 'white', fontWeight: '900', }}>Welcome to </Text>

                    <Text style={{ fontSize: 25, color: Colors.gold, fontWeight: 'bold' }}>Golden Meet</Text>


                </View>
                <Text style={{ fontSize: 16, color: 'grey', fontWeight: '900', }}>Please follow these Golden rules</Text>



                <View style={{ alignSelf: 'center', marginVertical: 25, justifyContent: 'center', alignItems: 'flex-start', width: '80%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                        <MaterialCommunityIcons style={{ marginHorizontal: 10 }}
                            name='cards-diamond'
                            size={20}
                            color={Colors.gold}
                        />
                        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', }}>Be yourself.</Text>

                    </View>
                    <Text style={{ fontSize: 18, color: 'rgb(219,215,210)', fontWeight: '900', lineHeight: 23 }}>Make sure your photos,age, and bio are true to who you are.</Text>

                </View>

                <View style={{ alignSelf: 'center', marginVertical: 25, justifyContent: 'center', alignItems: 'flex-start', width: '80%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                        <MaterialCommunityIcons style={{ marginHorizontal: 10 }}
                            name='cards-diamond'
                            size={20}
                            color={Colors.gold}
                        />
                        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', }}>Stay safe.</Text>

                    </View>
                    <Text style={{ fontSize: 18, color: 'rgb(219,215,210)', fontWeight: '900', lineHeight: 23 }}>Don't be too quik to give out personal information.</Text>

                </View>
                <View style={{ alignSelf: 'center', marginVertical: 25, justifyContent: 'center', alignItems: 'flex-start', width: '80%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                        <MaterialCommunityIcons style={{ marginHorizontal: 10 }}
                            name='cards-diamond'
                            size={20}
                            color={Colors.gold}
                        />
                        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', }}>Play it cool.</Text>

                    </View>
                    <Text style={{ fontSize: 18, color: 'rgb(219,215,210)', fontWeight: '900', lineHeight: 23 }}>Respect others and trat them as you would like to be treated.</Text>

                </View>

            </View>


            <TouchableOpacity style={{ flex: 1, alignSelf: 'center', position: 'absolute', bottom: 10, width: '90%', borderWidth: 1, borderColor: 'rgba(212, 165, 61, 0.7)' }}
                onPress={() =>
                    navigation.navigate('Auth')
                }
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    colors={['rgba(212, 165, 61, 0.2)', 'rgba(212, 165, 61, 0.1)',]}
                    style={{

                        justifyContent: 'center',
                        width: '100%',
                        alignItems: 'center',
                        height: 50
                    }}>


                    <Text style={{ color: Colors.gold, fontSize: 20, letterSpacing: 1, fontWeight: '900' }} >START</Text>


                </LinearGradient>
            </TouchableOpacity>





        </ImageBackground>
    )
}

export default Welcome;


const styles = StyleSheet.create({



    btn_list: {


        borderWidth: 0.5, borderColor: '#111',
        flexDirection: 'column',
        justifyContent: 'center',
        width: Dimensions.get('window').width / 3,
        alignItems: 'center',
        backgroundColor: 'black',
        paddingHorizontal: 10, height: 100
    },
    btnActive: {
        backgroundColor: 'transparent',
    },
    genderIcon: {
        width: 45, height: 45, justifyContent: 'center',
        margin: 8, tintColor: 'white'
    },
    activeGenderIcon: {
        width: 45, height: 45, justifyContent: 'center',
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
