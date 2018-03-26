import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name ProfileDisplay
 * @summary Renders the dropdown that appears below profile icon
 * @return {jxs} React node for the profile dropdown component
 */
const ProfileDisplay = props => (
  <div className='profileDisplay'>
    <span className='profileDisplay__name'>{props.userInfo.name}</span>
    <span className='profileDisplay__society'>Invictus</span>

    <footer className='profileDisplay__footer'>
      <button className='profileDisplay__signOutButton'>Sign out</button>
    </footer>
  </div>
);

ProfileDisplay.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default ProfileDisplay;
