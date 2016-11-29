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
   ListItem,Picker,Item,H3,H2,
   Badge
} from 'native-base';
export default class Login extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<Content>
				<View style = {{flex : 1,marginTop : 20,justifyContent : 'space-between',
                    alignSelf : 'center',alignItems : 'center'}}>
                    <H2 style = {{alignSelf : 'center'}}>CREM</H2>
                    <InputGroup iconRight success style = {{margin : 5,width : 200}}>
                        <Icon name='ios-checkmark-circle' style={{color:'#00C497'}}/>
                        <Input placeholder='User name'/>
                    </InputGroup>
                    {/* hoặc */}
                    {/* <InputGroup iconRight error>
                       <Icon name='ios-close-circle' style={{color:'red'}}/>
                       <Input placeholder='Textbox with Error Input'/>
                   </InputGroup> */}
                   <InputGroup iconRight success style = {{margin : 5,width : 200}}>
                       <Icon name='ios-checkmark-circle' style={{color:'#00C497'}}/>
                       <Input placeholder='Password'/>
                   </InputGroup>
    				<Button
    					onPress={() => this.login()}>
                        LOGIN
                    </Button>
                    {/* <Button
    					onPress={() => this.register()}
    					>REGISTER
                    </Button> */}
                </View>
			</Content>
		);
	}
	login(){
		console.log("LOGIN!!");
        //xu ly dang nhap 2 laoi user la employee va manager nhay toi 2 route khac nhau
		this.props.navigator.push({index : 1});
	}
    register(){
		console.log("REGISTER!!");
		this.props.navigator.push({index : 2});
	}
}
