import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

const Interests = () => {
    const navigation = useNavigation();



    const [BirthDate, setDateOfBirth] = useState(new Date(1598051730000));
    const [showCalendar, setCalendar] = useState(false);

    // calendar
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date0;
        setCalendar(Platform.OS === 'ios');
        setDateOfBirth(currentDate);


    };
    const showMode = () => {
        setCalendar(true);

    };
    return (
        <SafeAreaView style={{
            flex: 1,
            width: '100%',
            backgroundColor: "#000",
            justifyContent: "center",

        }}>

            <TouchableOpacity style={{ position: 'absolute', top: 30, left: 20 }}
                onPress={() => navigation.goBack()}>
                <AntDesign
                    name='left'
                    size={30}
                    color="white"
                />
            </TouchableOpacity>


            <View style={{
                alignItems: 'center',
                justifyContent: "center",

            }}>

                {/** gender */}


                {/** first name and last name */}
                <View style={{ width: '100%', alignItems: "center", }}>



                    <View style={{ margin: 20, alignItems: "flex-start", alignSelf: 'flex-start' }}>

                        <Text style={{ fontSize: 30, color: Colors.gold, fontWeight: 'bold' }}>My </Text>

                        <Text style={{ fontSize: 30, color: Colors.gold, fontWeight: 'bold' }}>birthday is</Text>

                    </View>
                    <View
                        style={{
                            height: 60, width: '90%', fontSize: 20, padding: 10, alignItems: 'center',
                            backgroundColor: '#000', borderWidth: 0.3, borderColor: 'grey', flexDirection: 'row'
                        }}


                    >
                        <Text
                            style={{
                                fontSize: 20, color: 'white',
                                justifyContent: "flex-start"
                            }}>
                            {moment(BirthDate).format('YYYY-MM-DD')}
                        </Text>
                        <TouchableOpacity onPress={showMode} style={{ position: 'absolute', right: 10 }}>
                            <AntDesign

                                name='calendar'
                                size={25}
                                color={Colors.myGold
                                }
                            />
                        </TouchableOpacity>
                        {showCalendar && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={BirthDate}
                                mode="date"


                                onChange={onChange}
                            />)}
                    </View>


                </View>





            </View>

            <TouchableOpacity style={{ position: 'absolute', bottom: 10, width: '100%', }}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    colors={["#111", Colors.gold,]}
                    style={{
                        margin: 10,

                        justifyContent: 'center',
                        width: '90%',
                        alignItems: 'center',
                        height: 60
                    }}>


                    <Text style={{ color: 'white', fontSize: 20, letterSpacing: 1, fontWeight: '900' }} > CONTINUE</Text>


                </LinearGradient>
            </TouchableOpacity>





        </SafeAreaView>
    )
}

export default Interests;


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
