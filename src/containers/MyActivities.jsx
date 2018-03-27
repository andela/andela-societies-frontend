import React from 'react';

import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import ActivityCard from '../components/activities/ActivityCard';
import MasonryLayout from '../containers/MasonryLayout';
import Stats from '../components/sidebar/Stats';
import activities from '../fixtures/activities';

/**
 * @name MyActivities
 * @summary Renders My activities page
 * @return React node that displays the MyActivities page
 */
const MyActivities = () => (
  <Page>
    <div className='mainContent'>
      <div className='myActivities'>
        <PageHeader title='My Activities' />
        <div className='activities'>
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
    </div>
    <aside className='sideContent'>
      <Stats
        stats={[
          {
            value: '20',
            name: 'Activities logged',
          },
          {
            value: '1,590',
            name: 'Points earned',
          },
        ]}
      />
    </aside>
  </Page>
);
export default MyActivities;
