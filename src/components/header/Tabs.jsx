import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name Tabs
 * @summary renders tabs given an array of titles
 * @param {Object} props
 * @return {String} React node containing component for displaying tabs
 */
const Tabs = ({ tabTitles, handleChangeTab, selectedTab }) => (
  <div className='tabs'>
    {
      tabTitles
        .map(tabLabel =>
          (
            <a
              key={tabLabel}
              className={`tabs__tab-title ${
                selectedTab === tabLabel.toLowerCase() ? 'tabs__tab-title--active' : ''
              }`}
              role='button'
              tabIndex='0'
              href='/'
              onClick={event => handleChangeTab(event, tabLabel)}
            >
              {tabLabel}
            </a>
          ))
    }
  </div>
);

Tabs.propTypes = {
  tabTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChangeTab: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
};

export default Tabs;
