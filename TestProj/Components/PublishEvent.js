
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
  Picker,
  ScrollView,
} from 'react-native';
import CreateOrJoin from './CreateOrJoin';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

import Constants from "expo-constants";
const { manifest } = Constants;
import axios from 'axios';

export default class Register extends Component {

  constructor(props) {
    super(props);

    this.register=props.onRegister;
    this.uri = props.uri;

    state = {
      event_name   : '',
      phone_number: '',
      community: '',
      location: false,
      show: false,
      mode: 'date',
    }
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setDate(currentDate);
    setShow(Platform.OS === 'ios' ? true : false);
  };

  showMode = currentMode => {
    this.setState({show: true});
    setMode(currentMode);
  };

  showDatepicker = () => {
    this.setState({mode: 'date'});
  };

  showTimepicker = () => {
    this.setState({mode: 'date'});
  };

  buttonListener = () => {
    // Send Name and SUID to server for account creation
    const body = {first_name: this.state.first_name, last_name: this.state.last_name,
        suid: this.state.suid, dorm: this.state.dorm};
    console.log(body);
    axios.post(this.uri + '/send_prelim_user_data', body)
        .then(res =>  {
          this.register(this.state.suid);
        })
        .catch((error) => {
          if (error.response){
            if (error.response.status == 401) {
              Alert.alert("User with SUID already exists, please enter unique SUID")
            }
          console.log(error)
          }
      });
  }


render() {
    return (
    <ScrollView style={styles.scrollView}>
    <View style = {styles.textboxcontainers}>
      <Text style = {styles.header}> Enter the event information below to get started. </Text>
	    
      <View style={styles.header}>
         <Text>Please enter the name you would like displayed as the sober contact for this event.</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
            placeholder="Sober Contact Name"
            onChangeText={(event_name) => this.setState({event_name})}/>
      </View>

      <View style={styles.header}>
        <Text>Please enter the phone number you would like displayed as for the sober contact. Note this number will be publicly available.</Text>
      </View>

	    <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Phone Number"
              onChangeText={(phone_number) => this.setState({phone_number})}/>
        </View>
      </View>

      <View style={styles.header}>
        <Text>Share this event with one of your communities:</Text>
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

        <View style={styles.header}>
          <Text>Alternately, share your event with a location:</Text>
        </View>

        <View style = {styles.buttonSpaceContainer}>
          <TouchableHighlight style={[styles.buttonContainer, styles.locationButton]} onPress={() => this.setState({ location: true })}>
            <Text style={styles.loginText}>Add Location</Text>
          </TouchableHighlight>
        </View>

        <View>
      <View>
        <Button onPress={() => this.showDatepicker} title="Set an event date here." />
      </View>
      <View>
        <Button onPress={() => this.showTimepicker} title="Set an event time." />
      </View>

      {this.show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>

    		<View style = {styles.buttonSpaceContainer}>
    		  <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.buttonListener()}>
            <Text style={styles.loginText}>Publish My Event</Text>
          </TouchableHighlight>
        </View>



     </ScrollView>
    );
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
    marginTop: 50,
  },
  header: {
  	fontSize: 20,
    textAlign: 'center',
    margin: 30,
    //marginTop: 60,
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
  locationButton: {

    backgroundColor: "blue",
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
  scrollView: {
    backgroundColor: '#DCDCDC',
    marginHorizontal: 0,
    //flex: 1,
  },
});







