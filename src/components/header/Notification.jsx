import React from 'react';

/**
 * @name Notification
 * @summary Renders a Notification
 * @return {jsx} React node for a notification
 */
const Notification = () => (
  <div className="notification">
    <div
      className="notification__icon"
      style={{
        backgroundImage: 'url(https://lh3.googleusercontent.com/-00tV67VPUTc/AAAAAAAAAAI/AAAAAAAAAAc/unX3ycsnwTY/photo.jpg?sz=50)',
      }}
    />
    <div className="notification__content">
      <p className="notification__message">
        Geogreen and 6 others logged activities.
      </p>
      <p className="notification__time">6 minutes ago</p>
    </div>
  </div>
);

export default Notification;
