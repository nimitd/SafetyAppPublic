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

import { connect } from 'react-redux';
import { changeSUID } from '../actions/suids';
// import { bindActionCreators } from 'redux';


function Separator() { 
	return <View style = {styles.separator} />;
}

class Loading extends Component {
  sendToOnboarding = () => {
    this.props.navigation.navigate('Onboarding');
  }

  sendToApp = () => {
    this.props.navigation.navigate('Home');
  }

  componentDidMount() {
    Alert.prompt('Please insert your name', null, name => {
        this.props.changeSUID(name);
        console.log("suid is " + this.props.suid.suid);
      }
    );
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

const mapStateToProps = ({suid}) => ({
   suid
});

const mapDispatchToProps = {
  changeSUID
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading)