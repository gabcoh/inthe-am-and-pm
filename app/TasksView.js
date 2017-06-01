/*
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
} from 'react-native';
import Tasks from './lib/Tasks.js';
import TaskBox from './TaskBox.js';
import main_styles from './UbiqStyles.js';
export default class TasksView extends Component {
    constructor(props) {
        super();
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.tasks_source = new Tasks(props.api_key);
        this.state = {
            dataSource : this.ds.cloneWithRows([]),
            tasks_source : this.tasks_source,
            refreshing : false,
        };
        this.update_list(); 
    }
    update_list() {
        this.setState({refreshing:true});
        this.state.tasks_source.get_tasks().then(tasks => {
            this.setState({
                dataSource : this.ds.cloneWithRows(tasks),
                refreshing : false,
            });
        });
    }
    render() {
        console.log(this.state.dataSource);
        return (
            <ListView style={[main_styles.list, styles.task_list]}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <TaskBox task={rowData}> </TaskBox> }
                    refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.update_list.bind(this)}
                    />
                }
            />
        );
    }
}
const styles = StyleSheet.create({
    task_list : {
    }
});
