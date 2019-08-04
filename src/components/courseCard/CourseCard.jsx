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

    getStyle = (style, snapshot) => {
        if (!snapshot.isDropAnimating)
            return style;
        const { moveTo } = snapshot.dropAnimation;
        // move to the right spot
        const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
      
        // patching the existing style
        return {
          ...style,
          transform: `${translate}`,
        //   marginTop: '4px'
        };
      }

    render() {
        return (
            <Draggable
                draggableId={this.props.course["_id"]}
                index={this.props.index}
            >
                {(provided, snapshot) => {
                            // console.log(snapshot.dropAnimation)
                            // console.log(snapshot)
                            return (
                    <div className= 'course-card'
                        onClick={this.onClick}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        style={this.getStyle(provided.draggableProps.style, snapshot)}
                    >
                        <p>{`${this.props.course.subject} ${this.props.course.num}`}</p>
                    </div>
                )}}

            </Draggable>
        )
    }
}

export default CourseCard;
