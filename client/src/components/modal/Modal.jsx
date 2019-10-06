import React from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';

function Modal(props) {
    return (
        <div className="modal-overlay" onClick={() => {
                if (props.dimmerDismiss !== false)
                    props.onClose();
            }} 
            style={{
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

Modal.propTypes = {
    dimmerDismiss: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    centered: PropTypes.bool,
    open: PropTypes.bool,
}

Modal.defaultProps = {
    dimmerDismiss: true,
}

export default Modal;
