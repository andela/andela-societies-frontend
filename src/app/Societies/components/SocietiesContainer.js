import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions } from '../operations';
import SocietyActivities from './SocietyActivitiesComponent';
import { SocietyStatsComponent } from '../../Dashboard/components';
import { ButtonComponent } from '../../common/components';

class SocietiesContainer extends Component {
  static defaultProps = {
    match: {
      params: {
        society: '',
      },
    },
    usedPoints: 0,
    remainingPoints: 0,
    loggedActivities: [],
    fetchSocietyInfoRequest: null,
  };

  static propTypes = {
    match: PropTypes.shape({}),
    usedPoints: PropTypes.number,
    remainingPoints: PropTypes.number,
    loggedActivities: PropTypes.arrayOf(PropTypes.shape({})),
    fetchSocietyInfoRequest: PropTypes.func,
  };

  componentDidMount() {
    // get society from params
    // call action to get actities for that society
    const {
      match: {
        params: { society },
      },
      fetchSocietyInfoRequest,
    } = this.props;
    fetchSocietyInfoRequest(society);
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { society },
      },
      fetchSocietyInfoRequest,
    } = this.props;
    if (prevProps.match.params.society !== society) {
      fetchSocietyInfoRequest(society);
    }
  }

  render() {
    const {
      usedPoints,
      remainingPoints,
      loggedActivities,
      match: {
        params: { society },
      },
    } = this.props;

    return (
      <div>
        <div className='profile-overview profile-overview--society col-sm-12'>
          <div className={`profile-overview__image--society ${society.toLowerCase()}`}>{/* Society image */}</div>
          <SocietyStatsComponent
            usedPoints={usedPoints}
            remainingPoints={remainingPoints}
            className='society-page__stats'
          />
        </div>
        <div className='user-dashboard__actions col-sm-12'>
          <div className='society__tabs'>
            <h3 className='user-dashboard__title'>Activities</h3>
            <h3 className='user-dashboard__title society__tabs--redemptions'>Redemptions</h3>
          </div>
          <div>
            <ButtonComponent className='button__add'>
              <span className='fa fa-plus' />
              <span>Log Points</span>
            </ButtonComponent>
            <ButtonComponent className='button__filter'>
              <span>Filter</span>
              <span className='fa fa-filter' />
            </ButtonComponent>
          </div>
        </div>
        <SocietyActivities activities={loggedActivities} />
      </div>
    );
  }
}

const mapStateToProps = ({ society }) => ({
  loading: society.loading,
  totalPoints: society.totalPoints,
  usedPoints: society.usedPoints,
  remainingPoints: society.remainingPoints,
  loggedActivities: society.loggedActivities,
  activitiesLogged: society.activitiesLogged,
});

const mapDispatchToProps = {
  fetchSocietyInfoRequest: actions.fetchSocietyInfoRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SocietiesContainer);
