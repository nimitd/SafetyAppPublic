import { SUID_CHANGE } from '../constants';

const initialState = {
	suid: ''
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