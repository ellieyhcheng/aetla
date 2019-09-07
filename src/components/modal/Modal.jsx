import React, { useEffect } from 'react';
import './Modal.scss';

function Modal(props) {

    // useEffect(() => {
    //     if (props.open) {
    //         const modal = .querySelector('.modal-overlay');
    //         modal.style.visibility = 'visible';
    //         modal.style.opacity = 1;
    //     }
    //     else {
    //         const modal = document.querySelector('.modal-overlay');
    //         modal.style.visibility = 'hidden';
    //         modal.style.opacity = 0;
    //     }
    // }, [props.open])

    return (
        <div className="modal-overlay" onClick={props.onClose} style={{
            visibility: props.open ? 'visible' : 'hidden',
            opacity: props.open ? '1' : '0',
        }}>
            <div className="modal" onClick={(e) => e.stopPropagation()} style={{
                textAlign: props.centered ? 'center' : '',
                alignItems: props.centered ? 'center' : '',
            }}>
                {props.children}
            </div>
        </div>
    )
}

export default Modal;
