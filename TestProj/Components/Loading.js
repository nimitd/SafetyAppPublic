import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {
  Button,
  SafeAreaView,
  Alert,
  TouchableHighlight,

} from 'react-native';
import Constants from 'expo-constants'

import {styles} from '../styles/main_styles'


function Separator() { 
	return <View style = {styles.separator} />;

}

export default class Loading extends Component {

  constructor(props) {
      super(props);
    }

  sendToOnboarding = () => {
    this.props.navigation.navigate('Onboarding');
  }

  sendToApp = () => {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (

      <View style = {styles.container}>
        <View style = {styles.buttonSpaceContainer}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.sendToOnboarding}>
            <Text style={styles.loginText}>Onboarding</Text>
          </TouchableHighlight>
        </View>
        <Separator/>
        <View style = {styles.buttonSpaceContainer}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.sendToApp}>
            <Text style={styles.loginText}>App</Text>
          </TouchableHighlight>
        </View>
      </View>
      
    );
  }
}