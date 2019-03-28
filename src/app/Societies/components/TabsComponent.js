import React from 'react';
import PropTypes from 'prop-types';

const TabsComponent = ({ selectedTab, changeSelectedTab }) => {
  let redemptionTabClassname;
  let activitiesTabClassname;
  let tabBorderHtml;
  if (selectedTab === 'redemptions') {
    activitiesTabClassname = 'user-dashboard__title';
    tabBorderHtml = <div className='society__tabs__selected--redemptions' />;
    redemptionTabClassname = 'user-dashboard__title society__tabs--redemptions selected__title';
  } else {
    tabBorderHtml = <div className='society__tabs__selected' />;
    activitiesTabClassname = 'user-dashboard__title selected__title';
    redemptionTabClassname = 'user-dashboard__title society__tabs--redemptions';
  }
  return (
    <div className='society__tabs'>
      <h3 aria-hidden className={activitiesTabClassname} onClick={() => changeSelectedTab('activities')}>
        Activities
      </h3>
      <h3 aria-hidden className={redemptionTabClassname} onClick={() => changeSelectedTab('redemptions')}>
        Redemptions
      </h3>
      <div className='society__tabs--underline' />
      {tabBorderHtml}
    </div>
  );
};

TabsComponent.defaultProps = {
  selectedTab: 'activities',
  changeSelectedTab: null,
};

TabsComponent.propTypes = {
  selectedTab: PropTypes.string,
  changeSelectedTab: PropTypes.func,
};

export default TabsComponent;
