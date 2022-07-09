import React from 'react';
import { View, Text, Image, StyleSheet } from "react-native";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
} from 'react-native-popup-menu';
import { showMessage } from "react-native-flash-message";
import Colors from '../../constants/Colors';
import * as userActions from '../../store/actions/users';
import { useDispatch, useSelector } from "react-redux";

const { SlideInMenu } = renderers;




const JumReqMenu = (props) => {


    const { friendId } = props;


    const loggedInUserId = useSelector(state => state.auth.user._id);
    const jumlages = useSelector(state => state.jumlages.allJumlages);
    const myJum = jumlages.filter(f => f.userRef === loggedInUserId)[0];


    const dispatch = useDispatch();


    const checkSendReq = () => {
        let check = myJum.outGoingReq.indexOf(friendId) !== -1;
        return check;
    }


    const check3andiReq = () => {
        let check = myJum.inCommingReq.indexOf(friendId) !== -1;
        return check;
    }

    const check3andiJumelage = () => {
        if (myJum.player2) {
            return true;
        }
        else return false
    }




    {/** jumlage req */ }
    const toggleSendReqHandler = async (isSend, friendId) => {

        try {


            if (isSend) {
                await dispatch(userActions.jumlageCancelRequest(friendId));
                showMessage({
                    message: "Twinning request canceled",
                    type: "default",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' },
                    backgroundColor: Colors.gold, // background color
                    color: 'black', // text color
                });

            } else {
                await dispatch(userActions.jumlageRequest(friendId));
                showMessage({
                    message: "Twinning request sent",
                    type: "default",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' },
                    backgroundColor: Colors.gold, // background color
                    color: 'black', // text color
                });

            }

        } catch (error) {
            console.log("ERROR ", error)
        }
    }

    const toggleSend = async (friendId) => {
        toggleSendReqHandler(checkSendReq(), friendId);
    }


    const acceptJumRequest = async (friendId) => {
        try {
            await dispatch(userActions.jumlageAccept(friendId));
            showMessage({
                message: "Twinning request accepted ",
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

    const declineJumRequest = async (friendId) => {
        try {
            await dispatch(userActions.jumlageDeclineRequest(friendId));
            showMessage({
                message: "Twinning request canceled",
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


    const deleteJumlage = async (friendId) => {
        try {
            await dispatch(userActions.deleteJumlage(friendId));
            showMessage({
                message: "Twinning removed.",
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



    return (
        <Menu renderer={SlideInMenu} >
            <MenuTrigger>

                <View style={{ alignItems: 'center' }}>






                    <Image
                        style={{
                            height: 40,
                            width: 40,

                        }}
                        source={require('../../assets/icons/jumlage.png')}
                    ></Image>




                    <Text style={{ color: Colors.gold, fontSize: 13, fontWeight: 'bold', letterSpacing: 1 }}>Twinning</Text>

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
                        }}>  {check3andiJumelage() ? 'Remove Twinning' : 'Twinning Request'} </Text>
                    </View>




                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center', width: '100%', borderColor: 'black', borderWidth: 1
                    }}>



                        {check3andiJumelage() ? (
                            <View style={{
                                justifyContent: 'center', flexDirection: 'row',
                                alignItems: 'center', width: '100%',
                            }}>


                                <View style={{
                                    justifyContent: 'center', borderWidth: 1.2, borderColor: 'black',
                                    alignItems: 'center', width: '50%',
                                }}>

                                    <MenuOption onSelect={() => deleteJumlage(friendId)}>



                                        <View
                                            style={styles.viewButton}
                                        >

                                            <Text style={styles.menuButtons}>REMOVE TWINNNG</Text>

                                        </View>

                                    </MenuOption>
                                </View>


                                <View style={{
                                    justifyContent: 'center', borderWidth: 1.2, borderColor: 'black',
                                    alignItems: 'center', width: '50%',
                                }}>
                                    <MenuOption >


                                        <View style={styles.viewButton} >


                                            <Text style={styles.menuButtons}>QUIT</Text>

                                        </View>

                                    </MenuOption>

                                </View>

                            </View>

                        ) : (
                            <>
                                {check3andiReq() ? (
                                    <View style={{
                                        justifyContent: 'center', flexDirection: 'row',
                                        alignItems: 'center', width: '100%',
                                    }}>


                                        <View style={{
                                            justifyContent: 'center', borderWidth: 1.2, borderColor: 'black',
                                            alignItems: 'center', width: '50%',
                                        }}>

                                            <MenuOption onSelect={() => acceptJumRequest(friendId)}>



                                                <View
                                                    style={styles.viewButton}
                                                >

                                                    <Text style={styles.menuButtons}>ACCEPT REQUEST</Text>

                                                </View>

                                            </MenuOption>
                                        </View>


                                        <View style={{
                                            justifyContent: 'center', borderWidth: 1.2, borderColor: 'black',
                                            alignItems: 'center', width: '50%',
                                        }}>
                                            <MenuOption onSelect={() => declineJumRequest(friendId)}>



                                                <View style={styles.viewButton} >


                                                    <Text style={styles.menuButtons}>DECLINE REQUEST</Text>

                                                </View>

                                            </MenuOption>

                                        </View>

                                    </View>


                                ) : (
                                    <View style={{
                                        justifyContent: 'center', flexDirection: 'row',
                                        alignItems: 'center', width: '100%',
                                    }}>


                                        <View style={{
                                            justifyContent: 'center', borderWidth: 1.2, borderColor: 'black',
                                            alignItems: 'center', width: '50%',
                                        }}>

                                            <MenuOption onSelect={() => toggleSend(friendId)}>



                                                <View
                                                    style={styles.viewButton}
                                                >

                                                    <Text style={styles.menuButtons}>{checkSendReq() ? 'CANCEL REQUEST' : 'SEND'}</Text>

                                                </View>

                                            </MenuOption>
                                        </View>


                                        <View style={{
                                            justifyContent: 'center', borderWidth: 1.2, borderColor: 'black',
                                            alignItems: 'center', width: '50%',
                                        }}>
                                            <MenuOption >


                                                <View style={styles.viewButton} >


                                                    <Text style={styles.menuButtons}>QUIT</Text>

                                                </View>

                                            </MenuOption>

                                        </View>

                                    </View>

                                )}

                            </>
                        )}









                    </View>









                    <View style={{ backgroundColor: 'black', height: 150 }}>


                    </View>

                </View>
            </MenuOptions>

        </Menu>
    )
}



const styles = StyleSheet.create({

    menuButtons: {
        fontSize: 15,
        color: 'white',
        alignContent: 'center'

    },

    viewButton: {
        flexDirection: 'row',

        justifyContent: 'center',
        marginVertical: 5,
        padding: 5,

    }

})

export default JumReqMenu;