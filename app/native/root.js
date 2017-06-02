/*
 * Root componnent for pass app
 * TODO implement is_valid in Tasks
 */
import React, { Component } from 'react';
import {
    Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Spinner, Input
} from 'native-base';
import {
    AsyncStorage
} from 'react-native';
import TasksView from './TasksView.js';
import Tasks from '../lib/Tasks.js';
import TaskModify from './TaskModify.js';
import TaskCreate from './TaskCreate.js';
import { StackNavigator } from 'react-navigation';
//import main_styles from './UbiqStyles.js';
class RootScreen extends Component {
    static navigationOptions = {
        header:null,
    };
    constructor(props) {
        super();
        this.state = {
            data : [],
        };
        this.render_get_key = this.render_get_key.bind(this);
        this.render_tasks = this.render_tasks.bind(this);
        this.update_list = this.update_list.bind(this);

        AsyncStorage.getItem('@TaskNinja:api_key').then(key=>{
            if (key !== null && new Tasks(key).is_valid()) {
                this.setState({
                    tasks_source : new Tasks(key),
                }, this.update_list);
            }
        }).catch(()=>{});
    }

    update_list() {
        this.setState({
            refreshing:true,
            error : false,
        });
        this.state.tasks_source.get_tasks().then(tasks => {
            this.setState({
                data : tasks,
                refreshing : false,
            });
            this.forceUpdate();
        }).catch(error=>{
            this.setState({
                refreshing : false,
                error : true,
            });
        });
    }
    render() {
        if(this.state.tasks_source === undefined) {
            return this.render_get_key();
        } else {
            return this.render_tasks();
        }
    }
    render_get_key() {
        return (
            <Container>
                <Input onChangeText={key=>this.setState({api_key:key})} placeholder="API Key"/>
                <Button block onPress={()=>{
                    this.setState({
                        tasks_source :new Tasks(this.state.api_key),
                    }, () => {
                        this.update_list();
                        AsyncStorage.setItem('@TaskNinja:api_key',this.state.api_key);
                    });
                }} style={{ margin: 15, marginTop: 50 }}>
                    <Text>Submit</Text>
                </Button>
            </Container>
        );
    }
	render_tasks() {
        const navigate = this.props.navigation;
        if (this.state.error) {
            //var content = <Container><Body><Icon name="ios-sad-outline" style={{color:"red"}}/></Body></Container>;
        }
        else if(this.state.refreshing) {
            var content = <Spinner color='blue'/>;
        } else {
            var content = <TasksView navigation={navigate.navigate} task_controler={this.state.tasks_source}tasks={this.state.data}/>
        }
		return (
			<Container>
				<Header>
					<Left>
						<Button transparent onPress={this.update_list.bind(this)}>
							<Icon name='refresh' />
						</Button>
					</Left>
						<Body>
							<Title>All Tasks</Title>
						</Body>
					<Right>
						<Button transparent onPress={()=>this.props.navigation.navigate('TaskCreate', {tasks_source:this.state.tasks_source})}>
							<Icon name='ios-add' />
						</Button>
                    </Right>
				</Header>
				<Content>
                    {content}
				</Content>
			</Container>
		);
	}
}
const Root = StackNavigator({
    Tasks : {screen:RootScreen},
    TaskModify : {screen:TaskModify},
    TaskCreate:{screen:TaskCreate},
});
export default Root;
