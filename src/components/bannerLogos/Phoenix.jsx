import React from 'react';
import image from '../../assets/images/logos/societyLogos/phoenix.png';

/**
 * @name Phoenix
 * @summary Renders the Phoenix Logo image in the Banner
 */
const Phoenix = () => (
  <div className='bannerLogo'>
    <img src={image} alt='Phoenix-Banner-Logo' className='bannerLogo--phoenix' />
  </div>
);

export default Phoenix;
