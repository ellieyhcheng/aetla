import React, { Component} from "react";
import './PlanSettings.scss';
import withAuthorization from "../../components/Session/withAuthorization";
import * as ROUTES from '../../utils/routes';
import { Link } from "react-router-dom";
import { Message, Form, Header, Button as FormButton, Segment, List } from "semantic-ui-react";
import Button from '../../components/button/Button';
import Modal from '../../components/modal/Modal';
import SignOut from '../../components/account/SignOut/SignOut';
import { subjects } from "../../utils/utils";
import { withApiClient } from "../../ApiClient";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PlanSettings extends Component{
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            error: null,
            loading: true,
            saving: false,

            title: '',
            description: '',
            courses: [],

            subject: '',
            subjectCourses: [],
            courseAdd: '',
            courseRemove: '',
            addCourses: [],
            removeCourses: [],
        }
    }

    componentDidMount() {
        this.mounted = true;
        document.title = 'Settings - Aetla'
        
        const { id } = this.props.match.params;
        let decodedId;
        try {
            decodedId = decodeURIComponent(escape(atob(id.toString())))
        }
        catch (err) {
            this.setState({
                ...this.state,
                error: "Something went wrong.",
            });
            return;
        }
        this.props.apiClient.getOnePlan(decodedId).then(data => {
            if (this.mounted) {
                if (data === 'error' || !data) {
                    this.setState({
                        ...this.state,
                        error: "Plan doesn't exist.",
                    });
                }
                else {
                    const courses = Object.entries(data.courses).reduce((prev, [key, course]) => {
                        if ('options' in course)
                            return prev;
                        prev.push({
                            key: key, text: `${course.subject} ${course.num}`, value: `${key}-${course.subject} ${course.num}`,
                        })
                        return prev;
                    }, [])

                    courses.sort((course1, course2) => {
                        const subjectCourse1 = course1.text.split(' ');
                        const subjectCourse2 = course2.text.split(' ');

                        const subject1 = subjectCourse1.slice(0, subjectCourse1.length - 1).join();
                        const courseNum1 = subjectCourse1[subjectCourse1.length - 1];

                        const subject2 = subjectCourse2.slice(0, subjectCourse2.length - 1).join();
                        const courseNum2 = subjectCourse2[subjectCourse2.length - 1];

                        if (subject1 > subject2) {
                            return true;
                        }
                        else if (subject1 < subject2) {
                            return false;
                        }
                        else {
                            const num1 = parseInt(courseNum1.match(/\d+/g));
                            const num2 = parseInt(courseNum2.match(/\d+/g));

                            if (num1 > num2) {
                                return true; 
                            }
                            else if (num1 < num2) {
                                return false;
                            }
                            else {
                                return courseNum1 > courseNum2;
                            }
                        }
                    })

                    this.setState({
                        ...this.state,
                        id: decodedId,
                        title: data.title,
                        description: data.description,
                        courses: courses,
                        loading: false,
                    })
                }
            }
        })
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    onSelectSubject = (e, { value }) => {
        this.setState({
            ...this.state,
            subject: value,
        })
        this.fetchCourses(value);
    }

    onSelectAdd = (e, { value }) => {
        this.setState({
            ...this.state,
            courseAdd: value,
        })
    }

    fetchCourses = (subject) => {
        this.props.apiClient.getCoursesBySubject(subject)
            .then((data) => {
                if (data === 'error')
                    this.setState({
                        ...this.state,
                        error: "Can't fetch courses of this department",
                    })
                else {
                    const courses = data.courses.reduce((prev, course) => {
                        if (this.state.courses.findIndex(courseItem => courseItem.key === course["_id"]) === -1)
                            prev.push({
                                key: course["_id"], text: `${course.num}`, value: `${course["_id"]}-${course.subject} ${course.num}`,
                            })
                        return prev;
                    }, []);

                    this.setState({
                        ...this.state,
                        subjectCourses: courses,
                        courseAdd: '',
                    })
                }
            })
    }

    onAdd = () => {
        if (this.state.courseAdd !== '' && this.state.addCourses.findIndex(courseId => courseId === this.state.courseAdd) === -1) {
            const newAdd = this.state.addCourses;
            newAdd.push(this.state.courseAdd);
            this.setState({
                ...this.state,
                addCourses: newAdd,
                courseAdd: '',
            })
        } else {
            this.setState({
                ...this.state,
                courseAdd: '',
            })
        }
    }

    onSelectRemove = (e, { value }) => {
        this.setState({
            ...this.state,
            courseRemove: value,
        })
    }

    onRemove = () => {
        if (this.state.courseRemove !== '' && this.state.removeCourses.findIndex(courseId => courseId === this.state.courseRemove) === -1) {
            const newRemove = this.state.removeCourses;
            newRemove.push(this.state.courseRemove);
            this.setState({
                ...this.state,
                removeCourses: newRemove,
                courseRemove: '',
            })
        } else {
            this.setState({
                ...this.state,
                courseRemove: '',
            })
        }
    }

    onClickXAdd = (e, item) => {
        const newAdd = this.state.addCourses.filter(value => value !== item);
        this.setState({
            ...this.state,
            addCourses: newAdd,
        })
    }

    onClickXRemove = (e, item) => {
        const newAdd = this.state.removeCourses.filter(value => value !== item);
        this.setState({
            ...this.state,
            removeCourses: newAdd,
        })
    }

    onSubmit = (e) => {
        if (this.state.changeTitle === '') {
            this.setState({
                ...this.state,
                changeError: {
                    message: "Please fill out all required fields"
                }
            })
        }
        else {
            this.setState({
                ...this.state,
                saving: true,
            })
            // Make post request to update plan settings
            const add = this.state.addCourses.map(item => item.split('-')[0]);
            const remove = this.state.removeCourses.map(item => item.split('-')[0]);
            const settings = {
                title: this.state.title,
                description: this.state.description,
                add,
                remove,
            }

            this.props.apiClient.saveSettings(this.state.id, settings).then(data => {
                setTimeout(() => {
                    if (data === 'error')
                        this.setState({
                            ...this.state,
                            error: 'Something went wrong while saving.'
                        })
                    else {
                        const courses = Object.entries(data.courses).reduce((prev, [key, course]) => {
                            if ('options' in course)
                                return prev;
                            prev.push({
                                key: key, text: `${course.subject} ${course.num}`, value: `${key}-${course.subject} ${course.num}`,
                            })
                            return prev;
                        }, [])
    
                        courses.sort((course1, course2) => {
                            const subjectCourse1 = course1.text.split(' ');
                            const subjectCourse2 = course2.text.split(' ');
    
                            const subject1 = subjectCourse1.slice(0, subjectCourse1.length - 1).join();
                            const courseNum1 = subjectCourse1[subjectCourse1.length - 1];
    
                            const subject2 = subjectCourse2.slice(0, subjectCourse2.length - 1).join();
                            const courseNum2 = subjectCourse2[subjectCourse2.length - 1];
    
                            if (subject1 > subject2) {
                                return true;
                            }
                            else if (subject1 < subject2) {
                                return false;
                            }
                            else {
                                const num1 = parseInt(courseNum1.match(/\d+/g));
                                const num2 = parseInt(courseNum2.match(/\d+/g));
    
                                if (num1 > num2) {
                                    return true; 
                                }
                                else if (num1 < num2) {
                                    return false;
                                }
                                else {
                                    return courseNum1 > courseNum2;
                                }
                            }
                        })

                        this.setState({
                            ...this.state,
                            saving: false,
                            subject: '',
                            subjectCourses: [],
                            courseAdd: '',
                            courseRemove: '',
                            addCourses: [],
                            removeCourses: [],
                            courses: courses,
                            title: data.title,
                            description: data.description
                        })
                    }
                }, 500);
            })
        }

        e.preventDefault();
    }

    render() {
        return (
            <div className="plan-settings">
                <div className="toolbar">
                    <div className="top">
                        <div className="line-v" />
                        <ul>
                            <li>
                                <Link to={ROUTES.PLANNER.replace(':id', `${this.props.match.params.id}`)} >
                                    <Button type="icon" icon="arrow-left" tooltip="Return to Plan" direction="right" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="bot">
                        <ul>
                            <li>
                                <Link to={ROUTES.ACCOUNT}>
                                    <Button type="icon" icon="cog" tooltip="Account Settings" direction="right" />
                                </Link>
                            </li>
                            <li>
                                <SignOut>
                                    <Button type="icon" icon="power-off" tooltip="Logout" direction="right" />
                                </SignOut>
                            </li>
                        </ul>
                        <div className="line-v" />
                    </div>
                </div>
    
                <div className="header">
                    <h2>Plan Settings</h2>
                    <hr />
                </div>
    
                <div className="grid">
                    <Form autoComplete="new-password" error={this.state.error ? true : false} loading={this.state.loading}>
                        <Header as="h3" content="Plan Details" />
                        <Form.Input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.onChange}
                            autoComplete="off"
                            required
                            fluid
                            label="Plan Title"
                            maxLength="100"
                        />
                        <Form.TextArea
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}
                            placeholder="Plan description"
                            autoComplete="off"
                            label="Plan Description"
                            maxLength="500"
                        />
                        <Header as="h3" content="Add Courses to My Plan" />
                        <Form.Group className="add-course">
                            <Form.Dropdown
                                search
                                selection
                                value={this.state.subject}
                                onChange={this.onSelectSubject}
                                options={subjects}
                                placeholder="Select Department"
                                lazyLoad
                            />
                            <Form.Dropdown
                                search
                                selection
                                placeholder="Select Course"
                                lazyLoad
                                onChange={this.onSelectAdd}
                                value={this.state.courseAdd}
                                options={this.state.subjectCourses}
                                loading={this.state.subjectCourses === []}
                            />
                            <FormButton
                                basic
                                primary
                                content="Add"
                                onClick={this.onAdd}
                            />
                        </Form.Group>

                        <Segment secondary>
                            <Header as="h4" content="Selected Courses to Add"/>
                            <List as="ol">
                                {this.state.addCourses.map(info => {
                                    const [id, name] = info.split('-');
                                    return (
                                        <List.Item as="li" value="-" key={id}>
                                            <List.Content>
                                                {name}
                                                <Button type="icon" icon="times" dark onClick={(e) => this.onClickXAdd(e, info)}></Button>
                                            </List.Content>
                                        </List.Item>
                                    )
                                })}
                            </List>
                        </Segment>
    
                        <Header as="h3" content="Remove Courses From My Plan" />
                        <Form.Group className="remove-course">
                            <Form.Dropdown
                                search
                                selection
                                options={this.state.courses}
                                lazyLoad
                                value={this.state.courseRemove}
                                onChange={this.onSelectRemove}
                                placeholder="Select Course"
                            />
                            <FormButton
                                basic
                                primary
                                content="Remove"
                                onClick={this.onRemove}
                            />
                        </Form.Group>

                        <Segment secondary>
                            <Header as="h4" content="Selected Courses to Remove"/>
                            <List as="ol">
                                {this.state.removeCourses.map(info => {
                                    const [id, name] = info.split('-');
                                    return (
                                        <List.Item as="li" value="-" key={id}>
                                            <List.Content>
                                                {name}
                                                <Button type="icon" icon="times" dark onClick={(e) => this.onClickXRemove(e, info)}></Button>
                                            </List.Content>
                                        </List.Item>
                                    )
                                })}
                            </List>
                        </Segment>
    
                        <Form.Button
                            content="Save"
                            primary
                            onClick={this.onSubmit}
                        />
                        <Message
                            error
                            content={this.state.error ? this.state.error : ''}
                            color="yellow"
                        />
    
                    </Form>
                </div>
            
                {this.state.saving &&
                    <Modal open={this.state.saving} centered>
                        Saving your plan settings... Please wait...
                        <div className="load-icon">
                            <FontAwesomeIcon icon="spinner" pulse />
                        </div>
                    </Modal>
                }

            </div>
        )
    }
}

export default withAuthorization(withApiClient(PlanSettings));