/*
*/
import React, { Component } from 'react';
import {
} from 'react-native';
import {
    Container, Content, List, ListItem, Text, Head, Button, Right, Icon, Body, Left, H1, H2, H3, Form, Item, Input, Picker
} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
export default class TaskModify extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Create a New Task`,
    });
    constructor(props) {
        super();
        this.state = {
            priority:'None',
        };
        this.create_task = this.create_task.bind(this);
        this.set = this.set.bind(this);
    }
    create_task() {
        if(this.state.description === undefined) {
            return;
        }
        if(tags === undefined) {
            var tags = [];
        } else {
            var tags = this.state.tags.split(' ');
        }
        var priority = this.state.priority;
        if(priority === "None") {
            priority = null;
        }
        var new_task = {
            description:this.state.description,
            priority : priority,
            tags : tags, 
        };
        this.props.navigation.state.params.tasks_source.create_task(new_task);
        this.props.navigation.navigate('Tasks');
    }
    on_priority_change(value: string) {
        this.setState({
            priority : value
        });
    }
    set(key) {
        return ((input) => {
            let t = {};
            t[key] = input;
            this.setState(t);
        });
    }
    render() {
        const { params } = this.props.navigation.state;
        return (
            <Container>
            <Content>
                <Form>
                    <Item>
                        <Input onChangeText={this.set('description')} placeholder='description'/>
                    </Item>
                    <Item>
                        <Input onChangeText={this.set('tags')} placeholder="tag, tag, tag..."/>
                    </Item>
                    <Item last>
                        <Text>Priority: </Text>
                        <Picker
                        supportedOrientations={['portrait','landscape']}
                        iosHeader="Select one"
                        mode="dropdown"
                        selectedValue={this.state.priority}
                        onValueChange={this.on_priority_change.bind(this)}>
                        <Item label="High" value="H" />
                        <Item label="Medium" value="M" />
                        <Item label="Low" value="L" />
                        <Item label="None" value="None" />
                        </Picker>
                    </Item>
                </Form>
                <Button block onPress={this.create_task} style={{ margin: 15, marginTop: 50 }}>
                    <Text>Create Task</Text>
                </Button>
            </Content>
            </Container>
        );
    }
}
