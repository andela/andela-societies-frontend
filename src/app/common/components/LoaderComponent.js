import React from 'react';
import PropTypes from 'prop-types';

const LoaderComponent = ({ className }) => (
  <div className={`spinner-border ${className}`} role='status'>
    <span className='sr-only'>Loading...</span>
  </div>
);

LoaderComponent.defaultProps = {
  className: '',
};

LoaderComponent.propTypes = {
  className: PropTypes.string,
};

export default LoaderComponent;
