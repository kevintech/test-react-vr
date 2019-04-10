'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  Animated
} from 'react-360';
import MarkCompleteButton from "./MarkCompleteButton.react";

class TaskListItem extends React.Component {
  static defaultProps = {
    taskId: 0,
    completed: false,
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

  _completedAnimation = () => {
    // start an animation
    Animated.timing(this.state.scaleAnim, {
      toValue: 1,
      duration: 300,
    }).start();
    this.setState({hasFocus: true});
  };

  _onCompletedTask = () => {
    this._completedAnimation();
    setTimeout(() => this.props.onClick && this.props.onClick(), 500);
  };

  render() {
    return (
      <Animated.View
      style={[
        styles.listView,
        this.state.hasFocus && styles.listViewFocused]}
        key={this.props.task.id}>
        <Text style={styles.titleText}>
          {this.props.task.name}
        </Text>
        <Text style={{fontSize: 12}}>Assigned To: {this.props.task.asignee}</Text>
        <MarkCompleteButton taskId={this.props.task.id}
          onClick={() => { this._onCompletedTask(); }}/>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  listView: {
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 10,
    height: 90,
    paddingHorizontal: 10,
    margin: 5,
  },
  titleText: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  listViewFocused: {
    backgroundColor: '#3D9970',
    borderColor: '#2ECC40',
  }
});

module.exports = TaskListItem;