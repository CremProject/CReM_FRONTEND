import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Navigator,ListView
} from 'react-native';
import { Container, Header, Title,
   Content, Footer, FooterTab,
   Button, Icon,View,Text,
   InputGroup,Input,List,
   ListItem,Picker,Item,H3,
   Badge,Tabs
} from 'native-base';
import styles from '../style/styles.js';
import Task from '../components/task.js';

//import page
import Home from './home.js';
import Register from './register.js';
import Warning from './warning.js';

export default class App extends Component{
    constructor(props) {
        super(props);
    }
	render(){
		return (
            <Container>
                <Header searchBar rounded>
                    <InputGroup>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                        <Icon name="ios-people" />
                        <Button transparent>
                            <Icon name='ios-create'/>
                        </Button>
                    </InputGroup>
                    <Button transparent>
                        Search
                    </Button>
                </Header>

				<View>
					<Tabs locked>
						<Home tabLabel = 'Home'/>
						<Warning tabLabel = 'Warning'/>
					</Tabs>
				</View>

            </Container>
		);
	}


}
