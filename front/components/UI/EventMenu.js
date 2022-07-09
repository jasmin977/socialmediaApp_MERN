import React from 'react';
import { View, Text, Alert } from "react-native";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
} from 'react-native-popup-menu';
const { SlideInMenu } = renderers;
import { Feather, Ionicons, Entypo } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';
import * as eventActions from '../../store/actions/event';
import { showMessage } from "react-native-flash-message";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

import { useDispatch } from 'react-redux';



const EventMenu = (props) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const event_id = props.event_id;


    // messages you recieve when you are about to delete a post
    const deleteHandler = (id) => {
        Alert.alert(
            'Are you sure?',
            'Do you really want to delete this event?',
            [
                { text: 'No', style: 'default' },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: async () => {
                        await dispatch(eventActions.deleteEvent(id));

                        showMessage({
                            message: "Your event was successfully deleted.",
                            type: "success",
                            icon: { icon: "success", position: 'left' },
                            duration: 3000
                        });
                        navigation.navigate('AllEvents')
                    }

                }
            ]
        )
    };

    return (
        <Menu renderer={SlideInMenu} >
            <MenuTrigger>

                <Entypo
                    name="dots-three-horizontal"

                    size={25}

                    color={Colors.gold}
                />

            </MenuTrigger>
            <MenuOptions >
                <LinearGradient
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 0.0 }}
                    colors={['#111', '#111']}
                    style={{ backgroundColor: Colors.bege, overflow: 'hidden' }} >
                    <MenuOption

                        onSelect={() => navigation.navigate('EditEvent', { eventId: event_id })}
                    >
                        <View style={{ flexDirection: 'row', borderBottomColor: '#000', alignItems: 'center', borderBottomWidth: 1 }} >
                            <Text style={{ padding: 15, fontWeight: '900', fontSize: 17, letterSpacing: 2, color: Colors.gold }}>Edit Event</Text>
                        </View>
                    </MenuOption>
                    <MenuOption onSelect={deleteHandler.bind(this, event_id)}>

                        <View style={{ flexDirection: 'row' }} >
                            <Text style={{ padding: 15, fontWeight: '900', fontSize: 17, letterSpacing: 2, color: Colors.gold }}>Delete Event</Text>
                        </View>
                    </MenuOption>

                </LinearGradient>
            </MenuOptions>
        </Menu >
    )
}

export default EventMenu;