import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';

import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { showMessage } from "react-native-flash-message";

const CompleteProfile = () => {
    const navigation = useNavigation();


    const [FirstName, setFirstname] = useState('');
    const [LastName, setLastname] = useState('');


    // gender
    const genderItems = [
        { Gender: 'male', text: 'MAN', icon: require('../../assets/genderIcons/male.png') },
        { Gender: 'female', text: 'WOMAN', icon: require('../../assets/genderIcons/female.png') },

    ];
    const [Gender, setGender] = useState('male');
    const setGenderButton = status => {
        setGender(status);

    };

    const validInput = () => {



        if (!FirstName || FirstName.length === 0) {

            return false;
        }
        if (!LastName || LastName.length === 0) {


            return false;
        }

        return true;

    }


    const naviagtionFun = () => {
        if (validInput()) {
            navigation.navigate('birthday', { Gender: Gender, FirstName: FirstName, LastName: LastName })
        } else {
            showMessage({
                message: "Please fill empty fields.",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });

        }

    }
    return (
        <ImageBackground
            source={require('../../assets/galaxy.gif')} style={{
                flex: 1,
                width: '100%',
                backgroundColor: "#000",
                justifyContent: "center",

            }}>




            <View style={{


                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                // borderColor: Colors.gold,
                borderWidth: 1,
                width: '95%',



                alignItems: 'center',
                justifyContent: 'center'
            }}>


                <View style={{ width: '100%', alignItems: "center" }}>
                    <Text style={{ color: Colors.gold, fontSize: 23, letterSpacing: 5, fontWeight: '900', }} >COMPLETE PROFILE</Text>

                </View>
                {/** gender */}

                <View style={{
                    height: 150, width: '90%', alignItems: 'center',
                    justifyContent: "center", marginTop: 70
                }}>
                    <Text style={{ fontSize: 20, color: Colors.gold, fontWeight: '900', margin: 10, alignSelf: 'flex-start' }}>I am a</Text>



                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >


                        {
                            genderItems.map((e, index) => (

                                <TouchableOpacity key={index}
                                    onPress={() => {
                                        setGenderButton(e.Gender)

                                    }}
                                    style={[styles.btn_list, Gender === e.Gender && styles.btnActive]}>
                                    <Image style={Gender === e.gender ? styles.genderIcon : styles
                                        .activeGenderIcon}
                                        source={e.icon}
                                    ></Image>
                                    <Text style={{ color: 'white', fontSize: 17, letterSpacing: 1, fontWeight: '900' }} > {e.text}</Text>

                                </TouchableOpacity>


                            ))
                        }
                    </ScrollView>

                </View>




                {/** first name and last name */}
                <View style={{ width: '100%', padding: 10, alignItems: "center", }}>

                    <View style={{ flexDirection: 'column', width: '100%', alignItems: "flex-start", marginVertical: 20 }}>


                        <View style={{ width: '100%', alignItems: "center" }}>
                            <TextInput
                                style={{
                                    height: 60, fontSize: 20, color: '#fff', padding: 10,
                                    justifyContent: "flex-start", backgroundColor: 'rgba(255, 255, 255, 0.1)',

                                    width: '90%',
                                }}
                                placeholder="First name"
                                placeholderTextColor='grey'
                                underlineColorAndroid='transparent'
                                value={FirstName}
                                onChangeText={(text) => setFirstname(text)}

                            />
                            <TextInput
                                style={{

                                    height: 60, fontSize: 20, color: '#fff', padding: 10,
                                    justifyContent: "flex-start", backgroundColor: 'rgba(255, 255, 255, 0.1)',

                                    width: '90%',
                                }}
                                placeholder="Last name"
                                placeholderTextColor='grey'
                                underlineColorAndroid='transparent'
                                value={LastName}
                                onChangeText={(text) => setLastname(text)}

                            />
                        </View>
                    </View>




                </View>





            </View>


            <TouchableOpacity style={{
                alignSelf: 'center', position: 'absolute', bottom: 20, height: 60, width: '80%', borderWidth: 1, borderColor: 'rgba(212, 165, 61, 0.7)', justifyContent: 'center',

                alignItems: 'center',
            }}
                onPress={() =>
                    naviagtionFun()

                }


            >



                <Text style={{ color: Colors.gold, fontSize: 23, letterSpacing: 5, fontWeight: '900', }} >CONTINUE</Text>



            </TouchableOpacity>





        </ImageBackground>
    )
}

export default CompleteProfile;


const styles = StyleSheet.create({



    btn_list: {



        flexDirection: 'row',
        justifyContent: 'center',
        width: Dimensions.get('window').width / 2.5,
        alignItems: 'center',
        backgroundColor: 'black',
        paddingHorizontal: 10, height: 60
    },
    btnActive: {
        backgroundColor: 'rgba(212, 165, 61, 0.8)',
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
