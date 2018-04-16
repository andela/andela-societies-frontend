import React from 'react';
import PropTypes from 'prop-types';

const Buttons = ({
  active, filter, children, setActiveButton,
}) => (
  <button
    className={active === filter ? 'societyButtons societyButtons__defaultSociety'
      : `societyButtons societyButtons__${filter}`}
    onClick={setActiveButton(filter)}
  >
    {children}
  </button>
);
Buttons.propTypes = {
  active: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  setActiveButton: PropTypes.func.isRequired,
};

export default Buttons;
