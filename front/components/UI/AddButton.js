import React from "react";
import { View, StyleSheet, TouchableHighlight, Animated, Image, TouchableOpacity } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import Colors from '../../constants/Colors';

export default class AddButton extends React.Component {

    constructor() {
        super();
        this.state = {
            navigatScreen: ''
        };
    }


    CreatePost = () => {
        this.setState({
            navigatScreen: 'CreatePost'
        });
        console.log(this.state.navigatScreen);
    }

    CreateEvent() {
        this.setState({
            navigatScreen: 'Agenda'
        });
    }

    CreateStory() {
        this.setState({
            navigatScreen: 'Confirmstory'
        });
    }
    buttonSize = new Animated.Value(1);
    mode = new Animated.Value(0);
    handlePress = () => {
        Animated.sequence([
            Animated.timing(this.buttonSize, {
                toValue: 0.95,
                duration: 200
            }),
            Animated.timing(this.buttonSize, {
                toValue: 1
            }),
            Animated.timing(this.mode, {
                toValue: this.mode._value === 0 ? 1 : 0
            })
        ]).start();
    }



    render() {

        const sizeStyle = {
            transform: [{ scale: this.buttonSize }]
        };

        const rotation = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "45deg"]
        });

        const leftx = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, -100]
        });
        const lefty = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-30, -100]
        });
        const topx = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, -24]
        });
        const topy = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-30, -150]
        });
        const rightx = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, 50]
        });
        const righty = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-30, -100]
        });

        return (
            <View style={{
                alignItems: 'center', justifyContent: 'center', marginHorizontal: 45, marginBottom: 30

            }}>
                <Animated.View
                    style={{
                        position: 'absolute', left: leftx,
                        top: lefty
                    }}>
                    <TouchableOpacity
                        onPress={this.CreatePost} style={styles.secondaryBtn}>
                        <Image
                            style={{ width: 25, height: 25, justifyContent: 'center', tintColor: 'white' }}
                            source={require("../../assets/story.png")}>

                        </Image>

                    </TouchableOpacity>

                </Animated.View>
                <Animated.View
                    style={{
                        position: 'absolute', left: topx,
                        top: topy
                    }}>
                    <View style={styles.secondaryBtn}>
                        <Image
                            style={{ width: 25, height: 25, justifyContent: 'center', tintColor: 'white' }}
                            source={require("../../assets/pen.png")}>

                        </Image>

                    </View>

                </Animated.View>
                <Animated.View
                    style={{
                        position: 'absolute', left: rightx,
                        top: righty
                    }}>
                    <View style={styles.secondaryBtn}>
                        <Image
                            style={{ width: 25, height: 25, justifyContent: 'center', tintColor: 'white' }}
                            source={require("../../assets/event.png")}>

                        </Image>

                    </View>

                </Animated.View>
                <Animated.View style={[styles.buttonAdd, sizeStyle]}>
                    <TouchableHighlight onPress={this.handlePress}
                    >
                        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                            <AntDesign
                                name="plus"

                                reverse
                                color='white'


                                size={30} />
                        </Animated.View>
                    </TouchableHighlight>

                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonAdd: {
        alignItems: 'center', backgroundColor: Colors.bege,
        justifyContent: 'center',
        width: 60, height: 60, borderRadius: 50, position: 'absolute',


    },
    secondaryBtn: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.bege
    }

});