import {combineReducers} from 'redux';
import plannerReducer from './plannerReducer';
import authReducer from './authReducer';

export default combineReducers({
    planner: plannerReducer,
    auth: authReducer,
})