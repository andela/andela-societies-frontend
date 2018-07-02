import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = (props) => {
  const {
    message,
    retry,
    param,
    icon,
  } = props;
  return (
    <div className='error-message'>
      {icon && <img src={icon} alt='error-icon' />}
      <h2>{message}</h2>
      {retry && <button className='error-message__retry' onClick={() => { retry(param); }}>Try again</button>}
    </div>
  );
};

/**
 * @name defaultProps
 */
ErrorMessage.defaultProps = {
  icon: '',
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
  icon: PropTypes.string,
  message: PropTypes.string,
  param: PropTypes.string,
  retry: PropTypes.func,
};

export default ErrorMessage;
