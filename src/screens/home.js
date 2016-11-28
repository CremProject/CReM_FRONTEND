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
                <Header searchBar rounded>
                    <InputGroup>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                        <Icon name="ios-people" />
                        <Button transparent>
                            <Icon name='ios-create'/>
                        </Button>
                    </InputGroup>
                    <Button transparent>
                        Search
                    </Button>
                </Header>

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
                    {/* <H3>This is content section</H3>
                    <Text style={{ marginTop: 10 }}>
                       Selected tab is: {this.state.tab1 ? 1 : this.state.tab2 ? 2 : this.state.tab3 ? 3 : 4}
                    </Text> */}
                </Content>

                <Footer>
                    <FooterTab>
                        <Button active={this.state.tab1}
                            onPress={() => this.toggleTab1()}>
                            <Icon name='ios-home' />
                        </Button>
                        <Button active={this.state.tab2}
                            onPress={() => this.toggleTab2()}>
                            <Icon name='ios-megaphone' />
                        </Button>
                        <Button active={this.state.tab3}
                            onPress={() => this.toggleTab3()}>
                            <Icon name='ios-calendar' />
                        </Button>
                        <Button active={this.state.tab4}
                            onPress={() => this.toggleTab4()}>
                            <Icon name='md-arrow-forward' />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
		);
	}
    toggleTab1() {
        this.setState({
          tab1: true,
          tab2: false,
          tab3: false,
          tab4: false,
        });
        this.props.navigator.push({index : 1});
    }

    toggleTab2() {
        this.setState({
          tab1: false,
          tab2: true,
          tab3: false,
          tab4: false,
        });
        this.props.navigator.push({index : 2});
    }

    toggleTab3() {
        this.setState({
          tab1: false,
          tab2: false,
          tab3: true,
          tab4: false,
        });
        this.props.navigator.push({index : 3});
    }

    toggleTab4() {
        this.setState({
          tab1: false,
          tab2: false,
          tab3: false,
          tab4: true,
        });
        this.props.navigator.push({index : 4});
    }


}
