import React from 'react';
import PropTypes from 'prop-types';

import { LogoComponent, NavItemComponent } from './index';

/**
 * @name SidebarComponent
 * @description used to navigate to different pages
 */
const SidebarComponent = ({ className, toggleSidebarState }) => (
  <nav className={`${className}`}>
    <LogoComponent
      styles='sidebar__header'
      logoClassType='logo__image--white'
    />
    <i
      aria-hidden='true'
      onClick={toggleSidebarState}
      className='fa fa-times fa-2x close-btn'
    />
    <nav className='sidebar_nav'>
      <NavItemComponent
        route='dashboard'
        iconClassName='sidebar_nav-icon'
        labelClassName='sidebar_nav-label'
        navItemClassName='sidebar_nav-item'
      />
      <NavItemComponent
        route='dashboard'
        iconClassName='sidebar_nav-icon'
        labelClassName='sidebar_nav-label'
        navItemClassName='sidebar_nav-item'
      />
      <NavItemComponent
        route='dashboard'
        iconClassName='sidebar_nav-icon'
        labelClassName='sidebar_nav-label'
        navItemClassName='sidebar_nav-item'
      />
      <NavItemComponent
        route='dashboard'
        iconClassName='sidebar_nav-icon'
        labelClassName='sidebar_nav-label'
        navItemClassName='sidebar_nav-item'
      />
    </nav>
    <footer className='sidebar__footer'>
      <div className='sidebar_nav-item'>
        <span className='fa fa-cog' />
        <span className='sidebar_nav-label sidebar_nav-label--footer'> Settings </span>
      </div>
      <hr className='sidebar__separator--footer' />
      <p className='sidebar__footer__text'> Feedback </p>
      <p className='sidebar__footer__text'> Redemption guideline </p>
      <p className='sidebar__footer__text'> Suggestions </p>
    </footer>
  </nav>
);

SidebarComponent.defaultProps = {
  className: '',
  toggleSidebarState: () => {},
};

SidebarComponent.propTypes = {
  className: PropTypes.string,
  toggleSidebarState: PropTypes.func,
};

export default SidebarComponent;
