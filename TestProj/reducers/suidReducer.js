import { SUID_CHANGE } from '../constants';

const initialState = {
	suid: '',
	uri: 'http://0d9c386a.ngrok.io'
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