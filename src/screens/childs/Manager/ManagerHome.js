import React,{Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ListView,
  ScrollView,
  StyleSheet,
  Image,Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon,InputGroup,
  Input,H3} from 'native-base';
import * as Progress from 'react-native-progress';
import config from '../../../config.json';
import styles from '../../../style/styles.js';
export default class ManagerHome extends Component{
    constructor(props){
        super(props);
        console.log("vao ManagerHomeListView");
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
          dataSource: [],
          loading: true,
          error: false,
          notification : true,
        }
        this.showDetail = this.showDetail.bind(this);
    }
    componentWillMount(){
        this.connectserver();
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
              <Text>
                Failed to load posts!
              </Text>
            </View>
          )
        }
        return(
            <Container>
                <Header>
                    <Button transparent onPress = {()=>this.props.navigator.pop()}>
                        <Icon name = 'ios-arrow-back'/>
                    </Button>
                    <Title style ={{fontFamily: 'VNFComicSans'}}>Manager Home</Title>
                    <Button transparent onPress = {()=>{this.props.navigator.push({
                        index : 8,
                        passProps:{
                            user_id : this.props.user_id,
                        }
                    })}}>
                        <Icon name = 'ios-menu'/>
                    </Button>
                </Header>
                <Content>
                  <Button transparent onPress={()=>{this.props.navigator.push({index: 6 , passProps: { user_id:this.props.user_id } })}}>
                    <Icon name="ios-warning"/>
                  </Button>
                    { this.state.notification &&
                        <View name = "notification" style = {styles.notification}>
                          <View style={{alignSelf : 'flex-end'}}>
                              <Button transparent onPress = {()=>{this.setState({notification : false});}}>
                                  <Icon name="ios-close"/>
                              </Button>
                          </View>
                          <H3 style ={{fontFamily: 'VNFComicSans'}}>Notification</H3>
                        </View>
                    }
                    <View style={{flexDirection: 'column'}}>
                        <View style={styles.headerList}>
                            <Text style={{flex:4/10,textAlign:'center',fontFamily: 'VNFComicSans'}}>Nhân viên</Text>
                            <Text style={{flex:2/10,textAlign:'center',fontFamily: 'VNFComicSans'}}>Bộ phận</Text>
                            <Text style={{flex:3/10,textAlign:'center',fontFamily: 'VNFComicSans'}}>Tình trạng</Text>
                            <Text style={{flex:1/10,textAlign:'center'}}></Text>
                        </View>
                        <ScrollView style={styles.bodyList}>
                            <ListView
                              dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                              renderRow={this.renderRow.bind(this)}
                              enableEmptySections={true}
                            />
                        </ScrollView>
                    </View>
                </Content>
            </Container>
        );
    }
    componentDidMount(){
    }
    renderRow(Item){
        return(
            <View style={styles.bodyDetail}>
                <Text style={{flex:4/10,textAlign:'center',fontFamily: 'VNFComicSans'}}>{Item.employee_Name}</Text>
                <Text style={{flex:2/10,textAlign:'center',fontFamily: 'VNFComicSans'}}>{Item.parts_Name}</Text>
                <View style={{flex:3/10,alignItems: 'center'}}>
                   <Progress.Bar progress = {Item.progress} width={100} />
                </View>
                <View style={{flex:1/10}}>
                   <Button transparent onPress = {()=>this.showDetail(Item.id,Item.employee_Name,Item.parts_Name)}>
                       <Icon name = "ios-information-circle" />
                   </Button>
                </View>
            </View>
        );
    }
    showDetail(id,employee_Name,parts_Name){
        console.log("ID employee_id : "+ id);
    	this.props.navigator.push(
        	{
        	    index : 7,
        	    passProps:{user_id : id,employee_Name: employee_Name,parts_Name:parts_Name}
        	}
    	);
    }

    //fix lai ham nay dua vaoo api tren drive
    async connectserver(){
        console.log("call connectserver");
        var url = config.HOST+":"+config.PORT+"/api/getstatusemp?manager_id=1"
        console.log(url);
        try {
          var options = {
            method : 'get',
            dataType : 'json',
            headers : {
                    'Content-Type': 'text/html'
                },
            // body : JSON.stringify({
            //   jsonrpc : '2.0',
            //   method : 'call',
            //   id :new Date().getUTCMilliseconds(),
            //   params: {
            //     manager_id : this.props.user_id
            //   }
            // })
          };
          let response = await fetch(url,options)
          let responseJson = await response.json();
          var result = responseJson.result;
          console.log("result:");
           if(result==='OK'){
                if(responseJson.dataset.length > 0){
                    var dataset = [];
                    for(let i=0;i<responseJson.dataset.length;i++){
                        dataset.push(responseJson.dataset[i]);
                    }
                    this.setState({
                     dataSource : dataset,
                     loading:false
                    });
                }
                else {
                  this.setState({
                    loading: false,
                  });
                }
                console.log(responseJson.dataset);
           }
           else {
             this.setState({
               loading: false,
             });
           }

        }catch(error){
          console.error(error);
          this.setState({loading: false, error: true})
        }
    }
}
