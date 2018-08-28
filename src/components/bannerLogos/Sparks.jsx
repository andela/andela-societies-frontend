import React from 'react';
import image from '../../assets/images/logos/societyLogos/sparks.png';

/**
 * @name Sparks
 * @summary Renders the Sparks Logo image in the Banner
 */
const Sparks = () => (
  <div className='bannerLogo'>
    <img src={image} alt='Sparks-Banner-Logo' className='bannerLogo--sparks' />
  </div>
);

export default Sparks;
