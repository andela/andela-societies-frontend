import React from 'react';
import image from '../../assets/images/logos/societyLogos/istelle.png';

/**
 * @name Istelle
 * @summary Renders the Istelle Logo image in the Banner
 */
const Istelle = () => (
  <div className='bannerLogo'>
    <img src={image} alt='Istelle-Banner-Logo' className='bannerLogo--istelle' />
  </div>
);

export default Istelle;
