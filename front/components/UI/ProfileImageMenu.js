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
import * as usersActions from '../../store/actions/users';
import { showMessage } from "react-native-flash-message";
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

import { useDispatch } from 'react-redux';



const ImageMenu = (props) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();


    const deleteProfilePicture = async () => {

        try {
            await dispatch(usersActions.deleteProfilPic());



            showMessage({
                message: "Your profile picture was successfully deleted.",
                type: "success",
                duration: 3000,
                icon: { icon: "success", position: 'left' }
            });
        } catch (error) {
            showMessage({
                message: error.message,
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            console.log("ERROR ", error.message);
        }

    }

    return (
        <Menu renderer={SlideInMenu} >
            <MenuTrigger>


                <MaterialIcons

                    name='mode-edit'
                    size={30}
                    color='rgba(218,165,32,0.7)'
                />


            </MenuTrigger>
            <MenuOptions >
                <View

                    style={{ backgroundColor: '#111', overflow: 'hidden', }} >
                    <MenuOption onSelect={() => navigation.navigate('Update Profil')} >

                        <View style={{ flexDirection: 'row', borderColor: '#000', alignItems: 'center', borderBottomWidth: 2 }} >
                            <Text style={{ padding: 15, paddingLeft: 30, letterSpacing: 1, fontSize: 17, color: Colors.gold }}>Edit Personal Information</Text>

                        </View>
                    </MenuOption>
                    <MenuOption onSelect={() => navigation.navigate('UpdateProfilPic')} >

                        <View style={{ flexDirection: 'row', borderColor: '#000', alignItems: 'center', borderBottomWidth: 2 }} >
                            <Text style={{ padding: 15, paddingLeft: 30, letterSpacing: 1, fontSize: 17, color: Colors.gold }}>Edit Profile Image</Text>

                        </View>
                    </MenuOption>



                </View>
            </MenuOptions>


        </Menu >
    )
}

export default ImageMenu;