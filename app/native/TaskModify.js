/*
*/
import React, { Component } from 'react';
import {
} from 'react-native';
import {
    Content, List, ListItem, Text, Head, Button, Right, Icon, Body, Left, H1, H2, H3, Badge, Separator
} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
export default class TaskModify extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.task.get_title()}`,
    });
    constructor(props) {
        super();
        this.render_annotations.bind(this);
    }
    render_annotations(annotations) {
        var annotations_view = [];
        for(let i = 0; i<annotations.length; i++) {
            annotations_view.push(
                <ListItem>
                <Icon name='ios-arrow-forward'/>
                <H3> {annotations[i]} </H3>
                </ListItem>
            );
        }
        return annotations_view;
    }
    //TODO add annotations
    render() {
        const { params } = this.props.navigation.state;

        return (
            <List>
                <ListItem>
                    <H3>Due: {params.task.get_due_date().toDateString()!=='Invalid Date'||"None"} </H3> 
                </ListItem>
                {this.render_annotations(params.task.get_annotations())}
                <ListItem>
                    <H3>Status: {params.task.get_status()} </H3>
                </ListItem>
                <ListItem>
                    <H3>Tags: </H3>
                    {params.task.get_tags().map(x=>{ 
                        return (
                            <Badge primary>
                                <Text>{x}</Text>
                            </Badge> 
                    );}) }
                </ListItem>
                <ListItem>
                    <H3>Urgency: {String(params.task.get_urgency())}</H3>
                </ListItem>
                <ListItem>
                    <H3>Entered: {params.task.get_entry().toDateString()}</H3>
                </ListItem>
                <ListItem>
                    <H3>Modified: {params.task.get_last_modified().toDateString()}</H3>
                </ListItem>
            </List>
        );
    }
}
