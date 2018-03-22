import React from 'react';
import PropTypes from 'prop-types';

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
Select.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOption: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
export default Select;
