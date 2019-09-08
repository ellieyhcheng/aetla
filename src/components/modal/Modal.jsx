import React from 'react';
import './Modal.scss';

function Modal(props) {
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
