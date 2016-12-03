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
  Input} from 'native-base';
import * as Progress from 'react-native-progress';
import config from '../../../config.json';
var data = [
  {id:'1',employee_Name:'Dang Thi Hue',parts_Name:'Thu ngan',progress:0.8},
  {id:'2',employee_Name:'Phan Cong Hau',parts_Name:'Bep',progress:0.4},
  {id:'3',employee_Name:'Trinh Thanh Tai',parts_Name:'Bep',progress:0.8},
  {id:'4',employee_Name:'Phan Tuan',parts_Name:'Bep',progress:0.6},
];
export default class ManagerHome extends Component{
    constructor(props){
        super(props);
        console.log("vao ManagerHomeListView");
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
                    <Title>Manager Home</Title>
                </Header>
                <Content>
                    <View style={{flexDirection: 'column'}}>
                        <View style={styles.headerList}>
                            <Text style={{flex:4/10,textAlign:'center'}}>Nhan vien</Text>
                            <Text style={{flex:2/10,textAlign:'center'}}>Bo phan</Text>
                            <Text style={{flex:3/10,textAlign:'center'}}>Tinh Trang</Text>
                            <Text style={{flex:1/10,textAlign:'center'}}></Text>
                        </View>
                        <ScrollView style={styles.bodyList}>
                            <ListView
                              dataSource={this.state.dataSource}
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
                <Text style={{flex:4/10,textAlign:'center'}}>{Item.employee_Name}</Text>
                <Text style={{flex:2/10,textAlign:'center'}}>{Item.parts_Name}</Text>
                <View style={{flex:3/10,alignItems: 'center'}}>
                   <Progress.Bar progress = {Item.progress} width={100} />
                </View>
                <View style={{flex:1/10}}>
                   <Button onPress = {()=>this.showDetail(Item.id)}>
                       (i)
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
                     dataSource : this.ds.cloneWithRows(dataset),
                     dataset : dataset,
                     loading:false
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
