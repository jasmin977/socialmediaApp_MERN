import React from 'react';
import { View, Text, Image, StyleSheet } from "react-native";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
} from 'react-native-popup-menu';
import Colors from '../../constants/Colors';
import { showMessage } from "react-native-flash-message";

const { SlideInMenu } = renderers;




const JUmelageMenu = (props) => {

    const { player1, player2 } = props;




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
                        source={require('../../assets/icons/addfriend.png')}
                    ></Image>

                    <Text style={{ color: Colors.gold, fontSize: 13, fontWeight: 'bold', letterSpacing: 1 }}>Contact</Text>

                </View>
            </MenuTrigger>





            <MenuOptions >
                <View style={{ backgroundColor: '#1e1e1e', overflow: 'hidden' }} >


                    <View style={{
                        backgroundColor: '#000', width: '100%', justifyContent: 'center',
                        alignItems: 'center', height: 55, padding: 3
                    }}>

                        <Text style={{
                            color: 'white', fontSize: 15, letterSpacing: 2, fontWeight: '300', fontStyle: 'italic'
                        }}>Contact Options</Text>
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
                                    color: 'white', fontSize: 17, letterSpacing: 2, fontWeight: '300',

                                }}>{player1.username}
                                </Text>
                            </View>
                            <MenuOption onSelect={async () => {
                                showMessage({
                                    message: `Friend request sent.`,
                                    type: "default",
                                    duration: 3000,
                                    icon: { icon: "success", position: 'left' },
                                    backgroundColor: "black", // background color
                                    color: Colors.gold, // text color
                                });
                            }}>


                                <View style={{
                                    fontSize: 10, color: 'white', alignItems: 'center', letterSpacing: 1, justifyContent: 'center'
                                }} >




                                    <Text style={styles.menuButtons}>Send Friend Request</Text>

                                </View>

                            </MenuOption>
                            <MenuOption onSelect={async () => {
                                showMessage({
                                    message: `Member reported.`,
                                    type: "default",
                                    duration: 3000,
                                    icon: { icon: "success", position: 'left' },
                                    backgroundColor: "black", // background color
                                    color: Colors.gold, // text color }
                                });
                            }}>

                                <View style={styles.viewButton} >


                                    <Text style={styles.menuButtons}>Report This Member</Text>

                                </View>

                            </MenuOption>
                            <MenuOption onSelect={async () => {
                                showMessage({
                                    message: `Member blocked.`,
                                    type: "default",
                                    duration: 3000,
                                    icon: { icon: "success", position: 'left' },
                                    backgroundColor: "black", // background color
                                    color: Colors.gold, // text color }
                                });
                            }}>

                                <View style={styles.viewButton} >


                                    <Text style={styles.menuButtons}>Block This Member</Text>

                                </View>

                            </MenuOption>

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

                                }}>{player2.username}
                                </Text>
                            </View>
                            <MenuOption onSelect={async () => {
                                showMessage({
                                    message: `Friend request sent.`,
                                    type: "default",
                                    duration: 3000,
                                    icon: { icon: "success", position: 'left', },
                                    backgroundColor: Colors.gold, // background color
                                    color: 'white', // text color
                                });
                            }}>


                                <View style={{
                                    fontSize: 13,
                                    color: 'white',
                                    alignItems: 'center', letterSpacing: 1, justifyContent: 'center'
                                }} >


                                    <Text style={styles.menuButtons}>Send Friend Request</Text>

                                </View>

                            </MenuOption>
                            <MenuOption onSelect={async () => {
                                showMessage({
                                    message: `Member reported.`,
                                    type: "default",
                                    duration: 3000,
                                    icon: { icon: "success", position: 'left' },
                                    backgroundColor: "black", // background color
                                    color: Colors.gold, // text color
                                });
                            }}>


                                <View style={styles.viewButton} >


                                    <Text style={styles.menuButtons}>Report This Member</Text>

                                </View>

                            </MenuOption>
                            <MenuOption onSelect={async () => {
                                showMessage({
                                    message: `Member blocked.`,
                                    type: "default",
                                    duration: 3000,
                                    icon: { icon: "success", position: 'left' },
                                    backgroundColor: "black", // background color
                                    color: Colors.gold, // text color
                                });
                            }}>


                                <View style={styles.viewButton} >


                                    <Text style={styles.menuButtons}>Block This Member</Text>

                                </View>

                            </MenuOption>

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
        fontSize: 13, padding: 5,
        color: 'white',
        alignContent: 'center', letterSpacing: 1

    },

    viewButton: {
        fontSize: 10,
        color: 'white',
        alignItems: 'center',
        letterSpacing: 1,
        justifyContent: 'center'


    }

})

export default JUmelageMenu;