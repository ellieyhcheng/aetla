import {GET_PLANS, ADD_PLAN, DELETE_PLAN, STORE_PLAN_DETAILS, SET_ACTIVE_COURSE, 
    SET_HOME_DROPPABLE, SET_COURSELIST, SET_COURSEPLAN, SET_SEARCH_WORD, SET_SELECTIONS, TOGGLE_SAVING} from "./types"

export const getPlans = () => {
    return {
        type: GET_PLANS
    }
}

export const storePlanDetails = (plan) => {
    return {
        type: STORE_PLAN_DETAILS,
        plan
    }
}

export const setActiveCourse = (course) => {
    return {
        type: SET_ACTIVE_COURSE,
        course,
    }
}

export const setHomeDroppable = (droppable) => {
    return {
        type: SET_HOME_DROPPABLE,
        droppable,
    }
}

export const setCourseList = (courseList) => {
    return {
        type: SET_COURSELIST,
        courseList,
    }
}

export const setCoursePlan = (coursePlan) => {
    return {
        type: SET_COURSEPLAN,
        coursePlan
    }
}

export const setSearchWord = (word) => {
    return {
        type: SET_SEARCH_WORD,
        word
    }
}

export const setSelections = (selections) => {
    return {
        type: SET_SELECTIONS,
        selections
    }
}

export const toggleSaving = () => {
    return {
        type: TOGGLE_SAVING,
    }
}