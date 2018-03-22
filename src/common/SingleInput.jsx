import React from 'react';
import PropTypes from 'prop-types';

const SingleInput = props => (
  <div className='formField'>
    { /* eslint-disable */ }
    <label className='formField__label'>{props.title}</label>
    { /* eslint-disable  enable*/}
    <input
      className='formField__control'
      name={props.name}
      type={props.type}
    />
  </div>
);

SingleInput.propTypes = {
  type: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default SingleInput;

