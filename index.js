import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton
} from 'react-360';
import ProjectButton from "./src/components/ProjectButton.react";
import ProjectTasksScenePage from "./src/components/ProjectTasksScenePage.react";

export default class test_react_vr2 extends React.Component {
  // Our component will keep track of this state
  state = {
    count: 0,
    tasks: [],
    projects: [],
    projectId: 0
  };

  // Once the component mounts, run the increment method every second
  componentDidMount() {
    fetch("https://apex.oracle.com/pls/apex/apptitude/vr2/projects")
      .then(response => response.json())
      .then(data => this.setState({ ...this.state, projects: data.items }));
  }

  _projectItemOnClick(id) {
    this.setState({ ...this.state, projectId: id })
  }

  render() {
    // Reference the count in our UI
    return (
      <View style={styles.panel}>
        <View style={styles.navigation}>
          {this.state.projects.map((project, index) => (
            <ProjectButton
              key={project.id}
              index={index}
              style={styles.button}
              text={project.name}
              onClick={() => { this._projectItemOnClick(project.id); }}
            />
          ))}
        </View>
        <View style={styles.scenePage}>
          <ProjectTasksScenePage
            projectId={this.state.projectId} />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  navigation: {
    padding: 5,
    width: 950,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
    flexDirection: 'row',
  },
  button: {
    marginLeft: 5,
    marginRight: 5,
  },
  scenePage: {
    padding: 5,
    width: 950,
    height: 450,
    backgroundColor: 'grey',
    borderRadius: 5,
    marginTop: 5
  }
});

AppRegistry.registerComponent('test_react_vr2', () => test_react_vr2);
