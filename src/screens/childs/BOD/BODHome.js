import React,{Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ListView,
  ScrollView,
  StyleSheet,
  Image,Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
    Container, Header, Title, Content, Footer,
    FooterTab, Button, Icon,InputGroup,
    Input
} from 'native-base';
import config from '../../../config.json';
import * as Progress from 'react-native-progress';
var data = [
  // {id:'1', resstaurant_name:'Dang Thi Hue',address : 'Nguyen Van Troi ,Q1',phone : '0909123456',manager_id : '6',progress:0.8},
  // {id:'2', resstaurant_name:'Phan Cong Hau',address : 'Nguyen Van Troi ,Q1',phone : '0909123456',manager_id : '6',progress:0.4},
  // {id:'3', resstaurant_name:'Trinh Thanh Tai',address : 'Nguyen Van Troi ,Q1',phone : '0909123456',manager_id : '6',progress:0.8},
  // {id:'4', resstaurant_name:'Phan Tuan',address : 'Nguyen Van Troi ,Q1',phone : '0909123456',manager_id : '6',progress:0.6},
];
export default class BODHome extends Component{
    constructor(props){
        super(props);
        console.log("vao BODHomeListView");
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
          dataSource: this.ds.cloneWithRows(data),
          dataset : [],
          loading: true,
          error: false,
        }
        this.showDetail = this.showDetail.bind(this);
    }
    componentWillMount(){
        this.connectserver();
    }
    render(){
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
                    <Title>BOD Home Manager</Title>
                </Header>
                <Content>
                    <View style={{flexDirection: 'column'}}>
                        <View style={styles.headerList}>
                            <Text style={{flex:6/10,textAlign:'center'}}>Tên nhà hàng</Text>
                            <Text style={{flex:3/10,textAlign:'center'}}>Tình trạng</Text>
                            <Text style={{flex:1/10,textAlign:'center'}}></Text>
                        </View>
                        <ScrollView style={styles.bodyList}>
                            <ListView
                              dataSource={this.state.dataSource}
                              renderRow={this.renderRow.bind(this)}
                            />
                        </ScrollView>
                    </View>
                </Content>
            </Container>
        );
    }
    renderRow(Item){
        console.log("MANAGER ID"+Item.manager_id);
        return(
            <View style={styles.bodyDetail}>
                <Text style={{flex:6/10,textAlign:'center'}}>{Item.restaurant_name} -- {Item.address} </Text>
                <View style={{flex:3/10,alignItems: 'center'}}>
                   <Progress.Bar progress = {Item.progress} width={100} />
                </View>
                <View style={{flex:1/10}}>
                   <Button onPress = {()=>this.showDetail(Item.manager_id)}>
                       (i)
                   </Button>
                </View>
            </View>
        );
    }
    showDetail(id){
    	this.props.navigator.push(
        	{
        	    index : 3,
        	    passProps:{user_id : this.props.user_id}
        	}
    	);
    }
    async connectserver(){
        console.log("call connectserver");
        var url = config.HOST+":"+config.PORT+"/api/getmanagers?bod_id="+this.props.user_id;
        console.log(url);
        try {
          var options = {
            method : 'get',
            dataType : 'json',
            headers : {
                    'Content-Type': 'text/html'
            }
          };
          let response = await fetch(url,options)
          let responseJson = await response.json();
          var result = responseJson.result;
          console.log("result:");
           if(result==='OK'){
             if(responseJson.dataset.length > 0){
                 var data = [];
               for(let i=0;i<responseJson.dataset.length;i++){
                  data.push(responseJson.dataset[i]);
               }
               this.setState({
                 dataset : data,
                 dataSource : this.ds.cloneWithRows(data),
                 loading:false,
               });
             }
             console.log(responseJson.dataset);
           }
           else {

           }

        }catch(error){
          console.error(error);
          this.setState({loading: false, error: true})
        }
    }

}
const styles = StyleSheet.create({
  headerList:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#A4A4A4',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  bodyList:{
    flex:1
  },
  bodyDetail:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#FFFFFF',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});
