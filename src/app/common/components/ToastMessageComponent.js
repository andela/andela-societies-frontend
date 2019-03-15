import React from 'react';
import PropTypes from 'prop-types';

const ToastMessageComponent = (props) => {
  const {
    children, className, onClick, show,
  } = props;
  return (
    <button
      type='button'
      className={`${className}`}
      onClick={onClick}
      style={{
        transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
      }}
    >
      {children}
    </button>
  );
};

ToastMessageComponent.defaultProps = {
  className: '',
  onClick: () => {},
  show: true,
};

ToastMessageComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  show: PropTypes.bool,
};


export default ToastMessageComponent;
