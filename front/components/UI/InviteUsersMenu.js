import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Picker, } from "react-native";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
} from 'react-native-popup-menu';
import Colors from '../../constants/Colors';
import { showMessage } from "react-native-flash-message";
import * as eventActions from '../../store/actions/event';
import { useDispatch, useSelector } from "react-redux";

const { SlideInMenu } = renderers;




const InviteUserMenu = (props) => {


    const { myEvents, friendId } = props;
    // console.log(myEvents)
    const dispatch = useDispatch();


    // si me3andouch event 
    let firstItem;
    if (myEvents.length === 0) {
        firstItem = '1'
    } else {
        firstItem = myEvents[0]._id
    }

    const [selectedValue, setSelectedValue] = useState(firstItem);

    // console.log(selectedValue) // event Id
    // console.log(friendId)

    const inviteFriend = async (eventId) => {
        try {
            await dispatch(eventActions.inviteToMyEvent(eventId, friendId));
            showMessage({
                message: `You have invited this user to your event.`,
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

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                    <Image
                        style={{
                            height: 40,
                            width: 40,

                        }}
                        source={require('../../assets/icons/invite.png')}
                    ></Image>

                    <Text style={{ color: Colors.gold, fontSize: 13, fontWeight: 'bold', letterSpacing: 1 }}>Invite</Text>

                </View>
            </MenuTrigger>





            <MenuOptions >
                <View style={{ backgroundColor: '#1e1e1e', overflow: 'hidden' }} >


                    <View style={{
                        backgroundColor: '#000', width: '100%', justifyContent: 'center',
                        alignItems: 'center', height: 55, padding: 3
                    }}>

                        <Text style={{
                            color: 'white', fontSize: 17, letterSpacing: 2, fontWeight: '300', fontStyle: 'italic'
                        }}>Invite...</Text>
                    </View>



                    <View style={{
                        flexDirection: 'row', width: '100%'
                    }}>

                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center', width: '100%', borderColor: 'black', borderWidth: 1
                        }}>




                            <View style={{
                                height: 50, marginVertical: 15, width: '80%', flexDirection: 'row',
                                alignItems: 'center', justifyContent: 'center', backgroundColor: '#000',
                            }} >



                                {myEvents.length === 0 ? (

                                    <Picker
                                        selectedValue={selectedValue}
                                        style={{ height: 50, width: '80%', backgroundColor: '#000', color: 'grey' }}
                                        mode='dropdown'
                                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                    >

                                        <Picker.Item label='No Event' value='1' />


                                    </Picker>


                                ) : (

                                    <Picker
                                        selectedValue={selectedValue}
                                        style={{ height: 50, width: '80%', backgroundColor: '#000', color: 'grey' }}
                                        mode='dropdown'
                                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                    >
                                        {myEvents.map((item, index) =>
                                            <Picker.Item key={index} label={item.title} value={item._id} />
                                        )}

                                    </Picker>

                                )}



                                <Image
                                    style={{
                                        height: 30,
                                        width: 30,
                                        margin: 5, tintColor: 'white'
                                    }}
                                    source={require('../../assets/icons/down.png')}
                                ></Image>

                            </View>

                        </View>
                    </View>



                    {/** invite button for those who hav events only */}


                    {myEvents.length != 0 &&
                        <MenuOption
                            onSelect={() => inviteFriend(selectedValue)}

                            style={{
                                borderColor: 'black', borderWidth: 0.5,
                            }}>
                            <View style={styles.viewButton}>
                                <Text style={{
                                    color: 'white', fontSize: 15, letterSpacing: 2, fontWeight: '300', padding: 10
                                }}>INVITE</Text>

                            </View>
                        </MenuOption>


                    }




                    <MenuOption style={{
                        backgroundColor: '#111111',
                    }}>
                        <View style={styles.viewButton}>
                            <Text style={{
                                color: 'white', fontSize: 15, letterSpacing: 2, fontWeight: '300', padding: 10
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
        fontSize: 11, padding: 5,
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

export default InviteUserMenu;