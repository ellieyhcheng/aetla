import React, { Component } from 'react';
import './CourseCard.scss';
import { Draggable } from "react-beautiful-dnd";


class CourseCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ('options' in props.course) ? `${props.course.options[props.course.selected].subject} ${props.course.options[props.course.selected].num}` : "none",
            index: ('options' in props.course) ? props.course.selected : 0,
            active: false,
        }
    }
    onClick = (e) => {
        if (e.currentTarget.classList.contains('active')) {
            e.currentTarget.classList.toggle('active')
            this.setState({
                ...this.state,
                active: false,
            })
            this.props.captureActiveCourse(null);
        }
        else {
            const actives = document.querySelectorAll('.active');
            actives.forEach((active) => {
                active.classList.remove('active')
            })
            e.currentTarget.classList.add('active')

            this.setState({
                ...this.state,
                active: true,
            })
            
            if (this.props.captureActiveCourse) {
                if ('options' in this.props.course)
                    this.props.captureActiveCourse(this.props.course.options[this.state.index]);
                else
                    this.props.captureActiveCourse(this.props.course);
            }
                
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

    handleChange = (event) => {
        // console.log(event)
        this.setState({
            value: event.target.value,
            index: event.target.selectedIndex - 1,
        });
        if (this.state.active)
            if (this.props.captureActiveCourse) {
                this.props.captureActiveCourse(this.props.course.options[event.target.selectedIndex - 1]);
            }
        
        if (this.props.captureSelectedIndex)
            this.props.captureSelectedIndex({
                ...this.props.course,
                selected: event.target.selectedIndex - 1,
            })
    }

    render() {
        return (
            <Draggable
                draggableId={this.props.course["_id"]}
                index={this.props.index}
            >
                {(provided, snapshot) => {
                            return (
                    <div className= 'course-card'
                        onClick={this.onClick}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        style={this.getStyle(provided.draggableProps.style, snapshot)}
                    >
                        { 'options' in this.props.course ? (
                            <select value={this.state.value} onChange={this.handleChange} onClick={e => e.stopPropagation()}>
                                <option value="none" disabled hidden>Select a Course</option>
                                {
                                    this.props.course.options.map((option, i) => (
                                        <option value={`${option.subject} ${option.num}`} key={i}>
                                            {`${option.subject} ${option.num}`}
                                        </option>
                                    ))
                                }
                            </select>
                        ) : (
                            <p>{`${this.props.course.subject} ${this.props.course.num}`}</p>
                        )}

                    </div>
                )}}

            </Draggable>
        )
    }
}

export default CourseCard;
