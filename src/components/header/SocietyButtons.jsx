import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../header/PageHeader';

const Buttons = ({ filter, children }) => (
  <button className={`societyButtons societyButtons__${filter}`} onClick={e => e.preventDefault}>
    {children}
  </button>
);
Buttons.propTypes = {
  filter: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
/* eslint-disable */
class SocietyButtons extends Component {
 render() {
   return (
     <div className='societyButtons'>
       <Buttons filter='defaultSociety'>istele</Buttons>
       <Buttons filter='Invictus'>Invictus</Buttons>
       <Buttons filter='Sparks'>Sparks</Buttons>
       <Buttons filter='Phoniex'>Phoniex</Buttons>
       <div className='dropdown'>
       <PageHeader />
       </div>
     </div>
   );
 }
}
export default SocietyButtons;
