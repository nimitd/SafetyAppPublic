
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
import CreateOrJoin from './CreateOrJoin';
import { Dropdown } from 'react-native-material-dropdown';

import axios from 'axios';

import {styles} from '../styles/main_styles'

// Redux Imports
import { connect } from 'react-redux';
import { changeSUID } from '../actions/suids';

class Register extends Component {
  constructor(props) {
    super(props);
    state = {
      first_name   : '',
      last_name: '',
      suid: '',
      dorm: ''
    }
  }

  buttonListener = () => {
    // Send Name and SUID to server for account creation
    const body = {first_name: this.state.first_name, last_name: this.state.last_name,
        suid: this.state.suid, dorm: this.state.dorm};
    console.log(body);
    self = this;
    axios.post(this.props.suid.uri + '/send_prelim_user_data', body)
      .then(res =>  {
        self.props.changeSUID(self.state.suid);
        self.props.navigation.navigate('Phone');
      })
      .catch((error) => {
        if (error.response){
          if (error.response.status == 401) {
            Alert.alert("User with SUID already exists, please enter unique SUID")
          }
        console.log(error)
        }
    });
  }

  state = {dorm: ''}
    updateDorm = (dorm) => {
      this.setState({ dorm: dorm 
    })
  }

  render() {
    return (
      <View style = {[styles.container, {alignItems: 'center'}]}>
        <Text style = {[styles.header], {color: "white", paddingBottom: 50, fontSize: 20}}> Enter your information below to get started. </Text>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="First name"
              onChangeText={(first_name) => this.setState({first_name})}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Last name"
              onChangeText={(last_name) => this.setState({last_name})}/>
        </View>

  	    <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="SUID (eg: gitakris)"
                onChangeText={(suid) => this.setState({suid})}/>
        </View>

  		  <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.buttonListener()}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableHighlight>

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

export default connect(mapStateToProps, mapDispatchToProps)(Register);