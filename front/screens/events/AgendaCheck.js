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



const CheckingAgenda = ({ navigation }) => {


    // we will make an emty array nhoto feha les dates eli chikounou markee fel agenda
    // eli hooma my events date wel events eli participit fehom
    const [eventsDays, setEventsDays] = useState([]);

    const [alllllEvents, setALLLLEvents] = useState([]);


    const [dateSelected, setDateSelected] = useState(moment());
    const [dayOfTheEvent, setDayOfTheEvent] = useState('');

    // to get my events that i created 
    const events = useSelector(state => state.events.allEvents);
    const loggedInUserId = useSelector(state => state.auth.user._id);
    const myEvents = events.filter(e => e.postedBy._id === loggedInUserId);

    // to get events that i participated in
    const allUsers = useSelector(state => state.users.allUsers);
    const me = allUsers.filter(u => u._id === loggedInUserId)[0];

    const participateEvents = me.events;




    const [events_id, setEventsid] = useState([]);
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



    //////////////////////////////////////
    // function bech te5ou les date ml event b format "YYYY-MM-DD" w tajoutihom felista
    const addtoMyList = () => {
        //eventsDays.push(dateSelected)

        setEventsDays([])
        if (myEvents.length != 0) {
            myEvents.forEach(event => {
                eventsDays.push(moment(event.date).format("YYYY-MM-DD"));

                if (events_id.includes(event._id) === false) { events_id.push(event._id) }
            }
            );
        }

        //events.filter(e => e._id === eventId)[0]  traaja3li event bhis attributs lkol
        if (participateEvents.length != 0) { // kn 3andi des evenmnt participit fehom chnajouti les date mtehom felist
            participateEvents.forEach(eventId => {
                eventsDays.push(moment(events.filter(e => e._id === eventId)[0].date).format("YYYY-MM-DD"));
                if (events_id.includes(eventId) === false) { events_id.push(eventId) }
            }
            );
        }


    }




    const anotherFunc = () => {
        var obj = eventsDays.reduce((c, v) => Object.assign(c, { [v]: { marked: true, dotColor: Colors.gold, } }), {});
        setMarked(obj);
    }

    const sortEvents = (list) => {
        //  let sorted = [];
        return sorted = list.sort(function (a, b) {
            return new Date(a.created) - new Date(b.created);
        })



    }


    const addfunfun = (id) => {

        let check;
        const event = events.filter(e => e._id === id)[0]

        check = alllllEvents.includes(event);

        if (check === false) {
            setALLLLEvents(alllllEvents => [...alllllEvents, event]);

        }


    }

    const myFullEventList = () => {
        setALLLLEvents([])

        events_id.map((id, index) => {

            addfunfun(id)


        })




    }


    useEffect(() => {

        addtoMyList()
        myFullEventList()
        anotherFunc()

    }, [loadEvents])




    useEffect(() => {
        //eventsPerDay list of events id that will be checked
        let data;


        //data=  eventsPerDay.filter(eventId => .date === dateSelected );
        data = alllllEvents.filter(function (item) {
            //   return (item.date === dateSelected) && (item.postedBy._id === loggedUser._id);
            return (item.date === dateSelected);
        }).map(function ({ _id, title, place, date, starttime, created }) {
            return { _id, title, place, date, starttime, created };
        });





        // sortEvents(data) bech tnadhamhom el a9rab lel ab3ad
        setEventsPerDay(sortEvents(data));
    }, [dateSelected])



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
                        alignItems: 'center',


                    }} >



                    <View


                        style={{

                            width: '100%', height: 50,

                            justifyContent: 'center',
                            alignItems: 'center', marginBottom: 60


                        }} >


                        {/** <Text style={{ fontSize: 50, fontWeight: 'bold', color: 'white' }} >{month}</Text>*/}

                    </View>

                    <View


                        style={{

                            width: '90%',
                            backgroundColor: 'grey',
                            height: 1


                        }} >



                    </View>

                    <Calendar
                        style={{ marginTop: -110, }}



                        markedDates={marked}
                        /// markingType={'multi-dot'}
                        //markedDates={{ [dateSelected]: { selected: true, selectedColor: Colors.gold, color: 'black' }, }}




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
                            monthTextColor: 'white',

                            weekTextColor: Colors.gold,

                            dotColor: Colors.gold,
                            textMonthFontWeight: 'bold',

                            textMonthFontSize: 40,
                            textDayFontSize: 15,
                            textDayontWeight: 'bold',
                            textDayHeaderFontWeight: 'bold',
                            arrowColor: "white",

                            textSectionTitleColor: Colors.gold // weeks day color


                        }}
                    />

                    {/** <Text style={{ color: 'white' }} >{dateSelected}</Text> */}




                </View>

                <View style={{ backgroundColor: '#111', padding: 10, paddingLeft: 20, marginTop: 20, flexDirection: 'row' }}>
                    <View>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{dayOfTheEvent} {dayy}</Text>
                        <Text style={{ color: 'grey', fontSize: 15, fontWeight: '900' }}>{eventsPerDay.length} Meetings</Text>

                    </View>
                    <TouchableOpacity style={{ position: 'absolute', right: 20, top: 20 }}>
                        <Octicons
                            name='list-unordered'
                            size={25}


                            color="white"
                        />
                    </TouchableOpacity>

                </View>

                {eventsPerDay.length != 0 &&
                    eventsPerDay.map((item, index) =>
                        <View key={index} style={{ height: 60, width: '100%', justifyContent: 'center', alignItems: 'center' }} >

                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('Event', { event: events.filter(e => e._id === item._id)[0], userId: loggedInUserId })}

                                style={{ height: 60, flexDirection: 'row', width: '87%', borderBottomColor: '#111', borderWidth: 1, justifyContent: 'flex-start', alignItems: 'center' }} >

                                <View style={{ height: 10, width: 10, backgroundColor: Colors.gold, transform: [{ rotate: '45deg' }] }}>

                                </View>
                                <Text style={{ color: 'white', fontSize: 17, letterSpacing: 0.8, marginHorizontal: 10 }}>{item.title}</Text>
                                <Text style={{ color: 'grey', fontSize: 17, letterSpacing: 0.8, marginHorizontal: 10, position: 'absolute', right: 0 }}>{item.starttime}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }


            </ScrollView>


        </View>
    );
};

export default CheckingAgenda;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
    },
});