import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import { TransText, TranslationConsumer } from 'react-native-translation';




const accountSettings = {
    "en-US": "Account Settings",
    "fr-FR": "Paramètres du compte",
}


const sec = {
    "en-US": "Security",
    "fr-FR": "Sécurité ",
}



const privacy = {
    "en-US": "Privacy",
    "fr-FR": "Confidentialité ",
}



const stories = {
    "en-US": "Stories",
    "fr-FR": "Stories",
}

const generalParameters = {
    "en-US": "General Settings",
    "fr-FR": "Paramètres Générales",
}



/////////

const personalInformation = {
    "en-US": "Personal Information",
    "fr-FR": "Informations Personnelles ",
}


const translationForPosts = {
    "en-US": "Translation for Posts",
    "fr-FR": "Traduction des publication",
}
const payment = {
    "en-US": "Payment",
    "fr-FR": "Paiement",
}

const security = {
    "en-US": "Security and Login",
    "fr-FR": "Sécurité et Connexion",
}
const manageProfile = {
    "en-US": "Manage your profile",
    "fr-FR": "Gérez votre profil",
}

const publicPosts = {
    "en-US": "Public Posts",
    "fr-FR": "Publications public",
}

const blocking = {
    "en-US": "Blocking",
    "fr-FR": "Blocage",
}

const location = {
    "en-US": "Location",
    "fr-FR": "Localisation",
}

const status = {
    "en-US": "Active Status",
    "fr-FR": "Statut En ligne",
}


const storyArchive = {
    "en-US": "Story archive",
    "fr-FR": "Archive stories",
}

const mode = {
    "en-US": "Dark Mode",
    "fr-FR": "Mode sombre",
}
const langue = {
    "en-US": "Language",
    "fr-FR": "Langue",
}




const Generale = (props) => {
    const navigation = useNavigation();

    const [languee, setLanguage] = useState('English');


    return (

        <View style={styles.bg}>

            <ScrollView>


                {/** account settings */}
                <View>

                    <View style={{ marginVertical: 5, marginHorizontal: 10 }}>


                        <TransText style={{ fontSize: 20, color: 'white', fontWeight: 'bold', }} dictionary={accountSettings} />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Update Profil')}

                        style={styles.item}
                    >
                        <Image style={{ width: 30, height: 30, justifyContent: 'center', marginHorizontal: 15, tintColor: Colors.gold }}
                            source={require('../../assets/settingsIcons/user.png')}
                        ></Image>
                        <TransText style={styles.itemText} dictionary={personalInformation} />
                        <MaterialIcons
                            name="keyboard-arrow-right"

                            style={{ position: 'absolute', right: 10 }}
                            color={Colors.bege}


                            size={30} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.item}
                    >
                        <Image style={{ width: 30, height: 30, justifyContent: 'center', marginHorizontal: 15, tintColor: Colors.gold }}
                            source={require('../../assets/settingsIcons/card.png')}
                        ></Image>
                        <TransText style={styles.itemText} dictionary={payment} />
                        <MaterialIcons
                            name="keyboard-arrow-right"

                            style={{ position: 'absolute', right: 10 }}
                            color={Colors.bege}


                            size={30} />
                    </TouchableOpacity>


                </View>




                {/**security */}

                <View style={{ marginVertical: 10 }}>

                    <View style={{ marginVertical: 5, marginHorizontal: 10 }}>


                        <TransText style={{ fontSize: 20, color: 'white', fontWeight: 'bold', }} dictionary={sec} />
                    </View>
                    <TouchableOpacity

                        onPress={() => navigation.navigate('Security')}

                        style={styles.item}
                    >
                        <Image style={{ width: 30, height: 30, justifyContent: 'center', marginHorizontal: 15, tintColor: Colors.gold }}
                            source={require('../../assets/settingsIcons/privacy.png')}
                        ></Image>
                        <TransText style={styles.itemText} dictionary={security} />
                        <MaterialIcons
                            name="keyboard-arrow-right"

                            style={{ position: 'absolute', right: 10 }}
                            color={Colors.bege}


                            size={30} />
                    </TouchableOpacity>


                </View>





                {/** privacy */}

                <View style={{ marginVertical: 10 }}>

                    <View style={{ marginVertical: 5, marginHorizontal: 10 }}>


                        <TransText style={{ fontSize: 20, color: 'white', fontWeight: 'bold', }} dictionary={privacy} />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Desactivation')}
                        style={styles.item}
                    >
                        <Image style={{ width: 30, height: 30, justifyContent: 'center', marginHorizontal: 15, tintColor: Colors.gold }}
                            source={require('../../assets/settingsIcons/key.png')}
                        ></Image>
                        <TransText style={styles.itemText} dictionary={manageProfile} />
                        <MaterialIcons
                            name="keyboard-arrow-right"

                            style={{ position: 'absolute', right: 10 }}
                            color={Colors.bege}


                            size={30} />
                    </TouchableOpacity>

                    <TouchableOpacity

                        onPress={() => navigation.navigate('Blocked Users')}



                        style={styles.item}
                    >
                        <Image style={{ width: 30, height: 30, justifyContent: 'center', marginHorizontal: 15, tintColor: Colors.gold }}
                            source={require('../../assets/settingsIcons/block.png')}
                        ></Image>
                        <TransText style={styles.itemText} dictionary={blocking} />
                        <MaterialIcons
                            name="keyboard-arrow-right"

                            style={{ position: 'absolute', right: 10 }}
                            color={Colors.bege}


                            size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('My Location')}

                        style={styles.item}
                    >
                        <Image style={{ width: 30, height: 30, justifyContent: 'center', marginHorizontal: 15, tintColor: Colors.gold }}
                            source={require('../../assets/settingsIcons/placeholder.png')}
                        ></Image>
                        <TransText style={styles.itemText} dictionary={location} />
                        <MaterialIcons
                            name="keyboard-arrow-right"

                            style={{ position: 'absolute', right: 10 }}
                            color={Colors.bege}


                            size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Status')}

                        style={styles.item}
                    >
                        <Image style={{ width: 30, height: 30, justifyContent: 'center', marginHorizontal: 15, tintColor: Colors.gold }}
                            source={require('../../assets/settingsIcons/chat.png')}
                        ></Image>
                        <TransText style={styles.itemText} dictionary={status} />
                        <MaterialIcons
                            name="keyboard-arrow-right"

                            style={{ position: 'absolute', right: 10 }}
                            color={Colors.bege}


                            size={30} />
                    </TouchableOpacity>


                </View>




                {/**stories */}

                <View style={{ marginVertical: 10 }}>

                    <View style={{ marginVertical: 5, marginHorizontal: 10 }}>


                        <TransText style={{ fontSize: 20, color: 'white', fontWeight: 'bold', }} dictionary={stories} />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Archive')}

                        style={styles.item}
                    >
                        <Image style={{ width: 30, height: 30, justifyContent: 'center', marginHorizontal: 15, tintColor: Colors.gold }}
                            source={require('../../assets/settingsIcons/archiver.png')}
                        ></Image>
                        <TransText style={styles.itemText} dictionary={storyArchive} />
                        <MaterialIcons
                            name="keyboard-arrow-right"

                            style={{ position: 'absolute', right: 10 }}
                            color={Colors.bege}


                            size={30} />
                    </TouchableOpacity>


                </View>

                {/**general */}

                <View style={{ marginVertical: 10 }}>

                    <View style={{ marginVertical: 5, marginHorizontal: 10 }}>


                        <TransText style={{ fontSize: 20, color: 'white', fontWeight: 'bold', }} dictionary={generalParameters} />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('DarkMode')}

                        style={styles.item}
                    >
                        <Image style={{ width: 30, height: 30, justifyContent: 'center', marginHorizontal: 15, tintColor: Colors.gold }}
                            source={require('../../assets/settingsIcons/moon.png')}
                        ></Image>
                        <TransText style={styles.itemText} dictionary={mode} />
                        <MaterialIcons
                            name="keyboard-arrow-right"

                            style={{ position: 'absolute', right: 10 }}
                            color={Colors.bege}


                            size={30} />
                    </TouchableOpacity>



                    <TranslationConsumer>
                        {({ language, updateLanguage }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (language === "fr-FR") {
                                            updateLanguage("en-US");
                                            setLanguage('English')
                                        }
                                        else {
                                            updateLanguage("fr-FR");
                                            setLanguage('Francais')
                                        }

                                    }}
                                    style={styles.item}
                                >
                                    <Image style={{ width: 30, height: 30, justifyContent: 'center', marginHorizontal: 15, tintColor: Colors.gold }}
                                        source={require('../../assets/settingsIcons/global.png')}
                                    ></Image>
                                    <TransText style={styles.itemText} dictionary={langue} />
                                    <Text style={{
                                        fontSize: 16, fontWeight: '800', position: 'absolute', right: 45,
                                        color: 'grey',
                                    }}>{languee}</Text>
                                    <MaterialIcons
                                        name="keyboard-arrow-right"

                                        style={{ position: 'absolute', right: 10 }}
                                        color={Colors.bege}


                                        size={30} />

                                </TouchableOpacity>

                            )

                        }}

                    </TranslationConsumer>







                </View>






            </ScrollView>
        </View>

    );
};





export default Generale;
export const screenOptions = {
    headerTitle: 'Settings',
    headerTitleAlign: 'center',
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: 'black',



    },

}

const styles = StyleSheet.create({
    container: {

        marginHorizontal: 5

    },
    bg: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 5,

    },
    item: {
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 5,
        flexDirection: 'row',
        borderRadius: 5,
        margin: 5,
        height: 65, // approximate a square
    },



    itemText: {
        fontSize: 16, fontWeight: '800',
        color: '#fff',
    },
});
