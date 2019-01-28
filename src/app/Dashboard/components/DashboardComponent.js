import React from 'react';

import { MyStatsComponent, SocietyStatsComponent } from './index';
import {
  HeroComponent,
  NavbarComponent,
  SidebarComponent,
  ButtonComponent,
} from '../../common/components';

const DashboardComponent = () => (
  <div className='wrapper'>
    <HeroComponent />
    <div className='main-content'>
      <SidebarComponent
        className='sidebar'
      />
      <div className='sub-content'>
        <NavbarComponent />
        <div className='user-dashboard'>
          <h2 className='user-dashboard__name col-sm-12'>Kevin Samoei</h2>
          <div className='col-sm-12'>
            <h3 className='user-dashboard__level'>D2</h3>
          </div>
          <div className='profile-overview col-sm-12'>
            <div className='profile-overview__image' />
            <MyStatsComponent
              points={1000}
              activities={508}
            />
            <SocietyStatsComponent
              usedPoints={1508}
              remainingPoints={326}
            />
          </div>
          <div className='user-dashboard__actions col-sm-12'>
            <h3 className='user-dashboard__title'>My Activities</h3>
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
        </div>
      </div>
    </div>
  </div>
);

export default DashboardComponent;
