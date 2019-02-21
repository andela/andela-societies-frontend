import React from 'react';
import PropTypes from 'prop-types';

const StatusIndicatorComponent = ({ className, status }) => (
  <span className={`indicator ${className} ${status.replace(/\s/g, '').toLowerCase()}`} />
);

StatusIndicatorComponent.defaultProps = {
  status: '',
  className: '',
};

StatusIndicatorComponent.propTypes = {
  status: PropTypes.string,
  className: PropTypes.string,
};

export default StatusIndicatorComponent;
