import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Easing,
  Image,
  I18nManager,
  PanResponder,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const styles = {
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerButton: {
    flexDirection: 'row',
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animated: {
    borderRadius: 50,
    borderWidth: 0,
    position: 'absolute',
  },
};

export default class SwitchSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.initial ? this.props.initial : 0,
      scrollX: new Animated.Value(0),
    };
    this.animatedValue = new Animated.Value(
      this.props.initial
        ? I18nManager.isRTL
          ? -(this.props.initial / this.props.options.length)
          : this.props.initial / this.props.options.length
        : 0
    );
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.shouldSetResponder,
      onMoveShouldSetPanResponder: this.shouldSetResponder,
      onPanResponderRelease: this.responderEnd,
      onPanResponderTerminate: this.responderEnd,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.toggleItem(nextProps.value);
    }
  }

  shouldSetResponder = (evt, gestureState) => {
    return (
      evt.nativeEvent.touches.length === 1 &&
      !(Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5)
    );
  };

  responderEnd = (evt, gestureState) => {
    const swipeDirection = this._getSwipeDirection(gestureState);
    if (
      swipeDirection === 'RIGHT' &&
      this.state.selected < this.props.options.length - 1
    ) {
      this.toggleItem(this.state.selected + 1);
    } else if (swipeDirection === 'LEFT' && this.state.selected > 0) {
      this.toggleItem(this.state.selected - 1);
    }
  };

  _getSwipeDirection(gestureState) {
    const { dx, dy, vx } = gestureState;
    // 0.1 velocity
    if (Math.abs(vx) > 0.1 && Math.abs(dy) < 80) {
      return dx > 0 ? 'RIGHT' : 'LEFT';
    }
    return null;
  }

  getBgColor() {
    const { selected } = this.state;
    const { options, buttonColor } = this.props;
    return options[selected].activeColor || buttonColor;
  }

  animate = (value, last) => {
    this.animatedValue.setValue(last);
    Animated.timing(this.animatedValue, {
      toValue: value,
      duration: this.props.animationDuration,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start();
  };

  toggleItem = index => {
    if (this.props.options.length <= 1) return;
    this.animate(
      I18nManager.isRTL
        ? -(index / this.props.options.length)
        : index / this.props.options.length,
      I18nManager.isRTL
        ? -(this.state.selected / this.props.options.length)
        : this.state.selected / this.props.options.length
    );
    if (this.props.onPress) {
      this.props.onPress(this.props.options[index]);
    } else {
      console.log('Call onPress with value: ', this.props.options[index].value);
    }
    this.setState({ selected: index });
  };

  _listener = e => {
    let c = Math.round(e.nativeEvent.contentOffset.x / width);
    this.setState({ selected: c });
  };

  render() {
    const {
      textColor,
      selectedColor,
      fontSize,
      backgroundColor,
      borderColor,
      hasPadding,
      valuePadding,
      height,
      bold,
    } = this.props;

    const options = this.props.options.map((element, index) => (
      <View
        key={index}
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.toggleItem(index)}>
          {typeof element.customIcon === 'function'
            ? element.customIcon(this.state.selected == index)
            : element.customIcon}
          {element.imageIcon &&
            <Image
              source={element.imageIcon}
              style={{
                height: 30,
                width: 30,
                tintColor: this.state.selected == index
                  ? selectedColor
                  : textColor,
              }}
            />}
          <Text
            style={{
              fontSize,
              fontWeight: bold == true ? 'bold' : '',
              textAlign: 'center',
              color: this.state.selected == index ? selectedColor : textColor,
              backgroundColor: 'transparent',
            }}>
            {element.label}
          </Text>
        </TouchableOpacity>
      </View>
    ));

    return (
      <View style={{ height: '100%' }}>
        <View style={{ alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', width: '80%' }}>
            <View {...this._panResponder.panHandlers} style={{ flex: 1 }}>
              <View
                style={{
                  borderRadius: 50,
                  backgroundColor: backgroundColor,
                  height: height,
                }}
                onLayout={event => {
                  const { width } = event.nativeEvent.layout;
                  this.setState({
                    sliderWidth: width - (hasPadding ? valuePadding : 0),
                  });
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    borderColor: borderColor || '#c9c9c9',
                    borderRadius: 60,
                    borderWidth: hasPadding ? 1 : 0,
                  }}>
                  {this.state.sliderWidth &&
                    <Animated.View
                      style={[
                        {
                          height: hasPadding ? height - 4 : height,
                          backgroundColor: this.getBgColor(),
                          width: this.state.sliderWidth /
                            this.props.options.length -
                            (hasPadding ? valuePadding : 0),
                          transform: [
                            {
                              translateX: this.animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [
                                  hasPadding ? valuePadding : 0,
                                  this.state.sliderWidth -
                                  (hasPadding ? valuePadding : 0),
                                ],
                              }),
                            },
                          ],
                          marginTop: hasPadding ? valuePadding : 0,
                        },
                        styles.animated,
                      ]}
                    />}
                  {options}
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ paddingTop: 5 }}>
          <ScrollView
            ref={ref => (this.scrollView = ref)}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }],
              { listener: this._listener }
            )}
            scrollEventThrottle={16}>
            {this.props.options.map((source, i) => {
              if (this.state.selected == i) return this.props.options[i].page;
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

SwitchSelector.defaultProps = {
  textColor: '#aaaaaa',
  selectedColor: '#FFFFFF',
  fontSize: 12,
  backgroundColor: '#353535',
  borderColor: '#353535',
  hasPadding: true,
  valuePadding: 1,
  height: 30,
  bold: true,
  buttonColor: '#262625',
  animationDuration: 600,
};
