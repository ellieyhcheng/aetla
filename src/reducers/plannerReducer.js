import { STORE_PLAN_DETAILS, SET_ACTIVE_COURSE, SET_HOME_DROPPABLE, SET_COURSELIST, SET_COURSEPLAN, SET_SEARCH_WORD, SET_SELECTIONS } from "../actions/types"
//Add and Delete plan available for later

const initialState = {
    id: '5d5451933fc74615a4d7f961', // TODO: Remove later
    title: 'Test Plan',
    description: 'This is a test',
    courseList: ['1', '2'],
    courses: {
        '1': {"_id": '1', "subject": "EC ENGR", "num": "101A", "title": "Engineering Electromagnetics", "units": 4, "description": "(Formerly numbered Electrical Engineering 101A.) Lecture, four hours; discussion, one hour; outside study, seven hours. Electromagnetic field concepts, waves and phasors, transmission lines and Smith chart, transient responses, vector analysis, introduction to Maxwell equations, static and quasi-static electric and magnetic fields. Letter grading.", "requisites": "Mathematics 32A and 32B, or 33A and 33B, Physics 1C"},
        '2': {"_id": '2', "subject": "EC ENGR", "num": "164DA", "title": "Radio Frequency Design Project I", "units": 4, "description": "(Formerly numbered Electrical Engineering 164DA.) Lecture, one hour; laboratory, three hours; outside study, eight hours. Course 164DA is enforced requisite to 164DB. Limited to senior Electrical Engineering majors. Design of radio frequency circuits and systems, with emphasis on both theoretical foundations and hands-on experience. Design of radio frequency transceivers and their building blocks according to given specifications or in form of open-ended problems. Introduction to advanced topics related to projects through lecture and laboratories. Creation by students of end-to-end systems in application context, managing trade-offs across subsystems while meeting constraints and optimizing metrics related to cost, performance, ease of use, manufacturability, testing, and other real-world issues. Oral and written presentations of project results required. In Progress grading (credit to be given only on completion of course 164DB).", "requisites": "course 115B"},
        '3': {"_id": '3', "subject": "EC ENGR", "num": "C147", "title": "Neural Networks and Deep Learning", "units": 4, "description": "Lecture, four hours; discussion, two hours; outside study, six hours. Review of machine learning concepts; maximum likelihood; supervised classification; neural network architectures; backpropagation; regularization for training neural networks; optimization for training neural networks; convolutional neural networks; practical CNN architectures; deep learning libraries in Python; recurrent neural networks, backpropagation through time, long short-term memory and gated recurrent units; variational autoencoders; generative adversarial networks; adversarial examples and training. Concurrently scheduled with course C247. Letter grading.", "requisites": "courses 131A, 133A or 205A, and M146, or equivalent"},
        '4': {"_id": '4', "subject": "ENGR", "num": "19", "title": "Fiat Lux Freshman Seminars", "units": 1, "description": "Seminar, one hour. Discussion of and critical thinking about topics of current intellectual importance, taught by faculty members in their areas of expertise and illuminating many paths of discovery at UCLA. P/NP grading."},
    },
    selections: {},
    coursePlan: [{
        quarters: ['fall', 'winter'],
        'fall': ['3'],
        'winter': ['4'],
        'spring': [],
        'summer':[],
    }],
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