import React,{Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ListView,
  ScrollView,
  StyleSheet,
  Image,Alert,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon,InputGroup,
  Input} from 'native-base';
import * as Progress from 'react-native-progress';
var data = [
<<<<<<< HEAD
  {id:'1',employee_Name:'Dang Thi Hue',parts_Name:'Thu ngan',progress:0.8},
  {id:'2',employee_Name:'Phan Cong Hau',parts_Name:'Bep',progress:0.4},
  {id:'3',employee_Name:'Trinh Thanh Tai',parts_Name:'Bep',progress:0.8},
  {id:'4',employee_Name:'Phan Tuan',parts_Name:'Bep',progress:0.6},
=======
  {id:'1',nhanvien:'Dang Thi Hue',bophan:'Thu ngan',tiendo:0.8},
  {id:'2',nhanvien:'Phan Cong Hau',bophan:'Bep',tiendo:0.4},
  {id:'3',nhanvien:'Trinh Thanh Tai',bophan:'Bep',tiendo:0.8},
  {id:'4',nhanvien:'Phan Tuan',bophan:'Bep',tiendo:0.6},
>>>>>>> develop
];
export default class ManagerHomeListView extends Component{
  constructor(props){
    super(props);
    console.log("vao ManagerHomeListView");
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state={
      dataSource: ds.cloneWithRows(data),
    }
    this.showDetail = this.showDetail.bind(this);
  }
  render(){
    return(
      <Container>

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
                />
              </ScrollView>
            </View>
          </Content>

  </Container>
    );
  }
  renderRow(Item){
    return(
      <View style={styles.bodyDetail}>
<<<<<<< HEAD
        <Text style={{flex:4/10,textAlign:'center'}}>{Item.employee_Name}</Text>
        <Text style={{flex:2/10,textAlign:'center'}}>{Item.parts_Name}</Text>
        <View style={{flex:3/10,alignItems: 'center'}}>
          <Progress.Bar progress = {Item.progress} width={100} />
=======
        <Text style={{flex:4/10,textAlign:'center'}}>{Item.nhanvien}</Text>
        <Text style={{flex:2/10,textAlign:'center'}}>{Item.bophan}</Text>
        <View style={{flex:3/10,alignItems: 'center'}}>
          <Progress.Bar progress = {Item.tiendo} width={100} />
>>>>>>> develop
        </View>
        <View style={{flex:1/10}}>
          <Button onPress = {()=>this.showDetail(Item.id)}>
              Info
          </Button>
        </View>
      </View>
    );
  }
  showDetail(id){
    this.props.navigator.push(
      {
        name:"CommonHomeOfEmployee",
        passProps:{idnv:id}
      }
    );
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
