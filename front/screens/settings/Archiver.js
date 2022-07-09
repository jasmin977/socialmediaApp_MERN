import React, { useState } from 'react';
import { View, Text, Switch, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';


import Colors from '../../constants/Colors';



const Archiver = () => {



    const [archive, setArchive] = useState(false);
    const toggleSwitch = () => setArchive(previousState => !previousState);




    return (

        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: 'black'
        }}>



            <View style={{ width: '90%', alignItems: "flex-start", position: 'absolute', top: 20 }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', letterSpacing: 1 }}>
                    Save Stories to Archive
</Text>

                <Text style={{ color: 'grey', fontSize: 15, fontWeight: '900', }}>
                    Turn on Archive to save your stories automatically after they disappear.
                    Only you can see you Story Archive.
</Text>
            </View>


            <View style={{ flexDirection: 'row', }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginHorizontal: 20 }}>
                    Save to Archive
                </Text>
                <Switch
                    trackColor={{ false: "#767577", true: Colors.gold }}
                    thumbColor={archive ? '#9D6C18' : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={archive}
                />
            </View>













        </View>
    );
};

export default Archiver;