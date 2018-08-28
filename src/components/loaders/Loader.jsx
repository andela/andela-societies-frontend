import React from 'react';

/**
 * @name Loader
 * @summary Renders a spinner during API calls to fetch data
 * @returns {React.Element} to display a loader
 */
const Loader = () => (
  <div className='spinner-wrapper'>
    <div className='spinner' />
  </div>);

export default Loader;
