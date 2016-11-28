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
import Home from './src/screens/home.js';
import Register from './src/screens/register.js';
import Warning from './src/screens/warning.js';
import Login from './src/screens/login.js';
export default class CReM_FRONTEND extends Component {
    constructor(props){
        super(props);
    }
    render() {
      return (
          <Navigator
              initialRoute={{index : 0}}
              renderScene={this.renderScene}
          />
      );
    }
    renderScene(route,navigator){
        switch (route.index) {
            case 1:{
                return (<Home navigator = {navigator}/>);
                break;
            }
            case 2 :{
                return (<Register navigator = {navigator}/>);
                break;
            }
            case 3 :{
                return (<Warning navigator = {navigator}/>);
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
//AppRegistry.registerComponent('CReM_FRONTEND', () => Home);
//AppRegistry.registerComponent('CReM_FRONTEND', () => Register);
//AppRegistry.registerComponent('CReM_FRONTEND', () => Warning);
