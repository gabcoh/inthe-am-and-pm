/*
*/
import React, { Component } from 'react';
import {
    Text,
} from 'react-native';
import main_styles from './UbiqStyles.js';
export default class TaskBox extends Component {
    constructor(props) {
        super();
        this.task = props.task;
        const status_emojis= {
            'pending':'🔵',
            'completed':'✅',
            'waiting':'\u26A0',
            'deleted':'❌',
        }
       const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            task: this.task,
            style : styles,
            show_annotations : false,
            annotations_source : ds.cloneWithRows(this.task.get_annotations()),
            status_emoji:(t = this.task.get_status()) in status_emojis? status_emojis[t] : '',
        };
        this.show_annotations = this.show_annotations.bind(this);
        this.render_basic_task= this.render_basic_task.bind(this);
        console.log(this.task);
    }
    show_annotations() {
        this.setState({show_annotations:!this.state.show_annotations});
    }
    render_basic_task() {
        return (
            <Text>{this.state.task.get_title()}</Text>
        );
    }

    render() {
        if(this.state.show_annotations === false) {
            return (
                render_basic_task()
            );
        } else {
            return (
                render_basic_task()
            );
        }
    }
}
