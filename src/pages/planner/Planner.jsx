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
import { connect } from 'react-redux';
import { storePlanDetails, setActiveCourse, setHomeDroppable, setCourseList, setCoursePlan, toggleSaving } from '../../actions/itemActions';
import APIClient from "../../apiClient";

class Planner extends Component {

    componentDidMount() {
        this.apiClient = new APIClient();
        this.apiClient.getOnePlan(this.props.id).then(data => {
            var newPlan = {
                title: data.title,
                description: data.description,
                courseList: data.courseList,
                courses: data.courses,
                selections: data.selections,
                coursePlan: data.coursePlan,
                searchWord: '',
                homeDroppable: '',
                activeCourse: null,
                saving: false,
                loading: false,
            }
            this.props.storePlanDetails(newPlan)
        })
    }

    onDragStart = (info) => {
        const actives = document.querySelectorAll('.active');
        actives.forEach((active) => {
            active.classList.remove('active')
        })
        this.props.setActiveCourse(null);
        this.props.setHomeDroppable(info.source.droppableId);
    }

    onDragEnd = (result) => {
        this.props.setHomeDroppable('')
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index)
            return;

        if (source.droppableId.includes("courseList")) {
            // Dropped into course plan
            const keys = destination.droppableId.split('-'); // { year[i], quarter }
            const year = keys[0].slice(-1);
            const quarter = keys[1];

            const finish = this.props.coursePlan[year][quarter];

            const newQuarterList = Array.from(finish);
            newQuarterList.splice(destination.index, 0, draggableId);

            const newList = this.props.courseList.filter(courseId => {
                return courseId !== draggableId
            })

            this.props.setCourseList(newList); 

            const newYear = {
                ...this.props.coursePlan[year],
                [quarter]: newQuarterList
            }
            
            const newCoursePlan = this.props.coursePlan.map((oldYear, index) => {
                if (index === Number(year))
                    return newYear
                return oldYear
            })
            
            this.props.setCoursePlan(newCoursePlan);

        } else {
            // Source is course plan
            const sourceKeys = source.droppableId.split('-'); // { year[i], quarterId }
            const sourceYear = sourceKeys[0].slice(-1);
            const sourceQuarter = sourceKeys[1];
            const start = this.props.coursePlan[sourceYear][sourceQuarter];

            const startQuarterList = Array.from(start);
            startQuarterList.splice(source.index, 1);

            const oldYear = {
                ...this.props.coursePlan[sourceYear],
                [sourceQuarter]: startQuarterList
            }

            var newCoursePlan = this.props.coursePlan.map((year, index) => {
                if (index === Number(sourceYear))
                    return oldYear
                return year
            })

            if (destination.droppableId.includes("courseList")) {
                const finishCourseList = Array.from(this.props.courseList);
                finishCourseList.push(draggableId);

                this.props.setCourseList(finishCourseList)
            } else {
                // Dropped into course plan
                const keys = destination.droppableId.split('-'); // { year[i], quarterId }
                const year = keys[0].slice(-1);
                const quarter = keys[1];
                const finish = newCoursePlan[year][quarter];
                // const finish = newState.coursePlan[year][quarter];
                const newQuarterList = Array.from(finish);
                newQuarterList.splice(destination.index, 0, draggableId);

                const newYear = {
                    ...newCoursePlan[year],
                    [quarter]: newQuarterList
                }
                
                newCoursePlan = newCoursePlan.map((prevYear, index) => {
                    if (index === Number(year))
                        return newYear
                    return prevYear
                })
            }

            this.props.setCoursePlan(newCoursePlan)
        }
    }

    onClickSave = () => {
        if (this.props.loading) return;
        
        this.setState({
            ...this.state,
            saving: true,
        })
        // Make post request to update plan
        const newPlan = {
            title: this.props.title,
            description: this.props.description,
            courseList: this.props.courseList,
            coursePlan: this.props.coursePlan,
            selections: this.props.selections,
        }

        this.apiClient.savePlan(this.props.id, newPlan).then(data => {
            console.log(data)
            setTimeout(() => {
                this.props.toggleSaving();
            }, 1000);
        })
    }

    redirectDashboard = () => {
        setTimeout(() => {
            this.props.history.replace('/')
        }, 3000);
    }

    render() {
        return (
            <div className="planner">
                <Toolbar />

                <div className="planner-content">
                    <div className="planner-header">
                        <div className="center-text">
                            {this.props.loading ?
                                <div className="title-loader loader" />
                                :
                                <p>{this.props.title}</p>
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
                                <CourseList/>
                                <CourseDetail />
                                <PlanLayout />
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

                {this.state.error && 
                    <Modal forced>
                        Something went wrong... Redirecting you to Dashboard.
                        <div className="load-icon">
                            <FontAwesomeIcon icon="spinner" pulse />
                        </div>
                        {this.redirectDashboard()}
                    </Modal>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.planner.title,
        loading: state.planner.loading,
        courseList: state.planner.courseList,
        coursePlan: state.planner.coursePlan,
        selections: state.planner.selections,
        id: state.planner.id,
    }
}

const actionCreators = {
    storePlanDetails, 
    setActiveCourse, 
    setHomeDroppable,
    setCourseList,
    setCoursePlan,
}

export default connect(mapStateToProps, actionCreators)(Planner);
