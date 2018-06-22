import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActivityCard from '../components/activities/ActivityCard';
import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import LinearLayout from '../containers/LinearLayout';
import Stats from '../components/sidebar/Stats';
import stats from '../fixtures/stats';
import { fetchSocietyInfo } from '../actions/societyInfoActions';
import filterActivitiesByStatus from '../helpers/filterActivitiesByStatus';
import { verifyActivity } from '../actions/verifyActivityActions';
import filterActivities from '../helpers/filterActivities';
import dateFormatter from '../helpers/dateFormatter';


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
    verifyActivity: PropTypes.func.isRequired,
    history: PropTypes.shape({
      location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
    }).isRequired,
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
      isSelectAllChecked: false,
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
  handleClick = (isApproved, activityId) => {
    this.props.verifyActivity(isApproved, activityId);
  }

  /**
   * Filters state based on the selectedStatus
   * @memberof MyActivities
   */
   filterActivities = (status) => {
     this.setState({
       filteredActivities: filterActivities(status, this.state)
         .filteredActivities,
       selectedStatus: status,
     });
   };

  handleSelectAllClick = () => {
    console.log('clicked');
    const { isSelectAllChecked } = this.state;
    this.setState({ isSelectAllChecked: !isSelectAllChecked });
  }


  /**
   * @name VerifyActivities
   * @summary Renders My activities page
   * @return React node that displays the VerifyActivities page
   */
  render() {
    const { activities, showUserDetails, isSelectAllChecked } = this.state;
    const { requesting } = this.props;
    const hideFilter = true;
    const showSelectAllApproveBtn = true;
    const page = this.props.history.location.pathname;
    return (
      <Page>
        <div className='mainContent'>
          <div className='VerifyActivities'>
            <PageHeader
              title='Verify Activities'
              hideFilter={hideFilter}
              showSelectAllApproveBtn={showSelectAllApproveBtn}
              handleSelectAllClick={this.handleSelectAllClick}
            />
            <div className='activities'>
              {
                requesting ?
                  <h3 className='loader'>Loading... </h3>
                  :
                  <LinearLayout
                    items={
                      activities.map((activity) => {
                        const {
                          id,
                          category,
                          date,
                          description,
                          points,
                          status,
                        } = activity;
                        return (<ActivityCard
                          id={id}
                          category={category}
                          date={dateFormatter(date)}
                          description={description || 'There is no description for this activity'}
                          points={points}
                          status={status}
                          showUserDetails={showUserDetails}
                          page={page}
                          handleClick={this.handleClick}
                          isSelectAllChecked={isSelectAllChecked}
                        />);
                      })
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
  verifyActivity: (isApproved, activityId) => dispatch(verifyActivity(isApproved, activityId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyActivities);
