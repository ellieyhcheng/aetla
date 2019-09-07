import {GET_PLANS, ADD_PLAN, DELETE_PLAN, STORE_PLAN_DETAILS, SET_ACTIVE_COURSE, 
    SET_HOME_DROPPABLE, SET_COURSELIST, SET_COURSEPLAN, SET_SEARCH_WORD, SET_SELECTIONS, 
    SET_AUTH_USER, SET_USER_PROFILE } from "./types"

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

export const setAuthUser = (authUser) => {
    return {
        type: SET_AUTH_USER,
        authUser,
    }
}

export const setUserProfile = (userProfile) => {
    return {
        type: SET_USER_PROFILE,
        userProfile,
    }
}

export const addPlan = (plan) => {
    return {
        type: ADD_PLAN,
        plan
    }
}