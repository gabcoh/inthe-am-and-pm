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
        console.log('hi');
        this.state = {
            priority:'None',
        };
    }
    on_priority_change(value: string) {
        this.setState({
            priority : value
        });
    }
    render() {
        const { params } = this.props.navigation.state;
        return (
            <Container>
            <Content>
                <Form>
                    <Item>
                        <Input placeholder='description'/>
                    </Item>
                    <Item>
                        <Input last placeholder="tag, tag, tag..."/>
                    </Item>
                    <Item>
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
                <Button block style={{ margin: 15, marginTop: 50 }}>
                    <Text>Create Task</Text>
                </Button>
            </Content>
            </Container>
        );
    }
}
