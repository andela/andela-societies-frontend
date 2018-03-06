import React from 'react';

/**
 * Renders the profile dropdown
 */
export default () => (
  <div className="profileDisplay">
    <span className="profileDisplay__name">John Doe</span>
    <span className="profileDisplay__society">Invictus</span>

    <footer className="profileDisplay__footer">
      <button className="profileDisplay__signOutButton">Sign out</button>
    </footer>
  </div>
);
