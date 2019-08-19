import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Button.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Button extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: props.type || 'text', // { icon, text }
            icon: props.icon || null,
            text: props.text || '',
            onClick: props.onClick,
            tooltip: props.tooltip || '',
            direction: props.direction,  // { left, top, right, bottom }
            fixedWidth: props.fixedWidth,
        };
    }

    componentDidMount() {
        if (this.state.tool === '')
            return;
        const node = ReactDOM.findDOMNode(this);
        if (node instanceof HTMLElement) {
            const tooltip = node.querySelector('.button-tooltip');
            switch (this.state.direction) {
                case 'left':
                    tooltip.style.right = '100%';
                    tooltip.style.top = '50%';
                    tooltip.style.transform = 'translate(0, -50%)';
                    tooltip.classList.add('button-tooltip-left');
                    break;
                case 'top':
                    tooltip.style.left = '50%';
                    tooltip.style.bottom = '100%';
                    tooltip.style.transform = 'translate(-50%, 0%)';
                    tooltip.classList.add('button-tooltip-top');
                    break;
                case 'bottom':
                    tooltip.style.left = '50%';
                    tooltip.style.top = '100%';
                    tooltip.style.transform = 'translate(-50%, 0%)';
                    tooltip.classList.add('button-tooltip-bottom');
                    break;
                case 'right':
                    tooltip.style.left = '100%';
                    tooltip.style.top = '50%';
                    tooltip.style.transform = 'translate(0, -50%)';
                    tooltip.classList.add('button-tooltip-right');
                    break;
                default:
            }
        }
    }

    removeClick = () => {
        document.querySelectorAll('.button-text').forEach((button) => {
            button.classList.remove('click')
        })
    }

    componentWillUnmount() {
        document.removeEventListener('mouseup', this.removeClick)
    }
    onMouseDown = (e) => {
        e.currentTarget.classList.add('click')
        document.addEventListener('mouseup', this.removeClick)
    }

    onMouseUp = (e) => {
        e.currentTarget.classList.remove('click')
    }

    render() {
        if (this.state.type === 'icon') {
            return (
                <div className="button-icon" onClick={this.state.onClick}>
                    <FontAwesomeIcon icon={this.state.icon} fixedWidth className="icon" />
                    {this.state.tooltip &&
                        <span className="button-tooltip">{this.state.tooltip}</span>
                    }
                </div>
            )
        } else { // type === 'text'
            return (
                <div className={this.state.fixedWidth ? "button-text fixed-width" : "button-text"} 
                    onClick={this.state.onClick}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                >
                    {this.state.text}
                </div>
            )
        }
    }
}

export default Button;
