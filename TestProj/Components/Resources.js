
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
  SafeAreaView,
  SectionList,
  Divider,
  TouchableOpacity,
  Linking,
} from 'react-native';
import CreateOrJoin from './CreateOrJoin';
import { Dropdown } from 'react-native-material-dropdown';

import Constants from "expo-constants";
const { manifest } = Constants;
import axios from 'axios';

import {styles} from '../styles/main_styles'
import {home_styles} from '../styles/home_styles'
import call from 'react-native-phone-call';
import { Icon } from 'react-native-elements'
import update from 'immutability-helper';
import Modal from 'react-native-modal';
const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;






const DATA = [
  {
    title: 'Campus Resources',
    data: ['CAPS', '5-SURE', 'Title-IX', 'SARA', 'WCC', 'Dept. of Public Safety', 'ResEd', 'OAPE'],
  },
  {
    title: 'Community Admins',
    data: ['RA', 'RCC', 'PHE', 'RFs'],
  },
  {
    title: 'Community Peers',
    data: ['Co-Resident 1', 'Co-Resident 2', 'Co-Resident 3'],
  },
];

const DATA_CONTACTS = {
  'CAPS': {'phone': '6507233785', 'email': 'vaden-emr@stanford.edu'},
  'Dept. of Public Safety': {'phone': '6503292413', 'email': 'police@stanford.edu'},
  '5-SURE': {'phone': '6507257873', 'email': 'alcohol@stanford.edu'},
  'Title-IX': {'phone': '6504974955', 'email': 'titleix@stanford.edu'},
  'SARA': {'phone': '6507251056', 'email': 'saraoffice@stanford.edu'},
  'WCC': {'phone': '6507232300', 'email': 'stanfordwcc@stanford.edu'},
  'ResEd': {'phone': '6507252800', 'email': 'residentialeducation@stanford.edu'},
  'OAPE': {'phone': '6507255947', 'email': 'alcohol@stanford.edu'},


  'RA': {'phone': '6232155170', 'sms': '6232155170', 'email': 'caps@stanford.edu'},
  'RCC': {'phone': '6232155170', 'sms': '6232155170', 'email': 'caps@stanford.edu'},
  'PHE': {'phone': '6232155170', 'sms': '6232155170', 'email': 'caps@stanford.edu'},
  'RFs': {'phone': '6232155170', 'email': 'caps@stanford.edu'},

  'Co-Resident 1': {'phone': '6232155170', 'sms': '6232155170', 'email': 'gitakris@stanford.edu'},
  'Co-Resident 2': {'phone': '4088932682', 'sms': '6232155170', 'email': 'gitakris@stanford.edu'},
  'Co-Resident 3': {'phone': '4088932682', 'sms': '6232155170', 'email': 'gitakris@stanford.edu'},
}

const DATA_INFORMATION = {
	'CAPS': 'Counseling & Psychological Services at Vaden Health Center provides 24/7 support, psychiatric consults, groups and workshops, and other resources geared at maintaining the well-being of the Stanford Community.'


}

var new_data = {}



function Item({ title }) {
    return (
      <View style={styles.sectionListItem}>
      <Icon name='phone-call'/>

        <TouchableHighlight onPress={() => makeCall({title})}>
                <Text style={styles.text}>{title}</Text>
              </TouchableHighlight>
      </View>
      
    );
}


export default class Resources extends Component {

  constructor() {
    super()
    this.state = {
      search: false,
      dataToShow: DATA,
      isModalVisible: false,
      modalTitle: '',
    }

    this.populate_data();

  }

  populate_data = () => {
    console.log("IN POPULATE DATA");
      self = this;
      axios.post(uri + '/get_resource_data', {})
          .then(res =>  {
            console.log(res.data);
            res.data.forEach(function (item, index) {
              console.log("DEBUG: inside for each");
              console.log("ITEM: ", item);
              console.log("INDEX: ", index);
              console.log(item["description"]);
              new_data[item["name"]] = {}
              // new_data[item["name"]].push({"description": item["description"], "phone": item["phone_num"], "email": item["email"]});
              // new_data.push({
              //   key: item.["name"],
              //   value: {"description": item["description"], "phone": item["phone_num"], "email": item["email"]}
              // });
              console.log("NEW DATA: ", new_data);
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
    console.log("after axios post");    
  }

  makeCall = (number) => {
     const args = {
         number: number, // String value with the number to call
         prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
     }
    call(args).catch(console.error)
  
  }

  sendText = (number) => {
        Linking.openURL('sms:'+number+"&body=Hi! I need help.");
    }

  sendEmail = (email) => {
        Linking.openURL('mailto:'+email);
  }

  openModal = (title) => {
  	console.log("OPENING MODAL OF: " + title);
  	this.setState({isModalVisible: true, modalTitle: title});
  }

  closeModal = () => {
  	this.setState({isModalVisible: false});
  }

  get_page_info = (title) => {
  	// console.log("title: ", title);
  	return DATA_INFORMATION[this.state.modalTitle];
  	// console.log("sdkf " + DATA_INFORMATION[title] + title);
  	// return DATA_INFORMATION[title];
  }

   get_number_info = () => {
   	 return DATA_CONTACTS[this.state.modalTitle]==undefined ? "" : DATA_CONTACTS[this.state.modalTitle]['phone'];
  }

   get_email_info = () => {
   	 return DATA_CONTACTS[this.state.modalTitle]==undefined ? "" : DATA_CONTACTS[this.state.modalTitle]['email'];
  }
// <View style={{marginTop:50}}>
// 			<TouchableOpacity onPress = {()=> this.openModal()}>
// 				<Text style={{textAlign:'center'}}>Click to open the modal</Text>
// 			</TouchableOpacity>
// 			<Modal isVisible={this.state.isModalVisible} style={styles_here.modal}>
// 				<View style={{ flex: 1 }}>
// 					<Text>This is the modal content for now!</Text>
// 				</View> 
// 			</Modal>
// 		</View>


display_item(title) {
  // console.log(title, DATA_CONTACTS[title]["sms"]==undefined, );
  return (
    <View style={styles.sectionListItem}>
      <View style={styles_here.title}>
         <Text style={styles_here.title}>{title}</Text>
         <View style = {styles_here.test}>
          <TouchableHighlight onPress={() => this.makeCall(DATA_CONTACTS[title]["phone"])}>
            <View>
              <Icon reverse name = "phone" size = {12}/>
            </View>
          </TouchableHighlight>
          {DATA_CONTACTS[title]["sms"]!=undefined ? 
          <TouchableHighlight onPress={() => this.sendText(DATA_CONTACTS[title]["phone"], 'Gita')}>
            <View>
              <Icon reverse name = "sms" size = {12}/>
            </View> 
          </TouchableHighlight> : <Text></Text> 
          }
          <TouchableHighlight onPress={() => this.sendEmail(DATA_CONTACTS[title]["email"])}>
            <View>
              <Icon reverse name = "email" size = {12}/>
            </View>
          </TouchableHighlight>
           <TouchableHighlight onPress={() => this.openModal(title)}>
            <View>
             <Icon reverse name = "expand-more" size = {12}/>

             <Modal isVisible={this.state.isModalVisible} style={styles_here.modal} onBackdropPress={()=>this.closeModal()}>

				<View style = {styles_here.info_text}>

					<Text>{this.get_page_info(title)}</Text>
				</View> 
				<TouchableOpacity onPress={() => this.makeCall(DATA_CONTACTS[title]["phone"])}>
				<View style = {{flexDirection: 'row'}}>
              		<Icon reverse name = "phone" size = {10}/>
					<Text style = {{marginVertical: 10, color: 'blue', textDecorationLine: 'underline'}}>{this.get_number_info()}</Text>
            	</View>
          		</TouchableOpacity>


            	<View style = {{flexDirection: 'row'}}>
              		<Icon reverse name = "email" size = {10}/>
              		<Text style = {{marginVertical: 10}}> {this.get_email_info()} </Text>
            	</View>
			</Modal>
			</View>
          </TouchableHighlight>

          </View>
     </View>
  </View>


    );
}

searchUpdated = (input) => {
  let matchedItemsArray = []
  console.log("input: ", input);
    if(input === ''){
      console.log("SETTING FALSE");
      this.setState({search: false, dataToShow: DATA});
      console.log("data to show: " + this.state.dataToShow);
    } else {
      DATA.map((item) => {
        let matchedDataArray = []
        item.data.map((data) => {
          console.log("DATA: " + data);
          if (data.toLowerCase().includes(input.toLowerCase())) { matchedDataArray.push(data)}
      	})
        let item_copy = JSON.parse(JSON.stringify(item));
        item_copy.data = matchedDataArray;
        // console.log(item_copy);
        matchedItemsArray.push(item_copy);
    	})
      this.setState({search: true, dataToShow: matchedItemsArray})
    }
  }

display_contacts() { 
  return (

      <SectionList
        sections={this.state.dataToShow}
        keyExtractor={ (item, index) => item + index}
        renderItem={ ({item}) => this.display_item(item)}
        renderSectionHeader={({ section: { title } }) => (<Text style={styles_here.header}>{title}</Text>)}
      />
    );
  }

  render() {
    return (


      <SafeAreaView style = {styles.container}>
      <Text style={styles_here.search}> Search </Text>
      <TextInput  
        style={{ height: 40, borderColor: 'gray', borderWidth: 3 , color: 'white'}}
        placeholder='Search'
        placeholderStyle={styles_here.header}
        onChangeText={(term) => this.searchUpdated(term)} />

      {this.display_contacts()}
      </SafeAreaView>
      );

  }
}

const styles_here = StyleSheet.create({
  header: {
    color: 'white',
    fontSize: 25,
    padding: 20,
    marginVertical: 10,
  },
  info_text: {
  	fontSize: 12,
  	padding: 5,
  	marginVertical: 10,
  	flex: 1,
  	flexDirection: 'row',
  	justifyContent: 'flex-start',

  },
  search: {
    color: 'white',
    fontSize: 20,
    padding: 10,
    marginVertical: 2,
  },
  test: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }, 
  title: {
    color: 'white',
    fontSize: 16,
    textAlign: 'right',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  modal: {
  	backgroundColor:'lightgrey',
  	maxHeight:300,
  	justifyContent: 'center',
  	textAlign: 'center',
  	borderWidth: 10,
  	borderColor: 'maroon',
  }
});