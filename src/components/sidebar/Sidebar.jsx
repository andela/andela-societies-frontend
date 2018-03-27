import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logos/andelaLogoWhite.png';
import pageInfo from '../../helpers/pageInfo';

/**
 * @name renderMenuItem
 * @param {object} pageInfoData An object that contains page metadata
 * @summary Renders a Sidebar's menu item
 */
const renderMenuItem = pageInfoData => (
  <Link to={pageInfoData.url} className='sidebar__navItem' key={pageInfoData.title}>
    <span className='sidebar__navIcon'>
      <pageInfoData.menuIcon />
    </span>
    <span className='sidebar__navLabel'>{pageInfoData.title}</span>
  </Link>
);

/**
 * @name Sidebar
 * @summary Sidebar component
 * @return React node containing the sidebar component
 */
const Sidebar = () => (
  <aside className='sidebar'>
    <header className='sidebar__header'>
      <span className='sidebar__logoWrapper' style={{ backgroundImage: `url(${logo})` }} />
      <span className='sidebar__appName'>Andela Societies</span>
    </header>
    <nav className='sidebar__nav'>
      <div className='sidebar__navGroup'>
        {pageInfo.pages.map(renderMenuItem)}
      </div>
      <div className='sidebar__navGroup'>
        <span className='sidebar__navGroupHeader'>Societies</span>
        {pageInfo.societyPages.map(renderMenuItem)}
      </div>
    </nav>
  </aside>
);

export default Sidebar;
