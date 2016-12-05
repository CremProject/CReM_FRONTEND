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
        this.state= {
            user_name  : '',
            password : '',
            isLogin : false,
            checkLogin : false
        };
	}
	render(){
		return (
			<Content>
				<View style = {{flex : 1,marginTop : 20,justifyContent : 'space-between',
                    alignSelf : 'center',alignItems : 'center'}}>
                    <H2 style = {{alignSelf : 'center'}}>CReM</H2>
                    <InputGroup style = {{margin : 5,width : 200}}>
                        <Input placeholder='User name'
                            onChangeText = {(text)=>this.setState({user_name : text})}
                            style ={{fontFamily: 'VNFComicSans'}}
                            value = {this.state.user_name}/>
                    </InputGroup>
                   <InputGroup style = {{margin : 5,width : 200}}>
                       <Input placeholder='Password'
                           secureTextEntry
                           onChangeText = {(text)=>this.setState({password : text})}
                           style ={{fontFamily: 'VNFComicSans'}}
                           value = {this.state.password}/>
                   </InputGroup>
    				<Button
                        style = {{alignSelf  : 'center'}}
    					onPress={() => this.login()}>
                        <Text style ={{fontFamily: 'VNFComicSans'}}>
                            LOGIN
                        </Text>
                    </Button>
                    {/* <Button
                        style = {{alignSelf  : 'center'}}
    					onPress={() => this.BODHome()}>
                        Manager
                    </Button> */}
                </View>
			</Content>
		);
	}
	login(){
		console.log("LOGIN!!");
        //xu ly dang nhap 2 laoi user la employee va manager nhay toi 2 route khac nhau
        //id : 1 -BOD | 5-Employee |6-Manager
        //xu ly dang nhap 2 laoi user la employee va manager nhay toi 2 route khac nhau
        var username = this.state.user_name.toUpperCase();
        var password = this.state.password;
        //Viết hàm kiểm tra đăng nhập trên server
        //set state checkLogin cho nó
        var user_id = 0;
        var index = 0;
        switch (username) {
            case "BOD":{
                user_id = 1;
                index = 3;
                break;
            }
            case "MANAGER":{
                user_id = 6;
                index = 2;
                break;
            }
            default:{
                user_id = 5;
                index = 1;
                this.setState({
                    checkLogin : false
                });
                break;
            }

        }
		console.log("LOGIN!!");
        //id : 1 -BOD | 5-Employee |6-Manager
        //xu ly dang nhap 2 laoi user la employee va manager nhay toi 2 route khac nhau
		this.props.navigator.push({
            index : index,
            passProps:{user_id : user_id}
        });
	}
    // BODHome(){
    //     var user_id = 5;
	// 	console.log("REGISTER!!");
    //     this.props.navigator.push({
    //         index : 3,
    //         passProps:{user_id : user_id}
    //     });
	// }
}
