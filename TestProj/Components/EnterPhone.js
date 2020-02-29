import React, { Component } from 'react';
import { Platform, 
        StyleSheet, 
        Text, 
        TextInput, 
        View, 
        KeyboardAvoidingView, 
        Button,
        TouchableHighlight} from 'react-native';
import EnterCode from './EnterCode';
import {styles} from '../styles/main_styles'

import Constants from "expo-constants";
const { manifest } = Constants;
import axios from 'axios';

export default class EnterPhone extends Component {

  constructor(props) {
    super(props);
    // this.login = props.onLogin;
    this.uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;
    this.suid = props.suid;
    this.state = {hasSubmitted: false, phonenumber: '',}
    }

  logPhoneNumber = () => {
    // Send Name and SUID to server for account creation
    const body = {phonenumber: this.state.phonenumber, suid: this.suid};
    console.log(body);
    axios.post(this.uri + '/updatePhoneNumber', body)
        .then(res =>  {
          this.props.navigation.navigate('Code');
        })
        .catch((error) => {
          if (error.response){
            Alert.alert("insert error")
          console.log(error)
          }
      });
    console.log("phone number added: " + this.state.phonenumber);
  }

  render() {
    return(
      <View style = {styles.container}>
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.welcome}>Welcome to Stanford Safety.</Text>
            <Text style={styles.instructions}>To sign up, please enter your phone number:</Text>
            <TextInput style={styles.phonenumber}
              editable
              maxLength={10}
              placeholder="000-000-0000"
              returnKeyType='done'
              keyboardType='phone-pad'
              onSubmitEditing= {(event) => this.setState({phonenumber: event.nativeEvent.text})}
            />
            <Text style={styles.warning}>(Don't worry, we will never share your number with anyone without your permission.)</Text>
        </KeyboardAvoidingView>
        <View style = {styles.buttonSpaceContainer}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.logPhoneNumber}>
            <Text style={styles.loginText}>Enter</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}