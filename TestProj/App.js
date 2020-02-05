import React, { Component } from 'react';
import { Platform, 
	StyleSheet, 
	Text, View, 
	TextInput, 
	Button,
	Picker,
	Alert } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import MakeCommunity from './MakeCommunity.js';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MakeCommunity />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  page: {
    fontSize: 20,
    flex: 1, 
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: 80,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 80
  },
  textInput: {
  	fontSize: 20
  },
  text: {
  	fontSize: 20
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
