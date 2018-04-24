import React, { Component } from 'react';
import Buttons from '../buttons/SocietyTabButtons';
import Dropdown from '../../common/Dropdown';

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
   const societies =['istelle','invictus','sparks','phoenix'];
   return (
     <div className='societyButtons'>
       {societies.map(society =>
        <Buttons key={society} active={this.state.active} filter={society} setActiveButton={this.setActiveButton}>
          {society === 'istelle' ? 'iStelle' :society}</Buttons>
       )}
       <div className='dropdown'>
       <Dropdown />
       </div>
     </div>
   );
 }
}
export default SocietyButtons;
