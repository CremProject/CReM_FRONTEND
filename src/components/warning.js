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
const FA = require  ('react-native-vector-icons/FontAwesome');
export default class Warning extends Component{
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          dataSource: ds.cloneWithRows([
            '1', '2','3'])
        };
    }
	render(){
		return(
            <View name = "taskContainer" style = {taskStyle.taskContainer}>
                <View name = "taskHeader" style = {taskStyle.taskHeader}>
                    <H3 style = {{
                        justifyContent : 'center',
                        alignSelf : 'center',
                        marginTop : 2
                        }}>
                        CẢNH BÁO
                    </H3>
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
    				</View>
                    <View name = "taskAssign" style = {taskStyle.taskAssign}>
    					<TextInput placeholder = "Assign" maxWidth = {350}/>
    				</View>
                </View>

                <View name = "taskContent" style = {taskStyle.taskContent}>
                    <View name = "taskDescription" style = {taskStyle.taskDescription}>
                        <TextInput placeholder = "Mô tả" multiline = {true}
                            numberOfLines = {6}
                            style={{textAlignVertical: 'top'}}
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
                            <View>
                                <Image source = {require('../../images/attachment.png')}>
                                </Image>
                            </View>
    					</View>
    				</View>
    				<View name = "taskAction" style = {taskStyle.taskAction}>
    					<View name = "actionSave" style = {taskStyle.actionSave}>
                            <Button block success style = {{margin : 2}}>
                                SAVE
                            </Button>
    					</View>
    					<View name = "actionCancel" style = {taskStyle.actionCancel}>
    						<Button block danger  style = {{margin : 2}}>
                                CANCEL
                            </Button>
    					</View>
    				</View>
                    {/* end taskcontent */}
                </View>
            </View>
		);
	}
}
