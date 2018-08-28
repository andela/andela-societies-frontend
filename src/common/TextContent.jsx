import React from 'react';
import PropTypes from 'prop-types';

// helpers
import capitalizeString from '../../src/helpers/stringFormatter';

/**
 * @name TextContent
 * @summary Returns text content field
 * @returns Returns text content field
 */
const TextContent = ({ name, content }) => (
  <div className='formField formField--text-display'>
    { /* eslint-disable */ }
    <label className='formField__label formField__label--text-display'>{capitalizeString(name)}</label>
    { /* eslint-enable */ }
    <p className='formField formField__textField formField__textField--text-display'>{content}</p>
  </div>
);

/**
 * @name propTypes
 * @type {PropType}
 * @param {Object} propTypes - React PropTypes
 * @property {String} name - The name of the text content field
 * @property {String} content -The text
 */
TextContent.propTypes = {
  content: PropTypes.string,
  name: PropTypes.string,
};

/**
 * @name defaultProps
 */
TextContent.defaultProps = {
  content: '',
  name: '',
};
export default TextContent;
