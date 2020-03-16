import { createStore, combineReducers } from 'redux';
import suidReducer from '../reducers/suidReducer';

const rootReducer = combineReducers(
	{ suid: suidReducer }
);

const configureStore = () => {
	return createStore(rootReducer);
}

export default configureStore;