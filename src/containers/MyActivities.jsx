import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import MasonryLayout from '../containers/MasonryLayout';
import ActivityCard from '../components/activities/ActivityCard';
import Stats from '../components/sidebar/Stats';
import Loader from '../components/loaders/Loader';
import { APPROVED } from '../constants/statuses';

import { fetchMyActivities } from '../actions/myActivitiesActions';
import { fetchCategories } from '../actions/categoriesActions';
import dateFormatter from '../helpers/dateFormatter';
import statsGenerator from '../helpers/statsGenerator';
import filterActivities from '../helpers/filterActivities';
import { getUserInfo } from '../helpers/authentication';
import clickActions from '../constants/clickAction';

/**
 * @name MyActivities
 * @summary Renders My activities page
 * @return React node that displays the MyActivities page
 */

class MyActivities extends Component {
  /**
   * @name propTypes
   * @type {PropType}
   * @property {Function} fetchMyActivities - function(thunk) as a prop
   * @property {Array} myActivities - Array of activities
   * @property {Boolean} requesting - React router history object
  */
  static propTypes = {
    fetchMyActivities: PropTypes.func.isRequired,
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
      userCanEdit: true,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      allActivities: [],
      filteredActivities: [],
      selectedStatus: 'All',
      initialStatus: 'All',
      userCanEdit: false,
      showModal: false,
      selectedActivity: {},
      statsTitle: 'Approved activities',
      statsSubTitle: 'Points earned',
    };
  }

  /**
   * React component lifecycle method componentDidMount
   * @memberof MyActivities
   */
  componentDidMount() {
    const userId = getUserInfo() && getUserInfo().id;
    this.props.fetchMyActivities(userId);
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

  handleClick = (clickAction, myActivityId) => {
    const { EDIT } = clickActions;
    if (clickAction === EDIT) {
      const selectedActivity = this.state.filteredActivities.find(activity => activity.id === myActivityId);
      this.setState({
        showModal: true,
        selectedActivity,
      });
    }
    return null;
  }

  updateSelectedActivity = (newValues) => {
    const {
      date,
      category,
      description,
      numberOf,
      activityTypeId,
    } = newValues;

    this.setState({
      selectedActivity: {
        ...this.state.selectedActivity,
        category,
        date,
        description,
        activityTypeId,
        numberOf,
      },
    });
  }

  deselectActivity = () => {
    this.setState(() => ({
      selectedActivity: {},
      showModal: false,
    }));
  }

  /**
   * Render MyActivities Page
   * @return {Object} JSX for MyActivities component
   */
  render() {
    const {
      filteredActivities,
      selectedStatus,
      allActivities,
      userCanEdit,
      showModal,
      selectedActivity,
      statsTitle,
      statsSubTitle,
    } = this.state;
    const { requesting, categories } = this.props;
    const approvedActivities = allActivities.filter(activities => activities.status === APPROVED);

    return (
      <Page
        selectedItem={selectedActivity}
        categories={categories}
        deselectItem={this.deselectActivity}
        showModal={showModal}
        updateSelectedItem={this.updateSelectedActivity}
      >
        <div className='mainContent'>
          <div className='myActivities'>
            <PageHeader
              title='My Activities'
              filterActivities={this.filterActivities}
              selectedStatus={selectedStatus}
            />
            <div className='activities'>
              { requesting && <Loader /> }
              {
                !requesting &&
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
                          userCanEdit={userCanEdit}
                          handleClick={this.handleClick}
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
            stats={statsGenerator(approvedActivities, statsTitle, statsSubTitle)}
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

export default connect(mapStateToProps, {
  fetchMyActivities,
  fetchCategories,
})(MyActivities);
