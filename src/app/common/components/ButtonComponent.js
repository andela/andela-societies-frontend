import React from 'react';
import PropTypes from 'prop-types';

const ButtonComponent = (props) => {
  const { children, className } = props;
  return (
    <button type='button' className={`button ${className}`}>
      {children}
    </button>
  );
};

ButtonComponent.defaultProps = {
  className: '',
};

ButtonComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};


export default ButtonComponent;
