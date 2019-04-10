'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  VrButton,
  Animated,
} from 'react-360';


const FOCUS_SCALE = 1.3;

class ProjectButton extends React.Component {
  static defaultProps = {
    width: 180,
    text: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false,
      scaleAnim: new Animated.Value(0), // initial a value for doing animation
    };
  }

  _focus = () => {
    // start an animation
    Animated.timing(this.state.scaleAnim, {
      toValue: 1,
      duration: 300,
    }).start();
    this.setState({hasFocus: true});
  };

  _blur = () => {
    // start an animation
    Animated.timing(this.state.scaleAnim, {
      toValue: 0,
      duration: 300,
    }).start();
    this.setState({hasFocus: false});
  };

  _click = () => {
    // input handling
    this.props.onClick && this.props.onClick();
  };

  render() {
    return (
      <View
        style={[
          styles.wrapper,
          this.props.style,
          {width: this.props.width * FOCUS_SCALE}
        ]}>
        <VrButton
          onClick={this._click} //this event trigger when click the view
          onExit={this._blur} //this event trigger when cursor move out of the view
          onEnter={this._focus} //this event trigger when cursor move into of the view
          >
          <Animated.View
            style={[
              styles.button,
              this.state.hasFocus && styles.buttonFocused,
              {
                // With this the width of the this view
                // is animated with the value of scaleAnim
                // by an interpolation
                width: this.state.scaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.props.width, this.props.width * FOCUS_SCALE],
                }),
              }]}>
              <Text style={styles.text}>
                {this.props.text}
              </Text>
          </Animated.View>
        </VrButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#639dda',
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: 'row',
    height: 60,
  },
  buttonFocused: {
    backgroundColor: 'white',
    borderColor: '#4477dd',
  },
  icon: {
    padding: 20,
    tintColor: 'grey',
    height: '100%',
    aspectRatio: 1,
  },
  iconFocused: {
    tintColor: 'white',
  },
  text: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
});

module.exports = ProjectButton;