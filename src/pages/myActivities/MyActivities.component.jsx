import React from 'react';

import PageHeader from '../../components/pageHeader/PageHeader.component';
import ActivityCard from '../../components/activityCard/ActivityCard.component';

import './MyActivities.scss';

export default () => (
  <div className="myActivities">
    <PageHeader title="My Activities" />
    <div className="activities">
      <ActivityCard
        category="Participating in a tech event"
        date="November 3, 2017"
        description="Mentored teens how to code. (DBC 2016 at Redemption camp)"
        points="250"
        status="expired"
      />
    </div>
  </div>
);
