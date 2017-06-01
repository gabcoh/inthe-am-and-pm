/*
*/
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    Image,
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
            <View style={[main_styles.list_item]}>
                <View style={[main_styles.container, this.state.style.main]}>
                    <Text numberOfLines={1} style={[main_styles.text,this.state.style.description]}>
                        {this.state.status_emoji}{this.state.task.get_title()}
                    </Text>
                </View>
                <View style={[main_styles.container,this.state.style.supporting]}>
                    <Text style={[main_styles.text]}>
                        due: {(t=this.state.task.get_due_date()) === undefined ? "none" : t}
                    </Text>
                    <Text style={[main_styles.text, this.state.style.tags]}>
                        tags: {(t = this.state.task.get_tags()) === [] ? "none" : t.join(', ')}
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        if(this.state.show_annotations === false) {
            return (
                <TouchableHighlight onPress={this.show_annotations}>
                    {this.render_basic_task()}
                </TouchableHighlight>
            );
        } else {
            return (
                <TouchableHighlight onPress={this.show_annotations}>
                <View>
                    {this.render_basic_task()}
                    <ListView
                    dataSource={this.state.annotations_source}
                    renderRow={(rowData) => <Text>{'\u2022'} {rowData}</Text>}
                    />
                </View>
                </TouchableHighlight>
            );
        }
    }
}
const styles = StyleSheet.create({
    description:{
        fontSize:20,
        paddingLeft:4,
    },
    bounding_h:{
        height:50,
        backgroundColor : 'red',
        flexDirection:'column',
    },
    bounding_m:{
        height:50,
        backgroundColor : 'orange',
        flexDirection:'column',
    },
    bounding_l:{
        height:50,
        backgroundColor : 'green',
        flexDirection:'column',
    },
   main: {
        flexDirection:'row',
    },
    supporting:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    tags:{
        paddingRight:20,
    },
});

