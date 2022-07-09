import React from 'react';
import { View, Text, Image, StyleSheet } from "react-native";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
} from 'react-native-popup-menu';
import { useDispatch, useSelector } from "react-redux";

import { showMessage } from "react-native-flash-message";
import Colors from '../../constants/Colors';
import * as userActions from '../../store/actions/users';


const { SlideInMenu } = renderers;




const GiveAccessMenu = (props) => {
    const { friendId, myAlbum } = props;



    //console.log(myAlbum)


    const dispatch = useDispatch();



    const deleteAcces = async () => {
        try {
            await dispatch(userActions.deleteAccess(friendId));

            showMessage({
                message: `Cancel access.`,
                type: "default",
                duration: 3000,
                icon: { icon: "success", position: 'left' },

                backgroundColor: Colors.gold, // background color
                color: 'black', // text color
            });

        }
        catch (error) {
            console.log("ERROR ", error)
        }
    }

    const giveAccesForever = async () => {
        try {
            await dispatch(userActions.albumAccesForever(friendId));

            showMessage({
                message: `You have given access INDEFINITELY.`,
                type: "default",
                duration: 3000,
                icon: { icon: "success", position: 'left' },

                backgroundColor: Colors.gold, // background color
                color: 'black', // text color
            });

        }
        catch (error) {
            console.log("ERROR ", error)
        }
    }

    const giveAccesForOneDay = async () => {
        try {
            await dispatch(userActions.albumAccesForOneDay(friendId));
            showMessage({
                message: `You have given access for 24 Hours.`,
                type: "default",
                duration: 3000,
                icon: { icon: "success", position: 'left' },

                backgroundColor: Colors.gold, // background color
                color: 'black', // text color
            });

        }
        catch (error) {
            console.log("ERROR ", error)
        }
    }

    const giveAccesForTwoDay = async () => {
        try {
            await dispatch(userActions.albumAccesForTwoDay(friendId));
            showMessage({
                message: `You have given access for 48 Hours.`,
                type: "default",
                duration: 3000,
                icon: { icon: "success", position: 'left' },

                backgroundColor: Colors.gold, // background color
                color: 'black', // text color
            });

        }
        catch (error) {
            console.log("ERROR ", error)
        }
    }


    const checkGivenAcees4ever = () => {
        let check = myAlbum.authorized.indexOf(friendId) !== -1;
        return check;
    }

    const checkGiven24H = () => {
        let check = myAlbum.authorizedone.indexOf(friendId) !== -1;
        return check;
    }

    const checkGivenAcees48H = () => {
        let check = myAlbum.authorizedtwo.indexOf(friendId) !== -1;
        return check;
    }


    const checkSendAccess = () => {
        if (checkGiven24H() || checkGivenAcees48H() || checkGivenAcees4ever()) {
            return true
        }
        else {
            return false
        }
    }


    return (
        <Menu renderer={SlideInMenu} >
            <MenuTrigger>

                <View style={{ alignItems: 'center' }}>

                    <Image
                        style={{
                            height: 40,
                            width: 40,
                        }}
                        source={require('../../assets/icons/key.png')}
                    ></Image>



                    <Text style={{ color: Colors.gold, fontSize: 13, fontWeight: 'bold', letterSpacing: 1 }}>Access</Text>


                </View>
            </MenuTrigger>

            <MenuOptions >
                <View style={{ backgroundColor: '#1e1e1e', overflow: 'hidden' }} >


                    <View style={{
                        backgroundColor: '#000', width: '100%', justifyContent: 'center',
                        alignItems: 'center', height: 50, padding: 3
                    }}>

                        <Text style={{
                            color: 'white', fontSize: 15, letterSpacing: 1, fontWeight: '300', fontStyle: 'italic'
                        }}>Allow access to my private album</Text>
                    </View>




                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center', width: '100%', borderColor: 'black', borderWidth: 1
                    }}>

                        <MenuOption onSelect={() => giveAccesForOneDay()}
                            disabled={checkSendAccess()}
                        >


                            <View
                                style={styles.viewButton}
                            >
                                <Text style={checkGiven24H() || checkGivenAcees48H() || checkGivenAcees4ever() ? styles.disabled : styles.menuButtons}>For 24h</Text>


                            </View>

                        </MenuOption>
                        <MenuOption onSelect={() => giveAccesForTwoDay()}
                            disabled={checkSendAccess()}>


                            <View style={styles.viewButton} >

                                <Text style={checkGiven24H() || checkGivenAcees48H() || checkGivenAcees4ever() ? styles.disabled : styles.menuButtons}>For 48h</Text>


                            </View>

                        </MenuOption>


                        {checkGiven24H() || checkGivenAcees48H() || checkGivenAcees4ever() ? (

                            <MenuOption onSelect={() => deleteAcces()}>

                                <View style={styles.viewButton} >
                                    <Text style={styles.menuButtons}>Delete Access</Text>


                                </View>

                            </MenuOption>
                        ) :
                            <MenuOption onSelect={() => giveAccesForever()}>

                                <View style={styles.viewButton} >
                                    <Text style={styles.menuButtons}>INDEFINITELY </Text>


                                </View>

                            </MenuOption>}




                    </View>









                    <MenuOption style={{
                        backgroundColor: '#111111', borderTopColor: 'black', borderTopWidth: 1
                    }} onSelect={() => alert(`closed`)}>
                        <View style={styles.viewButton}>
                            <Text style={{
                                color: 'white', fontSize: 15, letterSpacing: 2, fontWeight: '300', padding: 3
                            }}>QUIT X</Text>

                        </View>
                    </MenuOption>
                </View>
            </MenuOptions>

        </Menu>
    )
}



const styles = StyleSheet.create({

    menuButtons: {
        fontSize: 17,
        color: 'white',
        alignContent: 'center', letterSpacing: 1

    },
    disabled: {
        fontSize: 17,
        color: 'grey',
        alignContent: 'center'

    },

    viewButton: {
        flexDirection: 'row',

        justifyContent: 'center',
        marginVertical: 5,
        padding: 3,

    }

})

export default GiveAccessMenu;