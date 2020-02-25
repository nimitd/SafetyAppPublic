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

export default class LocationSharing extends Component {

  constructor(props) {
    super();
    this.state = {
      members: []
    };
    this.uri = props.uri
  }

  updateLocation(data, memberId) {
    const {members} = this.state;
    const member = members.find(m => m.id === memberId);
    if (!member) {
      // a history message might be sent from a user who is no longer online
      return;
    }
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

  createMembers() {
    const {members} = this.state;
    return members.map(member => {
      const {name, color} = member.authData;
      return (
        <View key={member.id} style={styles.member}>
          <View style={[styles.avatar, {backgroundColor: color}]}/>
          <Text style={styles.memberName}>{name}</Text>
        </View>
      );
    });
  }

  createMarkers() {
    const {members} = this.state;
    const membersWithLocations = members.filter(m => !!m.location);
    return membersWithLocations.map(member => {
      const {id, location, authData} = member;
      const {name, color} = authData;
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
  }

  fitToMarkersToMap() {
    const {members} = this.state;
    this.map.fitToSuppliedMarkers(members.map(m => m.id), true);
  }

  componentDidMount() {
    Permissions.askAsync(Permissions.LOCATION);
    const drone = new Scaledrone(SCALEDRONEID);
    drone.on('error', error => console.error(error));
    drone.on('close', reason => console.error(reason));
    drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      Alert.prompt(
        'Please insert your name',
        null,
        name => doAuthRequest(drone.clientId, name, this.uri).then(
          jwt => {drone.authenticate(jwt)}
        )
      );
    });
    const room = drone.subscribe('observable-locations', {
      historyCount: 50 // load 50 past messages
    });
    room.on('open', error => {
      if (error) {
        return console.error(error);
      }
      this.startLocationTracking(position => {
        const {latitude, longitude} = position.coords;
        // publish device's new location
        drone.publish({
          room: 'observable-locations',
          message: {latitude, longitude}
        });
      });
    });
    // received past message
    room.on('history_message', message =>
      this.updateLocation(message.data, message.clientId)
    );
    // received new message
    room.on('data', (data, member) =>
      this.updateLocation(data, member.id)
    );
    // array of all connected members
    room.on('members', members =>
      this.setState({members})
    );
    // new member joined room
    room.on('member_join', member => {
      const members = this.state.members.slice(0);
      members.push(member);
      this.setState({members});
    });
    // member left room
    room.on('member_leave', member => {
      const members = this.state.members.slice(0);
      const index = members.findIndex(m => m.id === member.id);
      if (index !== -1) {
        members.splice(index, 1);
        this.setState({members});
      }
    });
  }

  render() {
    return (
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