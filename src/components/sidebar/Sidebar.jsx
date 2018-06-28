import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import logo from '../../assets/images/logos/andelaLogoWhite.png';
import pageInfo from '../../helpers/pageInfo';
import { hasAllowedRole } from '../../helpers/authentication';

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
const Sidebar = ({ userRoles }) => (
  <aside className='sidebar'>
    <header className='sidebar__header'>
      <span className='sidebar__logoWrapper' style={{ backgroundImage: `url(${logo})` }} />
      <span className='sidebar__appName'>Andela Societies</span>
    </header>
    <nav className='sidebar__nav'>
      <div className='sidebar__navGroup'>
        {pageInfo.pages.map((page) => {
          if (page.allowedRoles) {
            return hasAllowedRole(userRoles, page.allowedRoles) && renderMenuItem(page);
          }
          return renderMenuItem(page);
        })}
      </div>
      <div className='sidebar__navGroup'>
        <span className='sidebar__navGroupHeader'>Societies</span>
        {pageInfo.societyPages.map(renderMenuItem)}
      </div>
    </nav>
  </aside>
);


Sidebar.propTypes = {
  userRoles: PropTypes.arrayOf(PropTypes.string),
};

Sidebar.defaultProps = {
  userRoles: [],
};

export default Sidebar;
