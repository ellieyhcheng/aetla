import React, { Component } from 'react';
import './CourseCard.scss';


class CourseCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: this.props.course,
            isDragging: false,

            startX: 0,
            startY: 0,

            currentX: 0,
            currentY: 0,

            lastX: 0,
            lastY: 0
        }
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    onDragStart = (e) => {
        e.dataTransfer.setData('text/plain', this.state.course);
    }

    onMouseDown = (e) => {
        e.currentTarget.classList.add('active');

        this.setState({
            startX: e.pageX,
            startY: e.pageY,
            isDragging: true
        });
    }

    onMouseMove = (e) => {
        e.preventDefault();
        if (!this.state.isDragging) return;
        this.setState(prevState => ({
            currentX: e.pageX - prevState.startX + prevState.lastX,
            currentY: e.pageY - prevState.startY + prevState.lastY
        }))
    }

    onMouseUp = () => {
        const dragged = document.querySelectorAll('.active');
        dragged.forEach(elem => {
            elem.classList.remove('active');
        })
        this.setState({
            startX: 0,
            startY: 0,
            lastX: 0,
            lastY: 0,
            currentX: 0,
            currentY: 0,
            isDragging: false
        })
    }


    render() {
        return (
            <div className="course-card"
                draggable
                onMouseDown={this.onMouseDown}
                style={{
                    transform: `translate(${this.state.currentX}px, ${this.state.currentY}px)`
                }}>

                <p>{this.state.course}</p>
            </div>
        )
    }
}

export default CourseCard;
