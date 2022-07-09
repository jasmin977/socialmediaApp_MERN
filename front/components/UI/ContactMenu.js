import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
} from 'react-native-popup-menu';
import ENV from '../../env';

const { SlideInMenu } = renderers;
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import Colors from '../../constants/Colors';

import * as userActions from '../../store/actions/users';
import { useNavigation } from '@react-navigation/native';



const ContactMenu = (props) => {
    const { friendId } = props;

    const loggedInUserId = useSelector(state => state.auth.user._id);
    const friends = useSelector(state => state.friends.myFriends);
    const myFriends = friends.filter(f => f.userRef === loggedInUserId)[0];
    const navigation = useNavigation();


    const [isFollowLoading, setIsFollowLoading] = useState(false);
    const [isReported, setIsReport] = useState(false);



    const dispatch = useDispatch();



    // check if i sent a friend req to this user
    const checkSendReq = () => {
        let check = myFriends.outGoingReq.indexOf(friendId) !== -1;
        return check;
    }


    const check3andiReq = () => {
        let check = myFriends.inCommingReq.indexOf(friendId) !== -1;
        return check;
    }

    const checkFriend = () => {
        let check = myFriends.friends.indexOf(friendId) !== -1;
        return check;
    }

    const checkBlocked = () => {
        let check = myFriends.blocked.indexOf(friendId) !== -1;
        return check;
    }



    {/** friend req */ }
    const toggleSendReqHandler = async (isSend, friendId) => {

        try {

            setIsFollowLoading(true);
            if (isSend) {

                showMessage({
                    message: "Friend request canceled",
                    type: "default",
                    icon: { icon: "success", position: 'left' },
                    duration: 3000,
                    backgroundColor: Colors.gold, // background color
                    color: "white", // text color
                });
                await dispatch(userActions.cancelRequest(friendId));
            } else {

                showMessage({
                    message: "Friend request sent",
                    type: "default",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' },
                    backgroundColor: Colors.gold, // background color
                    color: "white", // text color
                });
                await dispatch(userActions.sendRequest(friendId));
            }
            setIsFollowLoading(false);
        } catch (error) {
            console.log("ERROR ", error)
        }
    }

    const toggleSend = async (friendId) => {
        toggleSendReqHandler(checkSendReq(), friendId);
    }







    {/** blocking */ }
    const toggleBlockingHandler = async (isBlocked, friendId) => {

        try {

            setIsFollowLoading(true);
            if (isBlocked) {

                await dispatch(userActions.unblockFriend(friendId));
                showMessage({
                    message: "You have unblocked this user.",
                    type: "default",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' },
                    backgroundColor: Colors.gold, // background color
                    color: 'black', // text color
                });

            } else {

                await dispatch(userActions.blockFriend(friendId));
                showMessage({
                    message: "You have blocked this user.",
                    type: "default",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' },
                    backgroundColor: Colors.gold, // background color
                    color: 'black', // text color
                });
                navigation.navigate('Blocked Users')
            }
            setIsFollowLoading(false);
        } catch (error) {
            console.log("ERROR ", error)
        }
    }


    const toggleBlock = async (friendId) => {
        toggleBlockingHandler(checkBlocked(), friendId);
    }





    const acceptRequest = async (friendId) => {
        try {
            await dispatch(userActions.acceptRequest(friendId));
            showMessage({
                message: "Friend request accepted.",

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

    const declineRequest = async (friendId) => {
        try {
            await dispatch(userActions.declineRequest(friendId));
            showMessage({
                message: "Friend request canceled.",
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

    const removefriend = async (friendId) => {
        // setIsLoading(true);
        try {

            await dispatch(userActions.removefriend(friendId));
            showMessage({
                message: "Friend removed.",
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
        // setIsLoading(false);
    }



    const reportFriend = async () => {


        showMessage({
            message: "You have reported this user.",
            type: "default",
            duration: 3000,
            icon: { icon: "success", position: 'left' },
            backgroundColor: Colors.gold, // background color
            color: 'black', // text color
        });
        setIsReport(true);

    }







    return (
        <Menu renderer={SlideInMenu} >
            <MenuTrigger>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>


                    {checkFriend() ? (
                        <Image
                            style={{
                                height: 40,
                                width: 40,

                            }}
                            source={require('../../assets/icons/friendcheck.png')}
                        ></Image>
                    ) : (

                        <>
                            {
                                check3andiReq() || checkSendReq() ? (
                                    <Image
                                        style={{
                                            height: 40,
                                            width: 40,

                                        }}
                                        source={require('../../assets/icons/friendReq.png')}
                                    ></Image>
                                ) : (
                                    <Image
                                        style={{
                                            height: 40,
                                            width: 40,

                                        }}
                                        source={require('../../assets/icons/addfriend.png')}
                                    ></Image>
                                )
                            }
                        </>




                    )}




                    <Text style={{ color: Colors.gold, fontSize: 13, fontWeight: 'bold', letterSpacing: 1 }}>Contact</Text>

                </View>
            </MenuTrigger>

            <MenuOptions >
                <View style={{ backgroundColor: '#1e1e1e', overflow: 'hidden', }} >


                    <View style={{
                        backgroundColor: '#000', width: '100%', justifyContent: 'center',
                        alignItems: 'center', height: 50, padding: 3,
                    }}>

                        <Text style={{
                            color: 'white', fontSize: 15, letterSpacing: 1, fontWeight: '300', fontStyle: 'italic'
                        }}>Contact Options</Text>
                    </View>




                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center', width: '100%', borderColor: 'black', borderWidth: 1
                    }}>




                        {/** we gotta check if this user send us a req so we display accept or decline req */}
                        {/** sinn its a normal user and we display send or cancel re */}





                        {checkBlocked() === false &&
                            <>
                                {check3andiReq() ?
                                    (

                                        <View style={{
                                            flexDirection: 'row', justifyContent: 'center',
                                            alignItems: 'center', width: '100%',
                                        }}>

                                            <View style={{
                                                justifyContent: 'center',
                                                alignItems: 'center', width: '50%', borderColor: 'black', borderWidth: 1
                                            }}>
                                                <MenuOption onSelect={() => acceptRequest(friendId)}>

                                                    <View
                                                        style={styles.viewButton}
                                                    >



                                                        <Text style={styles.menuButtons}> Accept Request </Text>



                                                    </View>

                                                </MenuOption>
                                            </View>
                                            <View style={{
                                                justifyContent: 'center',
                                                alignItems: 'center', width: '50%', borderColor: 'black', borderWidth: 1
                                            }}>
                                                <MenuOption onSelect={() => declineRequest(friendId)}>

                                                    <View
                                                        style={styles.viewButton}
                                                    >



                                                        <Text style={styles.menuButtons}> Decline Request </Text>



                                                    </View>

                                                </MenuOption>
                                            </View>


                                        </View>



                                    ) : (
                                        <>
                                            {
                                                checkFriend() ?
                                                    (
                                                        <MenuOption onSelect={() => removefriend(friendId)}>

                                                            <View
                                                                style={styles.viewButton}
                                                            >



                                                                <Text style={styles.menuButtons}> Remove Friend </Text>



                                                            </View>

                                                        </MenuOption>
                                                    ) : (
                                                        <MenuOption onSelect={() => toggleSend(friendId)}>

                                                            <View
                                                                style={styles.viewButton}
                                                            >

                                                                {checkSendReq() ? (


                                                                    <Text style={styles.menuButtons}> Cancel Request </Text>

                                                                ) : (

                                                                    <Text style={styles.menuButtons}>Send Friend Request</Text>

                                                                )}

                                                            </View>

                                                        </MenuOption>
                                                    )
                                            }
                                        </>
                                    )}



                            </>
                        }

























                        <MenuOption onSelect={() => reportFriend()}>


                            <View style={styles.viewButton} >

                                <Text style={styles.menuButtons}>{isReported ? 'Reported' : 'Report This Member'}</Text>



                            </View>

                        </MenuOption>
                        <MenuOption onSelect={() => toggleBlock(friendId)}>


                            <View style={styles.viewButton} >


                                {checkBlocked() ? (


                                    <Text style={styles.menuButtons}> Unblock </Text>

                                ) : (

                                    <Text style={styles.menuButtons}>Block This Member</Text>

                                )}

                            </View>

                        </MenuOption>

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
        alignContent: 'center', letterSpacing: 1.5

    },

    viewButton: {
        flexDirection: 'row',

        justifyContent: 'center',
        marginVertical: 5,
        padding: 2,

    }

})

export default ContactMenu;