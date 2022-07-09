import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, ActivityIndicator, Image, Picker, TextInput, StyleSheet, TouchableOpacity, Platform, ScrollView, KeyboardAvoidingView, Alert, TouchableNativeFeedbackBase } from 'react-native';
import Colors from '../../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';



import { useNavigation } from '@react-navigation/native';


import ImgPicker from '../../components/app/EventPicker';
import { showMessage } from "react-native-flash-message";
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import * as eventActions from '../../store/actions/event';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { RadioButton } from 'react-native-paper';






const AddEvent = (props) => {







    const { completDate } = props.route.params;
    const categories = useSelector(state => state.events.allCategories);

    const navigation = useNavigation();
    const [date0, setDate0] = useState(new Date(1598051730000));
    const [date1, setDate1] = useState(new Date(1598051730000));

    const [showClock1, setShowClock1] = useState(false);
    const [showClock2, setShowClock2] = useState(false);


    const [title, setTitle] = useState('');


    const [date, setDate] = useState(completDate);
    const [starttime, setStartTime] = useState('Start Time');
    const [endtime, setEndTime] = useState('End Time');


    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');

    const [category, setCategory] = useState(categories[0].cName);
    const [base64Data, setBase64Data] = useState('');
    const [imageType, setImageType] = useState('');
    const [clearPickedImage, setClearPickedImage] = useState(false);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();







    ////////////////////////////////////////////////////////////////////////////////////////////



    const onChange1 = (event, selectedDate) => {
        const currentDate = selectedDate || date0;
        setShowClock1(Platform.OS === 'ios');
        setDate0(currentDate);
        setStartTime(moment(date0).format("hh:mm A"))

    };

    const onChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || date1;
        setShowClock2(Platform.OS === 'ios');
        setDate1(currentDate);
        setEndTime(moment(date1).format("hh:mm A"))


    };



    const showMode1 = () => {
        setShowClock1(true);

    };

    const showMode2 = () => {
        setShowClock2(true);

    };






    const clearForm = () => {
        setClearPickedImage(true);
        setTitle('');
        setPlace('');
        setDescription('');
        setEndTime('End Time');
        setStartTime('Start Time');
        setBase64Data('');
        setImageType('');
        setCategory(categories[0].cName)
        setIsLoading(false);
    }





    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', clearForm);

        return () => {
            unsubscribe();
        };
    }, [clearForm])


    //image picker functions elezmin
    const imagePickedHandler = (base64, imageType) => {
        setBase64Data(base64);
        setImageType(imageType);
    }

    // event validation 
    const validateEvent = () => {
        let strLength = base64Data.length;
        let sizeInBytes = 4 * Math.ceil((strLength / 3)) * 0.5624896334383812;
        let sizeInKb = sizeInBytes / 1000;
        console.log(sizeInKb);
        if (sizeInKb > 150) {
            showMessage({
                message: "Image size should be less than 150KB.",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }


        if (!title || title.length === 0) {

            showMessage({
                message: "Please enter a title for the event.",
                type: "warning",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }


        if (starttime === 'Start Time') {
            showMessage({
                message: "Please enter a start time.",
                type: "warning",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        if (!place || place.length === 0) {
            showMessage({
                message: "Please enter a location.",
                type: "warning",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        if (!description || description.length === 0) {
            showMessage({
                message: "Please enter a description.",
                type: "warning",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        if (base64Data.length === 0) {
            showMessage({
                message: "Please select an image to post.",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        return true;
    }

    //-------------------------------------



    const createEvent = async () => {
        setIsLoading(true);
        if (validateEvent()) {
            console.log("VALID Event")
            try {
                await dispatch(eventActions.createEvent(title, place, description, date, starttime, endtime, category, base64Data, imageType));

                navigation.navigate('AllEvents')

                showMessage({
                    message: "Your Event was successfully created.",
                    type: "success",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' }
                });

            } catch (error) {
                showMessage({
                    message: error.message,
                    type: "danger",
                    duration: 3000,
                    icon: { icon: "danger", position: 'left' }
                });
                console.log("ERROR ", error.message);
            }
        }
        setIsLoading(false);
    }




    return (


        <View style={{
            flex: 1,
            backgroundColor: '#000'
        }}>

            <ScrollView  >

                <View style={styles.container}>


                    <View style={{ marginVertical: 15, width: '100%', alignItems: "center" }}>



                        <TextInput
                            style={{
                                height: 60, width: '90%', fontSize: 20, color: 'rgba(255, 255, 255, 0.6)', padding: 10,
                                justifyContent: "flex-start", backgroundColor: '#111',
                            }}
                            value={date}
                            underlineColorAndroid='transparent'
                            placeholder={date + ''}
                            editable={false}
                            placeholderTextColor='rgba(255, 255, 255, 0.6)'

                        />

                    </View>
                    <View style={{ marginBottom: 15, width: '100%', alignItems: "center" }}>



                        <TextInput
                            style={{
                                height: 60, width: '90%', fontSize: 20, color: 'white', padding: 10,
                                justifyContent: "flex-start", backgroundColor: '#111',
                            }}
                            value={title}
                            onChangeText={text => setTitle(text)}
                            underlineColorAndroid='transparent'
                            placeholder="Event Title "
                            placeholderTextColor='rgba(255, 255, 255, 0.6)'

                        />

                    </View>

                    <View style={{ marginBottom: 15, width: '100%', alignItems: "center" }}>


                        <View style={{
                            height: 60, width: '90%',
                            justifyContent: "flex-start", alignItems: 'center', backgroundColor: '#111', flexDirection: 'row'
                        }} >



                            {categories.length === 0 ? (

                                <View

                                    style={{ height: 50, width: '80%', backgroundColor: '#000', color: 'grey' }}

                                >

                                    <Text style={{ color: 'grey' }}>No Category Found</Text>


                                </View>


                            ) : (

                                <Picker
                                    selectedValue={category}
                                    style={{ height: 60, width: '80%', backgroundColor: '#111', color: 'rgba(255, 255, 255, 0.6)', fontSize: 20, marginLeft: 5 }}
                                    mode='dropdown'
                                    onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                                >
                                    {categories.map((item, index) =>
                                        <Picker.Item key={index} label={item.cName} value={item.cName} />
                                    )}

                                </Picker>

                            )}




                            <Image
                                style={{
                                    position: 'absolute', right: 20,
                                    height: 30,
                                    width: 30,
                                    margin: 5, tintColor: Colors.gold
                                }}
                                source={require('../../assets/icons/down.png')}
                            ></Image>

                        </View>

                    </View>

                    <View style={{ marginBottom: 15, width: '100%', alignItems: "center", flexDirection: 'row', justifyContent: 'center' }}>

                        <TouchableOpacity
                            onPress={showMode1}
                            style={{
                                height: 60, width: '44%', margin: '1%',
                                justifyContent: "center", backgroundColor: '#111', alignItems: 'flex-start', paddingLeft: 12,

                            }}>
                            <Text style={{
                                fontSize: 20, color: 'rgba(255, 255, 255, 0.6)',
                                justifyContent: "flex-start"
                            }}>
                                {starttime}
                            </Text>
                        </TouchableOpacity>
                        {showClock1 && (
                            <DateTimePicker

                                testID="dateTimePicker"
                                value={date0}
                                mode="time"
                                is24Hour={true}
                                display="clock"
                                onChange={onChange1}
                            />
                        )}


                        <TouchableOpacity
                            onPress={showMode2}
                            style={{
                                height: 60, width: '44%', margin: '1%',
                                justifyContent: "center", backgroundColor: '#111', alignItems: 'flex-start', paddingLeft: 12,

                            }}>
                            <Text style={{
                                fontSize: 20, color: 'rgba(255, 255, 255, 0.6)'
                                ,
                                justifyContent: "flex-start"
                            }}>
                                {endtime}
                            </Text>
                        </TouchableOpacity>
                        {showClock2 && (
                            <DateTimePicker

                                testID="dateTimePicker"
                                value={date1}
                                mode="time"
                                is24Hour={true}
                                display="clock"
                                onChange={onChange2}
                            />
                        )}
                    </View>


                    <View style={{ marginBottom: 15, width: '100%', alignItems: "center" }}>



                        <TextInput
                            style={{
                                height: 60, width: '90%', fontSize: 20, color: 'white', padding: 10,
                                justifyContent: "flex-start", backgroundColor: '#111',
                            }}
                            value={place}

                            onChangeText={text => setPlace(text)}
                            underlineColorAndroid='transparent'
                            placeholder="Location"
                            placeholderTextColor='rgba(255, 255, 255, 0.6)'


                        />

                    </View>





                    <View style={{ marginBottom: 15, width: '100%', alignItems: "center" }}>



                        <TextInput
                            style={{
                                height: 150, width: '90%', fontSize: 20, color: 'white', padding: 10, paddingBottom: 90,
                                justifyContent: "flex-start", backgroundColor: '#111',
                            }}
                            value={description}
                            onChangeText={text => setDescription(text)}
                            underlineColorAndroid="transparent"
                            placeholder="Description..."
                            placeholderTextColor='rgba(255, 255, 255, 0.6)'
                            numberOfLines={3}
                            multiline={true}


                        />

                    </View>


































                    <ImgPicker

                        onImageTaken={imagePickedHandler}
                        clearPickedImage={clearPickedImage}
                    />





                </View>




            </ScrollView >


            <TouchableOpacity disabled={isLoading}
                style={{
                    alignItems: 'center', position: 'absolute', bottom: 5,
                    height: 60, backgroundColor: 'black',
                    borderColor: 'rgba(212, 165, 61, 0.7)', borderWidth: 1,
                    width: '90%',
                    alignSelf: 'center'
                    , justifyContent: 'center',
                }}

                onPress={createEvent}
            //  navigation.goBack()


            >


                {
                    isLoading ? (
                        <ActivityIndicator size="small" color={Colors.gold} />
                    ) : (
                        <Text style={{
                            textAlign: 'center',

                            fontSize: 22, letterSpacing: 5,
                            color: Colors.gold
                        }} >
                            CREATE
                        </Text >
                    )}



            </TouchableOpacity>

        </View>

    );
};


export default AddEvent;


const styles = StyleSheet.create({

    container: {
        flex: 1,

        paddingBottom: 100,
        justifyContent: 'center',
        alignItems: 'center',


    },


    labelContainer: {
        alignSelf: 'flex-start',
        marginLeft: 16
    },
    labelText: {
        fontSize: 35,
        fontWeight: 'bold',

        color: 'white'
    },
    inputContainer: {
        borderColor: Colors.gold,
        backgroundColor: Colors.grey,
        borderBottomWidth: 1,

        width: 300,
        height: 50,
        marginBottom: 10,
        flexDirection: 'row',


    },
    inputs: {

        color: 'white',
        fontSize: 20,
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 200,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: Colors.gold,

    },
    text_back: {
        textAlign: 'center',

        fontSize: 25,
        color: Colors.gold_brown,
    },

})

