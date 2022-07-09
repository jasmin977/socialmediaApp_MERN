import React, { useState } from 'react';
import { View, Text, Switch, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';


import Colors from '../../constants/Colors';



const DarkMode = () => {



    const [mode, setMode] = useState(false);
    const toggleSwitch = () => setMode(previousState => !previousState);




    return (

        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: 'black'
        }}>



            <View style={{ width: '90%', alignItems: "flex-start", position: 'absolute', top: 20 }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', letterSpacing: 1 }}>
                    Mode
</Text>

                <Text style={{ color: 'grey', fontSize: 15, fontWeight: '900', }}>
                    Change the application mode.
</Text>
            </View>


            <View style={{ flexDirection: 'row', }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginHorizontal: 20 }}>
                    Dark Mode
                </Text>
                <Switch
                    trackColor={{ false: "#767577", true: Colors.gold }}
                    thumbColor={mode ? '#9D6C18' : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={mode}
                />
            </View>













        </View>
    );
};

export default DarkMode;