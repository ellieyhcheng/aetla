import React, { Component } from 'react';
import './Button.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Button extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: props.type || 'text', // { icon, text }
            icon: props.icon || null,
            color: props.color,
            onClick: props.onClick,
            tooltip: props.tooltip || ''
        };
    }
    render() {
        if (this.state.type === 'icon') {
            return (
                <div className="button-icon" onClick={this.state.onClick}>
                    <FontAwesomeIcon icon={this.state.icon} fixedWidth className="icon"/>
                    <span className="tooltip">{this.state.tooltip}</span>
                </div>
            )
        } else { // type === 'text'
            return (
                <div className="button-text" onClick={this.props.onClick}>
                    {this.props.children}
                </div>
            )
        }
    }
}

export default Button;