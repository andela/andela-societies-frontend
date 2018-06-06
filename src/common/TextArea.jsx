import React from 'react';
import PropTypes from 'prop-types';

/**
   * @name TextArea
   * @summary Returns a textarea field
   * @returns Returns a textarea field
   */
const TextArea = props => (
  <div className='formField'>
    { /* eslint-disable */ }
    <label className='formField__label textAreaDescription'>{props.title}</label>
    { /* eslint-disable  enable*/}
    <textarea
      className='formField formField__textField'
      style={props.resize ? null : { resize: 'none' }}
      name={props.name}
      rows={props.rows}
      placeholder={props.placeholder}
      onChange={props.handleChange}
      value={props.value}
      />
  </div>
);
/**
    * @name propTypes
    * @type {PropType}
    * @param {Object} propTypes - React PropTypes
    * @property {String} title - The title of the label
    * @property {String} name - The name for the textarea
    * @property {String} resize - whether the textarea should be fixed or resizable
    * @property {String} placehold - the placeholder text
  */
TextArea.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  resize: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
};
export default TextArea;
