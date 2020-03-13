import React, { Component } from 'react';
import { Platform, 
	StyleSheet, 
	Text, View, 
	TextInput, 
	Button,
	Picker,
    KeyboardAvoidingView, 

	Alert } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import {styles} from '../styles/main_styles'


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});



export default class JoinCommunity extends Component {
	constructor(props) {
	    super(props);
		this.state = {commName: '', pass: '', pass2: '', location: ''};
  	}

  	buttonListener = () => {
  		Alert.alert('Thanks for joining a community! Welcome to our safety app!');
  		this.props.navigation.navigate('Profile', {suid: this.state.suid});
  	}

	render() {
		return (
			<View style={styles.page}>
				<View style={{flex:1, alignItems: 'center'}}>
					<Text style={{fontSize: 40}}> Join a community. </Text>
				</ View>
				<View style={{flex:2}}>
					<View style={{
	          			flexDirection: 'row', 
	          			justifyContent:'space-between'}}>
						<Text style={styles.text}> Community Name: </Text>
						
	          		</View>
	          		<View>
	          			<Dropdown 
							data = {[
								{
									value: "community_1"
								},
								{
									value: "community_2"
								}
							]}
						/>
					</ View>
				</View>
	          		<KeyboardAvoidingView style={{flexDirection: 'row', justifyContent:'space-between'}} behavior="padding" enabled>
						<Text style={styles.text}> Password: </Text>
						<TextInput
							secureTextEntry={true}
							style={styles.textInput}
	        				placeholder="6-12 alphanumeric characters"
	          				onChangeText={(pass) => this.setState({pass})}
	          				value={this.state.pass}/>
	          		</KeyboardAvoidingView>
	          		<View style={{flex:1, flexDirection: 'column', justifyContent: 'center'}}>
						<Button onPress = {() => this.buttonListener()}
						title = "Join" style={{}} />
					</ View>
			</View>
		);
	}
}