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

import Task from '../../../components/Task.js';
import StarRating from '../../../components/StarRating.js';
//icon from react-native-vector-icons
const FA = require ('react-native-vector-icons/FontAwesome');
const Iconicons = require ('react-native-vector-icons/Ionicons');
const EvilIcon = require ('react-native-vector-icons/EvilIcons');


export default class UpdateTask extends Component {
    constructor(props) {
        super(props);
        this.goHome = this.goHome.bind(this);
    }
    render() {
        return (
                <Container>
                    <Header>
                        <Button transparent onPress = {this.goHome}>
                            <Icon name='ios-arrow-back' />
                        </Button>
                        <Title>Task Detail</Title>
                    </Header>
                    <Content>
                        <Task
                            navigator = {this.props.navigator}
                            user_id = {this.props.user_id}
                            data = {this.props.data}
                        />
                    </Content>
                </Container>
        );
    }
    goHome(){
        console.log("comback home");
        //this.props.navigator.push({index : 1});
        this.props.navigator.pop();
    }
    getSelected(selected){
        console.log("Dang o UpdateTask.js "+ selected);
    }
}
