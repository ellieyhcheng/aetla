import {combineReducers} from 'redux';
import planReducer from './planReducer';
import plannerReducer from './plannerReducer';

export default combineReducers({
    plan: planReducer,
    planner: plannerReducer,
})