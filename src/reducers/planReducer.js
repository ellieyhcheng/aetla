import uuid from 'uuid';
import {GET_PLANS, ADD_PLAN, DELETE_PLAN} from "../actions/types"
//Add and Delete plan available for later

const initialState = {
    plans: [
        {id: '5d5451933fc74615a4d7f961', name: "Plan1", text: "My first plan"},
        {id: uuid(), name: "Plan2", text: "My second plan"},
        {id: uuid(), name: "Plan3", text: "My third plan"}
    ]
}


export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PLANS:
            return {
                ...state
            }
        case ADD_PLAN:
            return {
                ...state,
                action
            }
        default:
            return state;
    }
}