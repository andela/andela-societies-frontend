import React from 'react';
import PropTypes from 'prop-types';

/**
   * @name SingleInput
   * @summary Returns a single input field
   * @returns Returns a single input field
   */
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
/**
    * @name propTypes
    * @type {PropType}
    * @param {Object} propTypes - React PropTypes
    * @property {String} type - The type of the input field
    *@property {String} name -The name of the input field
    *@property {String} title - The title of the input field
  */
SingleInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default SingleInput;
