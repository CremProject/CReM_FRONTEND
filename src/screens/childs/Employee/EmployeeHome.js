import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,TouchableOpacity,
  Navigator,ListView,ActivityIndicator,
} from 'react-native';
import { Container, Header, Title,
   Content, Footer, FooterTab,
   Button, Icon,View,Text,
   InputGroup,Input,List,
   ListItem,Picker,Item,H3,
   Badge,CheckBox
} from 'native-base';
import styles from '../../../style/styles.js';
import Task from '../../../components/Task.js';
import config from '../../../config.json';
export default class EmployeeHome extends Component{
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
          annual :[],
          delay : [],
          abnormal : [],
          loading: true,
          error: false,
          notification : true,
        };
        this.renderRow = this.renderRow.bind(this);

    }
    componentWillMount(){
        this.connectserver();
    }
    componentDidMount(){
    }
	render(){
        console.log("render");
        const {loading,error}=this.state;
        if (loading) {
          return (
            <View style={styles.center}>
              <ActivityIndicator animating={true} />
            </View>
          )
        }
        if (error) {
          return (
            <View style={styles.center}>
              <Text style ={{fontFamily: 'VNFComicSans'}}>
                Failed to load posts!
              </Text>
            </View>
          )
        }
    		return (
                <Container>
                  <Content style = {{margin : 5}}>
                      <Button onPress = {()=>this.props.navigator.pop()}>Back<Icon name = 'ios-arrow-back'/></Button>
                        { this.state.notification &&
                            <View name = "notification" style = {styles.notification}>
                              <View style={{alignSelf : 'flex-end'}}>
                                  <Button onPress = {()=>{this.setState({notification : false});}}>
                                      <Icon name="ios-close"/>
                                  </Button>
                              </View>
                              <H3 style ={{fontFamily: 'VNFComicSans'}}>Notification</H3>
                            </View>
                        }
                      <View name = "task" style = {styles.card} >
                          <H3 style ={{fontFamily: 'VNFComicSans',margin : 2}}>Danh sách việc thường ngày</H3>
                          <ListView
                            dataSource={this.ds.cloneWithRows(this.state.annual)}
                            renderRow={this.renderRow}
                            enableEmptySections={true}
                          />
                      </View>
                      <View name = "task" style = {styles.card} >
                          <H3 style ={{fontFamily: 'VNFComicSans',margin : 2}}>Danh sách việc ngoài lề</H3>
                              <ListView
                                dataSource={this.ds.cloneWithRows(this.state.abnormal)}
                                renderRow={this.renderRow}
                                enableEmptySections={true}
                              />
                      </View>
                      <View name = "task" style = {styles.card} >
                          <H3 style ={{fontFamily: 'VNFComicSans',margin : 2}}>Danh sách việc trì hoãn</H3>
                          <ListView
                            dataSource={this.ds.cloneWithRows(this.state.delay)}
                            renderRow={this.renderRow}
                            enableEmptySections={true}
                          />
                      </View>
                  </Content>
                </Container>
    		);
	}
    renderRow(data){
        var text = data.start_time;
        var state = data.state;
        text = text.substr(-8);
        text = text.substr(0,5);
        return(
            <TouchableOpacity onPress = {(text)=>this.onClickItem(data)}>
                <View style={{flex :1 ,flexDirection : 'row'}}>
                    <View style={{flex : 1/5,flexDirection:'row',marginRight : 2}}>
                    {/* xu ly checkbox khi task da hoan thanh */}
                        <CheckBox checked={state === "draft" ? false : true}
                            onPress = {()=>this.onTick(data)}/>
                        <Text style ={{fontFamily: 'VNFComicSans'}}>{text}</Text>
                    </View>
                    <Text style={{flex : 4/5}}>{data.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    onClickItem(data){
        console.log("Hello click item : "+ data.name );
        this.props.navigator.push({
            index : 5,
            passProps:{
                user_id : this.props.user_id,
                data : data,
            }
        });
    }
    onTick(data){
        console.log("Hello tick item : "+ data.name );
    }
    async connectserver(){
        console.log("call connectserver");
        var url = config.HOST+":"+config.PORT+"/api/task/getmytask?employee_id=1" ;
        //var url = config.HOST2 + "/api/task/getmytask?employee_id="+this.props.user_id;
        console.log(url);
        try {
          var options = {
            method : 'get',
            dataType : 'json',
            headers : {
                    'Content-Type': 'text/html'
                    }
            // body : JSON.stringify({
            //   jsonrpc : '2.0',
            //   method : 'call',
            //   id :new Date().getUTCMilliseconds(),
            //   params: {
            //     user_id : 5
            //   }
            // })
          };
          let response = await fetch(url,options)
          let responseJson = await response.json();
          var result = responseJson.result;
          console.log("result:" + result);
           if(result==='OK'){
             if(responseJson.dataset.length > 0){
                 console.log(responseJson.dataset);
               var _annual = [];
               var _abnormal =[];
               var _delay = [];
               for(let i=0;i<responseJson.dataset.length;i++){
                 if(responseJson.dataset[i].type==='1'){
                   _annual.push(responseJson.dataset[i]);
                 }
                 if(responseJson.dataset[i].type==='2'){
                   _abnormal.push(responseJson.dataset[i]);
                 }
                 if(responseJson.dataset[i].type==='3'){
                   _delay.push(responseJson.dataset[i]);
                 }
               }
               this.setState({
                 annual : _annual,
                 abnormal : _abnormal,
                 delay : _delay,
                 loading:false
               });
           }else{
               this.setState({
                 error : false,
                 loading:false
               });
           }
           }
           else {
           }

        }catch(error){
          console.error(error);
          this.setState({loading: false, error: true})
        }
    }
}
