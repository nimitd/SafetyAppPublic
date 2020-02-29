// cite: https://www.bootdey.com/react-native-snippet/9/Login-form-ui-example

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button, 
  TouchableHighlight,
  Alert,
  Picker
} from 'react-native';

//import CreateOrJoin from './Components/CreateOrJoin';
//import * as Components from './Components';
import EnterPhone from './Components/EnterPhone';
import Register from './Components/Register'
import CreateOrJoin from './Components/CreateOrJoin'
import { Dropdown } from 'react-native-material-dropdown';
import MakeCommunity from './Components/MakeCommunity'
import JoinCommunity from './Components/JoinCommunity'
import LocationSharing from './Components/locationSharing'
import Loading from './Components/Loading'
import EnterCode from './Components/EnterCode'


// backend connect code
import Constants from "expo-constants";
const { manifest } = Constants;
import axios from 'axios';


// navigation imports
import { createAppContainer, createSwitchNavigator, StackNavigator, SwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;

const OnboardingStack = createStackNavigator({
  Landing: {
    screen: Register,
    navigationOptions: {
    },
  },
  Phone: {
    screen: EnterPhone,
    navigationOptions: {
      headerTitle: 'Sign In',
    },
  },
  CreateJoin: {
    screen: CreateOrJoin,
    navigationOptions: {
      headerTitle: 'Create Account',
    },
  },
  Join: {
    screen: JoinCommunity,
    navigationOptions: {
      headerTitle: 'Create Account',
    },
  },
  Create: {
    screen: MakeCommunity,
    navigationOptions: {
      headerTitle: 'Create Account',
    },
  },
  Code: {
    screen: EnterCode,
    navigationOptions: {
      headerTitle: 'Create Account',
    },
  }
}, {initialRouteName: 'Landing'})


export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: Loading,
    Home : LocationSharing,
    Onboarding : OnboardingStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#DCDCDC',
  },
  buttonSpaceContainer: {
    flex: 0.5, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  textboxcontainers: {
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 30,
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center',
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "maroon",
  },
  loginText: {
    color: 'white',
    fontSize: 20,
  },
  dropdown: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
});