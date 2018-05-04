import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import MasonryLayout from '../containers/MasonryLayout';
import ActivityCard from '../components/activities/ActivityCard';
import Stats from '../components/sidebar/Stats';
import { fetchMyActivities } from '../actions/myActivitiesActions';
import stats from '../fixtures/stats';
import dateFormatter from '../helpers/dateFormatter';
import filterActivities from '../helpers/filterActivities';

/**
 * @name MyActivities
 * @summary Renders My activities page
 * @return React node that displays the MyActivities page
 */

class MyActivities extends Component {
  /**
   * @name propTypes
   * @type {PropType}
   * @property {Function} fetchActivities - function(thunk) as a prop
   * @property {Array} myActivities - Array of activities
   * @property {Boolean} requesting - React router history object
  */
  static propTypes = {
    fetchActivities: PropTypes.func.isRequired,
    requesting: PropTypes.bool,
  };

  /**
   * @name defaultProps
   * @type {PropType}
   * @property {Boolean} requesting - state of get request
  */
  static defaultProps = {
    requesting: false,
  };

  /**
   * React component lifecycle method getDerivedStateFromProps
   * @param {Object} nextProps - props
   */
  static getDerivedStateFromProps(nextProps) {
    return {
      allActivities: nextProps.myActivities,
      filteredActivities: nextProps.myActivities,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      allActivities: [],
      filteredActivities: [],
      selectedStatus: 'All',
      initialStatus: 'All',
    };
  }

  /**
   * React component lifecycle method componentDidMount
   * @memberof MyActivities
   */
  componentDidMount() {
    this.props.fetchActivities();
  }

  /**
   * Filters state based on the selectedStatus
   * @memberof MyActivities
   */
  filterActivities = (status) => {
    this.setState({
      filteredActivities: filterActivities(status, this.state).filteredActivities,
      selectedStatus: status,
    });
  };
  /**
   * Render MyActivities Page
   * @return {Object} JSX for MyActivities component
   */
  render() {
    const { requesting } = this.props;
    const { filteredActivities, selectedStatus } = this.state;
    return (
      <Page>
        <div className='mainContent'>
          <div className='myActivities'>
            <PageHeader
              title='My Activities'
              filterActivities={this.filterActivities}
              selectedStatus={selectedStatus}
            />
            <div className='activities'>
              {
                requesting ?
                  <h3>Loading... </h3>
                  :
                  <MasonryLayout
                    items={
                      filteredActivities.map(activity => (
                        <ActivityCard
                          id={activity.id}
                          category={activity.category}
                          date={dateFormatter(activity.date)}
                          description={activity.activity}
                          points={activity.points}
                          status={activity.status}
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
            title='My Stats'
            stats={stats}
          />
        </aside>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  myActivities: state.myActivities.activities,
  requesting: state.myActivities.requesting,
});

const mapDispatchToProps = dispatch => ({
  fetchActivities: () => dispatch(fetchMyActivities()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyActivities);
