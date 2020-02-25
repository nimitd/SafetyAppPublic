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
  Picker
} from 'react-native';

//import CreateOrJoin from './Components/CreateOrJoin';
//import * as Components from './Components';
import EnterPhone from './Components/EnterPhone';
import Register from './Components/Register'
import CreateOrJoin from './Components/CreateOrJoin'
import { Dropdown } from 'react-native-material-dropdown';
import MakeCommunity from './Components/MakeCommunity'
import JoinCommunity from './Components/JoinCommunity'
import LocationSharing from './Components/locationSharing'


// backend connect code
import Constants from "expo-constants";
const { manifest } = Constants;
import axios from 'axios';

const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {loggedIn: false, registered: false, suid: "", made_community: false, joined_community: false};
  }

  login = () => {
      this.setState({ loggedIn: true });
  }

  register = (id) => {
      this.setState({ registered: true, suid: id });
  }

  clicked_make_or_join_community = (flag) => {
    if (flag == 0) {
      this.setState({ made_community: true });
    } else {
      this.setState({ joined_community: true });
    }
  }


  render () {
    return <LocationSharing 
            uri={uri}/>


    if (!this.state.registered) {
      return <Register
        onRegister={this.register}
        uri={uri}/>
    } else if (!this.state.loggedIn) {
      return <EnterPhone
        uri={uri}
        suid={this.state.suid}
        onLogin={this.login}/>
    }
    else if (!this.state.made_community && !this.state.joined_community) {
      return <CreateOrJoin
        onCommunityClick={this.clicked_make_or_join_community}
        uri={uri} />
    }
    else if (this.state.made_community) { 
      return <MakeCommunity
        uri={uri}/>
    } else if (this.state.joined_community) {
      return <JoinCommunity
        uri={uri}/>
    } else {
      return<EnterPhone
        uri={uri}
        suid={this.state.suid}
        onLogin={this.login}/>
    }
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
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 30,
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
});