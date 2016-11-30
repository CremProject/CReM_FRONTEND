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
    InputGroup,Input
 } from 'native-base';

import DatePicker from 'react-native-datepicker';
import taskStyle from '../style/taskStyle.js';
import MyDatePicker from './MyDatePicker';
const FA = require  ('react-native-vector-icons/FontAwesome');
//default server information
import config from '../config.json';
export default class Task extends Component{
    constructor(props) {
        super(props);
        // Date constructor
        this.today = new Date();
        //get config url
        this.HOST = config.HOST;
        this.PORT = config.PORT;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
            '1', '2','3']),
            title : '',
            date : '',
            assign : '',
            description : ''
        };
        this.insertNewTask = this.insertNewTask.bind(this);
        console.log("o taskjs "+this.state.date);
        console.log("user_id",this.props.user_id);
    }
	render(){
		return(
            <View name = "taskContainer" style = {taskStyle.taskContainer}>
                <View name = "taskHeader" style = {taskStyle.taskHeader}>
                    <View name = "taskPriory" style = {taskStyle.taskPriory}>
                        <Button transparent>
                            <Icon name = 'ios-star'/>
                        </Button>
                        <Button transparent>
                            <Icon name = 'ios-star'/>
                        </Button>
                        <Button transparent>
                            <Icon name = 'ios-star'/>
                        </Button>
                        <Button transparent>
                            <Icon name = 'ios-star'/>
                        </Button>
    				</View>
    				<View name = "rowtaskTitle" style = {taskStyle.rowtaskTitle}>
    					<View name = "taskTitle" style = {taskStyle.taskTitle}>
    						<TextInput placeholder = "Tiêu đề"
                                style={{textAlignVertical: 'top'}}/>
    					</View>
    					<View name = "taskDate" style = {taskStyle.taskDate}>
                            <TextInput placeholder = "28/11/2016"/>
    					</View>
    					<View name = "iconCalendar" style = {taskStyle.iconCalendar}>
                            <TouchableOpacity>
                                <View>
                                    <Image source = {require('../../images/calendar.png')}>
                                    </Image>
                                </View>
                            </TouchableOpacity>
                        </View>
    				</View>
                    <View name = "taskAssign" style = {taskStyle.taskAssign}>
    					<TextInput placeholder = "Assign" maxWidth = {350}/>
                                value = {this.state.title}
                                onChangeText = {(text)=>this.setState({title : text})}
                                style={{textAlignVertical: 'center'}}/>
    					</View>
    					<View name = "taskDate" style = {taskStyle.taskDate}>
                            <MyDatePicker datevalue = {this.today}
                                onChange = {(datevalue)=>this.setDate(datevalue)}
                            />
    					</View>
    				</View>
                    <View name = "taskAssign" style = {taskStyle.taskAssign}>
    					<TextInput placeholder = "Assign" maxWidth = {350}
                            value = {this.state.assign}
                            onChangeText = {(text)=>this.setState({assign : text})}
                        />
    				</View>
                </View>

                <View name = "taskContent" style = {taskStyle.taskContent}>
                    <View name = "taskDescription" style = {taskStyle.taskDescription}>
                        <TextInput placeholder = "Mô tả" multiline = {true}
                            numberOfLines = {6}
                            style={{textAlignVertical: 'top'}}
                        <TextInput placeholder = "Description" multiline = {true}
                            numberOfLines = {6}
                            style={{textAlignVertical: 'top'}}
                            value = {this.state.description}
                            onChangeText = {(text)=>this.setState({description : text})}
                        />
                    </View>
    				<View name = "taskOptional" style = {taskStyle.taskOptional}>
    					<View name = "taskChecklist" style = {taskStyle.taskChecklist}>
                            <Text>Checklist</Text>
                            <ListView
                              dataSource={this.state.dataSource}
                              renderRow={(rowData) => <Text>{rowData}</Text>}
                            />
    					</View>
    					<View name = "taskAttachments" style = {taskStyle.taskAttachments}>
                            <Text>Attachments</Text>
                            <Text>Checklist (Optional)</Text>
                            {/* <ListView
                              dataSource={this.state.dataSource}
                              renderRow={(rowData) => <Text>{rowData}</Text>}
                            /> */}
    					</View>
    					<View name = "taskAttachments" style = {taskStyle.taskAttachments}>
                            <Text>Attachments(Optional)</Text>
                            <View>
                                <Image source = {require('../../images/attachment.png')}>
                                </Image>
                            </View>
    					</View>
    				</View>
    				<View name = "taskAction" style = {taskStyle.taskAction}>
                        <View name = "actionSave" style = {taskStyle.actionSave}>
                            <Button block success style = {{margin : 2}}
                                onPress = {()=>this.saveTask()}>
                                SAVE
                            </Button>
    					</View>
    					<View name = "actionCancel" style = {taskStyle.actionCancel}>
    						<Button block danger  style = {{margin : 2}}>
                                {/* <Icon name = 'ios-megaphone'/> */}
                                CANCEL
                            </Button>
    					</View>
    				</View>
                </View>
                <View name = "taskFooter" style = {taskStyle.taskFooter}>
                    <View name = "commentArea" style = {taskStyle.commentArea}>
                        <Text>Add a comment</Text>
                        <View name = "commentContentArea" style = {taskStyle.commentContentArea}>
                            <View name = "commentContent" style = {taskStyle.commentContent}>
                                <TextInput placeholder = "Add your comment" multiline = {true}
                                    numberOfLines = {6}
                                    style={{textAlignVertical: 'top'}}
                                />
                            </View>
                            <View name = "iconAddon" style = {taskStyle.iconAddon}>
                                <Image source =  {require('../../images/attachment.png')} />
                                <Image source =  {require('../../images/at.png')} />
                                <Image source =  {require('../../images/smile.png')} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
		);
	}
    setDate(date){
        console.log("task Date : "+date);
        console.log(typeof date);
        this.setState({
            date : date
        });
        console.log(this.state.date);
    }
    saveTask(){
        console.log("Thong tin task da nhap gom : ");
        var data = {
            user_id : this.props.user_id,
            employee_id : this.state.user_id,
            title :  this.state.title,
            start_time :  this.state.date,
            description : this.state.description,
            priority : 1
        };
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
        this.insertNewTask(data);
    }
    validate(data){
        let title = data.title;
        let date = data.start_time;
        let assign = data.employee_id;
        let description = data.description;
        if(title.length == 0 ||
            date.length == 0 ||
            assign.length == 0||
            description.length == 0){
            //console.log("title trong");
            return false;
        }
        else{
            return true;
        }
    }
    async insertNewTask(data){
        console.log("da vao insertNewTask");
        var URL = this.HOST + ":" + this.PORT; //like it http://10.0.3.6:8880
        subURL = "/api/task/create/";

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
        }catch(err){
            console.log(err.toString());
        }
    }
}
Task.propTypes = {
    //dinh nghi kieu du lieu truyen vao cua Task
  // datevalue: React.PropTypes.object,
  // onChange : React.PropTypes.func
};
