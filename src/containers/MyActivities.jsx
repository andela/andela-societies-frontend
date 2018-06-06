import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import MasonryLayout from '../containers/MasonryLayout';
import ActivityCard from '../components/activities/ActivityCard';
import Stats from '../components/sidebar/Stats';
import { fetchMyActivities } from '../actions/myActivitiesActions';
import { fetchCategories } from '../actions/categoriesActions';
import dateFormatter from '../helpers/dateFormatter';
import stats from '../fixtures/stats';
import filterActivities from '../helpers/filterActivities';
import { getUserInfo } from '../helpers/authentication';

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
    fetchCategories: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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
    const userId = getUserInfo() && getUserInfo().id;
    this.props.fetchActivities(userId);
    this.props.fetchCategories();
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
    const { filteredActivities, selectedStatus } = this.state;
    const { requesting, categories } = this.props;

    return (
      <Page categories={categories}>
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
                          description={activity.description || activity.activity}
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
  categories: state.categories.categories,
});

const mapDispatchToProps = dispatch => ({
  fetchActivities: userId => dispatch(fetchMyActivities(userId)),
  fetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyActivities);
