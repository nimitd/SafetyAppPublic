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

  render() {
    if (!this.state.hasSubmitted){
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
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={(event) => this.setState({hasSubmitted: true})}>
              <Text style={styles.loginText}>Enter</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
    else {
      return <EnterCode
        onLogin = {this.logPhoneNumber}
        />
    }
    
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
