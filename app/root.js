/*
 * Root componnent for pass app
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import TasksView from './TasksView.js';
import main_styles from './UbiqStyles.js';
class Root extends Component {
  render() {
    return (
        <View style={main_styles.container, {flex:1,paddingTop:20, alignSelf:'stretch'}}>
            <TasksView api_key={"16549ccb86cf41c8294d9166bdd4dd62a63a0148"}/>
        </View>
    );
  }
}
export default Root;
