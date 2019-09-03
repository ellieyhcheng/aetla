import { STORE_PLAN_DETAILS, SET_ACTIVE_COURSE, SET_HOME_DROPPABLE, SET_COURSELIST, SET_COURSEPLAN, SET_SEARCH_WORD, SET_SELECTIONS } from "../actions/types"
//Add and Delete plan available for later

const initialState = {
    title: '',
    description: '',
    courseList: [],
    courses: {},
    selections: {},
    coursePlan: [],
    searchWord: '',
    homeDroppable: '',
    activeCourse: null,
    saving: false,
    loading: true,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case STORE_PLAN_DETAILS:
            // const newList = action.plan.courseList
            // const lists = splitList(newList, action.plan.courses)
            return {
                ...state,
                ...action.plan,
            }
        case SET_ACTIVE_COURSE:
            return {
                ...state,
                activeCourse: action.course,
            }
        case SET_HOME_DROPPABLE:
            return {
                ...state,
                homeDroppable: action.droppable
            }
        case SET_COURSELIST:
            return {
                ...state,
                courseList: action.courseList,
            }
        case SET_COURSEPLAN:
            return {
                ...state,
                coursePlan: action.coursePlan
            }
        case SET_SEARCH_WORD:
            return {
                ...state,
                searchWord: action.word
            }
        case SET_SELECTIONS:
            return {
                ...state,
                selections: action.selections
            }
        default:
            return state;
    }
}