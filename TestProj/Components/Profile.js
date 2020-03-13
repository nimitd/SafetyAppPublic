
// cite: https://www.bootdey.com/react-native-snippet/9/Login-form-ui-example

import React, { Component } from 'react';
import {
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button, 
  TouchableHighlight,
  Alert,
  Picker,
  ScrollView,
  FlatList,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { SwipeRow } from 'react-native-swipe-list-view';
import CreateOrJoin from './CreateOrJoin';
import { Dropdown } from 'react-native-material-dropdown';
import SwipeToDelete from './swipeToDelete';
import JoinCommunity from './JoinCommunity'

import Constants from "expo-constants";
const { manifest } = Constants;
import axios from 'axios';

const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;


import {styles} from '../styles/main_styles';
import {home_styles} from '../styles/home_styles';
import {profile_styles} from '../styles/profile_styles';

function Item({ title }) {
    console.log(title);
    return (
      <View style={styles2.item}>
        <Text style={styles2.title}>{title}</Text>
      </View>
    );
  }

export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      suid: 'anitaB',
      first_name  : 'Harrison',
      last_name  : 'Bronfeld',
      phonenumber : '609-613-2175',
      editable : false,
      title : 'Edit My Information',
      color : 'grey',
      communities : [],
      events : ['Nimit On Call 3/20', 'Full Moon On the Quad', 'Nomad', 'Xanadu Special D'],
    }

    this.getData();

  }

renderExample = (arr) => {
	if (this.state.communities == '') {
		this.getData();
	}
 	const Component = SwipeToDelete;
 	//this.setState({refresh: true});
 	return <Component array={arr}/>;
};

  leaveCommunityAlert = () => {
    Alert.alert(
                'You are about to leave this community.',
                'Are you sure you want to leave?',
                [ { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
                  {text: 'OK', onPress: () => console.log('OK Pressed')}, ],
                ) 
  }

  deleteEventAlert = () => {
    Alert.alert(this.state.data);
    Alert.alert(
                'You are about to delete this event.',
                'Are you sure you want to delete?',
                [ { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
                  {text: 'OK', onPress: () => console.log('OK Pressed')}, ],
                ) 
  }

  editMyInformation = () => {
    if (this.state.editable == false) {
      this.setState({editable: true});
      this.setState({title: 'Save My Information'});
      this.setState({color: 'white'});
    } else {
      this.setState({editable: false});
      this.setState({title: 'Edit My Information'});
      this.setState({color: 'grey'});
    }
  }

  joinCommunity = () => {
      this.props.navigation.navigate('Join', {suid: this.state.suid});
  }

  makeCommunity = () => {
      this.props.navigation.navigate('MakeCommunity', {suid: this.state.suid});
  }

  self = this;

  getData = () => {
    //Alert.alert("here 1");

    const body = {suid: 'anitaB'};

    axios.post(uri + '/profile_mount', body)
      .then(res =>  {

        var communitiesArray = [];

        res.data.forEach(function (item, index) {
              console.log(item.community);
              communitiesArray.push(item.community);
          });

        var dataArray = Array(communitiesArray.length)
            .fill('')
            .map((_, i) => ({ title: communitiesArray[i], key: `${i}`,  }));

        this.setState({first_name : res.data[0].first_name});
        this.setState({last_name : res.data[0].last_name});
        this.setState({phonenumber : res.data[0].phone_number});
        this.setState({communities : dataArray});
        this.setState({data : dataArray});

      }).catch((error) => {
          console.log(error);
    });
  }

  componentDidMount() {
    this.getData();
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
              <Text style={profile_styles.profileInfoTitle}>First Name</Text>
              <TextInput style={profile_styles.profileInfo}
                editable={this.state.editable}
                value={this.state.first_name}
                returnKeyType='done'
                backgroundColor={this.state.color}
                placeholderTextColor='black'
                onChange= {(event) => this.setState({first_name: event.nativeEvent.text})}
              ></TextInput>

              <Text style={profile_styles.profileInfoTitle}>Last Name</Text>
              <TextInput style={profile_styles.profileInfo}
                editable={this.state.editable}
                value={this.state.last_name}
                returnKeyType='done'
                backgroundColor={this.state.color}
                placeholderTextColor='black'
                onChange= {(event) => this.setState({last_name: event.nativeEvent.text})}
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

          <SafeAreaView style={styles2.container}>
            <FlatList
              // ItemSeparatorComponent={Platform.OS !== 'android' && ({highlighted}) => (
              //   <View style={[style.separator, highlighted && {marginLeft: 0}]} />
              // )}
              data={this.state.communities}
              renderItem={({item, index, separators}) => (
                <TouchableHighlight
                  //onPress={() => this._onPress(item)}
                  onShowUnderlay={separators.highlight}
                  onHideUnderlay={separators.unhighlight}>
                  <View style={styles2.item}>
                    <Text style={styles2.title}>{item.title}</Text>
                  </View>
                </TouchableHighlight>
              )}
            />

          </SafeAreaView>

          <Button
                title='Join Another Community'
                onPress = {() => this.joinCommunity()}
              />

          <Button
                title='Create a New Community'
                onPress = {() => this.makeCommunity()}
              />

          <View style={profile_styles.profileSeparator}></View>

          <Text style={profile_styles.profileSectionTitle}>My Events</Text>

          <Text style={profile_styles.profileInfoTitle}>Upcoming Events</Text>

          {this.renderExample(this.state.events)}

          <Text style={profile_styles.profileInfoTitle}>Past Events</Text>

        </ScrollView>

        
      </View>
    );
  }
}

const styles1 = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: 'black',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: 'grey',
        borderBottomColor: 'black',
        borderBottomWidth: 20,
        justifyContent: 'center',
        height: 70,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        borderBottomColor: 'black',
        borderBottomWidth: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 45,
    backgroundColor: 'grey',
    padding: 10,
    marginVertical: 10,
    textAlign: 'center',
    //fontSize: '20',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
});
