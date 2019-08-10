import React, { Component } from 'react';
import './Modal.scss';
import Button from '../button/Button';


class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            forced: this.props.forced || false,
        }
    }

    closeModal = () => {
        if (this.state.forced)
            return;
        const modal = document.querySelector('.modal-overlay');
        modal.style.visibility = 'hidden';
        modal.style.opacity = 0;
        // document.querySelector('.modal-overlay').remove();
    }

    render() {
        return (
            <div className="modal-overlay" onClick={this.closeModal}>
                <div className="modal">
                    {!this.state.forced &&
                        <div className="modal-button">
                            <Button type="icon" icon="times" onClick={this.closeModal}></Button>
                        </div>
                    }
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Modal;
