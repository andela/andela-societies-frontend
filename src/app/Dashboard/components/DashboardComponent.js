import React from 'react';

import { MyStatsComponent, SocietyStatsComponent } from './index';
import {
  HeroComponent,
  NavbarComponent,
  SidebarComponent,
} from '../../common/components';

const DashboardComponent = () => (
  <div>
    <HeroComponent />
    <SidebarComponent />
    <div className='content-wrapper'>
      <NavbarComponent />
      <div className='user-dashboard'>
        <h2 className='user-dashboard__name'>Kevin Samoei</h2>
        <h3 className='user-dashboard__level'>D2</h3>
        <div className='profile-overview'>
          <div className='profile-overview__image' />
          <MyStatsComponent
            points='1000'
            activities='508'
          />
          <SocietyStatsComponent
            usedPoints='1508'
            remainingPoints='326'
          />
        </div>
      </div>
    </div>
  </div>
);

export default DashboardComponent;
