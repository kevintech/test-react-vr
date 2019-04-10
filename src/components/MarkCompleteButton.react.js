'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  VrButton,
  Animated,
  asset
} from 'react-360';

const INFO_BUTTON_IMAGE = asset('info_icon.png');

class MarkCompleteButton extends React.Component {
  static defaultProps = {
    taskId: 0,
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
    fetch(`https://apex.oracle.com/pls/apex/apptitude/vr2/tasks/${this.props.taskId}?is_complete_yn=Y`)
      .then(response => response.text())
      .then(() => this.props.onClick && this.props.onClick());
  };

  render() {
    return (
      <View
        style={[
          styles.wrapper,
          this.props.style,
          {width: this.props.width}
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
                  outputRange: [this.props.width, this.props.width],
                }),
              }]}>
              <Image
                style={styles.icon}
                source={INFO_BUTTON_IMAGE} />
              <Text style={styles.text}>
                Mark as Done
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
    borderRadius: 5,
    flexDirection: 'row',
    height: 16,
  },
  buttonFocused: {
    backgroundColor: 'white',
    borderColor: '#4477dd',
  },
  icon: {
    padding: 5,
    tintColor: 'grey',
    height: '100%',
    aspectRatio: 1,
  },
  text: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
});

module.exports = MarkCompleteButton;