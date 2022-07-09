import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ImageBackground } from 'react-native';


export const MyDrawer = () => {
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: "#111" }}>

            <Image style={{ width: '90%', height: '40%', justifyContent: 'center' }}
                source={require('../assets/logoo.png')} />



            <View>



            </View>


        </View>
    );
};

