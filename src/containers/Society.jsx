import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import ActivityCard from '../components/activities/ActivityCard';
import LeaderShipCard from '../components/Leadership/LeaderShipCard';
import leaders from '../fixtures/leaders';
import MasonryLayout from '../containers/MasonryLayout';
import Stats from '../components/sidebar/Stats';
import filterActivities from '../helpers/filterActivities';
import dateFormatter from '../helpers/dateFormatter';
import Loader from '../components/loaders/Loader';

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
    title: PropTypes.string,
  };

  /**
   * @name defaultProps
   * @type {PropType}
   * @property {string} title -the title of the Page header active tab
   */
  static defaultProps = {
    title: 'Activities',
  };

  /**
   * React component lifecycle method getDerivedStateFromProps
   * @param {Object} nextProps - received props
   */
  static getDerivedStateFromProps(nextProps) {
    const { loggedActivities } = nextProps.societyInfo.info;
    return {
      filteredActivities: loggedActivities,
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
      filteredActivities: [],
      selectedStatus: 'All',
      initialStatus: 'All',
      showUserDetails: true,
      ...props.societyInfo.info,
    };
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

  /**
   * @name Society
   * @summary Renders a society page
   * @return React node that displays a society page
   */
  render() {
    const {
      name,
      totalPoints,
      usedPoints,
      remainingPoints,
      loggedActivities,
      filteredActivities,
      selectedStatus,
      showUserDetails,
    } = this.state;
    const { societyInfo } = this.props;
    const { requesting } = societyInfo;
    return (
      <Page>
        <div className='mainContent'>
          <div className='society'>
            <PageHeader
              title={this.props.title}
              selectedStatus={selectedStatus}
              filterActivities={this.filterActivities}
            />
            {this.props.title === 'Activities' ? (
              <div className='activities'>
                {requesting && <Loader />}
                {!requesting && (
                  <MasonryLayout
                    items={filteredActivities.map(activity => (
                      <ActivityCard
                        id={activity.id}
                        category={activity.category}
                        date={dateFormatter(activity.activityDate)}
                        description={activity.description}
                        points={activity.points}
                        status={activity.status}
                        showUserDetails={showUserDetails}
                        owner={activity.owner}
                        ownerPhoto={activity.ownerPhoto}
                      />
                    ))}
                  />
                )}
              </div>
            ) : (
              <div className='activities'>
                <MasonryLayout
                  items={leaders.map(leader => (
                    <LeaderShipCard
                      image={leader.Image}
                      role={leader.Role}
                      name={leader.Name}
                      profile={leader.Profile}
                    />
                  ))}
                />
              </div>
            )}
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
  title: state.societyTitle,
});

export default connect(
  mapStateToProps,
  null,
)(Society);
