import React from 'react';
import PropTypes from 'prop-types';

import { capitalize } from '../../utils';

export const TABS = {
  1: 'redemptions',
  2: 'invictus',
  3: 'phoenix',
  4: 'sparks',
};

export const getTabBorderClassname = (selectedTab) => {
  switch (selectedTab) {
  case TABS[1]:
    return `tab__selected--${TABS[1]}`;
  case TABS[2]:
    return `tab__selected--${TABS[2]}`;
  case TABS[3]:
    return `tab__selected--${TABS[3]}`;
  case TABS[4]:
    return `tab__selected--${TABS[4]}`;
  default:
    return 'tab__selected';
  }
};

const TabsComponent = ({ selectedTab, changeSelectedTab, tabNames }) => {
  const tabBorderClassname = getTabBorderClassname(selectedTab);
  return (
    <div className='tabs'>
      {tabNames
        && tabNames.map((name) => (
          <h3
            key={name}
            aria-hidden
            className={selectedTab === name ? 'user-dashboard__title selected__title' : 'user-dashboard__title'}
            onClick={() => changeSelectedTab(name)}
          >
            {capitalize(name)}
          </h3>
        ))}
      <div className='tab--underline' />
      <div className={tabBorderClassname} />
    </div>
  );
};

TabsComponent.defaultProps = {
  tabNames: [],
  changeSelectedTab: null,
  selectedTab: '',
};

TabsComponent.propTypes = {
  tabNames: PropTypes.arrayOf(PropTypes.string),
  selectedTab: PropTypes.string,
  changeSelectedTab: PropTypes.func,
};

export default TabsComponent;
