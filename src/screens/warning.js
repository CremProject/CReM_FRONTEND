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
 import Warning from '../components/warning.js';
//icon from react-native-vector-icons
const FA = require ('react-native-vector-icons/FontAwesome');
const styless = require('../style/styles');
const Iconicons = require ('react-native-vector-icons/Ionicons');
const EvilIcon = require ('react-native-vector-icons/EvilIcons');


export default class WarningHome extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <Content>
                    <Warning />
                </Content>
            </Container>
        );
    }
}
