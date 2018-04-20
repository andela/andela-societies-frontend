import React, { Component } from 'react';
import PageHeader from '../header/PageHeader';
import Buttons from '../buttons/SocietyTabButtons';

/* eslint-disable */
class SocietyButtons extends Component {
 constructor(props){
   super(props);
   this.state= {
     active: 'istelle'
   }
 }
 setActiveButton = (filter) => {
   return () =>{
    this.setState({
      active:filter
    })
   }
 }
 render() {
   return (
     <div className='societyButtons'>
       <Buttons active={this.state.active} filter='istelle' setActiveButton={this.setActiveButton}>iStelle</Buttons>
       <Buttons active={this.state.active} filter='Invictus' setActiveButton={this.setActiveButton}>Invictus</Buttons>
       <Buttons active={this.state.active} filter='Sparks' setActiveButton={this.setActiveButton}>Sparks</Buttons>
       <Buttons active={this.state.active} filter='Phoniex' setActiveButton={this.setActiveButton}>Phoniex</Buttons>
       <div className='dropdown'>
       <PageHeader />
       </div>
     </div>
   );
 }
}
export default SocietyButtons;
