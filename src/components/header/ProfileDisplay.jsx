import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name ProfileDisplay
 * @summary Renders the dropdown that appears below profile icon
 * @return {jxs} React node for the profile dropdown component
 */
const ProfileDisplay = ({ logOut, userInfo }) => (
  <div className='profileDisplay'>
    <span className='profileDisplay__name'>{userInfo.name}</span>
    <span className='profileDisplay__society'>Invictus</span>
    <footer className='profileDisplay__footer'>
      <button onClick={logOut} className='profileDisplay__signOutButton'>Sign out</button>
    </footer>
  </div>
);

/**
* @namespace ProfileDisplay
*/
ProfileDisplay.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  logOut: PropTypes.func.isRequired,
};

export default ProfileDisplay;
