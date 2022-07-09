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
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';
import * as postActions from '../../store/actions/posts';
import { showMessage } from "react-native-flash-message";

import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

import { useDispatch } from 'react-redux';



const ReportMenu = (props) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const post_id = props.post_id;



    return (
        <Menu renderer={SlideInMenu} >
            <MenuTrigger>

                <Entypo
                    name="dots-three-horizontal"

                    size={20}

                    color={Colors.gold}
                />

            </MenuTrigger>
            <MenuOptions >
                <View

                    style={{ backgroundColor: '#111', overflow: 'hidden', }} >
                    <MenuOption
                        onSelect={async () => {
                            showMessage({
                                message: `Post Saved`,
                                type: "default",
                                duration: 3000,
                                icon: { icon: "success", position: 'left' },
                                backgroundColor: "black", // background color
                                color: Colors.gold, // text color
                            });
                        }}>

                        <View style={{ flexDirection: 'row', borderColor: '#000', alignItems: 'center', borderBottomWidth: 2 }} >
                            <Text style={{ padding: 15, paddingLeft: 30, fontWeight: 'bold', fontSize: 22, color: Colors.bege }}>Save Post</Text>
                            <MaterialIcons
                                name="keyboard-arrow-down"

                                style={{ position: 'absolute', right: 30 }}
                                color={Colors.bege}


                                size={35} />
                        </View>
                    </MenuOption>

                    <MenuOption onSelect={async () => {
                        showMessage({
                            message: `Post reported`,
                            type: "default",
                            duration: 3000,
                            icon: { icon: "success", position: 'left' },
                            backgroundColor: "black", // background color
                            color: Colors.gold, // text color
                        });
                    }}>

                        <View style={{ flexDirection: 'row' }} >
                            <Text style={{ padding: 15, paddingLeft: 30, fontWeight: 'bold', fontSize: 22, color: Colors.bege }}>Report Post</Text>
                            <MaterialIcons
                                name="keyboard-arrow-down"

                                style={{ position: 'absolute', right: 30 }}
                                color={Colors.bege}


                                size={35} />
                        </View>
                    </MenuOption>

                </View>
            </MenuOptions>
        </Menu >
    )
}

export default ReportMenu;