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

import axios from 'axios';

// Redux Imports
import { connect } from 'react-redux';
import { changeSUID } from '../actions/suids';

class EnterPhone extends Component {

  constructor(props) {
    super(props);
    this.suid = props.suid.suid;
    this.state = {hasSubmitted: false, phonenumber: '',}
    }

  logPhoneNumber = () => {
    // Send Name and SUID to server for account creation
    const body = {phonenumber: this.state.phonenumber, suid: this.suid};
    console.log(body);
    axios.post(this.props.suid.uri + '/updatePhoneNumber', body)
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
            placeholderTextColor = 'lightgray'
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

const mapStateToProps = ({suid}) => ({
   suid
});

const mapDispatchToProps = {
  changeSUID
};

export default connect(mapStateToProps, mapDispatchToProps)(EnterPhone);