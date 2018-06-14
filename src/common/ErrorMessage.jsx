import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = (props) => {
  const { message, retry, param } = props;
  return (
    <div className='error-message'>
      <img src='https://goo.gl/1VpMZd' alt='error-icon' />
      <h2>{message}</h2>
      { retry && <button className='error-message__retry' onClick={() => { retry(param); }}>Try again</button>}
    </div>
  );
};

/**
 * @name defaultProps
 */
ErrorMessage.defaultProps = {
  message: '',
  param: '',
  retry: null,
};

/**
 * @name propTypes
 * @property message - Error message to be displayed
 * @property param - parameter to the retry function
 * @property retry - action to fetch data
 */
ErrorMessage.propTypes = {
  message: PropTypes.string,
  param: PropTypes.string,
  retry: PropTypes.func,
};

export default ErrorMessage;
