import React, { Component } from 'react';
import './Planner.scss';
import Toolbar from '../../components/toolbar/Toolbar'
import Button from '../../components/button/Button';
import CourseList from '../../components/courseList/CourseList';
import { DragDropContext } from 'react-beautiful-dnd';
import PlanLayout from '../../components/planLayout/PlanLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import CourseDetail from '../../components/courseDetail/CourseDetail';
import Modal from '../../components/modal/Modal';

class Planner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '5d50a61c8f9f3e1405303b43',
            title: '',
            description: '',
            courseList: [],
            courses: {},
            coursePlan: [],
            courseList1: [],
            courseList2: [],
            homeDroppable: '',
            activeCourse: null,
            saving: false,
            loading: true,
        }
    }

    componentDidMount() {
        // setTimeout(() => {
            axios.get(`http://localhost:8080/api/plan/${this.state.id}`)
                .then(res => {
                    // console.log(res.data.courses)
                    const splitList = this.splitList(res.data.courseList, res.data.courses);
                    var newState = {
                        title: res.data.title,
                        description: res.data.description,
                        courseList: res.data.courseList,
                        courses: res.data.courses,
                        coursePlan: res.data.coursePlan,
                        courseList1: splitList[0],
                        courseList2: splitList[1],
                        homeDroppable: '',
                        activeCourse: null,
                        saving: false,
                        loading: false,
                    }
                    this.setState(newState);
                    // console.log("state: ", this.state);
                })
                .catch(e => {
                    console.log(e)
                });
        // }, 3000);


    }

    splitList = (courseList, courses) => {
        const list = this.sortCourseList(courseList, courses)
        let list1 = [];
        let list2 = [];
        list.forEach((item, i) => {
            if (i % 2) {
                list2.push(item)
            }
            else
                list1.push(item)
        })
        return [list1, list2];
    }

    sortCourseList = (courseList, courses) => {
        const newList = courseList.sort((courseId1, courseId2) => {
            const course1 = courses[courseId1];
            const course2 = courses[courseId2];
            if ('options' in course1) {
                if ('options' in course2)
                    return true;
                else {
                    return true;
                }
            }
            else if ('options' in course2) {
                if ('options' in course1)
                    return false;
                else {
                    return false;
                }
            }
            else {
                if (course1.subject === "GE" && course2.subject !== "GE") {
                    return true
                }
                else if (course2.subject === "GE" && course1.subject !== "GE") {
                    return false
                }
                else if (course2.subject === "GE" && course1.subject === "GE") {
                    if (course1.num > course2.num)
                        return true;
                    else
                        return false;
                }
                if (course1.subject > course2.subject)
                    return true;
                else if (course1.subject < course2.subject)
                    return false;
                else {
                    const course1Num = parseInt(course1.num.match(/\d+/g));
                    const course2Num = parseInt(course2.num.match(/\d+/g));

                    if (course1Num > course2Num)
                        return true;
                    else if (course1Num < course2Num)
                        return false;
                    else {
                        const lastLetter1 = course1.num.substring(course1.num.length - 1);
                        const lastLetter2 = course2.num.substring(course2.num.length - 1);

                        if (lastLetter1 > lastLetter2)
                            return true;
                        else
                            return false;
                    }
                }
            }
        });

        return newList
    }

    onDragStart = (info) => {
        const actives = document.querySelectorAll('.active');
        actives.forEach((active) => {
            active.classList.remove('active')
        })
        this.setState({
            ...this.state,
            homeDroppable: info.source.droppableId,
            activeCourse: null,
        })
    }

    onDragEnd = (result) => {
        // console.log(result)
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index)
            return;

        if (source.droppableId.includes("courseList")) {
            const start = this.state[source.droppableId];
            const newCourseList = Array.from(start);
            newCourseList.splice(source.index, 1);
            let newState = this.state;
            newState = {
                ...newState,
                [source.droppableId]: newCourseList
            };

            // Dropped into course plan
            const keys = destination.droppableId.split('-'); // { year.name, quarter }
            const year = keys[0];
            const quarter = keys[1];
            const finishYearIndex = newState.coursePlan.findIndex(yearObj => yearObj.name === year);
            const finish = newState.coursePlan[finishYearIndex][quarter];
            // const finish = newState.coursePlan[year][quarter];
            const newQuarterList = Array.from(finish);
            newQuarterList.splice(destination.index, 0, draggableId);

            const newList = newState.courseList.filter(courseId => {
                return courseId !== draggableId
            })

            const newYear = {
                ...newState.coursePlan[finishYearIndex],
                [quarter]: newQuarterList
            }
            const newCoursePlan = newState.coursePlan;
            newCoursePlan[finishYearIndex] = newYear;

            newState = {
                ...newState,
                coursePlan: newCoursePlan,
                courseList: newList,
            };


            this.setState(newState);
        } else {
            // Source is course plan
            const sourceKeys = source.droppableId.split('-');
            const sourceYear = sourceKeys[0];
            const sourceQuarter = sourceKeys[1];
            const startYearIndex = this.state.coursePlan.findIndex(year => year.name === sourceYear);
            const start = this.state.coursePlan[startYearIndex][sourceQuarter];

            const startQuarterList = Array.from(start);
            startQuarterList.splice(source.index, 1);
            const oldYear = {
                ...this.state.coursePlan[startYearIndex],
                [sourceQuarter]: startQuarterList
            }
            const oldCoursePlan = this.state.coursePlan;
            oldCoursePlan[startYearIndex] = oldYear;

            let newState = {
                ...this.state,
                coursePlan: oldCoursePlan
            }

            if (destination.droppableId.includes("courseList")) {
                const finish = this.state[destination.droppableId];
                const finishCourseList = Array.from(finish);
                finishCourseList.splice(destination.index, 0, draggableId);

                newState.courseList.push(draggableId);

                newState = {
                    ...newState,
                    [destination.droppableId]: finishCourseList,
                };
            } else {
                // Dropped into course plan
                const keys = destination.droppableId.split('-');
                const year = keys[0];
                const quarter = keys[1];
                const finishYearIndex = newState.coursePlan.findIndex(yearObj => yearObj.name === year);
                const finish = newState.coursePlan[finishYearIndex][quarter];
                // const finish = newState.coursePlan[year][quarter];
                const newQuarterList = Array.from(finish);
                newQuarterList.splice(destination.index, 0, draggableId);

                const newList = newState.courseList.filter(courseId => {
                    return courseId !== draggableId
                })

                const newYear = {
                    ...newState.coursePlan[finishYearIndex],
                    [quarter]: newQuarterList
                }
                const newCoursePlan = newState.coursePlan;
                newCoursePlan[finishYearIndex] = newYear;

                newState = {
                    ...newState,
                    coursePlan: newCoursePlan,
                    courseList: newList,
                };
            }

            this.setState(newState);
        }
    }

    onFocusSearch = (e) => {
        e.currentTarget.classList.add('select');
    }

    onFocusOutSearch = (e) => {
        e.currentTarget.classList.remove('select');
    }

    findMatches = (wordToMatch, courses) => {
        return courses.filter(courseId => {
            const course = this.state.courses[courseId];
            const regex = new RegExp(wordToMatch, 'gi');
            const course_title = `${course["subject"]} ${course["num"]}`;
            // console.log(course_title.match(regex))
            if (course_title.match(regex) !== null)
                return courseId;
        })
    }

    displayMatches = (e) => {
        // console.log(this.state.courseList)
        const searchValue = e.currentTarget.value.replace(/[^\w\s]/g, '')
        if (searchValue === '') {
            const splitList = this.splitList(this.state.courseList, this.state.courses);
            this.setState({
                ...this.state,
                courseList1: splitList[0],
                courseList2: splitList[1],
            })
            return
        }
        const matchArray = this.findMatches(searchValue, this.state.courseList);
        const splitList = this.splitList(matchArray, this.state.courses);
        this.setState({
            ...this.state,
            courseList1: splitList[0],
            courseList2: splitList[1],
        })
    }

    addQuarter = (index) => {
        const newCoursePlan = this.state.coursePlan;
        const q = ['fall', 'winter', 'spring', 'summer'];
        const length = newCoursePlan[index].quarters.length;
        if (length >= 4)
            return;
        newCoursePlan[index].quarters.push(q[length]);

        const newState = {
            ...this.state,
            coursePlan: newCoursePlan,
        }
        this.setState(newState);
    }

    removeQuarter = (index) => {
        const newCoursePlan = this.state.coursePlan;
        const newCourseList = this.state.courseList;
        const length = newCoursePlan[index].quarters.length;
        if (length <= 1)
            return;
        const quarterId = newCoursePlan[index].quarters[length - 1]
        newCoursePlan[index][quarterId].forEach(courseId => {
            newCourseList.push(courseId);
        });

        newCoursePlan[index][quarterId] = [];

        newCoursePlan[index].quarters.splice(length - 1, 1);


        const lists = this.splitList(newCourseList, this.state.courses);

        const newState = {
            ...this.state,
            courseList: newCourseList,
            coursePlan: newCoursePlan,
            courseList1: lists[0],
            courseList2: lists[1]
        }
        this.setState(newState);
    }

    addYear = (e) => {
        if (this.state.loading) return;
        const length = this.state.coursePlan.length;
        const newYear = {
            name: `year${length + 1}`,
            quarters: ['fall'], // Defaults to at least 'fall' quarter
            fall: [],
            winter: [],
            spring: [],
            summer: [],
        }

        const newCoursePlan = this.state.coursePlan;
        newCoursePlan.push(newYear);

        const newState = {
            ...this.state,
            coursePlan: newCoursePlan,
        }
        this.setState(newState);
        // console.log(newState)
    }

    removeYear = (e) => {
        if (this.state.loading) return;
        const newCoursePlan = this.state.coursePlan;
        const newCourseList = this.state.courseList;
        const length = newCoursePlan.length;

        if (length <= 1)
            return;

        const year = newCoursePlan[length - 1];

        year.quarters.forEach(quarterId => {
            year[quarterId].forEach(courseId => {
                newCourseList.push(courseId);
            })
        })

        newCoursePlan.pop();

        const lists = this.splitList(newCourseList, this.state.courses);

        const newState = {
            ...this.state,
            courseList: newCourseList,
            coursePlan: newCoursePlan,
            courseList1: lists[0],
            courseList2: lists[1]
        }
        this.setState(newState);
    }

    onClickSave = (e) => {
        if (this.state.loading) return;
        this.setState({
            ...this.state,
            saving: true,
        })
        // Make post request to update plan
        const newPlan = {
            title: this.state.title,
            description: this.state.description,
            courseList: this.state.courseList,
            coursePlan: this.state.coursePlan,
            courses: this.state.courses,
        }
        // console.log(newPlan)

        axios.post(`http://localhost:8080/api/plan/${this.state.id}/update`, newPlan)
            .then(res => {
                console.log(res.data)
                setTimeout(() => {
                    this.setState({
                        ...this.state,
                        saving: false,
                    })
                }, 1000)

            })
    }

    captureActiveCourse = (course) => {
        this.setState({
            ...this.state,
            activeCourse: course,
        })
    }

    render() {
        const courseBins = new Array(Math.round(window.innerHeight * 0.75 / 45));
        courseBins.fill(0);

        return (
            <div className="planner">
                <Toolbar />

                <div className="planner-content">
                    <div className="planner-header">
                        <div className="center-text">
                            { this.state.loading ?
                                <div className="title-loader loader"/>
                                : 
                                <p>{this.state.title}</p>
                            }
                            
                            <div className="save-button">
                                <Button type="icon" icon="save" tooltip="Save" direction="right" onClick={this.onClickSave} />
                            </div>
                        </div>
                        <div className="line-h" />
                    </div>

                    <DragDropContext
                        onDragEnd={this.onDragEnd}
                        onDragStart={this.onDragStart}
                        onDragUpdate={this.onDragUpdate}
                    >
                        {(
                            <div className="planner-body">
                                <div className="course-list">
                                    <div className="course-list-header">
                                        <div className="center-text">
                                            <p>Course List</p>
                                        </div>
                                        <div className="line-h" />
                                    </div>
                                    <div className="course-list-body">
                                        <div className="search-bar" onFocus={this.onFocusSearch} onBlur={this.onFocusOutSearch}>
                                            <div className="search-icon">
                                                <FontAwesomeIcon icon="search" fixedWidth />
                                            </div>
                                            <form className="search-form" onKeyPress={(e) => {
                                                const key = e.charCode || e.keyCode || 0;
                                                if (key === 13)
                                                    e.preventDefault();
                                            }}>
                                                <input type="text" className="search" placeholder="Search" onChange={this.displayMatches} />
                                            </form>
                                        </div>

                                        { this.state.loading ?
                                            <div className="courselist-loader">
                                                {courseBins.slice(0,2).map((bin, i) => (
                                                    <div className="column" key={i}>
                                                        {courseBins.map((bin, i) => (<div className="course-loader loader" key={i}/>))}
                                                    </div>
                                                ))}
                                            </div>
                                            : 
                                            <CourseList courseList1={
                                                this.state.courseList1.map(courseId => this.state.courses[courseId])
                                            }
                                                courseList2={
                                                    this.state.courseList2.map(courseId => this.state.courses[courseId])
                                                }
                                                homeDroppable={this.state.homeDroppable}
                                                captureActiveCourse={this.captureActiveCourse}
                                            />
                                        }
                                    </div>
                                </div>
                                            
                                <CourseDetail course={this.state.activeCourse} loading={this.state.loading} />

                                <PlanLayout
                                    coursePlan={this.state.coursePlan}
                                    courses={this.state.courses}
                                    addQuarter={this.addQuarter}
                                    removeQuarter={this.removeQuarter}
                                    addYear={this.addYear}
                                    removeYear={this.removeYear}
                                    captureActiveCourse={this.captureActiveCourse}
                                    loading={this.state.loading}
                                />


                            </div>
                        )}
                    </DragDropContext>
                </div>
                {this.state.saving &&
                    <Modal forced>
                        Saving your plan... Please wait...
                        <div className="load-icon">
                            <FontAwesomeIcon icon="spinner" pulse />
                        </div>
                    </Modal>
                }
            </div>
        )
    }
}

export default Planner;
