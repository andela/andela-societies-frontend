import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { capitalize } from '../../utils';

const NavItemComponent = ({
  route, iconClassName, labelClassName, navItemClassName,
}) => {
  const checkmarkHtml = iconClassName.includes('outlinedCheckmark') && <div className='checkmark' />;
  return (
    <Link to={`/${route}`} className={navItemClassName}>
      <div className={iconClassName}>{checkmarkHtml}</div>
      <span className={labelClassName}>{capitalize(route.replace(/-/g, " "))}</span>
    </Link>
  );
};

NavItemComponent.defaultProps = {
  route: '',
  iconClassName: '',
  labelClassName: '',
  navItemClassName: '',
};

NavItemComponent.propTypes = {
  route: PropTypes.string,
  iconClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  navItemClassName: PropTypes.string,
};

export default NavItemComponent;
