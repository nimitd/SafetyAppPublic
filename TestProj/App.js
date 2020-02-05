
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
import CreateOrJoin from './Components/CreateOrJoin';
import { Dropdown } from 'react-native-material-dropdown';

export default class App extends Component {

  render () {

    return(
      <View>
        <Text>Hello World</Text>
      </View>
    );
  }
}

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







