import React from 'react';
import PageHeader from '../header/PageHeader';

const SocietyButtons = () => (
  <div className='societyButtons'>
    <button className='societyButtons societyButtons__defaultSociety'>Istelle</button>
    <button className='societyButtons societyButtons__invictus'>Invictus</button>
    <button className='societyButtons societyButtons__sparks'>Sparks</button>
    <button className='societyButtons societyButtons__phoniex'>Phoniex</button>
    <div className='dropdown'>
      <PageHeader />
    </div>
  </div>
);
export default SocietyButtons;
