import React from 'react';

/**
 * @name ProfileDisplay
 * @summary Renders the dropdown that appears below profile icon
 * @return {jxs} React node for the profile dropdown component
 */
const ProfileDisplay = () => (
  <div className="profileDisplay">
    <span className="profileDisplay__name">John Doe</span>
    <span className="profileDisplay__society">Invictus</span>

    <footer className="profileDisplay__footer">
      <button className="profileDisplay__signOutButton">Sign out</button>
    </footer>
  </div>
);

export default ProfileDisplay;
