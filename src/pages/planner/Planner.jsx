import React, { Component } from 'react';
import './Planner.scss';
import Toolbar from '../../components/toolbar/Toolbar'
import Button from '../../components/button/Button';
import CourseList from '../../components/courseList/CourseList';
import { DragDropContext } from 'react-beautiful-dnd';
import PlanLayout from '../../components/planLayout/PlanLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CourseDetail from '../../components/courseDetail/CourseDetail';
import Modal from '../../components/modal/Modal';
import { connect } from 'react-redux';
import { storePlanDetails, setActiveCourse, setHomeDroppable, setCourseList, setCoursePlan, addPlan } from '../../actions/itemActions';
import { withApiClient } from "../../ApiClient";
import withAuthorization from '../../components/Session/withAuthorization';
import { Redirect } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import { Message, Form, } from "semantic-ui-react";

class Planner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            saving: false,
            isOpen: true,
            collapse: window.innerWidth < 970,
            saveError: false,

            copy: false,
            copyError: null,
            copyTitle: props.title,
            copyDescription: props.description,

            change: false,
            changeTitle: props.title,
            changeDescription: props.description,
            changeCoursesExempt: props.description, // TODO
            changeError: null,
        }
    }

    componentDidMount() {
        this.mounted = true;
        document.title = 'Planner - Aetla'

        const { id } = this.props.match.params;
        let decodedId;
        try {
            decodedId = decodeURIComponent(escape(atob(id.toString())))
        }
        catch (err) {
            this.setState({
                ...this.state,
                error: true,
            })
            return;
        }
        this.props.apiClient.getOnePlan(decodedId).then(data => {
            if (this.mounted) {
                if (data === 'error')
                    this.setState({
                        ...this.state,
                        error: true,
                    })
                else {
                    var newPlan = {
                        id: decodedId,
                        title: data.title,
                        description: data.description,
                        courseList: data.courseList,
                        courses: data.courses,
                        selections: data.selections,
                        coursePlan: data.coursePlan,
                        searchWord: '',
                        homeDroppable: '',
                        activeCourse: null,
                        saving: false,
                        loading: false,
                    }
                    this.props.storePlanDetails(newPlan)
                }
            }
        })

        window.addEventListener('resize', this.collapse);
        if (this.state.collapse)
            this.toggle();
    }

    onDragStart = (info) => {
        const actives = document.querySelectorAll('.active');
        actives.forEach((active) => {
            active.classList.remove('active')
        })
        this.props.setActiveCourse(null);
        this.props.setHomeDroppable(info.source.droppableId);
    }

    onDragEnd = (result) => {
        this.props.setHomeDroppable('')
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index)
            return;

        if (source.droppableId.includes("courseList")) {
            // Dropped into course plan
            const keys = destination.droppableId.split('-'); // { year[i], quarter }
            const year = keys[0].slice(-1);
            const quarter = keys[1];

            const finish = this.props.coursePlan[year][quarter];

            const newQuarterList = Array.from(finish);
            newQuarterList.splice(destination.index, 0, draggableId);

            const newList = this.props.courseList.filter(courseId => {
                return courseId !== draggableId
            })

            this.props.setCourseList(newList);

            const newYear = {
                ...this.props.coursePlan[year],
                [quarter]: newQuarterList
            }

            const newCoursePlan = this.props.coursePlan.map((oldYear, index) => {
                if (index === Number(year))
                    return newYear
                return oldYear
            })

            this.props.setCoursePlan(newCoursePlan);

        } else {
            // Source is course plan
            const sourceKeys = source.droppableId.split('-'); // { year[i], quarterId }
            const sourceYear = sourceKeys[0].slice(-1);
            const sourceQuarter = sourceKeys[1];
            const start = this.props.coursePlan[sourceYear][sourceQuarter];

            const startQuarterList = Array.from(start);
            startQuarterList.splice(source.index, 1);

            const oldYear = {
                ...this.props.coursePlan[sourceYear],
                [sourceQuarter]: startQuarterList
            }

            var newCoursePlan = this.props.coursePlan.map((year, index) => {
                if (index === Number(sourceYear))
                    return oldYear
                return year
            })

            if (destination.droppableId.includes("courseList")) {
                const finishCourseList = Array.from(this.props.courseList);
                finishCourseList.push(draggableId);

                this.props.setCourseList(finishCourseList)
            } else {
                // Dropped into course plan
                const keys = destination.droppableId.split('-'); // { year[i], quarterId }
                const year = keys[0].slice(-1);
                const quarter = keys[1];
                const finish = newCoursePlan[year][quarter];
                // const finish = newState.coursePlan[year][quarter];
                const newQuarterList = Array.from(finish);
                newQuarterList.splice(destination.index, 0, draggableId);

                const newYear = {
                    ...newCoursePlan[year],
                    [quarter]: newQuarterList
                }

                newCoursePlan = newCoursePlan.map((prevYear, index) => {
                    if (index === Number(year))
                        return newYear
                    return prevYear
                })
            }

            this.props.setCoursePlan(newCoursePlan)
        }
    }

    onClickSave = () => {
        if (this.props.loading) return;

        this.setState({
            ...this.state,
            saving: true,
        })
        // Make post request to update plan
        const newPlan = {
            title: this.props.title,
            description: this.props.description,
            courseList: this.props.courseList,
            coursePlan: this.props.coursePlan,
            selections: this.props.selections,
        }

        this.props.apiClient.savePlan(this.props.id, newPlan).then(data => {

            setTimeout(() => {
                if (data === 'error')
                    this.setState({
                        ...this.state,
                        saveError: true,
                        saving: false,
                    })
                else

                    this.setState({
                        ...this.state,
                        saving: false,
                    })
            }, 1000);
        })
    }

    collapse = () => {
        this.setState({
            isOpen: true,
            collapse: window.innerWidth < 970,
        })
        if (this.state.collapse)
            this.toggle();
    }

    toggle = () => {
        const toolbar = document.querySelector('.toolbar-collapse');
        const toggleButton = document.querySelector('.toggle-button');
        if (toolbar && toggleButton) {
            if (this.state.isOpen) {
                // Close toolbar
                toolbar.style.transform = `translateX(-50%)`;
                toggleButton.style.transform = 'rotate(0)';
            }
            else {
                // Open toolbar
                toolbar.style.transform = `translateX(0)`;
                toggleButton.style.transform = 'rotate(90deg)';
            }
        }
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen,
        })
    }

    componentWillUnmount() {
        this.mounted = false;
        var newPlan = {
            id: '',
            title: '',
            description: '',
            courseList: [],
            courses: {},
            selections: {},
            coursePlan: [],
            searchWord: '',
            homeDroppable: '',
            activeCourse: null,
            saving: false,
            loading: true,
        }
        this.props.storePlanDetails(newPlan)
    }

    onCopyClick = () => {
        this.setState({
            ...this.state,
            copyTitle: this.props.title,
            copyDescription: this.props.description,
            copyError: null,
            copy: true,
        })
    }

    onCopy = (e) => {
        if (this.state.copyTitle === '') {
            this.setState({
                ...this.state,
                copyError: {
                    message: "Please fill out all required fields"
                }
            })
        }
        else {
            const copy_details = {
                title: this.state.copyTitle,
                description: this.state.copyDescription,
                uid: this.props.uid,
            }
            this.props.apiClient.copyPlan(this.props.id, copy_details)
                .then(data => {
                    if (data === 'error')
                        return;
                    this.props.addPlan(data);
                    
                    this.props.history.push(ROUTES.PLANNER.replace(':id', `${btoa(unescape(encodeURIComponent(data["_id"])))}`))

                    this.props.apiClient.getOnePlan(data["_id"]).then(newPlan => {
                        if (this.mounted) {
                            if (newPlan === 'error')
                                this.setState({
                                    ...this.state,
                                    error: true,
                                })
                            else {
                                var newPlan = {
                                    id: data["_id"],
                                    title: newPlan.title,
                                    description: newPlan.description,
                                    courseList: newPlan.courseList,
                                    courses: newPlan.courses,
                                    selections: newPlan.selections,
                                    coursePlan: newPlan.coursePlan,
                                    searchWord: '',
                                    homeDroppable: '',
                                    activeCourse: null,
                                    saving: false,
                                    loading: false,
                                }
                                this.props.storePlanDetails(newPlan)

                                this.setState({
                                    ...this.state,
                                    copy: false,
                                })
                            }
                        }
                    })
                })
        }

        e.preventDefault();
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    onModalClose = (type) => {
        this.setState({
            ...this.state,
            [type] : false,
        })
    }

    onChangeClick = () => {
        this.setState({
            ...this.state,
            changeTitle: this.props.title,
            changeDescription: this.props.description,
            changeError: null,
            change: true,
        })
    }

    onPlanChange = (e) => {
        if (this.state.changeTitle === '') {
            this.setState({
                ...this.state,
                changeError: {
                    message: "Please fill out all required fields"
                }
            })
        }
        else {
            // Make post request to update plan
            const newPlan = {
                title: this.state.changeTitle,
                description: this.state.changeDescription,
                courseList: this.props.courseList,
                coursePlan: this.props.coursePlan,
                selections: this.props.selections,
            }
    
            this.props.apiClient.savePlan(this.props.id, newPlan).then(data => {
                setTimeout(() => {
                    if (data === 'error')
                        this.setState({
                            ...this.state,
                            changeError: true,
                            change: false,
                        })
                    else {
                        this.setState({
                            ...this.state,
                            change: false,
                        })
                        this.props.storePlanDetails(newPlan);
                    }
                }, 1000);
            })
        }

        e.preventDefault();
    }

    render() {
        const toolbar = <Toolbar onCopy={this.onCopyClick} onSettings={this.onChangeClick}/>
        
        return (
            <div className="planner">
                {this.state.collapse ? (
                    <div className="toolbar-collapse">
                        <div className="toolbar-wrapper">
                            {toolbar}
                        </div>
                        <div className="toggle-button">
                            <Button type="icon" icon="bars" onClick={this.toggle} />
                        </div>

                    </div>

                ) :
                    toolbar
                }


                <div className="planner-content" style={{
                    marginLeft: this.state.collapse ? '0px' : '',
                }}>
                    <div className="planner-header">
                        <div className="center-text">
                            {this.props.loading ?
                                <div className="title-loader loader" />
                                :
                                <p>{this.props.title}</p>
                            }

                            <div className="save-button">
                                <Button type="icon" icon="save" tooltip="Save" direction="right" onClick={this.onClickSave} />
                            </div>
                        </div>
                        <div className="line-h" />
                    </div>

                    <DragDropContext
                        onDragEnd={this.onDragEnd}
                        onDragStart={this.onDragStart}
                        onDragUpdate={this.onDragUpdate}
                    >
                        {(
                            <div className="planner-body">
                                <CourseList />
                                <CourseDetail />
                                <PlanLayout />
                            </div>
                        )}
                    </DragDropContext>
                </div>

                <Modal open={this.state.saving} centered>
                    Saving your plan... Please wait...
                    <div className="load-icon">
                        <FontAwesomeIcon icon="spinner" pulse />
                    </div>
                </Modal>

                {this.state.error &&
                    <Modal open={this.state.error} centered>
                        Something went wrong... Redirecting you to Dashboard.
                        <div className="load-icon">
                            <FontAwesomeIcon icon="spinner" pulse />
                        </div>
                        <Redirect to={ROUTES.DASHBOARD} />
                    </Modal>
                }

                <Modal open={this.state.saveError} centered onClose={() => this.onModalClose("saveError")}>
                    Something went wrong... Please try again or contact us.
                    <div className="modal-button">
                        <Button type="text" text="Okay, I guess." onClick={() => this.onModalClose("saveError")}></Button>
                    </div>
                </Modal>

                <Modal open={this.state.copy} onClose={() => this.onModalClose("copy")}>
                    <h2>Make a Copy</h2>
                    <hr />
                    <Form autoComplete="new-password" error={this.state.copyError ? true : false}>
                        <Form.Input
                            type="text"
                            name="copyTitle"
                            value={this.state.copyTitle}
                            onChange={this.onChange}
                            placeholder="My Plan"
                            autoComplete="off"
                            required
                            fluid
                            label="Plan Title"
                            maxLength="100"
                        />
                        <Form.TextArea
                            name="copyDescription"
                            value={this.state.copyDescription}
                            onChange={this.onChange}
                            placeholder="This is my awesome plan"
                            autoComplete="off"
                            label="Plan Description"
                            maxLength="500"
                        />
                        <Message
                            error
                            content={this.state.copyError ? this.state.copyError.message : ''}
                            color="yellow"
                        />
                        
                    </Form>
                    <div className="modal-button">
                        <Button type="text" text="Cancel" onClick={() => this.onModalClose("copy")}></Button>
                        <Button type="text" text="Submit" onClick={this.onCopy}></Button>
                    </div>
                </Modal>
                
                <Modal open={this.state.change} onClose={() => this.onModalClose("change")}>
                    <h2>Plan Settings</h2>
                    <hr />
                    <Form autoComplete="new-password" error={this.state.copyError ? true : false}>
                        <Form.Input
                            type="text"
                            name="changeTitle"
                            value={this.state.changeTitle}
                            onChange={this.onChange}
                            placeholder="My Plan"
                            autoComplete="off"
                            required
                            fluid
                            label="Plan Title"
                            maxLength="100"
                        />
                        <Form.TextArea
                            name="changeDescription"
                            value={this.state.changeDescription}
                            onChange={this.onChange}
                            placeholder="This is my awesome plan"
                            autoComplete="off"
                            label="Plan Description"
                            maxLength="500"
                        />
                        <Message
                            error
                            content={this.state.changeError ? this.state.changeError.message : ''}
                            color="yellow"
                        />
                        
                    </Form>
                    <div className="modal-button">
                        <Button type="text" text="Cancel" onClick={() => this.onModalClose("change")}></Button>
                        <Button type="text" text="Submit" onClick={this.onPlanChange}></Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.planner.title,
        description: state.planner.description,
        loading: state.planner.loading,
        courseList: state.planner.courseList,
        coursePlan: state.planner.coursePlan,
        selections: state.planner.selections,
        id: state.planner.id,
        uid: state.auth.authUser ? state.auth.authUser.uid : '',
    }
}

const actionCreators = {
    storePlanDetails,
    setActiveCourse,
    setHomeDroppable,
    setCourseList,
    setCoursePlan,
    addPlan
}

export default withAuthorization(connect(mapStateToProps, actionCreators)(withApiClient(Planner)));
