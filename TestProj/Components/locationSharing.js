import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import Modal from "react-native-modal";
import { Icon } from 'react-native-elements'

import { ListItem } from 'react-native-elements'


import Constants from "expo-constants";
const { manifest } = Constants;
import axios from 'axios';

// const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;
uri = `http://039130de.ngrok.io`;
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const Scaledrone = require('scaledrone-react-native');
const SCALEDRONEID = 'ck9tuUkzlzPvEaG0'
// const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;

// Redux Imports
import { connect } from 'react-redux';
import { changeSUID } from '../actions/suids';
// import { bindActionCreators } from 'redux';

class LocationSharing extends Component {

  constructor(props) {
    super();
    this.state = {
      members: [],
      isVisible: false,
      subscribers: []
    };
    // this.uri = `http://bc13f145.ngrok.io`;
    this.cur_members = new Set();
    this.notActiveMembers = new Set();
    this.notActiveMemberNames = new Set();
    this.drone;
    this.current_members = [];
  }

  getSubscribers() {
    self = this;
    axios.post(uri + '/get_subscribers', {suid: self.props.suid.suid})
          .then(res =>  {
            console.log(res.data);
            subs = self.state.subscribers;
            res.data.forEach(function (item, index) {
              // do something
              console.log("suid getting back is: " + item.suid);
              subs.push(item.suid);
            });
            self.setState({subscribers: subs});
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

  add_member(data)  {
    change_members = this.current_members;
    var member = change_members.find(m => m.id === data.suid);
    var color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    if (!member)  {
      // if member is not in the list
      location = new AnimatedRegion({
        latitude: data.latitude,
        longitude: data.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
      member = {location: location, id: data.suid, color: color};
      change_members.push(member);
      this.current_members = change_members;
    } else {
      // if member does already exist and got repeat data, change location
      member.location.timing({
        latitude: data.latitude,
        longitude: data.longitude,
      }).start();
    }
    this.forceUpdate();
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
    const members = this.current_members;
    toReturn = members.map(member => {
      // console.log(member);
      const {location, id, color} = member;
      return (
        <View key={member.id} style={styles.member}>
          <View style={[styles.avatar, {backgroundColor: color}]}/>
          <Text style={styles.memberName}>{id}</Text>
        </View>
      );
    });
    return toReturn;
  }


  createMarkers() {
    // for those that don't exist
    const members = this.current_members;
    const membersWithLocations = members.filter(m => !!m.location);
    var markers = membersWithLocations.map(member => {
      const {location, id, color} = member;
      return (
        <Marker.Animated
          key={id}
          identifier={id}
          coordinate={location}
          pinColor={color}
          title={id}
        />
      );
    });
    return markers;
  }

  fitToMarkersToMap() {
    const members = this.current_members;
    this.map.fitToSuppliedMarkers(members.map(m => m.id), true);
  }

  authAndName(clientId, name) {
    return doAuthRequest(clientId, name, uri);
  }

  showSubscribedLocations() {
    self = this;
    axios.post(uri + '/get_rooms_sd', {suid: self.props.suid.suid})
        .then(res =>  {
          console.log("Query getting back size: " + self.props.suid.suid + res.data.length);
          res.data.forEach(function (item, index) {
            var member = self.current_members.find(m => m.id === item.room_id);
            if (!member) {
              const susbribed = self.drone.subscribe('observable-' + item.room_id, {
                historyCount: 1 // load 50 past messages
              });
              // received past message
              susbribed.on('history_message', message =>  {
                // self.add_member(message.data);
              });
              // received new message
              susbribed.on('data', (data, member) =>  {
                if (!data.suid.startsWith("/UPDATE/")){
                  self.add_member(data);
                }
              });
            }
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
        doAuthRequest(drone.clientId, this.props.suid.suid, uri).then(
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
      // received new message
      room.on('data', (data, member) => {
          if (data.suid.startsWith("/UPDATE/"))  {
            console.log("FORCING RE-RENDER");
            if (data.suid.startsWith("/UPDATE/DEL/")) {
              // delete from members list
              console.log("PRESSED DEL BUTTON");
              var id_to_delete = data.suid.split("/DEL/")[1];
              self.current_members = self.current_members.filter(obj => obj.id !== id_to_delete);
            }
            this.forceUpdate();
          } else {
            console.log("GOT OWN DATA");
            this.add_member(data);
          }
        }
      );
      // new member subscribed to yours
      this.drone = drone;
      self = this;
      room.on('member_join', member => {
        navigator.geolocation.getCurrentPosition(
           (position) => {
              const {latitude, longitude} = position.coords;
              console.log('observable-' + self.props.suid.suid);
              suid = self.props.suid.suid;
              self.drone.publish({
                  room: 'observable-' + suid,
                  message: {latitude, longitude, suid}
                });
            }, error => console.error(error));
      });

      // start publishing locations to own room
      this.startLocationTracking(position => {
        const {latitude, longitude} = position.coords;
        // publish device's new location
        suid = self.props.suid.suid;
        self.drone.publish({
          room: 'observable-' + suid,
          message: {latitude, longitude, suid}
        });
      });
    });
    this.getSubscribers();
  }

  displayModal(show){
    this.setState({isVisible: show})
  }

  stopSharing(item) {
    suid = this.props.suid.suid;
    console.log("STOP BUTTON PRESSED");
    self = this;
    title = 'Stop Sharing with ' + item;
    subtitle = 'Are you sure you would like to stop sharing your location with ' + item;
    Alert.alert(
      title,
      subtitle,
      [
        {text: 'No', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => 
          
          axios.post(uri + '/stop_sharing', {suid: suid, subscriber: item})
                .then(res =>  {
                  console.log(res.data);
                  subs = self.state.subscribers;
                  const index = subs.indexOf(item);
                  if (index > -1) {
                    subs.splice(index, 1);
                    console.log(subs);
                  }
                  self.drone.publish({
                    room: 'observable-' + item,
                    message: {latitude: 0, longitude: 0, suid: '/UPDATE/DEL/' + suid}
                  });
                  self.setState({subscribers: subs});
                })
                .catch((error) => {
                  console.log(error)
                })
          
      },]
    );
  }

  shareLocation() {
    console.log("SHARE BUTTON PRESSED");
    suid = this.props.suid.suid;
    self = this;
    Alert.prompt('Who would you like to share your location with (SUID)?', null, name => {
        axios.post(uri + '/start_sharing', {suid: suid, subscriber: name})
                .then(res =>  {
                  subs = self.state.subscribers;
                  subs.push(name);
                  self.drone.publish({
                    room: 'observable-' + name,
                    message: {latitude: 0, longitude: 0, suid: '/UPDATE/'}
                  });
                  self.setState({subscribers: subs});
                  })
                .catch((error) => {
                  console.log(error)
                });
      }
    );
  }

  render() {
    this.showSubscribedLocations();
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
        <TouchableHighlight onPress={()=>{this.shareLocation()}}>
           <View style={styles.sendButton}>
               <Icon reverse name = "send" size = {24}/>
           </View>
        </TouchableHighlight>
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
        <View style = { styles.buttonContainer2 }>
         <TouchableOpacity
              style={[styles.bubble, styles.button]}
              onPress={() => {
                this.displayModal(true);
              }}>
              <Text>Who can see me?</Text>
          </TouchableOpacity>     
        </View>
        <Modal
            animationType = {"slide"}
            transparent={true}
            visible={this.state.isVisible}
            propagateSwipe={true}
            backgroundColor="transparent"
            onBackdropPress={() => this.setState({ isVisible: false })}>
            <View style={styles.container_modal}>
                <FlatList 
                  data={this.state.subscribers}
                  keyExtractor={ (item) => item}
                  renderItem={({ item }) => 
                    <View  style={styles.sectionListItem}>
                      <TouchableHighlight onPress={() => this.stopSharing(item)}>
                        <Text style={styles.text}>{item}</Text>
                      </TouchableHighlight>
                      <Icon reverse name = "delete" size = {24}/>
                    </View>
                  }
                  keyExtractor={item => item}

                />
            </View>
        </Modal>
        
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
    flex: 1,
  },
  container_modal: {
    flex: 1,
    alignItems: 'center',
    marginTop: 300,
  },
  sendButton: {
    position: 'relative',
    // width: 50,
    // height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: 150,
    top: 0,
  },
  sectionListItem: {
    backgroundColor: 'maroon',
    padding: 20,
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrolling: {
    flex: 1,
    margin: 20,
    backgroundColor: 'orange',
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 70,
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
  buttonText:{

  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
    marginBottom: 0,
  },
  buttonContainer2: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
    marginBottom: 10,
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
  text: {
    fontSize: 20
  },
});