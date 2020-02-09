import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {
  Button,
  SafeAreaView,
  Alert,
  TouchableHighlight,

} from 'react-native';
import Constants from 'expo-constants'


function Separator() { 
	return <View style = {styles.separator} />;

}

export default class CreateOrJoin extends Component {

  render() {
    return (

      <View style = {styles.container}>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => Alert.alert('Thanks for creating a community!')}>
          <Text style={styles.loginText}>Create a Community</Text>
        </TouchableHighlight>
         <Separator/>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => Alert.alert('Thanks for joining a community!')}>
          <Text style={styles.loginText}>Join a Community</Text>
        </TouchableHighlight>


      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    justifyContent: 'center'
  },
  buttoncontainer: {
  	flex: 1,
  	justifyContent: 'center',
  	marginTop: Constants.statusBarHeight,
  	marginHorizontal: 16,
    borderRadius: 20,
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:350,
    borderRadius:30,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  separator: {
  	marginVertical: 16,
  	borderBottomColor: '#737373',
  	borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
  	backgroundColor: "crimson",
  	height: 50,
  	flex: 0.25,
  	textAlign: 'justify',
  	flexDirection: 'column',
  	justifyContent: 'space-around',
  },
  loginButton: {
    backgroundColor: "maroon",
  },
  loginText: {
    color: 'white',
    fontSize: 25,
  },
});




