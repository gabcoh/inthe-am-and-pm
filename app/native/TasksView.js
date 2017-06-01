/*
 */
import React, { Component } from 'react';
import {
    Container, Content, List, ListItem, Text, Head, Button, Right, Icon, Body, Left,
} from 'native-base';
import Swipeout from 'react-native-swipeout';
import TaskBox from './TaskBox.js';
export default class TasksView extends Component {
    constructor(props) {
        super();
        this.priority_colors = {"H":"red","M":"orange","L":"green"};
        this.state = {
            tasks:props.tasks.sort(this.compare_urgency),
        };
        this.navigate = props.navigation;
        this.delete_task = this.delete_task.bind(this);
        this.task_done = this.task_done.bind(this);
        this.create_swipeout = this.create_swipeout.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({tasks:nextProps.tasks});
    }
    create_swipeout(task) {
        return [
            {
                text:'Done',
                onPress:()=>this.task_done(task),
                backgroundColor:'blue',
                color:'white',
            },
            {
                text:'Delete',
                    onPress:()=>this.delete_task(task),
                    backgroundColor:'red',
                    color:'white',
            },
        ];
    }
    compare_urgency(a, b) {
        return b.get_urgency()-a.get_urgency();
    }
    task_done(task) {
        this.props.task_controler.task_done(task.get_id());
        this.setState({
            tasks:this.state.tasks.filter(x=>x.get_id()!==task.get_id()),
        });
    }
    delete_task(task) {
        this.props.task_controler.delete_task(task.get_id());
        this.setState({
            tasks:this.state.tasks.filter(x=>x.get_id()!==task.get_id()),
        });
    }
    render_task_item(task) {
        return(
            <Swipeout autoClose={true} right={this.create_swipeout(task)}>
            <ListItem button onLongPress={()=>console.log('hi')}onPress={()=>this.navigate('TaskModify', {task:task})}>
            <Body>
            <Text numberofLines={1}>{task.get_title()}</Text>
            </Body>
            <Right>
            <Icon name="ios-information-circle" style={{color:(this.priority_colors[task.get_priority()]||'blue')}}/>
            </Right>
            </ListItem>
            </Swipeout>
        );
    }
    render() {
        return (
            <Container >
                <Content>
                    <List dataArray={this.state.tasks}
                        renderRow={(item) =>
                            this.render_task_item(item)
                        }>
                    </List>
                </Content>
            </Container>
        );
    }
}
