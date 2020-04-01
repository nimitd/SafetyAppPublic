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

import axios from 'axios';

// Redux Imports
import { connect } from 'react-redux';
import { changeSUID } from '../actions/suids';

class MakeCommunity extends Component {
	constructor(props) {
	    super(props);
		this.state = {
			suid : props.suid.suid,
			comm_name : '',
		};
  	}

	buttonListener = () => {
		this.makeNewCommunity(this.state.suid, this.state.comm_name);
  		this.props.navigation.navigate('Profile', {suid: this.state.suid});
  	}

  	makeNewCommunity = (suid, communityName) => {
    	const body = {suid: suid, comm_name: communityName,};
	    axios.post(this.props.suid.uri + '/make_community', body)
	      	.then(res =>  {}).catch((error) => {
	        	console.log(error);
    		});
  	}

	render() {
		return (
			<View style={[styles.page, {alignItems: 'center'},]}>
				<View style={{
          			flexDirection: 'row', 
          			justifyContent:'space-between',
          			marginBottom: 40,}}
          		>
					<Text style={{textAlign: 'center', fontSize: 20, color: 'white'}}>Create a new community here. Typically, communites represent dorms, greek orgs, or other clubs.</Text>		
		        </View>
				<Text style={styles.text}> Give your community a name: </Text>
				<View style={[styles.buttonContainer, {backgroundColor: 'white', justifyContent: 'flex-end'},]}>
					<TextInput
						style={styles.inputs}
        				placeholder="Enter Your Community Name Here."
          				onChangeText={(comm_name) => this.setState({comm_name})}
          				value={this.state.comm_name}
          			/>
          		</View>
	          	<Text style={styles.text}>If your community name is something that might be repeated each year (i.e. Mars) we suggest you put the school year in your name (i.e. Mars 2019-2020).</Text>
          		<View style={{flexDirection: 'column', justifyContent: 'center', paddingVertical: 50}}>
					<Button onPress = {() => this.buttonListener()}
					title = "Create" style={{}} />
				</View>
				<Text style={styles.text}>When you create a community you are an admin by default. This means all members of your community will have access to your phone number.</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(MakeCommunity);