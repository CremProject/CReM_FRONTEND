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

export default class App extends Component{
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
    }
	render(){
		return (
            <Container>
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

                <Content>
                    <ScrollableTabView
                      style={{marginTop: 5, }}
                      initialPage={0}
                      renderTabBar={() => <IconBar />}>
                        <ScrollView tabLabel="ios-home" style={styles.tabView}>
                            <View>
                                <Home />
                            </View>
                        </ScrollView>
                        <ScrollView tabLabel="ios-megaphone" style={styles.tabView}>
                          <View>
                            <Warning />
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
                </Content>
            </Container>
		);
	}
    register(){
        console.log("register");
        this.props.navigator.push({index : 2});
    }
}
