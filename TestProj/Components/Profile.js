
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
import { SwipeListView } from 'react-native-swipe-list-view';
import { SwipeRow } from 'react-native-swipe-list-view';
import CreateOrJoin from './CreateOrJoin';
import { Dropdown } from 'react-native-material-dropdown';

import Constants from "expo-constants";
const { manifest } = Constants;
import axios from 'axios';

import {styles} from '../styles/main_styles'
import {home_styles} from '../styles/home_styles'
import {profile_styles} from '../styles/profile_styles'

export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;

    this.state = {
      display_name  : 'Harrison Bronfeld',
      phonenumber : '609-613-2175',
      editable : 'false',
      title : 'Edit My Information',
      color : 'grey',
    }

  }

  leaveCommunityAlert = () => {
    Alert.alert(
                'You are about to leave this community.',
                'Are you sure you want to leave?',
                [ { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
                  {text: 'OK', onPress: () => console.log('OK Pressed')}, ],
                ) 
  }

  deleteEventAlert = () => {
    Alert.alert(
                'You are about to delete this event.',
                'Are you sure you want to delete?',
                [ { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
                  {text: 'OK', onPress: () => console.log('OK Pressed')}, ],
                ) 
  }

  editMyInformation = () => {
    if (this.state.editable == 'false') {
      this.setState({editable: 'true'});
      this.setState({title: 'Save My Information'});
      this.setState({color: 'white'});
    } else {
      this.setState({editable: 'false'});
      this.setState({title: 'Edit My Information'});
      this.setState({color: 'grey'});
    }
  }

  render() {
    return (
        <View style={styles.container}>

          <View style={profile_styles.profileTitle}>
            <Text style={styles.welcome}>My Profile</ Text>
          </View>

          <ScrollView>
            <View style={profile_styles.profileSeparator}></View>

            <View style={profile_styles.profileInfoContainer}>
              <Text style={profile_styles.profileSectionTitle}>My Information</Text>
              <Text style={profile_styles.profileInfoTitle}>Display Name</Text>
              <TextInput style={profile_styles.profileInfo}
                editable={this.state.editable}
                value={this.state.display_name}
                returnKeyType='done'
                backgroundColor={this.state.color}
                placeholderTextColor='black'
                onChange= {(event) => this.setState({display_name: event.nativeEvent.text})}
              ></TextInput>

              <Text style={profile_styles.profileInfoTitle}>Phone Number</Text>
              <TextInput style={profile_styles.profileInfo}
                editable={this.state.editable}
                maxLength={12}
                value={this.state.phonenumber}
                returnKeyType='done'
                keyboardType='phone-pad'
                backgroundColor={this.state.color}
                placeholderTextColor='black'
                onChange= {(event) => this.setState({phonenumber: event.nativeEvent.text})}
                //onSubmitEditing= {(event) => this.setState({phonenumber: event.nativeEvent.text})}
              ></TextInput>

              <Button
                title={this.state.title}
                onPress = {() => this.editMyInformation()}
              />
          </View>

          <View style={profile_styles.profileSeparator}></View>

          <Text style={profile_styles.profileSectionTitle}>My Communities</Text>

          <View style={profile_styles.profileInfoContainer}>

              <SwipeRow rightOpenValue={-150} disableRightSwipe='true'>
                  <View style={profile_styles.rowBack}>
                      <Text style={profile_styles.backText}>Left</Text>
                      <Text style={profile_styles.backText}
                        onPress={() => this.leaveCommunityAlert()}
                      >Leave Community</Text>
                  </View>
                  <View style={profile_styles.rowFront}>
                      <Text style={profile_styles.frontText}>West Lag 2019-2020</Text>
                  </View>
              </SwipeRow>

              <View style={profile_styles.spacer} />

              <SwipeRow rightOpenValue={-150} disableRightSwipe='true'>
                  <View style={profile_styles.rowBack}>
                      <Text style={profile_styles.backText}>Left</Text>
                      <Text style={profile_styles.backText}
                        onPress={() => this.leaveCommunityAlert()}
                      >Leave Community</Text>
                  </View>
                  <View style={profile_styles.rowFront}>
                      <Text style={profile_styles.frontText}>Sig Ep 2019-2020</Text>
                  </View>
              </SwipeRow>

              <View style={profile_styles.spacer} />

          </View>

          <View style={profile_styles.profileSeparator}></View>

          <Text style={profile_styles.profileSectionTitle}>My Events</Text>

          <View style={profile_styles.profileInfoContainer}>

            <Text style={profile_styles.profileInfoTitle}>Upcoming Events</Text>

              <SwipeRow rightOpenValue={-110} disableRightSwipe='true'>
                  <View style={profile_styles.rowBack}>
                      <Text style={profile_styles.backText}>Left</Text>
                      <Text style={profile_styles.backText}
                        onPress={() => this.leaveCommunityAlert()}
                      >Delete Event</Text>
                  </View>
                  <View style={profile_styles.rowFront}>
                      <Text style={profile_styles.frontText}>Nimit On-Call 3/21</Text>
                  </View>
              </SwipeRow>

              <View style={profile_styles.spacer} />

              <SwipeRow rightOpenValue={-110} disableRightSwipe='true'>
                  <View style={profile_styles.rowBack}>
                      <Text style={profile_styles.backText}>Left</Text>
                      <Text style={profile_styles.backText}
                        onPress={() => this.deleteEventAlert()}
                      >Delete Event</Text>
                  </View>
                  <View style={profile_styles.rowFront}>
                      <Text style={profile_styles.frontText}>Gita On-Call 3/20</Text>
                  </View>
              </SwipeRow>

              <View style={profile_styles.spacer} />

              <Text style={profile_styles.profileInfoTitle}>Completed Events</Text>

              <SwipeRow rightOpenValue={-150} disableLeftSwipe='true' disableRightSwipe='true'>
                  <View style={profile_styles.rowBack}>
                      <Text style={profile_styles.backText}>Left</Text>
                      <Text style={profile_styles.backText}
                        onPress={() => this.deleteEventAlert()}
                      >Delete Event</Text>
                  </View>
                  <View style={profile_styles.rowFront}>
                      <Text style={profile_styles.frontText}>Xanadu Special D</Text>
                  </View>
              </SwipeRow>

              <View style={profile_styles.spacer} />

              <SwipeRow rightOpenValue={-150} disableLeftSwipe='true' disableRightSwipe='true'>
                  <View style={profile_styles.rowBack}>
                      <Text style={profile_styles.backText}>Left</Text>
                      <Text style={profile_styles.backText}
                        onPress={() => this.deleteEventAlert()}
                      >Leave Community</Text>
                  </View>
                  <View style={profile_styles.rowFront}>
                      <Text style={profile_styles.frontText}>Gita On-Call 10/14</Text>
                  </View>
              </SwipeRow>

              <View style={profile_styles.spacer} />

              <SwipeRow rightOpenValue={-150} disableLeftSwipe='true' disableRightSwipe='true'>
                  <View style={profile_styles.rowBack}>
                      <Text style={profile_styles.backText}>Left</Text>
                      <Text style={profile_styles.backText}
                        onPress={() => this.deleteEventAlert()}
                      >Leave Community</Text>
                  </View>
                  <View style={profile_styles.rowFront}>
                      <Text style={profile_styles.frontText}>Full Moon on the Quad</Text>
                  </View>
              </SwipeRow>

              <View style={profile_styles.spacer} />

          </View>
        </ScrollView>
      </View>
    );
  }
}
