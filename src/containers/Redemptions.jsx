import React from 'react';

import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import MasonryLayout from '../containers/MasonryLayout';
import Stats from '../components/sidebar/Stats';
import activities from '../fixtures/activities';

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
            items={activities}
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
export default Redemptions;
