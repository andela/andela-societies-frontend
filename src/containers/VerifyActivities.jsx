import React from 'react';

import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import ActivityCard from '../components/verifyActivity/ActivityCard';
import MasonryLayout from '../containers/MasonryLayout';
import Stats from '../components/sidebar/Stats';
import activities from '../fixtures/activities';

/**
 * @name VerifyActivities
 * @summary Renders My activities page
 * @return React node that displays the VerifyActivities page
 */


const VerifyActivities = () => (
  <Page>
    <div className='mainContent'>
      <div className='VerifyActivities'>
        <PageHeader title='Verify Activities' />
        <div className='activities'>
          <MasonryLayout
            columnCount={2}
            gap={20}
            items={
              activities.map(activity => (
                <ActivityCard
                  points={activity.points}
                  status={activity.status}
                  category={activity.category}
                  date={activity.date}
                  description={activity.description}
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
export default VerifyActivities;
