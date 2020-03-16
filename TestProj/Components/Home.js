
// cite: https://www.bootdey.com/react-native-snippet/9/Login-form-ui-example

import React, { Component, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button, 
	TouchableHighlight,
	Alert,
	Picker,
	ScrollView,
	SectionList,
	TouchableOpacity,
	Linking,
	DatePickerIOS,

} from 'react-native';
import CreateOrJoin from './CreateOrJoin';
import { Dropdown } from 'react-native-material-dropdown';
import call from 'react-native-phone-call';
import DatePicker from 'react-native-date-picker'


import Constants from "expo-constants";
import { Icon } from 'react-native-elements'

const { manifest } = Constants;
import axios from 'axios';

import {styles} from '../styles/main_styles'
import {home_styles} from '../styles/home_styles'
import Modal from 'react-native-modal';


const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;


const EVENTS = {};


export default class Home extends Component {


	constructor() {

		super()
		this.state = {
			isModalVisible: false,
			populatedEvents: false,
	      sober_name   : 'test',
	      event_title : 'test',
	      sober_role: 'test',
	      sober_phone: 'test',
	      community: 'test',
	      location: 'test',
	      chosenStartDate: new Date(),
	      chosenEndDate: new Date(),
		}

      this.setStartDate = this.setStartDate.bind(this);
    	this.setEndDate = this.setEndDate.bind(this);


	}


	onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setDate(currentDate);
    setShow(Platform.OS === 'ios' ? true : false);
  };

	componentDidMount() {

		console.log("IN DID MOUNT!!!!!!!!!!!!!!!!!!!!");
		this.populate_events(); 
		this.setState({populate_events: false});
		// this.forceUpdate();
		console.log("FINISHED POPULAING EVENTS IN DID MOUNT: ", EVENTS);

	}


  buttonListener = () => {
  	var self = this;
    // Send Event details to server for event creation
    const body = {event_title: this.state.event_title, sober_contact_name: this.state.sober_name,
    	sober_contact_phone: this.state.sober_phone, sober_contact_role: this.state.sober_role,
    	community: this.state.community, location: this.state.location};
    console.log(body);
    axios.post(uri + '/publish_event', body)
        .then(res =>  {
        	// Alert.alert("Successfully published event! Please refresh your app to view newest changes.")
        	Alert.alert(
			  'Successfully published event!',
			  'Please refresh your app to view newest changes.', // <- this part is optional, you can pass an empty string
			  [
			    {text: 'OK', onPress: () => self.closeModal()},
			  ],
			  {cancelable: false},
			);


        	// self.closeModal();
        	self.forceUpdate();
        })
        .catch((error) => {
          if (error.response){
          	Alert.alert("Error, please try again");
          	console.log(error)
          }
      });
  }




	  makeCall = (number) => {
	     const args = {
	         number: number, // String value with the number to call
	         prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
	     }
	    call(args).catch(console.error)
	  
	  }


		populate_events = () => {
		console.log("IN POPULATE EVENTS");
			self = this;
			axios.post(uri + '/get_event_data', {})
					.then(res =>  {
						console.log(res.data);
						res.data.forEach(function (item, index) {
							// console.log("DEBUG: inside for each");
							// console.log("ITEM: ", item);
							// console.log("INDEX: ", index);
							console.log("INDEX:", index);
							EVENTS[index] = {}
							EVENTS[index]["event_title"] = item["event_title"]
							EVENTS[index]["sober_contact_name"] = item["sober_contact_name"];
							EVENTS[index]["sober_contact_phone"] = item["sober_contact_phone"];
							EVENTS[index]["sober_contact_role"] = item["sober_contact_role"];
							EVENTS[index]["community"] = item["community"];
							EVENTS[index]["location"] = item["location"];

							console.log("EVENTS SO FAR: ", EVENTS);
							// new_data[item["name"]] = {}
							// new_data[item["name"]].push({"description": item["description"], "phone": item["phone_num"], "email": item["email"]});
							// new_data.push({
							//   key: item.["name"],
							//   value: {"description": item["description"], "phone": item["phone_num"], "email": item["email"]}
							// });
						}); 
						// self.closeModal();
						self.forceUpdate()
					})
					.catch((error) => {
						if (error.response){
							if (error.response.status == 401) {
								Alert.alert("User with SUID already exists, please enter unique SUID")
							}
						console.log(error)
						}
				}); 
		console.log("after axios post");    
	}



	display_item(title) {
	return (
		<View style={styles.sectionListItem}>
			<View style={styles_here.title}>
				 <Text style={styles_here.title}>{title}</Text>
				 <View style = {styles_here.test}>

					</View>
		 </View>
	</View>


		);
	}



	makeCall = (number) => {
		 const args = {
				 number: number, // String value with the number to call
				 prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
		 }
		call(args).catch(console.error)
	
	}

	setStartDate(newDate) {
    this.setState({chosenStartDate: newDate});
  }


	setEndDate(newDate) {
    this.setState({chosenEndDate: newDate});
  }



display_contacts() { 
	return (

			<SectionList
				sections={this.state.dataToShow}
				keyExtractor={ (item, index) => item + index}
				renderItem={ ({item}) => this.display_item(item)}
				renderSectionHeader={({ section: { title } }) => (<Text style={styles_here.header}>{title}</Text>)}
			/>
		);
	}


publish_event_modal() {
	return (    
		<ScrollView style={styles.scrollView}>
    		<View style = {styles.textboxcontainers}>
      		<Text style = {styles.header}> Enter your event information below to get started. </Text>
	    
	      	<View style={styles.header}>
	         	<Text>Enter the event title: </Text>
	      	</View>
	     		 <View style={styles.inputContainer}>
	       			 <TextInput style={styles.inputs}
	            placeholder="Event Title"
	            onChangeText={(event_title) => this.setState({event_title})}/>
	      	</View>



	      	<View style={styles.header}>
	         	<Text>Enter the name you would like displayed as the sober contact for this event.</Text>
	      	</View>
	     		 <View style={styles.inputContainer}>
	       			 <TextInput style={styles.inputs}
	            placeholder="Sober Contact Name"
	            onChangeText={(sober_name) => this.setState({sober_name})}/>
	      	</View>


	      	<View style={styles.header}>
	         	<Text>What is this person's role (ex: RA, Sober Moniter)?</Text>
	      	</View>
	     		 <View style={styles.inputContainer}>
	       			 <TextInput style={styles.inputs}
	            placeholder="On-Call RA / Sober Moniter"
	            onChangeText={(sober_role) => this.setState({sober_role})}/>
	      	</View>


		      <View style={styles.header}>
		        <Text>Enter the phone number you would like displayed as for the sober contact. (Note this number will be publicly available).</Text>
		      </View>

			   <View style={styles.inputContainer}>
		          <TextInput style={styles.inputs}
		              placeholder="Phone Number"
		              onChangeText={(sober_phone) => this.setState({sober_phone})}/>
		        </View>


		      <View style={styles.header}>
		       	<Text>Enter the location of your event: </Text>
		     	</View>

		 		<View style={styles.inputContainer}>
		          <TextInput style={styles.inputs}
		              placeholder="Location"
		              onChangeText={(location) => this.setState({location})}/>
			    </View>
   	</View>

      <View style={styles.header}>
        <Text>Optionally share this event with one of your communities:</Text>
      </View>

       <View style = {styles.dropdown}>
          <Dropdown
              onChangeText={(community) => this.setState({community})}
    		        label='Choose a community'
    		        data={[
    		        {value: 'Mars'},
    		        {value: '680'},
    		       	{value: 'Xanadu'},
    		        ]}
    		      />
	    </View>



        <View>

		      <View style={styles.header}>
		       	<Text>Set the start time of your event: </Text>
		     	</View>

			   <View style={styles_here.date_time_container}>
			     <DatePickerIOS
			       date={this.state.chosenStartDate}
			       onDateChange={this.setStartDate}
			     />
		  		</View>

		  		<View style={styles.header}>
		       	<Text>Set the end time of your event: </Text>
		     	</View>

			   <View style={styles_here.date_time_container}>
			     <DatePickerIOS
			       date={this.state.chosenEndDate}
			       onDateChange={this.setEndDate}
			     />
		  		</View>



    		</View>

    		<View style = {styles.buttonSpaceContainer}>
    		  <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.buttonListener()}>
            <Text style={styles.loginText}>Publish My Event</Text>
          </TouchableHighlight>
        </View>
     </ScrollView>
);
}

display_sober_ppl() {
	var range = Object.keys(EVENTS); 
	var self = this;
	var namesList = range.map(function(index) {
                        return (
                        	<View style = {styles_here.sectionListItem}>
                        		{EVENTS[index]!=undefined ?
                        			<View>
                        				<Text style = {styles_here.event_text}> <Text style = {{fontWeight: 'bold', fontSize: 15}}> {EVENTS[index]['sober_contact_name']} {'\n'} </Text>
                        				</Text>
												<View style = {{flexDirection: 'row', paddingBottom: 10}}>
									              <Icon name = "location-on" size = {20}/> 
														<Text style = {[styles_here.event_text, {fontSize: 15, paddingTop: 0}]}> {EVENTS[index]['location']} </Text>									            
													</View>
												<View style = {{flexDirection: 'row', paddingBottom: 10}}>
									              <Icon name = "person" size = {20}/> 
														<Text style = {[styles_here.event_text, {fontSize: 15, paddingTop: 0}]}> {EVENTS[index]['sober_contact_role']} </Text>									            
												</View>
												<TouchableHighlight onPress={() => self.makeCall(EVENTS[index]['sober_contact_phone'])}>
									            <View style = {{flexDirection: 'row'}}>
									              <Icon name = "phone" size = {20}/> 
														<Text style = {[styles_here.event_text, {fontSize: 15, paddingTop: 0}]}> {EVENTS[index]['sober_contact_phone']} </Text>									            
													</View>
									          </TouchableHighlight>

					 						</View>
					 						: <Text style = {styles.loginText}> Loading... </Text>}
			 						</View>
                      )});

	namesList.push(
		<View style = {[styles_here.sectionListItem, {backgroundColor: 'dimgrey'}]}>
     		<TouchableHighlight onPress={() => this.openModal()}>
     			<View>
        			<Icon name = "add" size = {130}/> 
      			<Modal isVisible={this.state.isModalVisible} style={styles_here.modal} onBackdropPress={()=>this.closeModal()}>
      				{this.publish_event_modal()}
      			</Modal>
      		</View>
      	</TouchableHighlight>
		</View>
		);


   return (<ScrollView horizontal = {true}>{namesList }</ScrollView>);

}

display_navigation_options() {

	return ( 					
		<ScrollView horizontal = {true}>
			 <TouchableOpacity onPress={() => this.makeCall('6507257873')}>
				<View style={[styles_here.sectionListItem, styles_here.navigation]}>
					<Text style={[styles_here.navigation_text]}> 5-SURE </Text> 
				</View>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => Linking.openURL('maps://app?saddr=Cupertino&San+Francisco')}>
				<View style={[styles_here.sectionListItem, styles_here.navigation]}>
					<Text style={[styles.loginText, styles_here.navigation_text, {textAlign: 'center'}]}>Walking Directions via Maps </Text> 
				</View>
			</TouchableOpacity>


			<TouchableOpacity onPress={() => Linking.openURL('https://campus-map.stanford.edu/')}>
				<View style={[styles_here.sectionListItem, styles_here.navigation]}>
					<Text style={[styles.loginText, styles_here.navigation_text, {textAlign: 'center'}]}>Stanford Campus Searchable Map </Text> 
				</View>
			</TouchableOpacity>



			<TouchableOpacity onPress={() => Linking.openURL('lyft://app')}>
				<View style={[styles_here.sectionListItem, styles_here.navigation]}>
					<Text style={[styles.loginText, styles_here.navigation_text]}> Lyft </Text> 
				</View>
			</TouchableOpacity>


			<TouchableOpacity onPress={() => Linking.openURL('uber://app')}>
				<View style={[styles_here.sectionListItem, styles_here.navigation]}>
					<Text style={[styles.loginText, styles_here.navigation_text]}> Uber </Text> 
				</View>
			</TouchableOpacity>


		</ScrollView>);
		}



	display_emergency_buttons() {

		return (
			<View style = {[{flexDirection: 'row'}]}>
				<ScrollView horizontal = {true}>
					<View style = {styles_here.emergency_button}> 
						<TouchableHighlight onPress={() => self.makeCall('8023933907')}>
			            <View style = {[]}>
								<Text style = {[styles_here.event_text, {fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingTop: 10, paddingBottom: 10}]}> EMERGENCY CONTACT</Text>									            

			              <Icon name = "phone" size = {35}/> 
							</View>
			          </TouchableHighlight>
					</View>

					<View style = {styles_here.emergency_button}> 
					<TouchableHighlight onPress={() => self.makeCall('8023933907')}>
			            <View style = {[]}>
								<Text style = {[styles_here.event_text, {fontSize: 30, fontWeight: 'bold', textAlign: 'center', paddingTop: 15, paddingBottom: 15}]}> 911 </Text>									            
			              <Icon name = "phone" size = {35}/> 
							</View>
			          </TouchableHighlight>
					</View>

					<View style = {styles_here.emergency_button}> 
					<TouchableHighlight onPress={() => self.makeCall('8023933907')}>
			            <View style = {[]}>
								<Text style = {[styles_here.event_text, {fontSize: 20, paddingTop: 10, paddingBottom: 10, fontWeight: 'bold', textAlign: 'center'}]}> STANFORD POLICE </Text>			
			              <Icon name = "phone" size = {30}/> 

							</View>
			          </TouchableHighlight>
					</View>


				</ScrollView>
			</View>

			);
	}


openModal = () => {
  	console.log("OPENING MODAL");
  	this.setState({isModalVisible: true});
 }

closeModal = () => {
  	this.setState({isModalVisible: false});
  }



	render() {
		if (1==1) {
			return (
				<View style = {[styles.container, {justifyContent: 'space-around'}]}>
				<Text style = {[styles_here.section_header, {textAlign: 'center', fontSize: 30}]}> HEY, YOU :) </Text>

				<Text style = {[styles_here.section_header, {}]}> Who's Sober? </Text>
				{this.display_sober_ppl()}
				<Text style = {styles.loginText}> How Can I Get Home? </Text>
				{this.display_navigation_options()}
				<Text style = {styles.loginText}> Emergency Calls </Text>
				{this.display_emergency_buttons()}
				</ View>

			);
	} else {
		 return (
		   <View style={styles_here.date_time_container}>
		     <DatePickerIOS
		       date={this.state.chosenDate}
		       onDateChange={this.setDate}
		     />
		   </View>
		 );

		}
	}
}




const styles_here = StyleSheet.create({
	header: {
		color: 'white',
		fontSize: 25,
		padding: 20,
		marginVertical: 10,
	},

	navigation_text: {
		color: 'white', 
		fontSize: 20
	},
	section_header: {
		color: 'white',
		fontSize: 20,
		marginVertical: 5,
	},
	info_text: {
		fontSize: 12,
		padding: 5,
		marginVertical: 10,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',

	},
	search: {
		color: 'white',
		fontSize: 20,
		padding: 10,
		marginVertical: 2,
	},
	event_text: {
		color: 'white',
		fontSize: 12,
		marginVertical: 1,
	},
	test: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end'
	}, 
	title: {
		color: 'white',
		fontSize: 16,
		textAlign: 'right',
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	modal: {
		backgroundColor:'lightgrey',
		maxHeight:500,
		justifyContent: 'center',
		textAlign: 'center',
		borderWidth: 10,
		borderColor: 'maroon',
	},
	sectionListItem: {
		backgroundColor: 'maroon',
		padding: 3,
		height: 130,
		width: 140,
		marginVertical: 10,
		marginHorizontal: 10,
		borderRadius: 20,
	},
	emergency_button: {
		backgroundColor: '#e22121',
		padding: 3,
		height: 130,
		width: 140,
		marginVertical: 20,
		marginHorizontal: 10,
		borderRadius: 20,
	},
	navigation: {
		// flex: 1, 
		flexDirection: 'row', 
		justifyContent: 'center', 
		alignItems: 'center',		
	},
	date_time_container: {
    flex: 1,
    justifyContent: 'center',
  },
});







