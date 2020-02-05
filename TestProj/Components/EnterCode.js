import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Button } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class EnterCode extends Component {
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
            onSubmitEditing={this.InputCode}
          />
          <Text style={styles.warning}>Didn't get a code? Tap below to resend it to your phone number.</Text>
          <Button
              title="Resend Code"
            />
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
  phonenumber: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
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
