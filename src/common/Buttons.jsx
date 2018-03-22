import React from 'react';
import PropTypes from 'prop-types';

const Buttons = props => (
  <div className='form-group'>
    <button
      name={props.name}
      className={props.className}
      value={props.value}
    >
      {props.value}
    </button>
  </div>
);
export default Buttons;
Buttons.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
