/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   ScrollView,
   Navigator
 } from 'react-native';
import { Container, Header, Title,
    Content, Footer, FooterTab,
    Button, Icon,View,Text,
    InputGroup,Input,List,
    ListItem,Picker,Item,H3
 } from 'native-base';

 import Task from '../components/task.js';
//icon from react-native-vector-icons
const FA = require ('react-native-vector-icons/FontAwesome');
const styless = require('../style/styles');
const Iconicons = require ('react-native-vector-icons/Ionicons');
const EvilIcon = require ('react-native-vector-icons/EvilIcons');


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tab1: false,
          tab2: false,
          tab3: true,
          tab4: false,
        };
    }

    toggleTab1() {
        this.setState({
          tab1: true,
          tab2: false,
          tab3: false,
          tab4: false,
        });
        this.props.navigator.push({index : 1});
    }

    toggleTab2() {
        this.setState({
          tab1: false,
          tab2: true,
          tab3: false,
          tab4: false,
        });
        this.props.navigator.push({index : 2});
    }

    toggleTab3() {
        this.setState({
          tab1: false,
          tab2: false,
          tab3: true,
          tab4: false,
        });
        this.props.navigator.push({index : 3});
    }

    toggleTab4() {
        this.setState({
          tab1: false,
          tab2: false,
          tab3: false,
          tab4: true,
        });
        this.props.navigator.push({index : 4});
    }

    render() {
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

                    <Content>
                        <Task />
                        <H3>This is content section</H3>
                        <Text style={{ marginTop: 10 }}>
                           Selected tab is: {this.state.tab1 ? 1 : this.state.tab2 ? 2 : this.state.tab3 ? 3 : 4}
                        </Text>
                        {/* <Navigator
                            initialRoute={{name : "manhinh1"}}
                            renderScene={this.renderScene}
                        /> */}
                    </Content>

                    <Footer>
                        <FooterTab>
                            <Button active={this.state.tab1}
                                onPress={() => this.toggleTab1()}>
                                <Icon name='ios-home' />
                            </Button>
                            <Button active={this.state.tab2}
                                onPress={() => this.toggleTab2()}>
                                <Icon name='ios-notifications' />
                            </Button>
                            <Button active={this.state.tab3}
                                onPress={() => this.toggleTab3()}>
                                <Icon name='ios-calendar' />
                            </Button>
                            <Button active={this.state.tab4}
                                onPress={() => this.toggleTab4()}>
                                <Icon name='md-arrow-forward' />
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
        );
    }
    renderScene(route,navigator){
        switch (route.name) {
            case 'manhinh1':
            console.log('man hinh 1 active');
                return (<Task />);
                break;
        }
    }
}
