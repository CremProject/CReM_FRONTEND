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
  Input,H3,CheckBox} from 'native-base';
import * as Progress from 'react-native-progress';
import config from '../../../config.json';
import styles from '../../../style/styles.js';
import StarRating from '../../../components/StarRating.js';

export default class NotificationList extends Component{
    constructor(props){
        super(props);
        console.log("vao NotificationList");
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
                    <Button onPress = {()=>this.props.navigator.pop()}>
                        <Icon name = 'ios-arrow-back'/>
                    </Button>
                    <Title>Notification</Title>
                </Header>
                <Content>
                    <View style={{flexDirection: 'column'}}>
                        <View style={styles.headerList}>
                            <Text style={{flex:4/20,textAlign:'center'}}>Người tạo</Text>
                            <Text style={{flex:4/20,textAlign:'center'}}>Thời gian</Text>
                            <Text style={{flex:1/20,textAlign:'center'}}></Text>
                            <Text style={{flex:3/20,textAlign:'center'}}>Nội dung</Text>
                            <Text style={{flex:4/20,textAlign:'center'}}>Ưu tiên</Text>
                            <Text style={{flex:4/20,textAlign:'center'}}></Text>
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
      let checked = true;
      if(Item.status==='draft'){
        checked = false
      }
        return(
            <View style={styles.bodyDetail}>
                <Text style={{flex:4/20,textAlign:'center'}}>{Item.employee_name}</Text>
                <Text style={{flex:4/20,textAlign:'center'}}>{Item.start_time}</Text>
                <View style={{flex:1/20,alignItems: 'center'}}>
                  <CheckBox checked={checked} />
                </View>
                <Text style={{flex:3/20,textAlign:'center'}}>{Item.title}</Text>
                <View style={{flex:4/20,paddingRight:10}}>
                <StarRating
                    numOfStar = {4}
                    selected = {Item.priority}
                    disable = {true}
                />
                </View>
                <View style={{flex:4/20,alignItems: 'center',flexDirection:'row',paddingLeft:5}}>
                  <Button transparent style={{flex:1/3,alignItems: 'center'}}>
                      <Icon name = 'ios-call'/>
                  </Button>
                  <Button transparent style={{flex:1/3,alignItems: 'center'}}>
                      <Icon name = 'ios-megaphone'/>
                  </Button>
                  <Button transparent style={{flex:1/3,alignItems: 'center'}}>
                      <Icon name = 'ios-information-circle'/>
                  </Button>
                </View>
            </View>
        );
    }
    showDetail(id){
        console.log("ID employee_id : "+ id);
    	this.props.navigator.push(
        	{
        	    index : 1,
        	    passProps:{user_id : id}
        	}
    	);
    }

    //fix lai ham nay dua vaoo api tren drive
    async connectserver(){
        console.log("call connectserver");
        var url = config.HOST+":"+config.PORT+"/api/getallnotification?manager_id=1"
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
