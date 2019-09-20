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
import { storePlanDetails, setActiveCourse, setHomeDroppable, setCourseList, 
    setCoursePlan, addPlan, deletePlan } from '../../actions/itemActions';
import { withApiClient } from "../../ApiClient";
import withAuthorization from '../../components/Session/withAuthorization';
import { Redirect } from "react-router-dom";
import * as ROUTES from '../../utils/routes';
import { Message, Form, List, } from "semantic-ui-react";
import { download } from "../../utils/utils";

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

            delete: false,
            deleteError: null,

            exit: false,
            changesMade: false,
            
            help: false,
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
                if (data === 'error' || !data)
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

        this.setState({
            ...this.state,
            changesMade: true,
        })

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

    onClickSave = (redirect = false) => {
        if (this.props.loading) return;

        this.setState({
            ...this.state,
            saving: true,
            exit: false,
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
                else {
                    this.setState({
                        ...this.state,
                        saving: false,
                        changesMade: false
                    })
                    if (redirect)
                        this.props.history.push(ROUTES.DASHBOARD);
                }
            }, 500);
        })
    }

    collapse = () => {
        this.setState({
            isOpen: window.innerWidth < 970,
            collapse: window.innerWidth < 970,
        })
        this.toggle();
    }

    toggle = () => {
        const toolbar = document.querySelector('.toolbar-wrapper');
        const toggleButton = document.querySelector('.toggle-button');
        if (toolbar && toggleButton) {
            if (this.state.isOpen) {
                // Close toolbar
                toolbar.style.transform = `translateX(-100%)`;
                toggleButton.style.transform = 'translateX(0) rotate(0)';
            }
            else {
                // Open toolbar
                toolbar.style.transform = `translateX(0)`;
                toggleButton.style.transform = 'translateX(80%) rotate(90deg)';
            }
        }
        else if (toolbar && !toggleButton) {
            toolbar.style.transform = `translateX(0)`;
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
        window.removeEventListener('resize', this.collapse);
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
                                var copyPlan = {
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
                                this.props.storePlanDetails(copyPlan)

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
            [type]: false,
        })
    }

    onDeleteClick = () => {
        this.setState({
            ...this.state,
            delete: true,
            deleteError: false,
        })
    }

    onDelete = () => {
        this.props.apiClient.deletePlan(this.props.id)
            .then(data => {
                if (data === 'error') {
                    this.setState({
                        ...this.state,
                        deleteError: true,
                    })
                }
                else {
                    this.props.deletePlan(this.props.id);
                    this.setState({
                        ...this.state,
                        delete: false,
                        deleteError: false,
                    })
                    this.props.history.push(ROUTES.DASHBOARD);
                }
            })
    }

    onExitClick = () => {
        if (this.state.changesMade)
            this.setState({
                ...this.state,
                exit: true,
            })
        else {
            this.props.history.push(ROUTES.DASHBOARD)
        }
    }

    onHelpClick = () => {
        this.setState({
            ...this.state,
            help: true,
        })
    }

    onSettingsClick = () => {
        this.props.history.push(`${ROUTES.PLAN_SETTINGS.replace(':id', `${btoa(unescape(encodeURIComponent(this.props.id)))}`)}`)
    }

    onDownloadClick = () => {
        this.props.apiClient.getOnePlan(this.props.id)
        .then(data => {
            if (data === 'error')
                return
            else {
                download(data);
            }
        })
    }

    render() {
        const toolbar = <Toolbar 
            onCopy={this.onCopyClick} 
            onSettings={this.onSettingsClick}
            onDownload={this.onDownloadClick}
            onDelete={this.onDeleteClick} 
            onExit={this.onExitClick} 
            onHelp={this.onHelpClick}
            />

        return (
            <div className="planner">
                <div className="toolbar-wrapper">
                    {toolbar}
                </div>

                {this.state.collapse && 
                    <div className="toggle-button">
                        <Button type="icon" icon="bars" onClick={this.toggle} />
                    </div>
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
                                <Button type="icon" icon="save" tooltip="Save" direction="right" onClick={() => this.onClickSave(false)} />
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

                {this.state.saving &&
                    <Modal open={this.state.saving} centered>
                        Saving your plan... Please wait...
                        <div className="load-icon">
                            <FontAwesomeIcon icon="spinner" pulse />
                        </div>
                    </Modal>
                }
                {this.state.error &&
                    <Modal open={this.state.error} centered>
                        Something went wrong... Redirecting you to Dashboard.
                        <div className="load-icon">
                            <FontAwesomeIcon icon="spinner" pulse />
                        </div>
                        <Redirect to={ROUTES.DASHBOARD} />
                    </Modal>
                }

                {this.state.saveError &&
                    <Modal open={this.state.saveError} centered onClose={() => this.onModalClose("saveError")}>
                        Something went wrong... Please try again, refresh the page, or contact us.
                        <div className="modal-button">
                            <Button type="text" text="Okay, I guess." onClick={() => this.onModalClose("saveError")}></Button>
                        </div>
                    </Modal>
                }
                {this.state.copy &&
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
                }
                {this.state.delete &&
                    <Modal open={this.state.delete} onClose={() => this.onModalClose("delete")}>
                        <p>Are you sure you want to delete this plan?</p>
                        {this.state.deleteError && <Message color="yellow" content="Something went wrong, please try again." />}
                        <div className="modal-button">
                            <Button type="text" text="Cancel" onClick={() => this.onModalClose("delete")}></Button>
                            <Button type="text" text="Submit" onClick={this.onDelete}></Button>
                        </div>
                    </Modal>
                }
                {this.state.exit &&
                    <Modal open={this.state.exit} onClose={() => this.onModalClose("exit")}>
                        <p>Do you want to save changes to your plan?</p>
                        <div className="modal-button">
                            <Button type="text" text="Cancel" onClick={() => this.onModalClose("exit")}></Button>
                            <Button type="text" text="No" onClick={() => this.props.history.push(ROUTES.DASHBOARD)}></Button>
                            <Button type="text" text="Yes" onClick={() => {
                                this.onClickSave(true);
                            }}></Button>
                        </div>
                    </Modal>
                }

                {this.state.help &&
                    <Modal open={this.state.help} onClose={() => this.onModalClose("help")}>
                        <div className="help">
                            <h2>Help</h2>
                            <hr />
                            <div className="help-body">
                                <List>
                                    <List.Item>
                                        <List.Header>Course Cards</List.Header>
                                        To move the course cards onto the course plan, drag and drop the boxes in the desired row.
                                        By clicking on the card, you can also see the course details from the school registrar listings.
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Course List</List.Header>
                                        Course List is where the required courses for graduation in this major is held at first. You can search for 
                                        a particular course using the search bar. Electives are also included in the search, but the selected course
                                        is the marker for the search, not the elective name.
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Course Plan</List.Header>
                                        Course Plan refers to the grid on the right, where courses can be dropped into the desired row, corresponding to
                                        the desired quarters. 
                                        You can click on the (-) and (+) icons on the right of the Course Plan to add or remove a quarter from the year,
                                        for up to 4 quarters.
                                        At the bottom of the Course Plan, you can click on the "Add Year" and "Remove Year" buttons to add or remove years
                                        as desired.
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Save</List.Header>
                                        Save your plan with the icon at the top of the page next to the plan title to keep your changes.
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Toolbar</List.Header>
                                        The toolbar on the left allows you to go back to your dashboard, to make a copy of your plan as is, 
                                        to delete the plan, to export the plan as a PDF, and to access the plan settings to modify the plan's
                                        title and descriptions.
                                    </List.Item>
                                </List>
                            </div>
                        </div>
                        <div className="modal-button">
                            <Button type="text" text="Close" onClick={() => this.onModalClose("help")}></Button>
                        </div>
                    </Modal>
                }
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
    addPlan,
    deletePlan,
}

export default withAuthorization(connect(mapStateToProps, actionCreators)(withApiClient(Planner)));
