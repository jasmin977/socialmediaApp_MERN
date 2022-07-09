import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../constants/Colors';
import * as userActions from '../../store/actions/users';



const Status = () => {


    const dispatch = useDispatch();

    const users = useSelector(state => state.users.allUsers);
    const loggedInUserId = useSelector(state => state.auth.user._id);
    const myStatus = users.filter(u => u._id === loggedInUserId)[0];


    //console.log(myStatus.status)
    const [status, setStatus] = useState(myStatus.status);
    const toggleSwitch = () => setStatus(previousState => !previousState);


    const toggleStatusHandler = async () => {

        try {
            if (status) {
                await dispatch(userActions.online())
            } else {
                await dispatch(userActions.offline())
            }
        } catch (error) {
            console.log("ERROR ", error)
        }
    }

    useEffect(() => {
        toggleStatusHandler()
        // console.log(status)
    }, [status])

    return (

        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: 'black'
        }}>



            <View style={{ width: '90%', alignItems: "flex-start", position: 'absolute', top: 20 }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', letterSpacing: 1 }}>
                    Active Status
</Text>

                <Text style={{ color: 'grey', fontSize: 15, fontWeight: '900', }}>
                    Your Friends and Contacts will see when you are active.
                    You'll appear active unless you turn off the setting.
                    You'll also see when your friends and contacts are active.
</Text>
            </View>


            <View style={{ flexDirection: 'row', }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginHorizontal: 20 }}>
                    Show when you are active
                </Text>
                <Switch
                    trackColor={{ false: "#767577", true: Colors.gold }}
                    thumbColor={status ? '#9D6C18' : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={status}
                />
            </View>













        </View>
    );
};

export default Status;