import React, { Component } from 'react';
import { Platform, 
	StyleSheet, 
	Text, View, 
	TextInput, 
	Button,
	Picker,
	Alert } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import {styles} from '../styles/main_styles'

import Constants from "expo-constants";
const { manifest } = Constants;
import axios from 'axios';

const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});


export default class MakeCommunity extends Component {
	constructor(props) {
	    super(props);
		this.state = {
			suid : 'anitaB',
			comm_name : '',
		};
  	}

	buttonListener = () => {
		this.makeNewCommunity(this.state.suid, this.state.comm_name);
  		this.props.navigation.navigate('Profile', {suid: this.state.suid});
  	}

  	makeNewCommunity = (suid, communityName) => {

    	const body = {suid: suid, comm_name: communityName,};

	    axios.post(uri + '/make_community', body)
	      .then(res =>  {

	      	// var communitiesArray = [];

	       //  res.data.forEach(function (item, index) {
	       //        communitiesArray.push(item.comm_name);
	       //    });

	       //  var dataArray = Array(communitiesArray.length)
	       //      .fill('')
	       //      .map((_, i) => ({ value: communitiesArray[i]}));

	       //  this.setState({data : dataArray});

	      }).catch((error) => {
	          console.log(error);
    	});
  	}

	render() {
		return (
			<View style={styles.page}>
				<View style={{
		          			flexDirection: 'row', 
		          			justifyContent:'space-between',
		          			marginBottom: 40,}}>
					<Text style={[styles.text, {textAlign: 'center',}]}>Create a new community here. Typically, communites represent dorms, greek orgs, or other clubs.</Text>		
		        </View>
				<Text style={styles.text}> Give your community a name: </Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.inputs}
        				placeholder="Enter Your Community Name Here."
          				onChangeText={(comm_name) => this.setState({comm_name})}
          				value={this.state.comm_name}/>
          		</View>
	          	<Text style={styles.warning}>If your community name is something that might be repeated each year (i.e. Mars) we suggest you put the school year in your name (i.e. Mars 2019-2020).</Text>
	         
          		<View style={{flex:1, flexDirection: 'column', justifyContent: 'center'}}>
					<Button onPress = {() => this.buttonListener()}
					title = "Create" style={{}} />
				</View>
				<Text style={styles.warning}>When you create a community you are an admin by default. This means all members of your community will have access to your phone number.</Text>
			</View>
		);
	}
}