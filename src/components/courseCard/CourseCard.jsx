import React, { Component } from 'react';
import './CourseCard.scss';
import { Draggable } from "react-beautiful-dnd";
import Dropdown from '../dropdown/Dropdown';
import { setActiveCourse } from '../../actions/itemActions'
import { connect } from 'react-redux';
import { setSelections } from '../../actions/itemActions';

class CourseCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: props.selections[props.course["_id"]] ? props.selections[props.course["_id"]].index : 0,
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
            this.props.setActiveCourse(null);
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

            if ('options' in this.props.course)
                this.props.setActiveCourse(this.props.course.options[this.state.selected]);
            else
                this.props.setActiveCourse(this.props.course);

        }
    }

    getStyle = (style, snapshot) => {        
        if (this.props.stopMove) {
            return {
                ...style,
                transform: 'none',
            }
        }

        return style;
    }

    onSelect = (index) => {
        this.setState({
            selected: index,
        })

        const elective = this.props.course;
        const newSelection = {
            _id: elective["_id"],
            index: index,
        }
        const newSelections = {
            ...this.props.selections,
            [elective["_id"]]: newSelection,
        }
        if (this.state.active)
            this.props.setActiveCourse(elective.options[index]);
        this.props.setSelections(newSelections);
        
    }

    render() {
        return (
            <Draggable
                draggableId={this.props.course["_id"]}
                index={this.props.index}
                key={this.props.course["_id"]}
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
                                        index={this.state.selected}
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

const mapStateToProps = (state) => {
    return {
        selections: state.planner.selections,
    }
}

const actionCreators = {
    setActiveCourse,
    setSelections
}


export default connect(mapStateToProps, actionCreators)(CourseCard);
