import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const Header = (props) => {
    const { headerHeight } = props;


    return (
        <>
            <View
                style={[
                    styles.subHeader,
                    {
                        height: headerHeight / 2,
                    },
                ]}>

                <Text style={styles.conversation}>HOME</Text>

            </View>

        </>
    );
};

export const HeaderEvents = (props) => {
    const { headerHeight } = props;
    const navigation = useNavigation();
    return (
        <>
            <View
                style={[
                    styles.subHeader,
                    {
                        height: headerHeight / 2,
                    },
                ]}>

                <Text style={styles.conversation}>EVENTS</Text>



            </View>

        </>
    );
};

export const HeaderCategories = (props) => {
    const { categorie } = props;

    const headerHeight = 58 * 2;

    return (
        <>
            <View
                style={[
                    styles.subHeader,
                    {
                        height: headerHeight / 2,
                    },
                ]}>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={styles.conversation}>CATEGORIES : </Text>
                    <Text style={styles.convversation}>{categorie}</Text>
                </View>




            </View>

        </>
    );
};


const styles = StyleSheet.create({
    subHeader: {
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    conversation: { color: 'white', fontSize: 20, fontWeight: '900', letterSpacing: 1, },
    convversation: { color: 'grey', fontSize: 17, fontWeight: '900', letterSpacing: 1, },

    searchBox: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#0F0F0F',
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
});
export default Header;