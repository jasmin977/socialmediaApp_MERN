import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';

import { RadioButton } from 'react-native-paper';

import Colors from '../../constants/Colors';



const PublicPosts = () => {




    const [checked, setChecked] = useState('public');


    return (

        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: 'black'
        }}>



            <View style={{ width: '90%', alignItems: "flex-start", position: 'absolute', top: 20 }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', letterSpacing: 1 }}>
                    Public Posts
</Text>

                <Text style={{ color: 'grey', fontSize: 15, fontWeight: '900', }}>
                    Friends can see your posts in News Feed by default , but you can also allow people who are not your friends to see your public posts.
                    Use this setting to choose which audience you want to share with.


</Text>
            </View>

            <View style={{ width: '100%', position: 'absolute', left: 40, }}>

                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '900' }}>Public</Text>
                    <View style={{ position: 'absolute', right: 60 }}>


                        <RadioButton

                            value="public"
                            uncheckedColor='grey'
                            color={Colors.gold}
                            status={checked === 'public' ? 'checked' : 'unchecked'}
                            onPress={() =>
                                setChecked('public')


                            }
                        />
                    </View>
                </View>




                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '900', }}>Friends</Text>
                    <View style={{ position: 'absolute', right: 60 }}>
                        <RadioButton
                            value="friends"
                            uncheckedColor='grey'
                            color={Colors.gold}
                            status={checked === 'friends' ? 'checked' : 'unchecked'}
                            onPress={() =>
                                setChecked('friends')

                            }
                        />
                    </View>
                </View>

            </View>











        </View>
    );
};

export default PublicPosts;