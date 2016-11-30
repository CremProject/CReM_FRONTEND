import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
<<<<<<< HEAD
  Navigator,ListView,ActivityIndicator
=======
  Navigator,ListView
>>>>>>> develop
} from 'react-native';
import { Container, Header, Title,
   Content, Footer, FooterTab,
   Button, Icon,View,Text,
   InputGroup,Input,List,
   ListItem,Picker,Item,H3,
   Badge
} from 'native-base';
import styles from '../style/styles.js';
import Task from '../components/task.js';
<<<<<<< HEAD
import config from '../config.json';
export default class Home extends Component{
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
          annual :[],
          delay : [],
          abnormal : [],
          loading: true,
          error: false,
        }

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
          <Text>
            Failed to load posts!
          </Text>
        </View>
      )
    }
		return (
            <Container>
              <Content style = {{margin : 5}}>
                  <View name = "notification" style = {styles.card}>
                      <H3>Notification</H3>
                  </View>
                  <View name = "task" style = {styles.card} >
                      <Text>Danh sách việc thường ngày</Text>
                      <ListView
                        dataSource={this.ds.cloneWithRows(this.state.annual)}
                        renderRow={this.renderRow}
                        enableEmptySections={true}
                      />
                  </View>
                  <View name = "task" style = {styles.card} >
                      <Text>Danh sách việc ngoài lề</Text>
                          <ListView
                            dataSource={this.ds.cloneWithRows(this.state.abnormal)}
                            renderRow={this.renderRow}
                            enableEmptySections={true}
                          />
                  </View>
                  <View name = "task" style = {styles.card} >
                      <Text>Danh sách việc trì hoãn</Text>
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
    return(<Text>{data.name}</Text>);
  }
  async connectserver(){
    console.log("call connectserver");
    var url = config.HOST+":"+config.PORT+"/api/task/getmytask?employee_id=1";
    /*try {
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
      console.log("result:");
       if(result==='OK'){
         if(responseJson.dataset.length > 0){
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
         }
         console.log(responseJson.dataset);
       }
       else {

       }

    }catch(error){
      console.error(error);
      this.setState({loading: false, error: true})
    }*/
  }
=======
export default class Home extends Component{
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
            '1', '2','3','5','12','11','10']),
            tab1: true,
            tab2: false,
            tab3: false,
            tab4: false,
        };
    }
	render(){
		return (
            <Container>
                <Content style = {{margin : 5}}>
                    <View name = "notification" style = {styles.card}>
                        <H3>Notification</H3>
                    </View>
                    <View name = "task" style = {styles.card} >
                        <Text>Danh sách việc thường ngày</Text>
                            <ListView
                              dataSource={this.state.dataSource}
                              renderRow={(rowData) => <Text>{rowData}</Text>}
                            />
                    </View>
                    <View name = "task" style = {styles.card} >
                        <Text>Danh sách việc ngoài lề</Text>
                            <ListView
                              dataSource={this.state.dataSource}
                              renderRow={(rowData) => <Text>{rowData}</Text>}
                            />
                    </View>
                    <View name = "task" style = {styles.card} >
                        <Text>Danh sách việc trì hoãn</Text>
                        <ListView
                          dataSource={this.state.dataSource}
                          renderRow={(rowData) =><Text>{rowData}</Text>}
                        />
                    </View>
                </Content>
            </Container>
		);
	}

    // test(data){
    //     console.log(data);
    //     console.log(this.props.navigator);
    //     this.props.navigator.push({index : 2});
    // }
>>>>>>> develop
}
