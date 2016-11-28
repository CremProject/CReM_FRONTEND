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
   Badge
} from 'native-base';
export default class Login extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<Content>
				<H3>Hello Login !!</H3>
				<Button
					onPress={() => this.login()}
					>LOGIN</Button>
			</Content>
		);
	}
	login(){
		console.log("LOGIN!!");
		this.props.navigator.push({index : 1});
	}
}
