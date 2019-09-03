import {combineReducers} from 'redux';
import planReducer from './planReducer';
import plannerReducer from './plannerReducer';
import authReducer from './authReducer';

export default combineReducers({
    plan: planReducer,
    planner: plannerReducer,
    auth: authReducer,
})