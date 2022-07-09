import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Picker, Dimensions, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as usersActions from '../../store/actions/users';
import ImgPicker from '../../components/app/ImgPicker';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'
import moment from "moment";
import Tags from "react-native-tags";

import ENV from '../../env';
import { showMessage } from "react-native-flash-message";

const UpdateProfil = (props) => {

    const loggedUser = useSelector(state => state.auth.user);
    const users = useSelector(state => state.users.allUsers);
    const userDetails = users.filter(u => u._id === loggedUser._id)[0];

    const [username, setUsername] = useState(userDetails.username);

    const [email, setEmail] = useState(userDetails.email);
    const [about, setAbout] = useState(userDetails.about);



    // new attributs
    const [FirstName, setFirstname] = useState(userDetails.FirstName);
    const [LastName, setLastname] = useState(userDetails.LastName);
    const [phoneNumber, setPhoneNumber] = useState(userDetails.phoneNumber);
    const [BirthDate, setDateOfBirth] = useState(userDetails.BirthDate || new Date(1598051730000));
    const [interests, setInterests] = useState(interests);
    // const [adresse, setAdresse] = useState('');
    const [relationship, setRelationship] = useState(userDetails.relationship);



    // gender
    const genderItems = [
        { Gender: 'male', text: 'MALE', icon: require('../../assets/genderIcons/male.png') },
        { Gender: 'female', text: 'FEMALE', icon: require('../../assets/genderIcons/female.png') },

    ];
    const [Gender, setGender] = useState(userDetails.Gender);
    const setGenderButton = status => {
        setGender(status);

    };




    const [showCalendar, setCalendar] = useState(false);


    const [editImage, setEditImage] = useState({
        uri: `${ENV.apiUrl}/user/photo/${userDetails._id}`
    });
    const [previousUpdate, setPreviousUpdate] = useState(userDetails.updated);
    const [base64Data, setBase64Data] = useState('');
    const [imageType, setImageType] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const clearForm = () => {
        setUsername('');
        setEmail('');
        setAbout('');

        setIsLoading(false);
    }

    const validatePost = () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordRegex = /\d/

        let strLength = base64Data.length;
        let sizeInBytes = 4 * Math.ceil((strLength / 3)) * 0.5624896334383812;
        let sizeInKb = sizeInBytes / 1000;
        console.log(sizeInKb);
        if (sizeInKb > 800) {
            showMessage({
                message: "Image size should be less than 150KB.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        if (!FirstName || (FirstName && FirstName.length < 2)) {
            showMessage({
                message: "Please enter a valid firstname.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        if (!LastName || (LastName && LastName.length < 2)) {
            showMessage({
                message: "Please enter a valid lastname.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        if (!username) {
            showMessage({
                message: "Please enter a valid username.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        if (username && username.length < 2) {
            showMessage({
                message: "Please enter a valid username.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        if (!about || about.length === 0) {
            showMessage({
                message: "Please enter something in About field.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        if (!emailRegex.test(email.toLowerCase())) {
            showMessage({
                message: "Please enter a valid email.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }


        return true;
    }

    const updateProfil = async () => {
        setIsLoading(true);
        if (validatePost()) {
            try {
                await dispatch(usersActions.updateProfile(FirstName, LastName, username, email, about, phoneNumber, BirthDate, Gender, relationship, interests, base64Data, imageType));

                clearForm();
                props.navigation.goBack();

                showMessage({
                    message: "Your profile was successfully edited.",
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
        setIsLoading(false);
    }

    const imagePickedHandler = (base64, imageType) => {
        setBase64Data(base64);
        setImageType(imageType);
    }

    // calendar
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date0;
        setCalendar(Platform.OS === 'ios');
        setDateOfBirth(currentDate);


    };
    const showMode = () => {
        setCalendar(true);

    };
    return (

        <KeyboardAvoidingView style={{
            flex: 1,
            backgroundColor: '#000', justifyContent: 'flex-end'
        }}>
            <ScrollView>
                <View style={styles.screen} >

                    {/** 
 *   <ImgPicker
                        onImageTaken={imagePickedHandler}
                        editImage={editImage}
                        previousUpdate={previousUpdate}
                    />
*/}






                    <View style={{ marginBottom: 10, width: '100%', padding: 10, alignItems: "center", flexDirection: 'row' }}>

                        <View style={{ flexDirection: 'column', width: '50%', alignItems: "flex-start" }}>


                            <Text style={{ color: Colors.gold, marginVertical: 5, letterSpacing: 0.5, marginLeft: 10, fontSize: 17 }}>Firsname</Text>
                            <View style={{ width: '100%', alignItems: "center" }}>
                                <TextInput
                                    style={{
                                        height: 60, width: '90%', fontSize: 20, color: 'white', padding: 10,
                                        justifyContent: "flex-start", backgroundColor: '#000', borderWidth: 0.3, borderColor: 'grey'
                                    }}
                                    placeholder="First name"
                                    placeholderTextColor='grey'
                                    underlineColorAndroid='transparent'
                                    value={FirstName}
                                    onChangeText={(text) => setFirstname(text)}

                                />
                            </View>
                        </View>


                        <View style={{ flexDirection: 'column', width: '50%', alignItems: "flex-start", }}>


                            <Text style={{ color: Colors.gold, marginVertical: 5, marginLeft: 10, letterSpacing: 0.5, fontSize: 17 }}>Lastname</Text>
                            <View style={{ width: '100%', alignItems: "center" }}>
                                <TextInput
                                    style={{
                                        height: 60, width: '90%', fontSize: 20, color: 'white', padding: 10,
                                        justifyContent: "flex-start", backgroundColor: '#000', borderWidth: 0.3, borderColor: 'grey'
                                    }}
                                    placeholder="Last name"
                                    placeholderTextColor='grey'
                                    underlineColorAndroid='transparent'
                                    value={LastName}
                                    onChangeText={(text) => setLastname(text)}

                                />
                            </View>
                        </View>


                    </View>








                    <View style={{ marginBottom: 15, width: '100%', alignItems: "center", flexDirection: 'column' }}>
                        <Text style={{ color: Colors.gold, alignSelf: 'flex-start', marginLeft: 20, marginVertical: 5, letterSpacing: 0.5, fontSize: 17 }}>Username</Text>

                        <TextInput
                            style={{
                                height: 60, width: '90%', fontSize: 20, color: 'white', padding: 10,
                                justifyContent: "flex-start", backgroundColor: '#000', borderWidth: 0.3, borderColor: 'grey'
                            }}
                            placeholder="Username"
                            placeholderTextColor='grey'
                            underlineColorAndroid='transparent'
                            value={username}
                            onChangeText={(text) => setUsername(text)}

                        />
                    </View>




                    {/** bio */}
                    <View style={{ marginBottom: 15, width: '100%', alignItems: "center", flexDirection: 'column' }}>
                        <Text style={{ color: Colors.gold, alignSelf: 'flex-start', marginLeft: 20, marginVertical: 5, letterSpacing: 0.5, fontSize: 17 }}>About me</Text>

                        <TextInput
                            style={{
                                height: 60, width: '90%', fontSize: 20, color: 'white', padding: 10,
                                justifyContent: "flex-start", backgroundColor: '#000', borderWidth: 0.3, borderColor: 'grey'
                            }}
                            placeholder="About"
                            placeholderTextColor='grey'
                            underlineColorAndroid='transparent'
                            value={about}
                            onChangeText={(text) => setAbout(text)}

                        />
                    </View>


                    {/** emaiil */}
                    <View style={{ marginBottom: 15, width: '100%', alignItems: "center", flexDirection: 'column' }}>
                        <Text style={{ color: Colors.gold, alignSelf: 'flex-start', marginLeft: 20, marginVertical: 5, letterSpacing: 0.5, fontSize: 17 }}>Email</Text>


                        <TextInput
                            style={{
                                height: 60, width: '90%', fontSize: 20, color: 'white', padding: 10,
                                justifyContent: "flex-start", backgroundColor: '#000', borderWidth: 0.3, borderColor: 'grey'
                            }}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            underlineColorAndroid='transparent'
                            placeholder="Email"
                            placeholderTextColor="grey"
                            keyboardType={'email-address'}

                        />

                    </View>



                    {/** phone number */}
                    <View style={{ marginBottom: 15, width: '100%', alignItems: "center", flexDirection: 'column' }}>
                        <Text style={{ color: Colors.gold, alignSelf: 'flex-start', marginLeft: 20, marginVertical: 5, letterSpacing: 0.5, fontSize: 17 }}>Phone number</Text>


                        <TextInput
                            style={{
                                height: 60, width: '90%', fontSize: 20, color: 'white', padding: 10,
                                justifyContent: "flex-start", backgroundColor: '#000', borderWidth: 0.3, borderColor: 'grey'
                            }}
                            value={phoneNumber}
                            onChangeText={(text) => setPhoneNumber(text)}
                            underlineColorAndroid='transparent'
                            placeholder="Phone number"
                            placeholderTextColor="grey"
                            keyboardType={'phone-pad'}

                        />

                    </View>


                    {/** birthdate */}
                    <View style={{ marginBottom: 15, width: '100%', alignItems: "center", flexDirection: 'column' }}>
                        <Text style={{ color: Colors.gold, alignSelf: 'flex-start', marginLeft: 20, marginVertical: 5, letterSpacing: 0.5, fontSize: 17 }}>Date of Birth</Text>


                        <View
                            style={{
                                height: 60, width: '90%', fontSize: 20, padding: 10, alignItems: 'center',
                                backgroundColor: '#000', borderWidth: 0.3, borderColor: 'grey', flexDirection: 'row'
                            }}


                        >
                            <Text
                                style={{
                                    fontSize: 20, color: 'white',
                                    justifyContent: "flex-start"
                                }}>
                                {moment(BirthDate).format('YYYY-MM-DD')}
                            </Text>


                        </View>


                    </View>

                    {/** gender  */}

                    <Text style={{ color: Colors.gold, alignSelf: 'flex-start', marginLeft: 20, marginVertical: 5, letterSpacing: 0.5, fontSize: 17 }}>Gender</Text>

                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >


                        {
                            genderItems.map((e, index) => (

                                <LinearGradient key={index}
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                    colors={[Colors.myGold, Colors.gold,]}
                                    style={{
                                        margin: 10,

                                        justifyContent: 'center',
                                        width: Dimensions.get('window').width / 4.8,
                                        alignItems: 'center',
                                        height: 75
                                    }}>

                                    <TouchableOpacity
                                        onPress={() => {
                                            setGenderButton(e.Gender)

                                        }}
                                        style={[styles.btn_list, Gender === e.Gender && styles.btnActive]}>
                                        <Image style={Gender === e.gender ? styles.genderIcon : styles
                                            .activeGenderIcon}
                                            source={e.icon}
                                        ></Image>
                                        <Text style={{ color: 'white', fontSize: 13, letterSpacing: 1, fontWeight: '900' }} > {e.text}</Text>

                                    </TouchableOpacity>
                                </LinearGradient>

                            ))
                        }
                    </ScrollView>



                    {/** relationship */}
                    <Text style={{ color: Colors.gold, alignSelf: 'flex-start', marginLeft: 20, marginVertical: 5, letterSpacing: 0.5, fontSize: 17 }}>Relationship</Text>

                    <View style={{
                        marginBottom: 15, width: '90%'
                        , height: 60, alignItems: 'center',
                        borderWidth: 0.3, borderColor: 'grey', flexDirection: 'row'
                    }}>



                        <Picker
                            style={{ height: '100%', width: '100%', backgroundColor: '#000', color: 'white', fontSize: 20, }}
                            mode='dropdown'
                            selectedValue={relationship}
                            itemTextStyle={{ fontSize: 15 }}
                            activeItemTextStyle={{ fontSize: 18, fontWeight: 'bold' }}
                            onValueChange={(itemValue, itemIndex) => setRelationship(itemValue)}
                        >
                            <Picker.Item label="Single" value="single" />
                            <Picker.Item label="In a relationship" value="inarelationship" />
                            <Picker.Item label="Engaged" value="engaged" />
                            <Picker.Item label="Married" value="married" />
                            <Picker.Item label="It's complicated" value="conplicated" />
                            <Picker.Item label="Self Love" value="selfLove" />
                        </Picker>

                    </View>




                    {/**  interest */}
                    <View style={{ marginBottom: 15, width: '100%', alignItems: "center" }}>
                        <Text style={{ color: Colors.gold, alignSelf: 'flex-start', marginLeft: 20, marginVertical: 5, letterSpacing: 0.5, fontSize: 17 }}>Interests</Text>

                        <View style={{ width: '90%', alignItems: "center" }}>

                            <Tags
                                initialText=""
                                textInputProps={{
                                    placeholder: "Interests"
                                }}
                                initialTags={interests}
                                onChangeTags={tags => setInterests(tags)}
                                onTagPress={(index, tagLabel, event, deleted) =>
                                    console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                                }
                                containerStyle={{ justifyContent: "center", }}
                                inputStyle={{
                                    fontSize: 20, color: 'white', padding: 5,
                                    justifyContent: "flex-start", backgroundColor: '#000', borderWidth: 0.3, borderColor: 'grey'
                                }}
                                inputContainerStyle={{
                                    height: 60, width: '100%',
                                }}
                                renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                                    <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
                                        <Text style={{ color: 'black', fontSize: 20, backgroundColor: Colors.gold, margin: 5, padding: 5, }}>{tag}</Text>
                                    </TouchableOpacity>
                                )}
                            />


                        </View>
                    </View>









                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            alignSelf: 'center', justifyContent: 'center',
                            width: '100%',
                            alignItems: 'center',
                            height: 60, width: '88%', bottom: 5, borderWidth: 1, borderColor: 'rgba(212, 165, 61, 0.7)'

                        }}

                        onPress={updateProfil}



                    >

                        {isLoading ? (
                            <ActivityIndicator size="small" color={Colors.gold} />
                        ) : (
                            <Text style={{
                                color: Colors.gold, fontSize: 23, letterSpacing: 4, fontWeight: '900'
                            }}>
                                UPDATE PROFILE
                            </Text>
                        )}




                    </TouchableOpacity>






                </View>






            </ScrollView>

        </KeyboardAvoidingView>
    );
};

export const screenOptions = {
    headerTitle: 'Edit Profile'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'black'
    },


    errorMsgContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#D8000C',
        backgroundColor: "#FFBABA",
        color: "#D8000C",
        borderRadius: 25,
    },
    msgText: {
        fontSize: 15,
    },
    msgIcon: {
        width: 30,
        height: 30,
        // marginLeft: 15,
        justifyContent: 'center'
    },

    btn_list: {


        borderWidth: 0.5, borderColor: 'grey',
        flexDirection: 'column',
        justifyContent: 'center',
        width: Dimensions.get('window').width / 4.8,
        alignItems: 'center',
        backgroundColor: 'black',
        height: 75
    },
    btnActive: {
        backgroundColor: 'transparent',
    },
    genderIcon: {
        width: 20, height: 20, justifyContent: 'center',
        margin: 8, tintColor: 'white'
    },
    activeGenderIcon: {
        width: 20, height: 20, justifyContent: 'center',
        margin: 8, tintColor: 'white'
    },
    inputContainer: {
        //borderColor: 'grey',
        backgroundColor: '#000',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',

        width: '85%',
        height: 50,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },
    inputs: {

        marginLeft: 16,


        color: '#FFFFFF',
        fontSize: 20,


    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        width: '100%',
        bottom: 0,
        backgroundColor: Colors.gold,

    },

    loginText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
})

export default UpdateProfil;