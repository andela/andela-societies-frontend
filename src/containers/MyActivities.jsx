import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import MasonryLayout from '../containers/MasonryLayout';
import Stats from '../components/sidebar/Stats';
import { fetchMyActivities } from '../actions/myActivitiesActions';

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
    myActivities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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
   * React component lifecycle method componentDidMount
   * @memberof MyActivities
   */
  componentDidMount() {
    this.props.fetchActivities();
  }

  /**
   * Render MyActivities Page
   * @return {Object} JSX for MyActivities component
   */
  render() {
    const { myActivities, requesting } = this.props;

    return (
      <Page>
        <div className='mainContent'>
          <div className='myActivities'>
            <PageHeader title='My Activities' />
            <div className='activities'>
              {
                requesting ?
                  <h3>Loading ...</h3>
                  :
                  <MasonryLayout
                    items={myActivities}
                  />
              }
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
