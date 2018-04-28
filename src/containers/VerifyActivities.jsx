import React from 'react';

import ActivityCard from '../components/activities/ActivityCard';
import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import MasonryLayout from '../containers/MasonryLayout';
import Stats from '../components/sidebar/Stats';
import activities from '../fixtures/activities';
import stats from '../fixtures/stats';

/**
 * @name VerifyActivities
 * @summary Renders My activities page
 * @return React node that displays the VerifyActivities page
 */
const VerifyActivities = () => {
  const showUserDetails = true;
  return (
    <Page>
      <div className='mainContent'>
        <div className='VerifyActivities'>
          <PageHeader title='Verify Activities' />
          <div className='activities'>
            <MasonryLayout
              items={
                activities.map(activity => (
                  <ActivityCard
                    id={activity.id}
                    category={activity.category}
                    date={(activity.date)}
                    description={activity.activity}
                    points={activity.points}
                    status={activity.status}
                    showUserDetails={showUserDetails}
                  />
                ))
              }
            />
          </div>
        </div>
      </div>
      <aside className='sideContent'>
        <Stats
          stats={stats}
        />
      </aside>
    </Page>
  );
};


export default VerifyActivities;
