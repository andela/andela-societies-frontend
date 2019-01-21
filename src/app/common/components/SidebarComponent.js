import React from 'react';
import { Link } from 'react-router-dom';

import LogoComponent from './LogoComponent';

/**
 * @name SidebarComponent
 * @description used to navigate to different pages
 */
const SidebarComponent = () => (
  <aside className='sidebar'>
    <LogoComponent />
    <nav className='sidebar_nav'>
      <Link to='/dashboard' className='sidebar_nav-item'>
        <span className='sidebar_nav-icon'>icon</span>
        <span className='sidebar_nav-label'>Dashboard</span>
      </Link>
    </nav>
  </aside>
);


export default SidebarComponent;
