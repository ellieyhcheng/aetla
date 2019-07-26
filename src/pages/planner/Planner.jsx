import React, { Component } from 'react';
import './Planner.scss';
import Toolbar from '../../components/toolbar/Toolbar'
import Button from '../../components/button/Button';
import data from '../../testData';
import CourseList from '../../components/courseList/CourseList';
import { DragDropContext } from 'react-beautiful-dnd';
import PlanLayout from '../../components/planLayout/PlanLayout';

class Planner extends Component {
    constructor(props) {
        super(props);
        this.state = data;
    }

    onDragStart = (info) => {
        const actives = document.querySelectorAll('.active');
        actives.forEach((active) => {
            active.classList.remove('active')
        })
    }

    onDragUpdate = (update) => {

    }

    onDragEnd = (result) => {
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
                [source.droppableId]: newCourseList,
            };

            if (destination.droppableId.includes("courseList")) {
                const finish = newState[destination.droppableId];
                const finishCourseList = Array.from(finish);
                finishCourseList.splice(destination.index, 0, draggableId);
                newState = {
                    ...newState,
                    [destination.droppableId]: finishCourseList,
                };                
            } else { 
                // Dropped into course plan
                const keys = destination.droppableId.split('-');
                const year = keys[0];
                const quarter = keys[1];
                const finish = newState.coursePlan[year][quarter];
                const newQuarterList = Array.from(finish);
                newQuarterList.splice(destination.index, 0, draggableId);
                const newYear = {
                    ...newState.coursePlan[year],
                    [quarter]: newQuarterList
                }
                const newCoursePlan = {
                    ...newState.coursePlan,
                    [year]: newYear
                }
                newState = {
                    ...newState,
                    coursePlan: newCoursePlan,
                };
            }
            

            this.setState(newState);
            return
        } else {
            // Source is course plan
            const sourceKeys = source.droppableId.split('-');
            const sourceYear = sourceKeys[0];
            const sourceQuarter = sourceKeys[1];
            const start = this.state.coursePlan[sourceYear][sourceQuarter];
            
            const startQuarterList = Array.from(start);
            startQuarterList.splice(source.index, 1);
            const oldYear = {
                ...this.state.coursePlan[sourceYear],
                [sourceQuarter]: startQuarterList
            }
            const oldCoursePlan = {
                ...this.state.coursePlan,
                [sourceYear]: oldYear
            }
            
            let newState = {
                ...this.state,
                coursePlan: oldCoursePlan
            }

            if (destination.droppableId.includes("courseList")) {
                const finish = this.state[destination.droppableId];
                const finishCourseList = Array.from(finish);
                finishCourseList.splice(destination.index, 0, draggableId);
                newState = {
                    ...newState,
                    [destination.droppableId]: finishCourseList,
                };               
            } else {
                // Dropped into course plan
                const keys = destination.droppableId.split('-');
                const year = keys[0];
                const quarter = keys[1];
                const finish = newState.coursePlan[year][quarter];
                const finishQuarterList = Array.from(finish);
                finishQuarterList.splice(destination.index, 0, draggableId);
                const newYear = {
                    ...newState.coursePlan[year],
                    [quarter]: finishQuarterList
                }
                const newCoursePlan = {
                    ...newState.coursePlan,
                    [year]: newYear
                }
                newState = {
                    ...newState,
                    coursePlan: newCoursePlan,
                };
            }
            

            this.setState(newState);
            return

        }
    }

    render() {
        return (
            <div className="planner">
                <Toolbar />

                <div className="planner-content">
                    <div className="planner-header">
                        <div className="center-text">
                            {/* TODO: Name should come from database */}
                            <p>{this.state.title}</p>
                            <div className="save-button">
                                <Button type="icon" icon="save" tooltip="Save" direction="right" />
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


                                <CourseList courseList1={
                                    this.state.courseList1.map(couresId => this.state.courses[couresId])
                                } 
                                courseList2={
                                    this.state.courseList2.map(couresId => this.state.courses[couresId])
                                }/>
                                <PlanLayout
                                    planLayout={this.state.planLayout}
                                    coursePlan={this.state.coursePlan}
                                    courses={this.state.courses}
                                />


                            </div>
                        )}
                    </DragDropContext>
                </div>

            </div>
        )
    }
}

export default Planner;
