import React from 'react';

import ActivityCard from '../components/redemptions/RedemptionCard';
import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import MasonryLayout from '../containers/MasonryLayout';
import Stats from '../components/sidebar/Stats';
import activities from '../fixtures/activities';
import stats from '../fixtures/stats';

/**
 * @name Redemptions
 * @summary Renders the Redemptions page
 * @return React node that displays the Redemptions page
 */
const Redemptions = () => (
  <Page>
    <div className='mainContent'>
      <div className='RecentRedemptions'>
        <PageHeader title='Recent Redemptions' />
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

export default Redemptions;
