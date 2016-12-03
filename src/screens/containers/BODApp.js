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
import IconBar from '../components/IconBar.js';
import ScrollableTabView from 'react-native-scrollable-tab-view';
//import page
import Home from './home.js';
import Register from './register.js';
import Warning from './warning.js';

export default class EmployeeApp extends Component{
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        console.log("user id dang nhap la : "+this.props.user_id);
    }
	render(){
		return (
            <View>
                <Header searchBar rounded>
                    <InputGroup>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                        <Button transparent onPress = {this.register}>
                            <Icon name='ios-create'/>
                        </Button>
                    </InputGroup>
                    <Button transparent>
                        Search
                    </Button>
                </Header>
                <ScrollableTabView
                  style={{marginTop: 5,}}
                  tabBarPosition= {'bottom'}
                  initialPage={0}
                  renderTabBar={() => <IconBar />}>
                    <ScrollView tabLabel="ios-home" style={styles.tabView}>
                        <View>
                            <Home navigator = {this.props.navigator} user_id = {this.props.user_id}/>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-megaphone" style={styles.tabView}>
                      <View>
                        <Warning navigator = {this.props.navigator} user_id = {this.props.user_id}/>
                      </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-calendar" style={styles.tabView}>
                      <View style={styles.card}>
                        <Text>Lịch</Text>
                      </View>
                    </ScrollView>
                    <ScrollView tabLabel="md-arrow-round-forward" style={styles.tabView}>
                      <View style={styles.card}>
                        <Text>Forward</Text>
                      </View>
                    </ScrollView>
                </ScrollableTabView>
            </View>
		);
	}
    register(){
        console.log("register");
        this.props.navigator.push({index : 2,passProps : {user_id : this.props.user_id}});
    }
}
