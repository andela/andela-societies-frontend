import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name SingleInput
 * @summary Returns a single input field
 * @returns Returns a single input field
 */
const SingleInput = props => (
  <div className={`formField ${props.additionalClass}`}>
    { /* eslint-disable */ }
    <label className='formField__label'>{props.title}</label>
    { /* eslint-disable  enable*/}
    <input
      className='formField__control'
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.handleChange}
      min={props.min}
    />
    {props.additionalClass && <span className='formField__currency--active'>USD <span className='formField__currency__value'>{props.dollars}</span></span>}
  </div>
);

/**
 * @name defaultProps
 * @property {String} dollars - amount in dollars
 * @property {String} value - value provided in the input
 */
SingleInput.defaultProps = {
  dollars: '0.00',
  value: '',
  min: '1',
}
/**
 * @name propTypes
 * @type {PropType}
 * @param {Object} propTypes - React PropTypes
 * @property {String} type - The type of the input field
 * @property {String} name -The name of the input field
 * @property {String} title - The title of the input field
 * @property {String} additionalClass - additional classname provided
 * @property {String} dollars - converted dollars
 * @property {String} value - value provided in the input
 */
SingleInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  additionalClass: PropTypes.string,
  dollars: PropTypes.string,
  value: PropTypes.string,
  min: PropTypes.string,
};
export default SingleInput;
