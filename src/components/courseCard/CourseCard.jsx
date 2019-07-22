import React, { Component } from 'react';
import './CourseCard.scss';
import { Draggable } from "react-beautiful-dnd";


class CourseCard extends Component {
    onClick = (e) => {
        if (e.currentTarget.classList.contains('active'))
            e.currentTarget.classList.toggle('active')
        else {
            const actives = document.querySelectorAll('.active');
            actives.forEach((active) => {
                active.classList.remove('active')
            })
            e.currentTarget.classList.add('active')
        }
    }

    render() {
        return (
            <Draggable
                draggableId={this.props.course["_id"]}
                index={this.props.index}
            >
                {(provided, snapshot) => (
                    <div className="course-card"
                        onClick={this.onClick}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <p>{`${this.props.course.subject} ${this.props.course.num}`}</p>
                    </div>
                )}

            </Draggable>
        )
    }
}

export default CourseCard;
