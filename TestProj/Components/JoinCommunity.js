import React, { Component } from 'react';
import { Platform, 
	StyleSheet, 
	Text, View, 
	TextInput, 
	Button,
	Picker,
    KeyboardAvoidingView, 
    ScrollView,

	Alert } from 'react-native';

import Constants from "expo-constants";
const { manifest } = Constants;
import axios from 'axios';

import { Dropdown } from 'react-native-material-dropdown';
import {styles} from '../styles/main_styles'

// Redux Imports
import { connect } from 'react-redux';
import { changeSUID } from '../actions/suids';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});



class JoinCommunity extends Component {
	constructor(props) {
	    super(props);
		this.state = {
			suid : 'anitaB',
			community : '',
			data : [],
		}

		this.getCommunities();
  	}

  	buttonListener = () => {
  		this.sendCommunity(this.state.suid, this.state.community);
  		this.props.navigation.navigate('Profile', {suid: this.state.suid});
  	}

  	self = this;

  	getCommunities = () => {

	    axios.post(self.props.suid.uri + '/get_communities')
	      .then(res =>  {

	      	var communitiesArray = [];

	        res.data.forEach(function (item, index) {
	              communitiesArray.push(item.comm_name);
	          });

	        var dataArray = Array(communitiesArray.length)
	            .fill('')
	            .map((_, i) => ({ value: communitiesArray[i]}));

	        this.setState({data : dataArray});

	      }).catch((error) => {
	          console.log(error);
    	});
  	}

  	self = this;

  	sendCommunity = (suid, community) => {

    	const body = {suid: suid, community: community,};

	    axios.post(self.props.suid.uri + '/join_community', body)
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
				<ScrollView style={styles.scrollView}>

					<View style={{flex:2}}>
						<View style={{
		          			flexDirection: 'row', 
		          			justifyContent:'space-between',
		          			marginBottom: 40,}}>
							<Text style={[styles.text, {textAlign: 'center',}]}>Select the name of the community you'd like to join from the list below. Don't worry, you can always join additonal communities.</Text>		
		          		</View>
						<View style={{
		          			flexDirection: 'row', 
		          			justifyContent:'space-between'}}>
							<Text style={styles.text}>Available Communities: </Text>		
		          		</View>
		          		<View style ={{marginBottom: 40,}}>
		          			<Dropdown 
		          				data = {this.state.data}
		          				onChangeText={(text) => this.setState({community : text})}
							/>
						</View>
					</View>

	          		<View style={{flex:1, flexDirection: 'column', justifyContent: 'center'}}>
						<Button onPress = {() => this.buttonListener()}
						title = "Join" style={{}} />
					</ View>
					<View style={{
		          			flexDirection: 'row', 
		          			justifyContent:'space-between',
		          			marginTop: 40,}}>
							<Text style={[styles.text, {textAlign: 'center',}]}>Don't see what you're looking for? Head back to create a new community.</Text>		
		          		</View>
				</ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(JoinCommunity);