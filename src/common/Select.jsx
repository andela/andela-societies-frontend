import React from 'react';
import PropTypes from 'prop-types';

/**
* @name Select
* @summary Returns a label and a select
* @returns Returns a label and a select
*/
const Select = props => (
  <div className='formField'>
    { /* eslint-disable */ }
    <label className='formField__label'>{props.title}</label>
    { /* eslint-disable  enable*/}
    <select
      name={props.name}
      value={props.selectedOption}
      className='formField__control'
    >
      <option value=''>{props.placeholder}</option>
      {props.options.map(opt =>
        (
          <option
            key={opt}
            value={opt}
          >{opt}
          </option>
        ))
      }
    </select>
  </div>
);
/**
    * @name propTypes
    * @type {PropType}
    * @param {Object} propTypes - React PropTypes
    * @property {String} name - The name of the select element
    *@property {String} title - The title of the label
    *@property {String} option - string to be shown in the dropdown
    *@property {String} selectedOption - The initial selected value
    *@property {placeholde} selectedOption - plalace holder text
  */
Select.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOption: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
export default Select;
