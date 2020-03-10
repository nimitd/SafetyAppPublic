import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {
  Button,
  SafeAreaView,
  Alert,
  TouchableHighlight,

} from 'react-native';
import Constants from 'expo-constants'
const { manifest } = Constants;

import {styles} from '../styles/main_styles'


function Separator() { 
	return <View style = {styles.separator} />;

}

export default class CreateOrJoin extends Component {

constructor(props) {
    super(props);

    // this.clicked_button=props.onCommunityClick;
    this.uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;

  }

  on_make_button_click = () => { 
    this.props.navigation.navigate('Create');
  }

  on_join_button_click = () => { 
    this.props.navigation.navigate('Join');
  }


  render() {
    return (

      <View style = {styles.container}>
        <View style = {styles.buttonSpaceContainer}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.on_make_button_click}>
            <Text style={styles.loginText}>Create a Community</Text>
          </TouchableHighlight>
        </View>
        <Separator/>
        <View style = {styles.buttonSpaceContainer}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.on_join_button_click}>
            <Text style={styles.loginText}>Join a Community</Text>
          </TouchableHighlight>
        </View>
      </View>
      
    );
  }
}