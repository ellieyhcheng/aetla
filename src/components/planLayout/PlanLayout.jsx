import React, { Component } from 'react';
import './PlanLayout.scss';
import CourseCard from '../../components/courseCard/CourseCard';
import { Droppable } from 'react-beautiful-dnd';
import Button from '../button/Button';
import colors from '../../styles/colors.scss';

class PlanLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bins: this.setBins(),
        }
    }

    calculateQuarterUnits = (quarter) => {
        // console.log(quarter)
        const sum = quarter.reduce((prev, courseId) => {
            const course = this.props.courses[courseId];
            if ('options' in course)
                return prev + course.options[course.selected]['units']
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

    setBins = () => {
        if (window.innerWidth < 700)
            return [0, 1, 2, 3];
        else if (window.innerWidth < 1470)
            return [0, 1, 2, 3, 4];
        else
            return [0, 1, 2, 3, 4, 5];
    }

    componentDidMount() {
        window.addEventListener('resize', (e) => {
            this.setState({
                bins: this.setBins()
            })
        })
    }

    render() {

        return (
            <div className="plan-layout">
                <div className="plan-sidebar">
                    {this.props.loading ? (
                        <div className="year-section">
                            <div className="sidebar-loader">
                                <div className="strip loader" />
                            </div>
                            <div className="sidebar-loader">
                                <div className="strip loader" />
                            </div>
                            <div className="sidebar-loader">
                                <div className="strip loader" />
                            </div>
                            <div className="sidebar-loader">
                                <div className="strip loader" />
                            </div>
                            
                        </div>
                    ) :
                        this.props.coursePlan.map((year, i) => (
                            <div className="year-section" key={i}>
                                <div className="plan-year">Year {i + 1} </div>
                                {year.quarters.map((quarterId, i) => (
                                    <div className="plan-quarter" key={i}>{quarterId.charAt(0).toUpperCase() + quarterId.slice(1)}</div>
                                ))}
                            </div>
                        ))
                    }
                    <div className="plan-row" />
                    <div className="plan-row" />
                    <div className="plan-row" />
                </div>

                <div className="plan-body">
                    {this.props.loading ? (
                        <div className="year-section">
                            <div className="plan-row">
                                <div className="units-loader loader" />
                            </div>
                            <div className="plan-row">
                                <div className="course-bin-wrapper">
                                    {this.state.bins.map((bin, i) => (
                                        <div className="course-loader loader" key={i} />
                                    ))}
                                </div>
                            </div>
                            <div className="plan-row">
                                <div className="course-bin-wrapper">
                                    {this.state.bins.map((bin, i) => (
                                        <div className="course-loader loader" key={i} />
                                    ))}
                                </div>
                            </div>
                            <div className="plan-row">
                                <div className="course-bin-wrapper">
                                    {this.state.bins.map((bin, i) => (
                                        <div className="course-loader loader" key={i} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) :
                        this.props.coursePlan.map((year, i) => (
                            <div className="year-section" key={i}>
                                <div className="plan-row">
                                    <div className="year-units units">{this.calculateYearUnits(year)} units</div>
                                </div>

                                {year.quarters.map((quarterId, j) => (
                                    <div className="plan-row" key={j}>
                                        <div className="course-bin-wrapper">
                                            <Droppable droppableId={year.name + '-' + quarterId} direction="horizontal">
                                                {(provided, snapshot) => (
                                                    <div className="course-bin"
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                    >
                                                        {year[quarterId].map((courseId, k) => (
                                                            <CourseCard course={this.props.courses[courseId]} index={k} key={this.props.courses[courseId]["_id"]}
                                                                captureActiveCourse={this.props.captureActiveCourse}
                                                                captureSelectedIndex={this.props.captureSelectedIndex}
                                                            />
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </div>

                                        <div className="shadow-bin-wrapper"
                                            style={{
                                                visibility: year[quarterId].length < this.state.bins.length ? "visible" : "hidden",
                                                opacity: year[quarterId].length < this.state.bins.length ? "1" : "0"
                                            }}
                                        >
                                            {this.state.bins.map(bin => (
                                                <div className="shadow-bin" key={bin} />
                                            ))}

                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    }

                    <div className="button-section">
                        <Button type="text" text="Delete Year" color={colors.accent} onClick={this.props.removeYear} fixedWidth></Button>
                        <Button type="text" text="Add Year" color={colors.accent} onClick={this.props.addYear} fixedWidth></Button>
                    </div>
                </div>
                <div className="plan-footer">
                    {this.props.loading ? (
                        <div className="year-section">
                            <div className="plan-row">
                                <Button type="icon" icon="minus-circle"></Button>
                                <Button type="icon" icon="plus-circle"></Button>
                            </div>
                            <div className="plan-row">
                                <div className="units-loader loader"/>
                            </div>
                            <div className="plan-row">
                                <div className="units-loader loader"/>
                            </div>
                            <div className="plan-row">
                                <div className="units-loader loader"/>
                            </div>
                        </div>
                    ) :
                        this.props.coursePlan.map((year, i) => (
                            <div className="year-section" key={i}>
                                <div className="plan-row">
                                    <Button type="icon" icon="minus-circle"
                                        onClick={() => this.props.removeQuarter(i)}
                                    ></Button>
                                    <Button type="icon" icon="plus-circle"
                                        onClick={() => this.props.addQuarter(i)}
                                    ></Button>
                                </div>
                                {year.quarters.map((quarterId, j) => (
                                    <div className="plan-row" key={j}>
                                        <div className="units">
                                            <div className="units-num">
                                                {this.calculateQuarterUnits(year[quarterId])}
                                            </div>
                                            <div className="units-suffix">
                                                units</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default PlanLayout;
