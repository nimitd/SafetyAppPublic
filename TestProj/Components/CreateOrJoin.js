import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {
  Button,
  SafeAreaView,
  Alert,
  TouchableHighlight,

} from 'react-native';
import Constants from 'expo-constants'
const { manifest } = Constants;

import {styles} from '../styles/main_styles'

// Redux Imports
import { connect } from 'react-redux';
import { changeSUID } from '../actions/suids';


function Separator() { 
	return <View style = {styles.separator} />;

}

class CreateOrJoin extends Component {

constructor(props) {
    super(props);

    // this.clicked_button=props.onCommunityClick;

  }

  on_make_button_click = () => { 
    this.props.navigation.navigate('Create');
  }

  on_join_button_click = () => { 
    this.props.navigation.navigate('Join');
  }


  render() {
    return (

      <View style = {styles.container}>
        <View style = {styles.buttonSpaceContainer}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.on_make_button_click}>
            <Text style={styles.loginText}>Create a Community</Text>
          </TouchableHighlight>
        </View>
        <Separator/>
        <View style = {styles.buttonSpaceContainer}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.on_join_button_click}>
            <Text style={styles.loginText}>Join a Community</Text>
          </TouchableHighlight>
        </View>
      </View>
      
    );
  }
}

const mapStateToProps = ({suid}) => ({
   suid
});

const mapDispatchToProps = {
  changeSUID
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrJoin);
