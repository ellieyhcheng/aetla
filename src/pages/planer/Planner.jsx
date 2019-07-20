import React, { Component } from 'react';
import './Planner.scss';
import Toolbar from '../../components/toolbar/Toolbar'
import Button from '../../components/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CourseCard from '../../components/courseCard/CourseCard';
import subjects from '../../utils.js';

class Planner extends Component {

    onFocusSearch = (e) => {
       e.currentTarget.classList.add('select');
    }

    onFocusOutSearch = (e) => {
        e.currentTarget.classList.remove('select');
    }

    render() {
        return (
            <div className="planner">
                <Toolbar />

                <div className="planner-content">
                    <div className="planner-header">
                        <div className="center-text">
                            {/* TODO: Name should come from database */}
                            <p>my first ever plan</p>
                            <div className="save-button">
                                <Button type="icon" icon="save" tooltip="Save" direction="right" />
                            </div>
                        </div>
                        <div className="line-h" />
                    </div>

                    <div className="planner-body">
                        <div className="curriculum">
                            <div className="curriculum-header">
                                <div className="center-text">
                                    <p>Curriculum</p>
                                </div>
                                <div className="line-h" />
                            </div>
                            <div className="curriculum-body">
                                <div className="search-bar" onFocus={this.onFocusSearch} onBlur={this.onFocusOutSearch}>
                                    <div className="search-icon">
                                        <FontAwesomeIcon icon="search" fixedWidth/>
                                    </div>
                                    <form className="search-form">
                                        <input type="text" className="search" placeholder="Search"/>
                                    </form>
                                </div>
                                <div className="course-list">
                                    {/* TODO: Course Title comes from databse */}
                                    <CourseCard course={subjects[0] + ' 4'}/>
                                    <CourseCard course={subjects[5] + ' 50'}/>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
        }
        
        export default Planner;
