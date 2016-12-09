/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import EmployeeApp from './src/screens/containers/EmployeeApp.js';
import EmployeeHome from './src/screens/childs/Employee/EmployeeHome.js';

//import ManagerApp from './src/screens/containers/ManagerApp.js';
import ManagerHome from './src/screens/childs/Manager/ManagerHome.js';

//import BODApp from './src/screens/containers/BODApp.js';
import BODHome from './src/screens/childs/BOD/BODHome.js';

import NewTask from './src/screens/childs/templates/NewTask.js';
import UpdateTask from './src/screens/childs/templates/UpdateTask.js';
import NewNotification from './src/screens/childs/templates/NewNotification.js';
import Login from './src/screens/childs/templates/Login.js';
import NotificationList from './src/screens/childs/Manager/NotificationList.js';

export default class CReM_FRONTEND extends Component {
    constructor(props){
        super(props);
    }
    render() {
      return (
          <Navigator
              initialRoute={{index : 0}}
              renderScene={this.renderScene}
              configureScene={(route) => ({
                  ...Navigator.SceneConfigs.HorizontalSwipeJump,
                  gestures: false
              })}
          />
      );
    }
    renderScene(route,navigator){
        switch (route.index) {
            case 1:{
                return (
                    <EmployeeApp
                        navigator = {navigator}
                        user_id = {route.passProps.user_id}/>
                );
                break;
            }
            case 2:{
                return (
                    <ManagerHome
                        navigator = {navigator}
                        user_id = {route.passProps.user_id}/>
                );
                break;
            }
            case 3:{
                return (
                    <BODHome
                        navigator = {navigator}
                        user_id = {route.passProps.user_id}
                    />
                );
                break;
            }
            case 4:{
                return (
                    <NewTask
                        navigator = {navigator}
                        user_id = {route.passProps.user_id}
                    />
                );
                break;
            }
            case 5:{
                return (
                    <UpdateTask
                        navigator = {navigator}
                        user_id = {route.passProps.user_id}
                        data = {route.passProps.data}
                    />
                );
                break;
            }
            case 6:{
              return(
                <NotificationList navigator = {navigator}
                                  user_id = {route.passProps.user_id}
                />
              );
              break;
            }
            default:{
                return (<Login navigator = {navigator}/>);
                break;
            }

        }
    }
}
AppRegistry.registerComponent('CReM_FRONTEND', () => CReM_FRONTEND);
