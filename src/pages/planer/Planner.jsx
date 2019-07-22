import React, { Component } from 'react';
import './Planner.scss';
import Toolbar from '../../components/toolbar/Toolbar'
import Button from '../../components/button/Button';
import data from '../../testData';
import CourseList from '../../components/courseList/CourseList';
import { DragDropContext } from 'react-beautiful-dnd';

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

        if(destination.droppableId === source.droppableId &&
            destination.index === source.index)
            return;
        
        const start = this.state[source.droppableId];
        const finish = this.state[destination.droppableId];
        if (start === finish) {
            const newCourses = Array.from(start.courses);
            newCourses.splice(source.index, 1);
            newCourses.splice(destination.index, 0, draggableId);

            const newObj = {
                courses: newCourses
            }

            const newState = {
                ...this.state,
                [source.droppableId]: newObj,
            };

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
                            <p>my first ever plan</p>
                            <div className="save-button">
                                <Button type="icon" icon="save" tooltip="Save" direction="right" />
                            </div>
                        </div>
                        <div className="line-h" />
                    </div>

                    <div className="planner-body">
                        <DragDropContext
                            onDragEnd={this.onDragEnd}
                            onDragStart={this.onDragStart}
                            onDragUpdate={this.onDragUpdate}
                        >
                            {(
                                <CourseList courseList={
                                    this.state.courseList.courses.map(couresId => this.state.courses[couresId])
                                } />
                            )}
                        </DragDropContext>
                    </div>
                </div>

            </div>
        )
    }
}

export default Planner;
