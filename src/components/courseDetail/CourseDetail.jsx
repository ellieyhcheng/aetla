import React, { Component } from 'react';
import './CourseDetail.scss';


class CourseDetail extends Component {

    render() {
        const content = this.props.course ? (
            <div className="body">
                <div className="title">{`${this.props.course.subject} ${this.props.course.num}`}</div>
                <div className="subtitle">{this.props.course.title}</div>
                <div className="content">
                    <div className="description">{this.props.course.description}</div>
                    <div className="units">{`Units: ${this.props.course.units}`}</div>
                </div>
            </div>
        ) : (
            <div className="empty">
                Select a course to see details
            </div>
        )
        return (
            <div className="course-detail">
                {content}
            </div>
        )
    }
}

export default CourseDetail;
