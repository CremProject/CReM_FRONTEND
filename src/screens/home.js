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
import styles from '../style/styles.js';
import Task from '../components/task.js';
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
                    <View style ={{flex : 1,borderWidth : 1,backgroundColor : 'skyblue'}}>
                        <H3>Notification</H3>
                    </View>
                    <View name = "task" style = {styles.listTask} >
                        <Text>Danh sách việc thường ngày</Text>
                            <ListView
                              dataSource={this.state.dataSource}
                              renderRow={(rowData) => <Text>{rowData}</Text>}
                            />
                    </View>
                    <View name = "task" style = {styles.listTask} >
                        <Text>Danh sách việc ngoài lề</Text>
                            <ListView
                              dataSource={this.state.dataSource}
                              renderRow={(rowData) => <Text>{rowData}</Text>}
                            />
                    </View>
                    <View name = "task" style = {styles.listTask} >
                        <Text>Danh sách việc trì hoãn</Text>
                        <ListView
                          dataSource={this.state.dataSource}
                          renderRow={(rowData) => <Text>{rowData}</Text>}
                        />
                    </View>
                </Content>
            </Container>
		);
	}



}
