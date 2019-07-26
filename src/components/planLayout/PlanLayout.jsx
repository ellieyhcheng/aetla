import React, { Component } from 'react';
import './PlanLayout.scss';
import CourseCard from '../../components/courseCard/CourseCard';
import { Droppable } from 'react-beautiful-dnd';

class PlanLayout extends Component {

    calculateQuarterUnits = (quarter) => {
        // console.log(quarter)
        const sum = quarter.reduce((prev, courseId) => {
            return prev + this.props.courses[courseId]['units']
        }, 0)

        return sum
    }

    calculateYearUnits = (year) => {
        // console.log(year);
        const sum = year.quarters.reduce((prev, quarterId) => {
            return prev + this.calculateQuarterUnits(year[quarterId])
        }, 0)
        return sum
    }

    render() {
        
        return (
            <div className="plan-layout">
                <div className="plan-sidebar">
                    {this.props.planLayout.map((yearId, i) => (
                        <div className="plan-section" key={i}>
                            <div className="plan-year">Year {i + 1} </div>
                            {this.props.coursePlan[yearId].quarters.map((quarterId, i) => (
                                <div className="plan-quarter" key={i}>{quarterId.charAt(0).toUpperCase() + quarterId.slice(1)}</div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="plan-body">
                    {this.props.planLayout.map((yearId, i) => (
                        <div className="year-section" key={i}>
                            <div className="plan-row">
                                <div className="year-units units">{this.calculateYearUnits(this.props.coursePlan[yearId])} units</div>
                            </div>

                            {this.props.coursePlan[yearId].quarters.map((quarterId, j) => (
                                <div className="plan-row" key={j}>
                                    <div className="course-bin-wrapper">
                                        <Droppable droppableId={yearId + '-' + quarterId} direction="horizontal">
                                            {(provided, snapshot) => (
                                                <div className="course-bin"
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    
                                                >
                                                    {this.props.coursePlan[yearId][quarterId].map((courseId, k) => (
                                                        <CourseCard course={this.props.courses[courseId]} index={k} key={this.props.courses[courseId]["_id"]} />
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>

                                    <div className="shadow-bin-wrapper"
                                        style={{
                                            visibility: this.props.coursePlan[yearId][quarterId].length === 0 ? "visible" : "hidden"
                                        }}
                                    >
                                        <div className="shadow-bin" />
                                        <div className="shadow-bin" />
                                        <div className="shadow-bin" />
                                        <div className="shadow-bin" />
                                        <div className="shadow-bin" />
                                        <div className="shadow-bin" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                </div>
                <div className="plan-footer">
                    {this.props.planLayout.map((yearId, i) => (
                        <div className="year-section">
                            <div className="plan-row" />
                            {this.props.coursePlan[yearId].quarters.map((quarterId, j) => (
                                <div className="plan-row">
                                    <div className="units">
                                        <div className="units-num">
                                            {this.calculateQuarterUnits(this.props.coursePlan[yearId][quarterId])}
                                        </div>
                                        <div className="units-suffix">
                                            units</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default PlanLayout;
