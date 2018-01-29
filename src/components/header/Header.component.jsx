import React from 'react';

import NotificationIcon from '../../svgIcons/headerIcons/Notification';
import NotificationList from '../notificationList/NotificationList.component';
import ProfileDisplay from '../profileDisplay/ProfileDisplay.component';

import './Header.scss';

export default () => (
  <div className="headerWrapper">
    <div className="leftHeader leftHeader--whiteText" />
    <div className="rightHeader">
      <div className="headerIcon">
        <span className="headerIcon__image">
          <NotificationIcon />
        </span>
        <span className="headerIcon__badge">1</span>
        <div className="headerDropdown">
          <NotificationList />
        </div>
      </div>
      <div className="headerIcon">
        <span
          className="headerIcon__image headerIcon__image--photo"
          style={{
            backgroundImage: 'url(https://lh3.googleusercontent.com/-00tV67VPUTc/AAAAAAAAAAI/AAAAAAAAAAc/unX3ycsnwTY/photo.jpg?sz=50)',
          }}
        />
        <div className="headerDropdown">
          <ProfileDisplay />
        </div>
      </div>
    </div>
  </div>
);
