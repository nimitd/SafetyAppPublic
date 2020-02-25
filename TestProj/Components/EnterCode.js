import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, 
        View, 
        KeyboardAvoidingView, 
        Button,
        TouchableHighlight } from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
// });

import {styles} from '../styles/main_styles'

export default class EnterCode extends Component {

  constructor(props) {
    super(props);

    this.login = props.onLogin;
    this.test = props.newthing;
  }
  callLogin = () => {
    this.login();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>You've got mail!</Text>
        <Text style={styles.instructions}>We just sent you a code. Please enter it below</Text>
          <TextInput style={styles.phonenumber}
            editable
            maxLength={6}
            placeholder="_ _ _ _ _ _"
            returnKeyType='done'
            keyboardType='phone-pad'
            // onSubmitEditing={this.login}
          />
          <Text style={styles.warning}>Didn't get a code? Tap below to resend it to your phone number.</Text>
          <Button
              title="Resend Code"
            />
          <View style = {styles.buttonSpaceContainer}>
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.callLogin}>
              <Text style={styles.loginText}>Enter</Text>
            </TouchableHighlight>
          </View>
      </View>
    );
  }
}