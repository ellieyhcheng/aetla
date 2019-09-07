import { SET_AUTH_USER, SET_USER_PROFILE, ADD_PLAN } from "../actions/types";

const initialState = {
    authUser: null,
    userProfile: null,
}

export default function (state = initialState, action) {
    switch(action.type) {
        case SET_AUTH_USER:
            return {
                ...state,
                authUser: action.authUser,
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile,
            }
        case ADD_PLAN:
            const plans = state.userProfile.plans;
            plans.push(action.plan)
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    plans: plans,
                }
            }
        default:
            return state;
    }
}