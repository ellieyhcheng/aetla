import React, { Component } from 'react';
import './CourseList.scss';
import CourseCard from '../../components/courseCard/CourseCard';
import { Droppable } from 'react-beautiful-dnd';

class CourseList extends Component {

    render() {
        return (
            <div className="course-cards-scroll">
                <Droppable droppableId="courseList1" isDropDisabled={this.props.homeDroppable.includes("courseList") ? true : false}>
                    {(provided, snapshot) => (
                        <div className="course-cards"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{
                                height: this.props.courseList1.length > this.props.courseList2.length ?
                                    `${(this.props.courseList1.length + 1) * 45}px` : `${(this.props.courseList2.length + 1) * 45}px`
                            }}
                        >
                            {this.props.courseList1.map((course, i) =>
                                <CourseCard course={course} key={course["_id"]} index={i} />
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="courseList2" isDropDisabled={this.props.homeDroppable.includes("courseList") ? true : false}>
                    {(provided, snapshot) => (
                        <div className="course-cards"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{
                                height: this.props.courseList1.length > this.props.courseList2.length ?
                                    `${(this.props.courseList1.length + 1) * 45}px` : `${(this.props.courseList2.length + 1) * 45}px`
                            }}
                        >
                            {this.props.courseList2.map((course, i) =>
                                <CourseCard course={course} key={course["_id"]} index={i} />
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        )
    }
}

export default CourseList;
