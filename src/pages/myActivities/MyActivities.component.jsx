import React from 'react';

import PageHeader from '../../components/pageHeader/PageHeader.component';
import ActivityCard from '../../components/activityCard/ActivityCard.component';
import { MasonryLayout } from '../../layoutContainers/masonryLayout/MasonryLayout.component';

import activities from '../../fixtures/activities';

import './MyActivities.scss';

export default () => (
  <div className="myActivities">
    <PageHeader title="My Activities" />
    <div className="activities">
      <MasonryLayout
        columnCount={2}
        gap={20}
        items={
          activities.map(activity => (
            <ActivityCard
              category={activity.category}
              date={activity.date}
              description={activity.description}
              points={activity.points}
              status={activity.status}
            />
          ))
        }
      />
    </div>
  </div>
);
