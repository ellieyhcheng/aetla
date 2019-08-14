import React, { Component } from 'react';
import './CourseCard.scss';
import { Draggable } from "react-beautiful-dnd";
import Dropdown from '../dropdown/Dropdown';

class CourseCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: ('options' in props.course) ? props.course.selected : 0,
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
                    this.props.captureActiveCourse(this.props.course.options[this.state.selected]);
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

    onSelect = (index) => {
        this.setState({
            selected: index,
        })

        if (this.props.captureSelectedIndex)
            this.props.captureSelectedIndex({
                ...this.props.course,
                selected: index,
            }, this.state.active)       
    }

    render() {
        return (
            <Draggable
                draggableId={this.props.course["_id"]}
                index={this.props.index}
            >
                {(provided, snapshot) => {
                    return (
                        <div className='course-card'
                            onClick={this.onClick}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            style={this.getStyle(provided.draggableProps.style, snapshot)}
                        >
                            {'options' in this.props.course ? (
                                <div className="options" >
                                    <div className="name">{this.props.course.name || "Options"}</div>
                                    <Dropdown 
                                        onSelect={this.onSelect}
                                        index={this.props.course.selected}
                                        list={
                                            this.props.course.options.map((option, i) => {
                                                return {
                                                    id: i,
                                                    value: `${option.subject} ${option.num}`,
                                                }
                                            })}
                                    />
                                </div>

                            ) : (
                                    <p>{`${this.props.course.subject} ${this.props.course.num}`}</p>
                                )}
                        </div>
                    )
                }}

            </Draggable>
        )
    }
}

export default CourseCard;
