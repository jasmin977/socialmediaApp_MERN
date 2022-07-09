import React, { useRef } from 'react';

import { StatusBar, ImageBackground, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import ENV from '../../env';




const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 2.9;


const YourApp = () => {

    const users = useSelector(state => state.users.allUsers);

    const scrollY = useRef(new Animated.Value(0)).current;
    return (

        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <ImageBackground
                source={require('../../assets/gliiter_bg.jpg')}
                style={{
                    flex: 1,
                    resizeMode: "cover",
                    justifyContent: "center",
                }}
            >
                <Animated.FlatList
                    data={users}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    contentContainerStyle={{
                        padding: SPACING,
                        paddingTop: SPACING,


                    }}
                    keyExtractor={item => item.key}
                    renderItem={({ item, index }) => {
                        const inputRange = [
                            -1,
                            0,
                            ITEM_SIZE * index,
                            ITEM_SIZE * (index + 2),

                        ]
                        const opacityInputRange = [
                            -1,
                            0,
                            ITEM_SIZE * index,
                            ITEM_SIZE * (index + 1),

                        ]
                        const scale = scrollY.interpolate({
                            inputRange,
                            outputRange: [1, 1, 1, 0]
                        })
                        const opacity = scrollY.interpolate({
                            inputRange: opacityInputRange,
                            outputRange: [1, 1, 1, 0]
                        })
                        return <Animated.View style={{
                            flexDirection: 'row', padding: SPACING,
                            marginBottom: SPACING, backgroundColor: '#000',

                            opacity,
                            transform: [{ scale }]
                        }} >



                            <ImageBackground
                                source={{ uri: `${ENV.apiUrl}/user/photo/${item._id}` }}

                                style={{ marginRight: SPACING, width: AVATAR_SIZE, height: AVATAR_SIZE, justifyContent: 'flex-start' }}>

                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image

                                        source={require('../../assets/pic_cover.png')}

                                        style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, alignItems: 'center', justifyContent: 'center' }} />
                                </View>

                            </ImageBackground>








                            <View style={{ alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column' }} >

                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>{item.username}</Text>
                                <Text style={{ color: 'grey', fontWeight: '400', fontSize: 20 }}>{item.phoneNumber}</Text>

                            </View>

                        </Animated.View>
                    }}
                />
            </ImageBackground>
        </View>

    );
}

export default YourApp;