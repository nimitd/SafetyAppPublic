import { Platform, 
        StyleSheet, 
        Text, 
        TextInput, 
        View, 
        KeyboardAvoidingView, 
        Button,
        TouchableHighlight} from 'react-native';
import Constants from 'expo-constants'

const profile_styles = StyleSheet.create({
	profileInfoContainer: {
		marginTop: 10,
	},
	profileInfo: {
		fontSize: 20,
		height: 45,
		//color: 'black',
		textAlign: 'center',
		marginBottom: 10
	},
	profileTitle: {
		marginTop: 20
	},
	profileInfoTitle: {
		color: 'white',
		fontSize: 20,
		marginBottom: 10
	},
	profileSectionTitle: {
		color: 'white',
		fontSize: 25,
		marginBottom: 10,
		textAlign: 'center',
		color: 'white'
	},
	profileSeparator: {
		marginVertical: 10,
		borderBottomColor: '#737373',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	editButton: {
		color: 'white', 
		paddingLeft: 100,
	},
    rowFront: {
        alignItems: 'center',
        backgroundColor: 'grey',
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    backText: {
        color: 'black',
    },
    frontText: {
    	color: 'black',
    	fontSize: 20
    },
    spacer: {
        height: 20,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    trash: {
        height: 25,
        width: 25,
    },

});

export {profile_styles}