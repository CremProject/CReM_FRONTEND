import React, { Component } from 'react';
import {
  AppRegistry,
  taskStyleheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ListView
} from 'react-native';
import { Container, Header, Title,
    Content, Footer, FooterTab,
    Button, Icon,View,Text,
    InputGroup,Input,H3
 } from 'native-base';
import taskStyle from '../style/taskStyle.js';
import config from '../config.json';
import StarRating from './StarRating.js';
const FA = require  ('react-native-vector-icons/FontAwesome');

//test autoComplete
const data = [
    {name : 'Phat Nguyen',id : '13520604'},
    {name : 'Tai Nguyen',id : '13520757'}
];

export default class Notification extends Component{
    constructor(props) {
        super(props);
        this.state = {
            starSelected : 0,
            title : '',
            assign : '',
            description : '',
            placeholder_description : this.props.user_id == 6 ? "Nhân viên/@BOD" : "@Nhà hàng",
        };

        //support for autoComplete
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.clickData = this.clickData.bind(this);
        this.renderRowAutoComplete = this.renderRowAutoComplete.bind(this);
        this.autoComplete = this.autoComplete.bind(this);
        this.findData = this.findData.bind(this);
    }
	render(){
		return(
            <View name = "taskContainer" style = {taskStyle.taskContainer}>
                <View name = "taskHeader" style = {taskStyle.taskHeader}>
                    <H3 style = {{
                        justifyContent : 'center',
                        alignSelf : 'center',
                        marginTop : 2,
                        fontFamily: 'VNFComicSans'
                        }}>
                        CẢNH BÁO
                    </H3>
                    <View name = "taskPriory" style = {taskStyle.taskPriory}>
                        <StarRating
                            numOfStar = {4}
                            onClick = {(selected)=>this.getSelected(selected)}
                        />
    				</View>
    				<View name = "rowtaskTitle" style = {taskStyle.rowtaskTitle}>
    					<View name = "taskTitle" style = {taskStyle.taskTitle}>
    						<Input placeholder = "Tiêu đề"
                                style={{textAlignVertical: 'top',
                                        fontFamily: 'VNFComicSans'}}
                                value = {this.state.title}
                                onChangeText = {
                                    (text)=>this.setState({title : text})}
                            />
    					</View>
    				</View>
                    <View name = "taskAssign" style = {taskStyle.taskAssign}>
                        <Input placeholder = {this.state.placeholder_description}
                            value = {this.state.assign}
                            onChangeText = {(text)=>this.autoComplete(text)}
                            style ={{fontFamily: 'VNFComicSans'}}
                        />
                        {this.state.loadcomplete &&
                            <ListView
                                dataSource={this.ds.cloneWithRows(this.state.searched)}
                                renderRow={this.renderRowAutoComplete}
                                renderSeparator={this.renderSeparator}
                                enableEmptySections={true}
                            />
                        }
                    </View>
                </View>

                <View name = "taskContent" style = {taskStyle.taskContent}>
                    <View name = "taskDescription" style = {taskStyle.taskDescription}>
                        <TextInput placeholder = "Description"
                            multiline = {true}
                            numberOfLines = {4}
                            style={{textAlignVertical: 'top'}}
                            value = {this.state.description}
                            onChangeText = {(text)=>this.setState({description : text})}
                            style ={{fontFamily: 'VNFComicSans',textAlignVertical : 'top'}}
                        />
                    </View>
    				<View name = "taskOptional" style = {taskStyle.taskOptional}>
    					<View name = "taskChecklist" style = {taskStyle.taskChecklist}>
                            <Text style ={{fontFamily: 'VNFComicSans'}}>Checklist(Otional)</Text>
    					</View>
    					<View name = "taskAttachments" style = {taskStyle.taskAttachments}>
                            <View style={{flex :1 ,flexDirection : 'row'}}>
                                <Text style ={{fontFamily: 'VNFComicSans'}}>Attachments</Text>
                                <Button transparent>
                                    <FA name = "paperclip" size ={30}/>
                                </Button>
                            </View>
    					</View>
    				</View>
    				<View name = "taskAction" style = {taskStyle.taskAction}>
    					<View name = "actionSave" style = {taskStyle.actionSave}>
                            <Button block success style = {{margin : 2}}
                                onPress = {()=>this.saveWarning()}>
                                <Text style ={{fontFamily: 'VNFComicSans'}}>
                                    SAVE
                                </Text>
                            </Button>
    					</View>
    					<View name = "actionCancel" style = {taskStyle.actionCancel}>
    						<Button block danger  style = {{margin : 2}}
                                onPress = {()=>this.props.navigator.push({
                                    index : 1,
                                    passProps : {
                                        user_id : this.props.user_id
                                    }
                                })}>
                                <Text style ={{fontFamily: 'VNFComicSans'}}>
                                    CANCEL
                                </Text>
                            </Button>
    					</View>
    				</View>
                    {/* end taskcontent */}
                </View>
            </View>
		);
	}
    saveWarning(){
        console.log("Thong tin task da nhap gom : ");
        var data = {
            user_id : this.props.user_id,
            employee_id : 1,
            title :  this.state.title,
            description : this.state.description,
            priority : 1
        };
        console.log("data o saveWarning " + data.employee_id);
        //xu ly gui len server luu thong tin task
        // let check = this.validate(data);
        // if(!check){
        //     console.log("Invaild");
        // }
        // else{
        //     console.log("request len server thoi");
        //     //goi Ham request du lieu len server
        //     this.insertNewTask(data);
        // }
        console.log("request len server thoi");
        //goi Ham request du lieu len server
        var check = false;
        var index = this.props.user_id === 6 ? 8 : 1;
        console.log(index);
        check = this.insertNewWarning(data);
        if(check){
            this.props.navigator.push({
                inndex : index,
                passProps :{
                    user_id : this.props.user_id,
                }
            });
        }else{
            console.log("Loi khi them warning");
        }
    }
    validate(data){
        let title = data.title;
        let assign = data.employee_id;
        let description = data.description;
        if(title.length == 0 ||
            date.length == 0 ||
            description.length == 0){
            //console.log("title trong");
            return false;
        }
        else{
            return true;
        }
    }
    async insertNewWarning(data){
        console.log("da vao insertNewWarning");
        var URL = config.HOST + ":" + config.PORT; //like it http://10.0.3.6:8880
        subURL = "/api/notification/create/";

        //get full URL
        URL += subURL ;
        console.log(URL);
        var body = JSON.stringify({
            jsonrpc :"2.0",
            method:"call",
            id: new Date().getUTCMilliseconds(),
            params: data
        });
        console.log("body gui di la : " + body);
        try {
            let response = await fetch(URL, {
                method: 'post',
                dataType: 'json',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: body
            });
            let responseJson = await response.json();
            var result = await responseJson.result
            console.log("ket qua truy van : "+result);
            if(result === 'OK'){
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log(err.toString());
            return false;
        }
    }
    getSelected(selected){
        console.log("Dang o UpdateTask.js "+ selected);
        this.setState({
            starSelected : selected,
        });
    }
    //support for autoComplete
    renderRowAutoComplete(data){
        return (
            <View style ={{flex :1 ,flexDirection : 'row'}}>
                <TouchableOpacity
                    style ={{alignItems : 'flex-start'}}
                    onPress = {()=>{this.clickData(data)}}>
                    <View>
                        <Text style ={{fontFamily: 'VNFComicSans'}}>{data.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return (
          <View
            key={`${sectionID}-${rowID}`}
            style={{
              height: adjacentRowHighlighted ? 4 : 1,
              backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
            }}
          />
        );
    }
    clickData(data){
        console.log("onClick !!" + data.id);
        this.setState({
            assign : data.name,
            employee_id : data.id,
            loadcomplete : false,
        });
    }
    autoComplete(text){
        //xử lý lấy searched[]
        search = this.findData(text);
        console.log(search);
        this.setState({
            assign : text,
            loadcomplete : true,
            searched : search,
        });
    }
    findData(query) {
        var result = [];
        if (query === '') {
          result = [];
        }
        if(query.indexOf('@')=== 0){
            query = query.substr(1).toLowerCase().trim();
            result = data.filter(item => item.name.toLowerCase().indexOf(query) > -1);
        }else{
            result = [];
        }
        return result;
    }
    // END OF AUTO COMPLETE
}
