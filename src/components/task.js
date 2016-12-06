import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
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
import StarRating from './StarRating.js';
import taskStyle from '../style/taskStyle.js';
import MyDatePicker from './MyDatePicker';
const FA = require  ('react-native-vector-icons/FontAwesome');
//default server information
import config from '../config.json';

//test autoComplete
const data = [
    {name : 'Phat Nguyen',id : '13520604'},
    {name : 'Tai Nguyen',id : '13520757'}
];

export default class Task extends Component{
    constructor(props) {
        super(props);
        // Date constructor
        this.today = new Date();
        this.state = {
            starSelected : 0,
            title : '',
            date : this.today,
            assign : '',
            description : '',
            employee_id : '',
            task_id : '',
            //support for autoComplete
            searched : [],
            loadcomplete : false,
        };
        this.insertNewTask = this.insertNewTask.bind(this);

        //support for autoComplete
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.clickData = this.clickData.bind(this);
        this.renderRowAutoComplete = this.renderRowAutoComplete.bind(this);
        this.autoComplete = this.autoComplete.bind(this);
        this.findData = this.findData.bind(this);
    }
    static propTypes = {
        data: React.PropTypes.object,
        navigator : React.PropTypes.object,
		user_id : React.PropTypes.number,
    };
    componentWillMount(){
        if(this.props.data != null){
            let star = parseInt(this.props.data.priority);
            let id = this.props.data.id;
            let user_id = this.props.user_id;
            let employee_id = this.props.data.employee_id;
            let title = this.props.data.title;
            let date = this.props.data.start_time;
            let description = this.props.data.description;
            this.setState({
                starSelected : star,
                task_id : id,
                user_id : user_id,
                employee_id : employee_id,
                title :  title,
                date :  date,
                description : description,
                priority : star
            });
        }
    }
	render(){
		if(this.props.data == null){
            return(
                <View name = "taskContainer" style = {taskStyle.taskContainer}>
                    <View name = "taskHeader" style = {taskStyle.taskHeader}>
                        <View name = "taskPriory" style = {taskStyle.taskPriory}>
                            <StarRating
                                numOfStar = {4}
                                onClick = {(selected)=>this.getSelected(selected)}
                            />
        				</View>
        				<View name = "rowtaskTitle" style = {taskStyle.rowtaskTitle}>
        					<View name = "taskTitle" style = {taskStyle.taskTitle}>
                                <Input placeholder = "Title"
                                        value = {this.state.title}
                                        onChangeText = {(text)=>this.setState({title : text})}
                                        style ={{fontFamily: 'VNFComicSans'}}
                                />
        					</View>
                            <View name = "taskDate" style = {taskStyle.taskDate}>
                                <MyDatePicker datevalue = {this.today}
                                    onChange = {(datevalue)=>this.setDate(datevalue)}
                                />
        					</View>
        				</View>
                        <View name = "taskAssign" style = {taskStyle.taskAssign}>
        					<Input placeholder = "Assign"
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
                                <Text style ={{fontFamily: 'VNFComicSans'}}>Checklist (Optional)</Text>
        					</View>
        					<View>
                                <View name = "taskAttachments" style = {taskStyle.taskAttachments}>
                                    <View style={{flex :1 ,flexDirection : 'row'}}>
                                        <Text style ={{fontFamily: 'VNFComicSans'}}>Attachments</Text>
                                        <Button transparent>
                                            <FA name = "paperclip" size ={30}/>
                                        </Button>
                                    </View>
            					</View>
                            </View>
        				</View>
        				<View name = "taskAction" style = {taskStyle.taskAction}>
                            <View name = "actionSave" style = {taskStyle.actionSave}>
                                <Button block success style = {{margin : 2}}
                                    onPress = {()=>this.saveTask()}>
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
                    </View>
                    <View name = "taskFooter" style = {taskStyle.taskFooter}>
                        <View name = "commentArea" style = {taskStyle.commentArea}>
                            <Text style ={{fontFamily: 'VNFComicSans'}}>Add a comment</Text>
                            <View name = "commentContentArea" style = {taskStyle.commentContentArea}>
                                <View name = "commentContent" style = {taskStyle.commentContent}>
                                    <TextInput placeholder = "Add your comment"
                                        multiline = {true}
                                        numberOfLines = {4}
                                        style={{textAlignVertical: 'top',fontFamily: 'VNFComicSans'}}
                                    />
                                </View>
                                <View name = "iconAddon" style = {taskStyle.iconAddon}>
                                    <Button transparent>
                                        <FA name = "paperclip" size ={20}/>
                                    </Button>
                                    <Button transparent>
                                        <FA name = "at" size ={20}/>
                                    </Button>
                                    <Button transparent>
                                        <FA name = "smile-o" size ={20}/>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
    		);
        }
        //trường hợp update Task
        else{
            let time = this.props.data.start_time.substr(-8);
            time = time.substr(0,5);

            let title = this.props.data.name;
            let description = this.props.data.description ;

            description = typeof description === 'undefined' ? "Không có mô tả"  : description;
            console.log("detail : "+description);

            console.log("Update Task");

            return(
                <View name = "taskContainer" style = {taskStyle.taskContainer}>
                    <View name = "taskHeader" style = {taskStyle.taskHeader}>
                        <View name = "taskPriory" style = {taskStyle.taskPriory}>
                            <StarRating
                                numOfStar = {4}
                                selected = {this.state.starSelected}
                                onClick = {(selected)=>this.getSelected(selected)}
                                disable = {true}
                            />
        				</View>
        				<View name = "rowtaskTitle" style = {taskStyle.rowtaskTitle}>
        					<View name = "taskTitle" style = {taskStyle.taskTitle}>
                                <Input  value = {title}
                                        editable = {false}
                                        style ={{fontFamily: 'VNFComicSans'}}
                                />
        					</View>
                            <View name = "taskDate" style = {taskStyle.taskDate}>
                                <Input  value = {time}
                                        editable = {false}
                                        style ={{fontFamily: 'VNFComicSans'}}
                                />
        					</View>
        				</View>
                    </View>
                    <View name = "taskContent" style = {taskStyle.taskContent}>
                        <View name = "taskDescription" style = {taskStyle.taskDescription}>
                            <TextInput
                                multiline = {true}
                                numberOfLines = {4}
                                style={{textAlignVertical: 'top',fontFamily: 'VNFComicSans'}}
                                value = {description}
                                editable={false}

                            />
                        </View>
        				<View name = "taskOptional" style = {taskStyle.taskOptional}>
        					<View name = "taskChecklist" style = {taskStyle.taskChecklist}>
                                <Text style ={{fontFamily: 'VNFComicSans'}}>
                                    Checklist (Optional)
                                </Text>
        					</View>
        					<View name = "taskAttachments" style = {taskStyle.taskAttachments}>
                                <Text style ={{fontFamily: 'VNFComicSans'}}>
                                    Attachments(Optional)
                                </Text>
                                <View style={{flex : 1,flexDirection : 'row'}}>
                                    <Button transparent>
                                        <FA name = "picture-o" size ={20}/>
                                    </Button>
                                    <Button transparent>
                                        <FA name = "file" size ={20}/>
                                    </Button>
                                    <Button transparent>
                                        <FA name = "file-pdf-o" size ={20}/>
                                    </Button>
                                </View>
                                <View>
                                    <Button block style = {{margin : 2,backgroundColor :'cyan'}}
                                        onPress = {()=>this.updateTask()}>
                                        <Text style ={{fontFamily: 'VNFComicSans'}}>
                                            <FA name="check-square-o" size={20} />
                                            DONE
                                        </Text>
                                    </Button>
                                </View>
        					</View>
        				</View>
        				<View name = "taskAction" style = {taskStyle.taskAction}>
                            <View name = "actionSave" style = {taskStyle.actionSave}>
                                <Button block style = {{margin : 2,backgroundColor :'gray'}}
                                    onPress = {()=>this.saveTask()}>
                                    <Text style ={{fontFamily: 'VNFComicSans'}}>
                                        <FA name="pause" size={20} />
                                        WAIT FOR
                                    </Text>
                                </Button>
        					</View>
        					<View name = "actionCancel" style = {taskStyle.actionCancel}>
        						<Button block style = {{margin : 2,backgroundColor :'gray'}}
                                    onPress = {()=>this.props.navigator.push({
                                        index : 1,
                                        passProps : {
                                            user_id : this.props.user_id
                                        }
                                    })}>
                                    <Text style ={{fontFamily: 'VNFComicSans'}}>
                                        <FA name="exchange" size={20} />
                                        LATER
                                    </Text>
                                </Button>
        					</View>
        				</View>
                    </View>
                    <View name = "taskFooter" style = {taskStyle.taskFooter}>
                        <View name = "commentArea" style = {taskStyle.commentArea}>
                            <Text style ={{fontFamily: 'VNFComicSans'}}>Add a comment</Text>
                            <View name = "commentContentArea" style = {taskStyle.commentContentArea}>
                                <View name = "commentContent" style = {taskStyle.commentContent}>
                                    <TextInput placeholder = "Add your comment"
                                        multiline = {true}
                                        numberOfLines = {4}
                                        style={{textAlignVertical: 'top',fontFamily: 'VNFComicSans'}}
                                    />
                                </View>
                                <View name = "iconAddon" style = {taskStyle.iconAddon}>
                                    <Button transparent>
                                        <FA name = "paperclip" size ={20}/>
                                    </Button>
                                    <Button transparent>
                                        <FA name = "at" size ={20}/>
                                    </Button>
                                    <Button transparent>
                                        <FA name = "smile-o" size ={20}/>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
    		);
        }
	}
    componentDidMount(){
        console.log("date cua task la : "+this.state.date);
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
        console.log("Thong tin task da nhap gom : " + this.state.user_id);
        var data = {
            user_id : this.props.user_id,
            employee_id : this.state.employee_id || this.props.user_id,
            title :  this.state.title,
            start_time :  this.state.date,
            description : this.state.description,
            priority : this.state.starSelected
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
    updateTask(){
        console.log("Thong tin task da nhap gom : " + this.state.user_id);
        var data = {
            user_id : this.state.user_id,
            employee_id : this.state.employee_id,
            title :  this.state.title,
            start_time :  this.state.date,
            description : this.state.description,
            priority : this.state.priority,
            task_id : this.state.task_id,
            state : "done",
        };
        this.updateTaskToServer(data);
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
        var URL = config.HOST + ":" + config.PORT; //like it http://10.0.3.6:8880
        //var URL = config.HOST2;
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
            if(result === 'OK'){
                //xử lý chưa triệt để khi save thành c6ng !
                this.props.navigator.pop();
                this.props.navigator.refresh();
            }
        }catch(err){
            console.log(err.toString());
        }
    }
    async updateTaskToServer(data){
        console.log("da vao insertNewTask");
        var URL = config.HOST + ":" + config.PORT; //like it http://10.0.3.6:8880
        //var URL = config.HOST2;
        subURL = "/api/task/write/";

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
                // this.props.navigator.push({
                //     index : 1,
                //     passProps:{
                //         user_id : this.state.user_id
                //     }
                // });
                this.props.navigator.pop();
                //this.props.navigator.refresh();
            }
        }catch(err){
            console.log(err.toString());
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
