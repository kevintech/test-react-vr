'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-360';
import MarkCompleteButton from "./MarkCompleteButton.react";
import TaskListItem from "./TaskListItem.react";

class ProjectTasksScenePage extends React.Component {
  static defaultProps = {
    projectId: 0,
  };

  state = {
    tasks: []
  }

  componentWillMount() {
    // create a play to play video
    this._setData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projectId !== this.props.projectId) {
      this._setData(nextProps);
    }
  }

  _setData(nextProps) {
    fetch(`https://apex.oracle.com/pls/apex/apptitude/vr2/tasks?project_id=${nextProps.projectId}`)
      .then(response => response.json())
      .then(data => this.setState({ ...this.state, tasks: data.items }));
  }

  _onCompletedTask(taskId) {
    console.log(`Completed Task: ${taskId}!!!`);
    this._setData(this.props);
  }

  render() {
    return (
      <View style={styles.container}>
      {this.state.tasks.map((task, index) => (
        <TaskListItem
          key={task.id}
          task={task}
          onClick={() => { this._onCompletedTask(task.id); }}
        />
      ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'wrap'
  },
  listView: {
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 10,
    height: 90,
    paddingHorizontal: 10,
    margin: 5,
  },
  titleText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

module.exports = ProjectTasksScenePage;