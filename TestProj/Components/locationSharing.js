import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import * as Permissions from 'expo-permissions';

import Constants from "expo-constants";
const { manifest } = Constants;
import axios from 'axios';

const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const Scaledrone = require('scaledrone-react-native');
const SCALEDRONEID = 'ck9tuUkzlzPvEaG0'

// Redux Imports
import { connect } from 'react-redux';
import { changeSUID } from '../actions/suids';
// import { bindActionCreators } from 'redux';

class LocationSharing extends Component {

  constructor(props) {
    super();
    this.state = {
      members: []
    };
    // this.uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;
    this.uri = `http://5c432761.ngrok.io`;
    this.cur_members = new Set();
    // this.notActiveMembers = new Set();
    // this.notActiveMemberNames = new Set();
    this.subscribed_to_rooms = [];
  }

  historyUpdateLocation(data) {
    const {members} = this.state;
    const member = members.find(m => m.id === data.suid);
    if (!member) {
      // a history message might be sent from a user who is no longer online
      console.log("couldn't find that member with suid");
      location = new AnimatedRegion({
        latitude: data.latitude,
        longitude: data.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      });
      toAddMember = {suid: data.suid, location: location};
      this.notActiveMembers.add(toAddMember);
      this.notActiveMemberNames.add(data.suid);
      this.forceUpdate();
    }
  }

  updateLocation(data, memberId) {
    const {members} = this.state;
    const member = members.find(m => m.id === memberId);
    if (!member) {
      // a history message might be sent from a user who is no longer online
      console.log("couldn't find that member");
      return;
    }
    // if found the member, check if they are in the notActiveMembers and if so remove
    // if (this.notActiveMemberNames.has(memberId))  {
    //   this.notActiveMemberNames.delete(memberId);
    // }
    // console.log(this.notActiveMemberNames);

    if (member.location) {
      member.location.timing({
        latitude: data.latitude,
        longitude: data.longitude,
      }).start();
    } else {
      member.location = new AnimatedRegion({
        latitude: data.latitude,
        longitude: data.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
      this.forceUpdate();
    }
  }

  add_and_updateLocation(data, member)  {
    // console.log("Our members: " + this.state.members);
    if (!this.cur_members.has(member.id)) {
          this.cur_members.add(member.id);
          const members = this.state.members.slice(0);
          members.push(member);
          this.setState({members});
    }
    this.updateLocation(data, member.id)
  }

  set_subscribed(res) {
      this.subscribed_to_rooms = res.data;
  }

  startLocationTracking(callback) {
    navigator.geolocation.watchPosition(
      callback,
      error => console.error(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  createTempMembers() {
    for (let member of this.notActiveMembers) {
      const {suid, location} = member;
      if (this.notActiveMemberNames.has(suid))  {
        console.log("making temporary member label");
        return (
          <View key={suid} style={styles.member}>
            <View style={[styles.avatar, {backgroundColor: '#000000'}]}/>
            <Text style={styles.memberName}>{suid}</Text>
          </View>
        );
      }
    }      
  }

  createMembers() {
    const {members} = this.state;
    // var temps = this.createTempMembers();
    toReturn = members.map(member => {
      // console.log(member);
      const {name, color} = member.authData;
      return (
        <View key={member.id} style={styles.member}>
          <View style={[styles.avatar, {backgroundColor: color}]}/>
          <Text style={styles.memberName}>{name}</Text>
        </View>
      );
    });
    // return toReturn.concat(temps);
    return toReturn;
  }

  createTempMarkers() {
    for (let member of this.notActiveMembers) {
      const {suid, location} = member;
      console.log(this.notActiveMemberNames);
      if (this.notActiveMemberNames.has(suid))  {
        console.log("making temporary marker");
        return (
          <Marker.Animated
            key={suid}
            identifier={suid}
            coordinate={location}
            pinColor={'#000000'}
            title={suid}
          />
        );
      }      
    };
  }

  createMarkers() {
    // for those that don't exist
    // var temps = this.createTempMarkers();
    const {members} = this.state;
    const membersWithLocations = members.filter(m => !!m.location);
    var markers = membersWithLocations.map(member => {
      const {id, location, authData} = member;
      const {name, color} = authData;
      console.log("id is: " + id);
      return (
        <Marker.Animated
          key={id}
          identifier={id}
          coordinate={location}
          pinColor={color}
          title={name}
        />
      );
    });
    // var toReturn = markers.concat(temps);
    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    // console.log(Object.size(toReturn))
    // return toReturn;
    return markers;
  }

  fitToMarkersToMap() {
    const {members} = this.state;
    this.map.fitToSuppliedMarkers(members.map(m => m.id), true);
  }

  authAndName(clientId, name) {
    // this.suid = name;
    // console.log("Auth and Name prints out " + name);
    return doAuthRequest(clientId, name, this.uri);
  }

  componentDidMount() {
    console.log("URI: " + uri);
    Permissions.askAsync(Permissions.LOCATION);
    const drone = new Scaledrone(SCALEDRONEID);
    drone.on('error', error => console.error(error));
    drone.on('close', reason => console.error(reason));
    drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
        this.authAndName(drone.clientId, this.props.suid.suid).then(
          jwt => {drone.authenticate(jwt)}
      );
    });

    // Here, room is the individual's personal room
    const room = drone.subscribe('observable-' + this.props.suid.suid, {
      historyCount: 1 // load 50 past messages
    });
    room.on('open', error => {
      if (error) {
        return console.error(error);
      }

      // received past message
      // room.on('history_message', message => {
      //     // console.log("Past messages triggered");
      //     console.log("HISTORY message for: " + message.data.suid + " lattitude at: " + message.data.latitude + " longitude at: " + message.data.longitude);
      //     self.historyUpdateLocation(message.data, message.clientId);
      //   }
      // );
      // received new message
      room.on('data', (data, member) => {
          console.log("NEW message for: " + member.authData.name + " lattitude at: " + data.latitude + " longitude at: " + data.longitude);
          this.add_and_updateLocation(data, member);
        }
      );
      // new member subscribed to yours
      room.on('member_join', member => {
        navigator.geolocation.getCurrentPosition(
           (position) => {
              const {latitude, longitude} = position.coords;
              console.log('observable-' + this.props.suid.suid);
              suid = this.props.suid.suid;
              drone.publish({
                  room: 'observable-' + suid,
                  message: {latitude, longitude, suid}
                });
            }, error => console.error(error));
      });

      // start publishing locations to own room
      this.startLocationTracking(position => {
        const {latitude, longitude} = position.coords;
        // publish device's new location
        suid = this.props.suid.suid;
        drone.publish({
          room: 'observable-' + suid,
          message: {latitude, longitude, suid}
        });
      });
    });
    // // received past message
    // room.on('history_message', message => {
    //   // console.log("Past messages triggered");
    //   self.updateLocation(message.data, message.clientId);
    // }
    // );
    // // received new message
    // room.on('data', (data, member) => {
    //     console.log("NEW message lattitude at: " + data.latitude + " longitude at: " + data.longitude);
    //     this.add_and_updateLocation(data, member);
    //   }
    // );
    // // new member subscribed to yours
    // room.on('member_join', member => {
    //   navigator.geolocation.getCurrentPosition(
    //      (position) => {
    //         const {latitude, longitude} = position.coords;
    //         drone.publish({
    //             room: 'observable-' + this.props.suid.suid,
    //             message: {latitude, longitude}
    //           });
    //       }, error => console.error(error));
    // });

    // subscribing to other people's rooms (when other's share location with us)
    // from db, get all subscribed_to rooms (suids technically, prepend observable-)


      self = this;
      axios.post(self.uri + '/get_rooms_sd', {suid: self.props.suid.suid})
          .then(res =>  {
            console.log(res.data);
            res.data.forEach(function (item, index) {
              // console.log("DEBUG: inside for each");
              console.log(item.room_id);
              const susbribed = drone.subscribe('observable-' + item.room_id, {
                historyCount: 1 // load 50 past messages
              });
              // received past message
              susbribed.on('history_message', message =>  {
                console.log("HISTORY message for: " + message.data.suid + " lattitude at: " + message.data.latitude + " longitude at: " + message.data.longitude);
                // console.log('hist mess memb data: ' + message.member.clientData);
                // console.log('hist mess memb id: ' + message.member.id);
                // self.historyUpdateLocation(message.data, message.data.suid);
              }
              );
              // received new message
              susbribed.on('data', (data, member) =>
                self.add_and_updateLocation(data, member)
              );
              // someone leaves the room u are following - check if its publisher
              room.on('member_leave', member => {
                console.log("REMOVING SOMEONE");
                if (member.id == item.room_id)  {
                  const members = self.state.members.slice(0);
                  const index = members.findIndex(m => m.id === member.id);
                  if (index !== -1) {
                    members.splice(index, 1);
                    self.setState({members});
                    console.log("REACHES DELETE");
                    self.forceUpdate();
                  }
                }
              });
            }); 
          })
          .catch((error) => {
            if (error.response){
              if (error.response.status == 401) {
                Alert.alert("User with SUID already exists, please enter unique SUID")
              }
            console.log(error)
            }
        });    
    // iterate through all rooms, subscribe to each
    
    
    // set member list based on this iteration ...
  }

  render() {
    return  (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={ref => {this.map = ref;}}
          initialRegion={{
            latitude: 37.600425,
            longitude: -122.385861,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {this.createMarkers()}
        </MapView>
        <View pointerEvents="none" style={styles.members}>
          {this.createMembers()}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.fitToMarkersToMap()}
            style={[styles.bubble, styles.button]}
          >
            <Text>Fit Markers Onto Map</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function doAuthRequest(clientId, name, uri) {
    let status;
    return axios.post(uri + "/auth", {clientId: clientId, name: name})
      .then(res => {
      status = res.status; 
      return res.data;
    }).then(text => {
      if (status === 200) {
        return text;
      } else {
        alert(text);
      }
    }).catch(error => console.error(error));
  }

const mapStateToProps = ({suid}) => ({
   suid
});

const mapDispatchToProps = {
  changeSUID
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationSharing);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 20,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
    marginBottom: 400,
  },
  members: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
  },
  member: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 20,
    height: 30,
    marginTop: 10,
  },
  memberName: {
    marginHorizontal: 10,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});