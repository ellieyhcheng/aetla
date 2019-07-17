import {combineReducers} from 'redux';
import planReducer from './planReducer'

export default combineReducers({
    plan: planReducer
})