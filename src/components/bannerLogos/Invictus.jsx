import React from 'react';
import image from '../../assets/images/logos/societyLogos/invictus.jpg';

/**
 * @name Invictus
 * @summary Renders the Invictus Logo image in the Banner
 */
const Invictus = () => (
  <div className='bannerLogo'>
    <img src={image} alt='Invictus-Banner-Logo' className='bannerLogo--invictus' />
  </div>
);

export default Invictus;
