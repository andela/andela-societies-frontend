import React from 'react';
import PropTypes from 'prop-types';

const TextArea = props => (
  <div className='formField'>
    { /* eslint-disable */ }
    <label className='formField__label'>{props.title}</label>
    { /* eslint-disable  enable*/}
    <textarea
      className='formField__textField'
      style={props.resize ? null : { resize: 'none' }}
      name={props.name}
      rows={props.rows}
      value={props.content}
      placeholder={props.placeholder}
      />
  </div>
);

TextArea.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  resize: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default TextArea; 