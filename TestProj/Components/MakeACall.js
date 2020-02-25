import React, { Component } from 'react';
import { Platform, 
        StyleSheet, 
        Text, 
        TextInput, 
        View, 
        KeyboardAvoidingView, 
        TouchableOpacity,
        Button,
        Alert,
        Linking,
        TouchableHighlight} from 'react-native';
import EnterCode from './EnterCode';
import call from 'react-native-phone-call';
//import SendSMS from 'react-native-sms';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
// });

import Constants from "expo-constants";
const { manifest } = Constants;
import axios from 'axios';

export default class EnterPhone extends Component {

  constructor(props) {
    super(props);
    this.login = props.onLogin;
    this.uri = props.uri;
    this.suid = props.suid;
    this.state = {hasSubmitted: false, phonenumber: '',}
    }

  // let onSubmit = (event) => {
  //   this.setState({phonenumber: event.text, hasSubmitted: true});
  // }


  logPhoneNumber = () => {
    // Send Name and SUID to server for account creation
    const body = {phonenumber: this.state.phonenumber, suid: this.suid};
    console.log(body);
    axios.post(this.uri + '/updatePhoneNumber', body)
        .then(res =>  {
          this.login();
        })
        .catch((error) => {
          if (error.response){
            Alert.alert("insert error")
          console.log(error)
          }
      });
    console.log("phone number added: " + this.state.phonenumber);
  }

  makeCall = (number) => {
     const args = {
         number: number, // String value with the number to call
         prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
     }
    call(args).catch(console.error)
	
	}

	sendText = (number, name) => {
		  Linking.openURL('sms:'+number+"&body=Hi " + name + "! I need help.");
  }

  render() {
      return(
        <View style = {styles.container}>
          <TouchableOpacity style = {styles.buttonContainer}
          onPress={()=> this.makeCall('*678023933907')}>
          	<Text>Call Gita!</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.buttonContainer}
          onPress={()=> this.sendText('8023933907', 'Gita')}>
          	<Text>Text Gita!</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    marginBottom: 30,
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
    margin: 10,
  },
  buttonSpaceContainer: {
    flex: 0.5, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  phonenumber: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
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
  warning: {
    fontSize: 17,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
    margin: 10,
  },
  button: {
    fontSize: 17,
    margin: 10,
  }
});
