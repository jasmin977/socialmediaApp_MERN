import React, { useCallback, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    TouchableNativeFeedback, FlatList,
    Platform, ScrollView, SafeAreaView, ImageBackground,

} from "react-native";

import { Ionicons, FontAwesome, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Container, Content, Button } from 'native-base'
var { height, width } = Dimensions.get('window');






import Colors from '../../constants/Colors';

import * as usersActions from '../../store/actions/users';
import * as postsActions from '../../store/actions/posts';

import { useDispatch, useSelector } from "react-redux";
import ENV from '../../env';
import MenuItem from "../../components/UI/MenuItem";
import JUmelageMenu from "../../components/UI/JumelageMenu";
import InviteMenu from "../../components/UI/InviteJumMenu";
import GiveAccesMenuJum from "../../components/UI/GiveAccessMenuJumelage";


import { showMessage } from "react-native-flash-message";
import VerifiedUser from "../../constants/VerifiedUser";




const Jumelage = (props) => {

    const { route } = props;
    let userId;
    let myAlbum;
    let myEvents;

    userId = route.params.userId;
    myAlbum = route.params.myAlbum;
    myEvents = route.params.myEvents;




    const users = useSelector(state => state.users.allUsers);
    const jumlages = useSelector(state => state.jumlages.allJumlages);


    const currJumlage = jumlages.filter(j => j.userRef === userId)[0];





    const player1 = users.filter(u => u._id === userId)[0];
    const player2 = users.filter(u => u._id === currJumlage.player2)[0];

    //console.log(currJumlage.player2)
    // console.log(player2)



    const dispatch = useDispatch();

    const loadUsers = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await dispatch(usersActions.fetchUsers());

            await dispatch(usersActions.fetchMyFriend());

            await dispatch(usersActions.fetchJumelages());
        } catch (err) {
            console.log(err);
        }
        setIsRefreshing(false);
    }, [dispatch, loadUsers]);








    return (
        <ImageBackground style={styles.container}

            source={require('../../assets/galaxy.gif')}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Content

                >




                    <View style={{
                        width: '100%',
                        justifyContent: 'center',

                    }}>


                        <View style={{
                            width: '100%',
                            justifyContent: 'center', alignItems: 'center', flexDirection: 'row'

                        }}>

                            <>
                                <ImageBackground
                                    source={{ uri: `${ENV.apiUrl}/user/photo/${player1._id}?${new Date(player1.updated)}` }}

                                    style={{ flex: 1, width: '100%', height: 180, alignSelf: 'center', marginTop: -50, justifyContent: 'center', alignItems: 'center' }}>

                                    <View style={{ height: '101%', width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                                        <Image

                                            source={require('../../assets/icons/profil_cover.png')}

                                            style={{ height: '100%', width: '100%', resizeMode: 'cover', alignItems: 'center', justifyContent: 'center' }} />
                                    </View>

                                </ImageBackground>

                            </>

                            <ImageBackground
                                source={{ uri: `${ENV.apiUrl}/user/photo/${player2._id}?${new Date(player2.updated)}` }}

                                style={{ flex: 1, width: '100%', height: 180, alignSelf: 'center', marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>

                                <View style={{ height: '101%', width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                                    <Image

                                        source={require('../../assets/icons/profil_cover.png')}

                                        style={{ height: '100%', width: '100%', resizeMode: 'cover', alignItems: 'center', justifyContent: 'center' }} />
                                </View>

                            </ImageBackground>


                        </View>




                    </View>









                    <View style={styles.infoContainer}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 15, marginTop: 20 }} >
                            <Text style={{
                                fontSize: 30, color: 'white',
                                textShadowColor: Colors.gold, borderBottomWidth: 1,
                                borderBottomColor: Colors.gold,
                                textShadowOffset: { width: 3, height: 3 },
                                textShadowRadius: 10,
                            }}>
                                {player1.username} & {player2.username}

                            </Text>


                        </View>



                        <View style={{ marginTop: -20 }}>


                            <View>



                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={{ alignItems: 'center', margin: 30 }}>
                                        <JUmelageMenu player1={player1} player2={player2} />
                                    </TouchableOpacity>





                                    <TouchableOpacity

                                        style={{ alignItems: 'center', margin: 30 }}>
                                        <GiveAccesMenuJum player1={player1} player2={player2} myAlbum={myAlbum} />

                                    </TouchableOpacity>

                                    <TouchableOpacity

                                        style={{ alignItems: 'center', margin: 30 }}>
                                        <InviteMenu player1={player1} player2={player2} myEvents={myEvents} />
                                    </TouchableOpacity>


                                </View>
                            </View>


                        </View>


                    </View>












                </Content>

            </ScrollView >
            <LinearGradient
                colors={['transparent', 'rgba(248, 200, 92, 0.5)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                    width: '100%',
                    height: 250, position: 'absolute', bottom: 0,
                    justifyContent: 'center', alignItems: 'center'
                }}

            >


            </LinearGradient>
        </ImageBackground >

    );
}











const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    diamond: {
        width: 70,
        height: 70,
        borderRadius: 100 / 2,

    },



    container: {
        flex: 1,
        backgroundColor: '#000',

    },
    text: {
        paddingBottom: 20,
        color: Colors.gold,
        fontWeight: '900',
    },
    image: {

        height: '100%',
        width: '100%',


    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },


    pencil: {

        width: 25,
        height: 25,
        transform: [{ rotate: '-45deg' }],
        tintColor: 'white',

    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#efb734",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {

        alignItems: "center",

        flex: 1,

        width: '100%'
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 130,
        height: 130,

        overflow: "hidden",

    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: 200,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "white",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    icons: {
        height: 30,
        width: 30,
        margin: 5,


    },

    activatedicons: {
        height: 25,
        width: 25,
        margin: 5,
        tintColor: Colors.orange
    },
    diasbledEffect: {
        display: 'none'
    },
    centre: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    menuButtons: {
        fontSize: 10,
        color: 'grey',
        alignContent: 'center'

    },
});

export default Jumelage;

