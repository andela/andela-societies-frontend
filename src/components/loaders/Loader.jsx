import React from 'react';

/**
 * @name Loader
 * @summary Renders a spinner during API calls to fetch data
 * @returns {React.Element} to display a loader
 */
const Loader = () => (
  <div className='loader-wrapper'>
    <div className='loader' />
  </div>);

export default Loader;
