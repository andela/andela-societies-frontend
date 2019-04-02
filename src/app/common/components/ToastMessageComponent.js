import React from 'react';
import PropTypes from 'prop-types';

const ToastMessageComponent = (props) => {
  const {
    children, className, show,
  } = props;
  return (
    <div
      className={`${className}`}
      role='button'
      tabIndex={0}
      style={{
        transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
      }}
    >
      {children}
    </div>
  );
};

ToastMessageComponent.defaultProps = {
  className: '',
  show: true,
};

ToastMessageComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  show: PropTypes.bool,
};


export default ToastMessageComponent;
