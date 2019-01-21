import React from 'react';

import { MyStatsComponent, SocietyStatsComponent } from './index';
import { HeroComponent, SidebarComponent } from '../../common/components';

const DashboardComponent = () => (
  <div>
    <HeroComponent />
    <SidebarComponent />
    <div className='content-wrapper'>
      <h2 className='profile__name'>Kevin Samoei</h2>
      <h3 className='profile__level'>D2</h3>
      <div>
        <span />
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
);

export default DashboardComponent;
