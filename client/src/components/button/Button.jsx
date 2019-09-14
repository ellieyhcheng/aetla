import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Button.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

class Button extends Component {

    componentDidMount() {
        if (this.props.tool === '')
            return;
        const node = ReactDOM.findDOMNode(this);
        if (node instanceof HTMLElement) {
            const tooltip = node.querySelector('.button-tooltip');
            switch (this.props.direction) {
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

    onClick = (e) => {
        if (this.props.onClick) {
            this.props.onClick(e);
            e.stopPropagation();
        }

    }

    render() {
        if (this.props.type === 'icon') {
            return (
                <div className="button-icon" onClick={this.onClick} onDoubleClick={(e) => e.stopPropagation()} style={{
                    color: this.props.dark ? "#544E54" : "#D5BDA4",
                }}>
                    <FontAwesomeIcon icon={this.props.icon} fixedWidth className="icon" />
                    {this.props.tooltip &&
                        <span className="button-tooltip">{this.props.tooltip}</span>
                    }
                </div>
            )
        } else { // type === 'text'
            return (
                <div className={this.props.fixedWidth ? "button-text fixed-width" : "button-text"} 
                    onClick={this.onClick}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                >
                    {this.props.text}
                </div>
            )
        }
    }
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['icon', 'text']).isRequired,
    icon: PropTypes.string,
    text: PropTypes.string,
    dark: PropTypes.bool,
    tooltip: PropTypes.string,
    direction: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
    fixedWidth: PropTypes.bool,
}

Button.defaultProps = {
    icon: '',
    text: '',
    dark: false,
    tooltip: '',
}

export default Button;
