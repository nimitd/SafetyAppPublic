import { SUID_CHANGE } from '../constants';
import Constants from "expo-constants";
const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;

const initialState = {
	suid: '',
	// uri: 'http://0d9c386a.ngrok.io'
	uri: uri
};
const suidReducer = (state = initialState, action) => {
	switch(action.type) {
		case SUID_CHANGE:
			return {
				...state,
				suid:action.payload
			};
		default:
			return state;
	}
}
export default suidReducer;