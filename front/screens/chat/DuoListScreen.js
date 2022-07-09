import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';


import Colors from '../../constants/Colors';





import { Container, Header, Item, Input, Icon } from 'native-base';





const DuoListScreen = (props) => {

    const [searchText, setSearchText] = useState('');



    return (
        <Container style={{ backgroundColor: Colors.brightBlue }}>
            <Header style={{
                backgroundColor: '#111', flexDirection: 'row', justifyContent: 'center', borderColor: 'black',
                borderWidth: 5,
                alignItems: 'center',
            }} searchBar
            >


                <Input
                    style={{ fontSize: 20, color: 'white' }}
                    value={searchText}
                    //   onChangeText={(text) => handleSearchTextChange(text)}
                    placeholder="Search for.."
                    backgroundColor="#111"


                />
                <Image
                    style={{

                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#111',
                        width: 40,
                        height: 40,
                        tintColor: Colors.gold,

                    }}
                    resizeMode='cover'
                    source={require('../../assets/icons/search.png')}
                ></Image>

            </Header>





        </Container>
    );
};


export const screenOptions = {
    headerTitle: 'Chat Duo'
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    row: {

        justifyContent: "space-around"
    }
})

export default DuoListScreen;