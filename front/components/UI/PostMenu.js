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



const PostMenu = (props) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const post_id = props.post_id;


    // messages you recieve when you are about to delete a post
    const deleteHandler = (id) => {
        Alert.alert(
            'Are you sure?',
            'Do you really want to delete this post?',
            [
                { text: 'No', style: 'default' },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: async () => {
                        await dispatch(postActions.deletePost(id))

                        showMessage({
                            message: "Your post was successfully deleted.",
                            type: "default",
                            duration: 3000,
                            icon: { icon: "success", position: 'left' },
                            backgroundColor: "black", // background color
                            color: Colors.gold, // text color
                        });

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

                    size={20}

                    color={Colors.gold}
                />

            </MenuTrigger>
            <MenuOptions >
                <View

                    style={{ backgroundColor: '#111', overflow: 'hidden', }} >

                    <MenuOption
                        onSelect={() => navigation.navigate('EditPost', { postId: post_id })}

                    >
                        <View style={{ flexDirection: 'row', borderColor: '#000', alignItems: 'center', borderBottomWidth: 2 }} >
                            <Text style={{ padding: 15, paddingLeft: 30, fontWeight: '900', fontSize: 20, color: Colors.gold, letterSpacing: 2 }}>Edit Post</Text>

                        </View>
                    </MenuOption>
                    <MenuOption onSelect={deleteHandler.bind(this, post_id)}>

                        <View style={{ flexDirection: 'row' }} >
                            <Text style={{ padding: 15, paddingLeft: 30, fontWeight: '900', fontSize: 20, color: Colors.gold, letterSpacing: 2 }}>Delete Post</Text>

                        </View>
                    </MenuOption>

                </View>
            </MenuOptions>
        </Menu >
    )
}

export default PostMenu;