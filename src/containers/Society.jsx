import React from 'react';

import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import ActivityCard from '../components/activities/ActivityCard';
import MasonryLayout from '../containers/MasonryLayout';
import Stats from '../components/sidebar/Stats';
import activities from '../fixtures/activities';

/**
 * @name Society
 * @summary Renders a society page
 * @return React node that displays a society page
 */
const Society = () => (
  <Page>
    <div className='mainContent'>
      <div className='society'>
        <PageHeader title='Activities' />
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
    <aside className='sideContent sideContent--societyPage'>
      <Stats
        title='Invictus'
        page='society'
        stats={[
          {
            value: '260',
            name: 'Activities logged',
          },
          {
            value: '9590',
            name: 'Points earned',
          },
          {
            value: '8590',
            name: 'Points used',
          },
          {
            value: '2021',
            name: 'Points remaining',
          },
        ]}
      />
    </aside>
  </Page>
);
export default Society;
