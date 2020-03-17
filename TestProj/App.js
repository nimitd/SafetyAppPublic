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
import EnterPhone from './Components/EnterPhone'
import Register from './Components/Register'
import CreateOrJoin from './Components/CreateOrJoin'
import { Dropdown } from 'react-native-material-dropdown'
import MakeCommunity from './Components/MakeCommunity'
import JoinCommunity from './Components/JoinCommunity'
import LocationSharing from './Components/locationSharing'
import Loading from './Components/Loading'
import EnterCode from './Components/EnterCode'
import Home from './Components/Home'
import Resources from './Components/Resources'
import Profile from './Components/Profile'


// backend connect code
import Constants from "expo-constants";
const { manifest } = Constants;
import axios from 'axios';


// navigation imports
import { createAppContainer, createSwitchNavigator, StackNavigator, SwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

// Redux App
import { connect } from 'react-redux';
import { changeSUID } from './actions/suids';
import { bindActionCreators } from 'redux';

// hide warnings
console.disableYellowBox = true;


const OnboardingStack = createStackNavigator({
  Landing: {
    screen: Register,
    navigationOptions: {
      headerShown: false,
    },
  },
  Phone: {
    screen: EnterPhone,
    navigationOptions: {
      headerShown: false,
    },
  },
  CreateJoin: {
    screen: CreateOrJoin,
    navigationOptions: {
      headerShown: false,
    },
  },
  Join: {
    screen: JoinCommunity,
    navigationOptions: {
      headerShown: false,
    },
  },
  Create: {
    screen: MakeCommunity,
    navigationOptions: {
      headerShown: false,
    },
  },
  Code: {
    screen: EnterCode,
    navigationOptions: {
      headerShown: false,
    },
  }
}, {initialRouteName: 'Landing'})


const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerShown: false,
    },
  },
  Join: {
    screen: JoinCommunity,
    navigationOptions: {
      headerShown: false,
    },
  },
  MakeCommunity: {
    screen: MakeCommunity,
    navigationOptions: {
      headerShown: false,
    },
  },
}, {initialRouteName: 'Profile'})

const MainApp = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={25} color={tintColor} />
        )
    }
  },
  Resources: {
    screen: Resources,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
          <Icon name="book" size={25} color={tintColor} />
        )
    }
  },
  Location: {
    screen: LocationSharing,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
          <Icon name="location-arrow" size={25} color={tintColor} />
        )
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
          <Icon name="user" size={25} color={tintColor} />
        )
    }
  },
},
{
    tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        swipeEnabled: false,
        showLabel: true,
        showIcon: true,
        style: {
          backgroundColor: 'black',
          paddingVertical: 10,
          height: 60
        },
        labelStyle: {
          color: "lightgray",
        } 
      }
    },

);


// const mapStateToProps = state => ({
//   suid: state.suid,
// });

// const ActionCreators = Object.assign(
//   {},
//   changeSUID,
// );

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(ActionCreators, dispatch),
// });


const Switch = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: {screen: Loading},
    Home : {screen: MainApp},
    Onboarding : {screen: OnboardingStack},
  },
  {
    initialRouteName: 'AuthLoading',
  },
));

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Switch />
        </View>
      </Provider>
    );
  }
}


// export default connect(mapStateToProps, mapDispatchToProps)(App);

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