import React, { Component } from 'react';
import './CourseList.scss';
import CourseCard from '../../components/courseCard/CourseCard';
import { Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import splitList from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setSearchWord } from '../../actions/itemActions';

class CourseList extends Component {
    onFocusSearch = (e) => {
        e.currentTarget.classList.add('select');
    }

    onFocusOutSearch = (e) => {
        e.currentTarget.classList.remove('select');
    }

    setSearchWord = (e) => {
        this.props.setSearchWord(e.currentTarget.value.replace(/[^\w\s]/g, ''))
    }

    render() {
        const courseBins = new Array(Math.round(window.innerHeight * 0.75 / 45));
        courseBins.fill(0);
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
                        <form className="search-form" onKeyPress={(e) => {
                            const key = e.charCode || e.keyCode || 0;
                            if (key === 13)
                                e.preventDefault();
                        }}>
                            <input type="text" className="search" placeholder="Search" onChange={this.setSearchWord} />
                        </form>
                    </div>

                    {this.props.loading ?
                        <div className="courselist-loader">
                            {courseBins.slice(0, 2).map((bin, i) => (
                                <div className="column" key={i}>
                                    {courseBins.map((bin, i) => (<div className="course-loader loader" key={i} />))}
                                </div>
                            ))}
                        </div>
                        :
                        <div className="course-cards-scroll">
                            <Droppable droppableId="courseList1" isDropDisabled={this.props.homeDroppable.includes("courseList") ? true : false}>
                                {(provided, snapshot) => {
                                    return (
                                        <div className="course-cards"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            style={{
                                                height: this.props.courseLists[0].length > this.props.courseLists[1].length ?
                                                    `${(this.props.courseLists[0].length + 1) * 45}px` : `${(this.props.courseLists[1].length + 1) * 45}px`,
                                            }}
                                        >

                                            {this.props.courseLists[0].map((course, i) =>
                                                <CourseCard course={course} key={course["_id"]} index={i}
                                                    stopMove={snapshot.isDraggingOver && snapshot.draggingFromThisWith === null}
                                                />
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }}
                            </Droppable>
                            <Droppable droppableId="courseList2" isDropDisabled={this.props.homeDroppable.includes("courseList") ? true : false}>
                                {(provided, snapshot) => (
                                    <div className="course-cards"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{
                                            height: this.props.courseLists[0].length > this.props.courseLists[1].length ?
                                                `${(this.props.courseLists[0].length + 1) * 45}px` : `${(this.props.courseLists[1].length + 1) * 45}px`
                                        }}
                                    >

                                        {this.props.courseLists[1].map((course, i) =>
                                            <CourseCard course={course} key={course["_id"]} index={i}
                                                stopMove={snapshot.isDraggingOver && snapshot.draggingFromThisWith === null}
                                            />
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    }
                </div>
            </div>

        )
    }
}

const findMatches = (wordToMatch, courseList, courses) => {
    return courseList.filter(courseId => {
        const req = courses[courseId];
        const course = 'options' in req ? req.options[req.selected] : req;
        const regex = new RegExp(wordToMatch, 'gi');
        const course_title = `${course["subject"]} ${course["num"]}`;
        if (course_title.match(regex) !== null)
            return courseId;
        return null;
    })
}

const filterList = (courseList, courses, searchWord) => {
    if (searchWord === '') {
        return splitList(courseList, courses)
    }
    const matchArray = findMatches(searchWord, courseList, courses);
    return splitList(matchArray, courses);
}

const mapStateToProps = (state) => {
    return {
        loading: state.planner.loading,
        courseLists: filterList(state.planner.courseList, state.planner.courses, state.planner.searchWord),
        homeDroppable: state.planner.homeDroppable,
        selections: state.planner.selections,
    }
}

const actionCreators = {
    setSearchWord
}

export default connect(mapStateToProps, actionCreators)(CourseList);
