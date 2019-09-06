import React, { useEffect, useState } from 'react';
import './Modal.scss';
import Button from '../button/Button';


function Modal(props) {

    useEffect(() => {
        if (props.open) {
            const modal = document.querySelector('.modal-overlay');
            modal.style.visibility = 'visible';
            modal.style.opacity = 1;
        }
        else {
            if (props.forced )
                return;
            const modal = document.querySelector('.modal-overlay');
            modal.style.visibility = 'hidden';
            modal.style.opacity = 0;
        }
    }, [props.open])

    return (
        <div className="modal-overlay" onClick={props.onClose}>
            <div className="modal">
                {props.children}
                {!props.forced &&
                    <div className="modal-button">
                        <Button type="text" text="Cancel" onClick={props.onClose}></Button>
                        <Button type="text" text="Submit" onClick={props.onSubmit}></Button>
                    </div>
                }
            </div>
        </div>
    )
}

// class Modal extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             forced: this.props.forced || false,
//             open: this.props.open || false,
//         }
//     }

//     closeModal = () => {
//         if (this.state.forced)
//             return;
//         this.setState({
//             ...this.state,
//             open: false,
//         })
//         const modal = document.querySelector('.modal-overlay');
//         modal.style.visibility = 'hidden';
//         modal.style.opacity = 0;
//         // document.querySelector('.modal-overlay').remove();
//     }

//     render() {
//         return (
//             <div className="modal-overlay" onClick={this.closeModal}>
//                 <div className="modal">
//                     {!this.state.forced &&
//                         <div className="modal-button">
//                             <Button type="icon" icon="times" onClick={this.closeModal}></Button>
//                         </div>
//                     }
//                     {this.props.children}
//                 </div>
//             </div>
//         );
//     }
// }

export default Modal;
