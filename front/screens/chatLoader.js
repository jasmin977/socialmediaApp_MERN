import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Colors from '../constants/Colors';

export default class Chat extends React.Component {
    componentDidMount() {
        this.animation.play();
        // Or set a specific startFrame and endFrame with:
        // this.animation.play(30, 120);
    }

    resetAnimation = () => {
        this.animation.reset();
        this.animation.play();
    };

    render() {
        return (
            <View style={styles.animationContainer}>
                <LottieView
                    ref={animation => {
                        this.animation = animation;
                    }}
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor: '#000',
                    }}
                    source={require('../constants/chat.json')}
                />
                <Text style={{ color: Colors.gold, marginVertical: 10 }}>Add friends </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

});