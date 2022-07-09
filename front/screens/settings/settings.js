import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Image, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

import { useNavigation } from '@react-navigation/native';
import { TransText, TranslationConsumer } from 'react-native-translation';

import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import { showMessage } from "react-native-flash-message";



const profil = {
    "en-US": "My Profile",
    "fr-FR": "Mon Profil",
}

const msg = {
    "en-US": "Messages",
    "fr-FR": "Messages",
}

const agenda = {
    "en-US": "Agenda",
    "fr-FR": "Agenda",
}

const event = {
    "en-US": "My Events",
    "fr-FR": "Mes Evenements",
}

const nearby = {
    "en-US": "Nearby Friends",
    "fr-FR": "Amis à proximité",

}
const story = {
    "en-US": "Story archive",
    "fr-FR": "Stories archivés",

}

const Subscription = {
    "en-US": "Subscription",
    "fr-FR": "Subscription",

}

const settings = {
    "en-US": "My Settings",
    "fr-FR": "Paramètres",

}

const logout = {
    "en-US": "Log Out",
    "fr-FR": "Deconexion",

}









const Data = [
    {
        id: 1, title: profil, nav: 'UserProfile',
        icon: require('../../assets/settingsIcons/user.png')
    },


    { id: 12, title: msg, nav: 'Chats', icon: require('../../assets/settingsIcons/messenger.png') },
    { id: 15, title: agenda, nav: 'agenda', icon: require('../../assets/settingsIcons/agenda.png') },
    { id: 147, title: event, nav: 'My Events', icon: require('../../assets/settingsIcons/event.png') },
    { id: 178, title: nearby, nav: 'nearby', icon: require('../../assets/settingsIcons/nearby.png') },
    { id: 144, title: story, nav: 'archive', icon: require('../../assets/settingsIcons/archiver.png') },
    { id: 17478, title: Subscription, nav: 'Settings', icon: require('../../assets/settingsIcons/card.png') },

    { id: 1748, title: settings, nav: 'Settings', icon: require('../../assets/settingsIcons/settings.png') },
    { id: 14748, title: logout, icon: require('../../assets/settingsIcons/logout.png') },

];


const numColumns = 2;


const Settings = (props) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();



    const logoutHandler = () => {
        Alert.alert(
            'Are you sure?',
            'Do you really want to log out?',
            [
                { text: 'No', style: 'default' },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: async () => {

                        console.log('logedd out')

                        await dispatch(authActions.logout());

                        showMessage({
                            message: `You have successfully logged out.`,
                            type: "success",
                            duration: 3000,
                            icon: { icon: "success", position: 'left' }
                        });


                    }
                }
            ]
        )
    };


    return (

        <View style={styles.bg}>
            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ fontWeight: '900', color: 'white', fontSize: 25, letterSpacing: 1, }}>  Menu</Text>

            </View>

            <FlatList
                data={Data}
                keyExtractor={(item) => item.id}
                style={styles.container}
                renderItem={(setting, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {

                                if (setting.item.nav) {
                                    navigation.navigate(setting.item.nav)
                                } else {
                                    logoutHandler()
                                }
                            }}

                            style={styles.item}
                        >
                            <Image style={{ width: 35, height: 35, justifyContent: 'center', margin: 4, tintColor: Colors.gold }}
                                source={setting.item.icon}
                            ></Image>
                            <TransText style={styles.itemText} dictionary={setting.item.title} />
                        </TouchableOpacity>
                    );




                }}

                numColumns={numColumns}
            />

        </View>


    );
};





export default Settings;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5

    },
    bg: {
        flex: 1,
        backgroundColor: '#000'
    },
    item: {
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderRadius: 5,
        margin: 5,
        height: 120, // approximate a square
    },

    itemText: {
        fontSize: 15, fontWeight: '800',
        color: '#fff', letterSpacing: 1
    },
});
