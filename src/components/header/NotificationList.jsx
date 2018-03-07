import React from 'react';

import Notification from './Notification';

/**
 * @name NoticifationList
 * @summary Renders a list of notifications
 * @return React node containing a list of notifications
 */
const NotificationList = () => (
  <div className="notificationList">
    <div className="notificationList__content">
      <Notification />
      <Notification />
      <Notification />
    </div>
    <footer className="notificationList__footer">
      <button className="notificationList__clearButton">Clear notifications</button>
    </footer>
  </div>
);

export default NotificationList;
