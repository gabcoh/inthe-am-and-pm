/*
 * Root componnent for pass app
 */
import React, { Component } from 'react';
import {
    Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Spinner
} from 'native-base';
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
            //refreshing: false,
            tasks_source:new Tasks("16549ccb86cf41c8294d9166bdd4dd62a63a0148"),
        };
    }
    componentDidMount() {
        this.update_list();
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
							<Title>Header</Title>
						</Body>
					<Right>
						<Button transparent onPress={()=>this.props.navigation.navigate('TaskCreate')}>
							<Icon name='ios-add' />
						</Button>
                    </Right>
				</Header>
				<Content>
                    {content}
				</Content>
				<Footer>
					<FooterTab>
						<Button full>
							<Text>Footer</Text>
						</Button>
					</FooterTab>
				</Footer>
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
