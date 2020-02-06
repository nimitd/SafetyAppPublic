import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

import Constants from "expo-constants";
const { manifest } = Constants;
import axios from 'axios';

const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;

export default class App extends Component {
  
    constructor(props)  {
      super(props);
      this.state = {apiResponse: "initial data"};
    }

    // call the test API and set apiResponse variable to
    // the result of the fetch
    callAPI() {
      const body = {first_name: "t_f", last_name: "t_l",
        suid: "t_s", phone: "1234567890"};
      axios.get(uri + '/hello')
        .then(res =>console.log(res.data))
        .catch((error) => {
            console.log(error)
        });
      axios.post(uri + '/test_post', body)
        .then(res =>console.log(res.data))
        .catch((error) => {
            console.log(error)
        });
      axios.get(uri + '/get_all_users')
        .then(res => console.log("Doing something with data: " + res.data[0].phone_number))
        .catch((error) => {
            console.log(error)
        });
    }

    // Run after the front end app is completely mounted
    componentDidMount() {
      this.callAPI();
    }


    render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Stanford Safety.</Text>
        <Text style={styles.instructions}>This branch is for working on initial features.</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>{this.state.apiResponse}</Text>
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
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
