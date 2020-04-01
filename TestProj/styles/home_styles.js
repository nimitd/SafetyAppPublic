import { Platform, 
        StyleSheet, 
        Text, 
        TextInput, 
        View, 
        KeyboardAvoidingView, 
        Button,
        TouchableHighlight} from 'react-native';
import Constants from 'expo-constants'

const home_styles = StyleSheet.create({
	container: {
	    flex: 1,
	    backgroundColor: '#000000',
	    marginTop: Constants.statusBarHeight,
	},
});

export {home_styles}