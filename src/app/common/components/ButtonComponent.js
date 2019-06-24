import React from 'react';
import PropTypes from 'prop-types';

const ButtonComponent = (props) => {
  const { children, className, onClick } = props;
  return (
    <button type='button' className={`${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

ButtonComponent.defaultProps = {
  className: '',
  onClick: () => {},
};

ButtonComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};


export default ButtonComponent;
