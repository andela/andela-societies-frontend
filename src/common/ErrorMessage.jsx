import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = (props) => {
  const {
    message,
    retry,
    param,
    icon,
  } = props;
  let iconHtml = '';
  let retryHtml = '';
  if (icon) {
    iconHtml = <img src={icon} alt='error-icon' />;
  }
  if (retry) {
    retryHtml = <button className='error-message__retry' onClick={() => { retry(param); }}>Try again</button>;
  }
  return (
    <div className='error-message'>
      {iconHtml}
      <h2>{message}</h2>
      {retryHtml}
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
