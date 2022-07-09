import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Colors from '../../constants/Colors';
import moment from "moment";
import EventItem from '../../components/UI/EventItem';
import * as eventActions from '../../store/actions/event';
import {
    Octicons, EvilIcons
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useDispatch, useSelector } from 'react-redux';



const Agendaa = ({ navigation }) => {




    const [dateSelected, setDateSelected] = useState(moment());
    const [dayOfTheEvent, setDayOfTheEvent] = useState('');


    const events = useSelector(state => state.events.allEvents);
    const loggedInUserId = useSelector(state => state.auth.user._id);

    const myEvents = events.filter(e => e.postedBy._id === loggedInUserId);

    const [eventsPerDay, setEventsPerDay] = useState([]);

    const [marked, setMarked] = useState(null);


    {/** get events that i participate in :3 */ }




    /////////////////////////////////////////////
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const refEvents = useRef(null);


    const loggedUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    // loads all the eventss
    const loadEvents = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(eventActions.fetchEvents());

        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        setIsLoading(true);

        loadEvents()
            .then(() => {
                setIsLoading(false);
            });
    }, [dispatch, loadEvents])











    useEffect(() => {
        switch (moment(dateSelected).day()) {

            case 1:
                setDayOfTheEvent('Monday')
                break;

            case 2:
                setDayOfTheEvent('Tuesday')
                break;

            case 3:
                setDayOfTheEvent('Wednesday')
                break;

            case 4:
                setDayOfTheEvent('Thursday')
                break;

            case 5:
                setDayOfTheEvent('Friday')

                break;
            case 6:
                setDayOfTheEvent('Saturday')
                break;

            case 0:
                setDayOfTheEvent('Sunday')
                break;

            default:

        }
    }, [dateSelected])




    let datee = JSON.stringify(dateSelected);
    let month = datee.substring(6, 8);
    let annee = datee.substring(1, 5);
    let dayy = datee.substring(9, 11);

    switch (month) {

        case '01':
            month = 'Janvier'
            break;

        case '02':
            month = 'Fevrier'
            break;

        case '03':
            month = 'Mars'
            break;

        case '04':
            month = 'Avril'
            break;

        case '05':
            month = 'Mai'

            break;
        case '06':
            month = 'Juin'
            break;

        case '07':
            month = 'Juillet'
            break;

        case '08':
            month = 'Aout'
            break;

        case '09':
            month = 'Septembre'
            break;

        case '10':
            month = 'Octobre'
            break;

        case '11':
            month = 'Novembre'
            break;

        case '12':
            month = 'Decembre'
            break;


        default:


    }
    ////////////////////////////////////////////////


    return (

        <View style={{
            flex: 1,
            width: '100%',
            backgroundColor: '#000',
        }}>


            <ScrollView style={{
                flex: 1,
                width: '100%',

            }}>
                <View


                    style={{
                        flex: 1,
                        width: '100%',
                        backgroundColor: '#000',
                        justifyContent: 'center',
                        alignItems: 'center', paddingTop: 40


                    }} >

                    <View
                        style={{
                            flex: 1,
                            width: '100%',
                            height: 250,

                            justifyContent: 'center',
                            alignItems: 'center',


                        }} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>


                            <View style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }} >{month}</Text>


                                <Text style={{
                                    fontSize: 120, fontWeight: 'bold', color: Colors.gold, marginTop: -35,
                                }} >  {dayy}  </Text>
                                <Text style={{ fontSize: 33, fontWeight: '900', color: 'white', marginTop: -30 }} >{dayOfTheEvent}</Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }} > {annee} </Text>

                            </View>



                        </View>


                    </View>


                    <Calendar
                        style={{ marginTop: -90, }}




                        markedDates={{ [dateSelected]: { selected: true, selectedColor: Colors.gold, color: 'black' }, }}




                        onDayPress={(day) => {



                            setDateSelected(day.dateString);
                            //console.log(day.dateString);


                        }}



                        onMonthChange={(month) => { setDateSelected(month.dateString) }}
                        enableSwipeMonths={true}


                        theme={{
                            calendarBackground: 'transparent',
                            dayTextColor: 'white',
                            textDisabledColor: 'grey',
                            todayTextColor: Colors.gold,
                            monthTextColor: 'transparent',
                            weekTextColor: Colors.gold,
                            dotColor: Colors.gold,
                            textMonthFontWeight: 'bold',
                            textMonthFontSize: 37,
                            textDayFontSize: 15,
                            textDayontWeight: 'bold',
                            textDayHeaderFontWeight: 'bold',
                            arrowColor: Colors.gold,


                        }}
                    />

                    {/** <Text style={{ color: 'white' }} >{dateSelected}</Text> */}




                </View>




            </ScrollView>

            <TouchableOpacity style={{
                alignSelf: 'center', justifyContent: 'center',
                width: '100%',
                alignItems: 'center',
                height: 60, position: 'absolute', bottom: 20, width: '80%', borderWidth: 1, borderColor: 'rgba(212, 165, 61, 0.7)'
            }}
                onPress={() => navigation.navigate('AddEvent', { selectedDay: dayOfTheEvent, day: dayy, month: month, year: annee, completDate: dateSelected })}
            >


                <Text style={{ color: Colors.gold, fontSize: 23, letterSpacing: 5, fontWeight: '900' }} >ADD EVENT</Text>



            </TouchableOpacity>




        </View>
    );
};

export default Agendaa;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
    },
});