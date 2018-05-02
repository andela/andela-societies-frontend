import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import ActivityCard from '../components/activities/ActivityCard';
import MasonryLayout from '../containers/MasonryLayout';
import Stats from '../components/sidebar/Stats';
import dateFormatter from '../helpers/dateFormatter';

/**
 * @name Society
 * @summary Renders a society page
 * @return React node that displays a society page
 */
class Society extends Component {
  static propTypes = {
    societyInfo: PropTypes.shape({
      requesting: PropTypes.bool.isRequired,
      error: PropTypes.shape({}).isRequired,
      info: PropTypes.shape({
        name: PropTypes.string.isRequired,
        totalPoints: PropTypes.number.isRequired,
        usedPoints: PropTypes.number.isRequired,
        remainingPoints: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        loggedActivities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      }).isRequired,
    }).isRequired,
  };

  /**
   * React component lifecycle method getDerivedStateFromProps
   * @param {Object} nextProps - received props
  */
  static getDerivedStateFromProps(nextProps) {
    return {
      ...nextProps.societyInfo.info,
    };
  }

  /**
   * Society component class constructor
   * @param {*} props - society information
   */
  constructor(props) {
    super(props);
    this.state = {
      ...props.societyInfo.info,
    };
  }

  /**
   * Render Society Component
   * @return {object} JSX for Society Component
   */
  render() {
    const showUserDetails = true;
    const {
      name,
      totalPoints,
      usedPoints,
      remainingPoints,
      loggedActivities,
    } = this.state;
    return (
      <Page>
        <div className='mainContent'>
          <div className='society'>
            <PageHeader title='Activities' />
            <div className='activities'>
              <MasonryLayout
                items={
                  loggedActivities.map(activity => (
                    <ActivityCard
                      id={activity.id}
                      category={activity.category}
                      date={dateFormatter(activity.date)}
                      description={activity.activity}
                      points={activity.points}
                      status={activity.status}
                      owner={activity.user}
                      showUserDetails={showUserDetails}
                    />
                  ))
                }
              />
            </div>
          </div>
        </div>
        <aside className='sideContent sideContent--societyPage'>
          <Stats
            title={name}
            page='society'
            stats={[
              {
                value: `${loggedActivities.length}`,
                name: 'Activities logged',
              },
              {
                value: `${totalPoints}`,
                name: 'Points earned',
              },
              {
                value: `${usedPoints}`,
                name: 'Points used',
              },
              {
                value: `${remainingPoints}`,
                name: 'Points remaining',
              },
            ]}
          />
        </aside>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  societyInfo: state.societyInfo,
});

export default connect(mapStateToProps, null)(Society);
