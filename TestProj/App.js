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

// component imports
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

// backend imports
import axios from 'axios';

// navigation imports
import { createAppContainer, createSwitchNavigator, StackNavigator, SwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

// redux imports
import { connect } from 'react-redux';
import { changeSUID } from './actions/suids';
import { bindActionCreators } from 'redux';

// temp: hide warnings for expo
console.disableYellowBox = true;

// navigator for user and community account creation
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

// navigator for profile tab
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


// navigator for main app interface and bottom tab navigator
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

// temp: switch navigator for demo
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#DCDCDC',
  },
});