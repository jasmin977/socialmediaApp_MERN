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




const GiveAccesMenuJum = (props) => {


    const { player1, player2, myAlbum } = props;


    const dispatch = useDispatch();

    const deleteAcces = async (friendId) => {
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

    const giveAccesForever = async (friendId) => {
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

    const giveAccesForOneDay = async (friendId) => {
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

    const giveAccesForTwoDay = async (friendId) => {
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


    const checkGivenAcees4ever = (friendId) => {
        let check = myAlbum.authorized.indexOf(friendId) !== -1;
        return check;
    }

    const checkGiven24H = (friendId) => {
        let check = myAlbum.authorizedone.indexOf(friendId) !== -1;
        return check;
    }

    const checkGivenAcees48H = (friendId) => {
        let check = myAlbum.authorizedtwo.indexOf(friendId) !== -1;
        return check;
    }


    const checkSendAccess = (friendId) => {
        if (checkGiven24H(friendId) || checkGivenAcees48H(friendId) || checkGivenAcees4ever(friendId)) {
            return true
        }
        else {
            return false
        }
    }


    return (
        <Menu renderer={SlideInMenu} >
            <MenuTrigger>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

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
                        alignItems: 'center', height: 55, padding: 3
                    }}>

                        <Text style={{
                            color: 'white', fontSize: 13, letterSpacing: 1, fontWeight: '300', fontStyle: 'italic'
                        }}>Allow access to my private album for...</Text>
                    </View>



                    <View style={{
                        flexDirection: 'row', width: '100%'
                    }}>

                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center', width: '50%', borderColor: 'black', borderWidth: 1
                        }}>
                            <View style={{
                                backgroundColor: '#111', width: '100%', justifyContent: 'center',
                                alignItems: 'center', height: 50, borderColor: 'black', borderBottomWidth: 2
                            }}>

                                <Text style={{
                                    color: 'white', fontSize: 15, letterSpacing: 2, fontWeight: '300',

                                }}>..{player1.username}
                                </Text>
                            </View>
                            <MenuOption onSelect={() => giveAccesForOneDay(player1._id)}
                                disabled={checkSendAccess(player1._id)}
                            >


                                <View style={{
                                    fontSize: 10, color: 'white', alignItems: 'center', letterSpacing: 1, justifyContent: 'center'
                                }} >




                                    <Text style={checkGiven24H(player1._id) || checkGivenAcees48H(player1._id) || checkGivenAcees4ever(player1._id) ? styles.disabled : styles.menuButtons}>..For 24h</Text>
                                </View>

                            </MenuOption>
                            <MenuOption onSelect={() => giveAccesForTwoDay(player1._id)}
                                disabled={checkSendAccess(player1._id)}>


                                <View style={styles.viewButton} >


                                    <Text style={checkGiven24H(player1._id) || checkGivenAcees48H(player1._id) || checkGivenAcees4ever(player1._id) ? styles.disabled : styles.menuButtons}>..For 48h</Text>

                                </View>

                            </MenuOption>





                            {checkGiven24H(player1._id) || checkGivenAcees48H(player1._id) || checkGivenAcees4ever(player1._id) ? (

                                <MenuOption onSelect={() => deleteAcces(player1._id)}>

                                    <View style={styles.viewButton} >
                                        <Text style={styles.menuButtons}>DELETE ACCESS</Text>


                                    </View>

                                </MenuOption>
                            ) :
                                <MenuOption onSelect={() => giveAccesForever(player1._id)}>

                                    <View style={styles.viewButton} >
                                        <Text style={styles.menuButtons}>INDEFINITELY </Text>


                                    </View>

                                </MenuOption>}


                        </View>

                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center', width: '50%', borderColor: 'black', borderWidth: 1
                        }}>
                            <View style={{
                                backgroundColor: '#111', width: '100%', justifyContent: 'center',
                                alignItems: 'center', height: 50, borderColor: 'black', borderBottomWidth: 2
                            }}>

                                <Text style={{
                                    color: 'white', fontSize: 15, letterSpacing: 2, fontWeight: '300',

                                }}>..{player2.username}
                                </Text>
                            </View>
                            <MenuOption onSelect={() => giveAccesForOneDay(player2._id)}
                                disabled={checkSendAccess(player2._id)}
                            >


                                <View style={{
                                    fontSize: 10, color: 'white', alignItems: 'center', letterSpacing: 1, justifyContent: 'center'
                                }} >




                                    <Text style={checkGiven24H(player2._id) || checkGivenAcees48H(player2._id) || checkGivenAcees4ever(player2._id) ? styles.disabled : styles.menuButtons}>..For 24h</Text>
                                </View>

                            </MenuOption>
                            <MenuOption onSelect={() => giveAccesForTwoDay(player2._id)}
                                disabled={checkSendAccess(player2._id)}>


                                <View style={styles.viewButton} >


                                    <Text style={checkGiven24H(player2._id) || checkGivenAcees48H(player2._id) || checkGivenAcees4ever(player2._id) ? styles.disabled : styles.menuButtons}>..For 48h</Text>

                                </View>

                            </MenuOption>





                            {checkGiven24H(player2._id) || checkGivenAcees48H(player2._id) || checkGivenAcees4ever(player2._id) ? (

                                <MenuOption onSelect={() => deleteAcces(player2._id)}>

                                    <View style={styles.viewButton} >
                                        <Text style={styles.menuButtons}>DELETE ACCESS</Text>


                                    </View>

                                </MenuOption>
                            ) :
                                <MenuOption onSelect={() => giveAccesForever(player2._id)}>

                                    <View style={styles.viewButton} >
                                        <Text style={styles.menuButtons}>INDEFINITELY </Text>


                                    </View>

                                </MenuOption>}


                        </View>

                    </View>






                    <MenuOption style={{
                        backgroundColor: '#111111',
                    }} onSelect={() => alert(`closed`)}>
                        <View style={styles.viewButton}>
                            <Text style={{
                                color: 'white', fontSize: 13, letterSpacing: 2, fontWeight: '300', padding: 10
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
        fontSize: 12, padding: 5,
        color: 'white',
        alignContent: 'center', letterSpacing: 1

    },
    disabled: {
        fontSize: 12, padding: 5,
        color: 'grey', letterSpacing: 1,
        alignContent: 'center'

    },

    viewButton: {
        fontSize: 10,
        color: 'white',
        alignItems: 'center',
        letterSpacing: 1,
        justifyContent: 'center'


    }

})

export default GiveAccesMenuJum;