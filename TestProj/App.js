
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
import CreateOrJoin from './Components/CreateOrJoin';
import { Dropdown } from 'react-native-material-dropdown';

import Constants from "expo-constants";
const { manifest } = Constants;
import axios from 'axios';

const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name   : '',
      last_name: '',
      suid: '',
      dorm: '',
      displayButtons: false,
      error: false
    }
  }

  buttonListener = () => {
  	
    // Send Name and SUID to server for account creation
    const body = {first_name: this.state.first_name, last_name: this.state.last_name,
        suid: this.state.suid, dorm: this.state.dorm};
    axios.post(uri + '/send_prelim_user_data', body)
        .then(res =>  {
          this.setState({ error: false});
          this.setState({displayButtons: true});
        })
        .catch((error) => {
          if (error.response){
            if (error.response.status == 401) {
              this.setState({ error: true })
              Alert.alert("User with SUID already exists, please enter unique SUID")
            }
          console.log(error)
          }
      });
  }

  state = {dorm: ''}
   updateDorm = (dorm) => {
      this.setState({ dorm: dorm })
   }

render() {
  console.log(this.state.displayButtons)
  console.log(this.state.error)

	if (this.state.displayButtons && !this.state.error) { 
		return <CreateOrJoin/>

	} else {
    return (
    <View style = {styles.container}>
    <View style = {styles.textboxcontainers}>
      <Text style = {styles.header}> Enter your information below to get started. </Text>
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
      </View>

       <View style = {styles.dropdown}>
      <Dropdown
            onChangeText={(dorm) => this.setState({dorm})}
		        label='Choose your residence'
		        data={[
		        {value: 'Mars'},
		        {value: '680'},
		       	{value: 'Xanadu'},
		        {value: 'Casa'},
		        {value: 'Bob'},
		        {value: 'Storey'},
		        {value: 'Grove'},
		        {value: 'Slav'},
		        {value: 'Haus Mitt'},
		        {value: 'Phi Sig'},
		        {value: 'Kairos'},
		        {value: 'EBF'},
		        {value: 'Synergy'},
		       	{value: 'Durand'},

		        ]}
		      />
		</View>
		<View style = {styles.buttonSpaceContainer}>
		<TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.buttonListener()}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableHighlight>
        </View>



     </View>
    );
}
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#DCDCDC',
  },
  buttonSpaceContainer: {
  	flex: 0.5, 
  	justifyContent: 'center',
  	alignItems: 'center',
  },
  textboxcontainers: {
    alignItems: 'center',
  },
  header: {
  	fontSize: 20,
    textAlign: 'center',
    margin: 30,
	},
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center',
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "maroon",
  },
  loginText: {
    color: 'white',
    fontSize: 20,
  },
  dropdown: {
  	flexDirection: 'column',
  	justifyContent: 'center',
  	marginLeft: 20,
  	marginRight: 20,
  },
});
