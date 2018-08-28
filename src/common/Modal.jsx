import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name Modal
 * @summary Renders a modal
 * @return {jsx} React node for the modal
 */

/* eslint-disable */
const Modal = props => (
  <div
    className={`modal ${props.className}`}
    onClick={ () => props.close() }
  >
    <div className='modal__content' onClick={event => event.stopPropagation()}>
      {props.children}
    </div>
  </div>
);
/* eslint-disable enable*/

Modal.defaultProps = {
  className: '',
  close: () => {},
  children: null,
};

/**
  * @name propTypes
  * @type {PropType}
  * @param {Object} propTypes - React PropTypes
  * @property {Object} children - React nodes or DOM elements to render in the modal
*/
Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  close: PropTypes.func,
};

export default Modal;
