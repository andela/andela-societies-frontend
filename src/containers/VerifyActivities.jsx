import React from 'react';
import PropTypes from 'prop-types';


import Page from './Page';
import ActivityCard from '../components/verifyActivity/ActivityCard';
import MasonryLayout from '../containers/MasonryLayout';
import Stats from '../components/sidebar/Stats';
import activities from '../fixtures/activities';
import VerifyActivityHoc from '../components/HOC/VerifyActivityHOC';
import stats from '../fixtures/stats';

/**
 * @name VerifyActivities
 * @summary Renders My activities page
 * @return React node that displays the VerifyActivities page
 */


const VerifyActivities = props => (
  <Page>
    <div className='mainContent'>
      <div className='VerifyActivities'>
        {props.success()}
        <div className='activities'>
          <MasonryLayout
            items={
              activities.map(activity => (
                <ActivityCard
                  points={activity.points}
                  status={activity.status}
                  category={activity.category}
                  date={activity.date}
                  description={activity.description}
                  id={activity.id}
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
VerifyActivities.propTypes = {
  success: PropTypes.func.isRequired,
};

export default VerifyActivityHoc(VerifyActivities);

