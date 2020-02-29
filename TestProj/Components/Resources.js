
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

import Constants from "expo-constants";
const { manifest } = Constants;
import axios from 'axios';

import {styles} from '../styles/main_styles'
import {home_styles} from '../styles/home_styles'

export default class Resources extends Component {

  constructor() {
    super()
  }

render() {
    return (
      <View>
        <Text style={styles.loginText} > Hello Resources </ Text>
      </ View>
    );
  }
}