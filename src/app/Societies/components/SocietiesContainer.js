import React, { Component } from 'react';
import { SocietyStatsComponent } from '../../Dashboard/components';
import { TableComponent, ButtonComponent } from '../../common/components';

class Societies extends Component {
  componentDidMount() {
    // get society from params
    // call action to get actities for that society
  }

  render() {
    return (
      <div>
        <div>
          <div>{/* Society image */}</div>
          <SocietyStatsComponent
            usedPoints={1000}
            remainingPoints={508}
          />
        </div>
        <div>
          <div>{/* Tabs */}</div>
          <div>
            <ButtonComponent className='button__add'>
              <span className='fa fa-plus' />
              <span>Log Points</span>
            </ButtonComponent>
            <ButtonComponent className='button__filter'>
              <span>Filter</span>
              <span className='fa fa-filter' />
            </ButtonComponent>
          </div>
        </div>
        <TableComponent />
      </div>
    );
  }
}

export default Societies;
