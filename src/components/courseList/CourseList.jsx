import React, { Component } from 'react';
import './CourseList.scss';
import CourseCard from '../../components/courseCard/CourseCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Droppable } from 'react-beautiful-dnd';

class CourseList extends Component {

    onFocusSearch = (e) => {
        e.currentTarget.classList.add('select');
    }

    onFocusOutSearch = (e) => {
        e.currentTarget.classList.remove('select');
    }

    render() {
        return (
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
                        <form className="search-form">
                            <input type="text" className="search" placeholder="Search" />
                        </form>
                    </div>

                    {/* TODO: Sort by alphabetical (?) + button for sort */}
                    <div className="course-cards-scroll">
                        <Droppable droppableId="courseList1">
                            {(provided, snapshot) => (
                                <div className="course-cards"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {this.props.courseList1.map((course, i) =>
                                        <CourseCard course={course} key={course["_id"]} index={i} />
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId="courseList2">
                            {(provided, snapshot) => (
                                <div className="course-cards"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {this.props.courseList2.map((course, i) =>
                                        <CourseCard course={course} key={course["_id"]} index={i} />
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            </div>
        )
    }
}

export default CourseList;
