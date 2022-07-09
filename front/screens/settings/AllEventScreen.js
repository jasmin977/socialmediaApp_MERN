import React, { Component } from 'react';
import { Animated, Text, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import Constants from 'expo-constants';
import Colors from '../../constants/Colors';
import AllEvents from '../events/AllEvents';
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const HEADER_HEIGHT = 40 + Constants.statusBarHeight;
const BOX_SIZE = (Dimensions.get('window').width / 2) - 12;
const PHOTOS = Array.from({ length: 24 }).map((_, i) => `https://unsplash.it/300/300/?random&__id${i}`);

export default class SettingsScreen extends Component {
    state = {
        scrollAnim: new Animated.Value(0),
        offsetAnim: new Animated.Value(0),
    };

    componentDidMount() {
        this.state.scrollAnim.addListener(this._handleScroll);
    }

    componentWillUnmount() {
        this.state.scrollAnim.removeListener(this._handleScroll);
    }

    _handleScroll = ({ value }) => {
        this._previousScrollvalue = this._currentScrollValue;
        this._currentScrollValue = value;
    };

    _handleScrollEndDrag = () => {
        this._scrollEndTimer = setTimeout(this._handleMomentumScrollEnd, 250);
    };

    _handleMomentumScrollBegin = () => {
        clearTimeout(this._scrollEndTimer);
    };

    _handleMomentumScrollEnd = () => {
        const previous = this._previousScrollvalue;
        const current = this._currentScrollValue;

        if (previous > current || current < HEADER_HEIGHT) {
            // User scrolled down or scroll amount was too less, lets snap back our header
            Animated.spring(this.state.offsetAnim, {
                toValue: -current,
                tension: 300,
                friction: 35,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(this.state.offsetAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }).start();
        }
    };


    header() {
        return (
            <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30, }}>Events</Text>
                <TouchableOpacity style={{
                    position: 'absolute', right: 0,
                    backgroundColor: '#111', height: 40, width: 40, borderRadius: 50, justifyContent: 'center',
                    alignItems: 'center', alignSelf: 'flex-end', marginHorizontal: 10, marginBottom: -5
                }} resizeMode='cover'>

                    <Image
                        style={{ width: 20, height: 20, tintColor: 'white' }} resizeMode="cover"

                        source={require('../../assets/search.png')}
                    />
                </TouchableOpacity>
            </View>
        )
    };



    render() {
        const { scrollAnim, offsetAnim } = this.state;

        const translateY = Animated.add(scrollAnim, offsetAnim).interpolate({
            inputRange: [0, HEADER_HEIGHT],
            outputRange: [0, -HEADER_HEIGHT],
            extrapolate: 'clamp'
        });

        return (
            <View style={styles.container}>
                <AnimatedScrollView
                    contentContainerStyle={styles.gallery}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
                        { useNativeDriver: true },
                    )}
                    onMomentumScrollBegin={this._handleMomentumScrollBegin}
                    onMomentumScrollEnd={this._handleMomentumScrollEnd}
                    onScrollEndDrag={this._handleScrollEndDrag}
                >
                    <AllEvents />
                </AnimatedScrollView>
                <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>


                    <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30, }}>  Events</Text>
                        <TouchableOpacity style={{
                            position: 'absolute', right: 0,
                            backgroundColor: '#111', height: 40, width: 40, borderRadius: 50, justifyContent: 'center',
                            alignItems: 'center', alignSelf: 'flex-end', marginHorizontal: 10, marginBottom: -5
                        }} resizeMode='cover'>

                            <Image
                                style={{ width: 20, height: 20, tintColor: 'white' }} resizeMode="cover"

                                source={require('../../assets/search.png')}
                            />
                        </TouchableOpacity>
                    </View>



                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    gallery: {

        paddingTop: HEADER_HEIGHT,
    },
    photo: {
        height: BOX_SIZE,
        width: BOX_SIZE,
        resizeMode: 'cover',
        margin: 4,
    },
    header: {
        height: HEADER_HEIGHT,

        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
    },
    title: {
        fontSize: 16, color: 'white'
    },
});
