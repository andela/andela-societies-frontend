import React from 'react';
import { Link } from 'react-router-dom';

import LogoComponent from './LogoComponent';

/**
 * @name SidebarComponent
 * @description used to navigate to different pages
 */
const SidebarComponent = () => (
  <aside className='sidebar'>
    <LogoComponent
      styles='sidebar__header'
      logoClassType='logo__image--white'
    />
    <nav className='sidebar_nav'>
      <Link to='/dashboard' className='sidebar_nav-item'>
        <span className='sidebar_nav-icon' />
        <span className='sidebar_nav-label'>Dashboard</span>
      </Link>
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
  </aside>
);


export default SidebarComponent;
