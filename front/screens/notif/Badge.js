import React, { useState, useCallback, useEffect, useRef } from 'react';
import {

    Text,
    View,

} from 'react-native';



import * as notifActions from '../../store/actions/notifs';

import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';



const BADGE = () => {

    const dispatch = useDispatch();

    const notifs = useSelector(state => state.notifs.allNotifs);

    const loggedInUser = useSelector(state => state.auth.user);

    const myNotif = notifs.filter(n => n.userRef === loggedInUser._id)[0];




    if (!notifs) {
        return (
            <View>

            </View>
        );
    }
    if (!myNotif) {
        return (
            <View>

            </View>
        );
    }

    if (myNotif.badge === 0) {
        return (
            <View>

            </View>
        );
    }

    return (
        <View
            style={{
                position: 'absolute',
                right: 10,
                top: 6,
                borderWidth: 1.3,
                borderColor: 'black',
                backgroundColor: Colors.gold,
                borderRadius: 10,
                width: '100%',
                height: '65%',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Text style={{ color: 'black', fontWeight: 'bold' }}>{myNotif.badge}</Text>
        </View>

    );
};





export default BADGE;

