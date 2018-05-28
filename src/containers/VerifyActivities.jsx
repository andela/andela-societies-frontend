import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActivityCard from '../components/activities/ActivityCard';
import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import MasonryLayout from '../containers/MasonryLayout';
import Stats from '../components/sidebar/Stats';
import stats from '../fixtures/stats';
import { fetchSocietyInfo } from '../actions/societyInfoActions';
import filterActivitiesByStatus from '../helpers/filterActivitiesByStatus';

class VerifyActivities extends Component {
  /**
    * @name VerifyActivities
    * @type {propTypes}
    * @param {Object} props - React PropTypes
    * @property {Function} fetchSocietyInfo - fetches society details
    */
  static propTypes = {
    fetchSocietyInfo: PropTypes.func.isRequired,
    requesting: PropTypes.bool.isRequired,
  }

  /**
   * React component lifecycle method getDerivedStateFromProps
   * @param {Object} nextProps - props
   */
  static getDerivedStateFromProps(nextProps) {
    const { societyName, societyActivities } = nextProps;
    const activities = filterActivitiesByStatus(societyActivities, 'in review');
    return {
      activities,
      societyName,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      showUserDetails: true,
      societyName: '',
    };
  }

  componentDidMount() {
    if (this.state.societyName) this.props.fetchSocietyInfo(this.state.societyName);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.societyName !== this.state.societyName) {
      this.props.fetchSocietyInfo(this.state.societyName);
    }
  }

  /**
   * @name VerifyActivities
   * @summary Renders My activities page
   * @return React node that displays the VerifyActivities page
   */
  render() {
    const { activities, showUserDetails } = this.state;
    const { requesting } = this.props;
    const hideFilter = true;
    return (
      <Page>
        <div className='mainContent'>
          <div className='VerifyActivities'>
            <PageHeader
              title='Verify Activities'
              hideFilter={hideFilter}
            />
            <div className='activities'>
              {
                requesting ?
                  <h3 className='loader'>Loading... </h3>
                  :
                  <MasonryLayout
                    items={
                      activities.map(activity => (
                        <ActivityCard
                          id={activity.id}
                          category={activity.category}
                          date={(activity.date)}
                          description={activity.description || activity.activity}
                          points={activity.points}
                          status={activity.status}
                          showUserDetails={showUserDetails}
                        />
                      ))
                    }
                  />
              }
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
  }
}

const mapStateToProps = state => ({
  societyActivities: state.societyActivities.activities,
  societyName: state.userProfile.info.society.name,
  requesting: state.societyActivities.requesting,
});

const mapDispatchToProps = dispatch => ({
  fetchSocietyInfo: name => dispatch(fetchSocietyInfo(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyActivities);
