import React, { Component } from 'react';
import PropType from 'prop-types';

import Globe from '../svgIcons/activityIcons/Globe';

/**
 * @summary Renders an activity card
 * @class ActivityCard
 * @extends React.Component
 */
class ActivityCard extends Component {
  /**
   * @name propTypes
   * @type {PropType}
   * @param {Object} propTypes - React PropTypes
   * @property {String} category - The type of an Activity
   * @property {String} date - The date on which a fellow participated in an activity
   * @property {String} description - The description of the activity
   * @property {String} points - The points the activity is worth
   * @property {String} status - The current status of the activity
   * @property {boolean} showUserDetails - Whether or not to show user details
   */
  static propTypes = {
    center: PropType.string,
    date: PropType.string.isRequired,
    description: PropType.string.isRequired,
    points: PropType.number.isRequired,
    status: PropType.string.isRequired,
    showUserDetails: PropType.bool,
  };

  static defaultProps = {
    center: '',
    showUserDetails: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      statuses: ['pending', 'rejected', 'approved', 'default'],
    };
  }

  /**
   * @summary Renders the status indicator on the ActivityCard
   */
  renderStatus = () => {
    const { statuses } = this.state;
    const status = this.props.status.toLowerCase();

    if (statuses.indexOf(status.toLowerCase()) < 0) {
      return '';
    }

    if (status === 'default') {
      return <span className={`activity__status activity__status--${status}`}>In review</span>;
    }

    let statusText = status.charAt(0).toUpperCase();
    statusText += status.slice(1);
    return <span className={`activity__status activity__status--${status}`}>{statusText}</span>;
  };

  renderUserDetails() {
    const { showUserDetails } = this.props;
    if (!showUserDetails) {
      return '';
    }
    return (
      <div className='activity__left'>
        <img className='activity__userPicture' src='http://placehold.it/55x55' alt='John Doe' />
        <span className='activity__userName'>John Doe</span>
      </div>
    );
  }

  render() {
    const {
      points,
      date,
      description,
      center,
    } = this.props;
    return (
      <div className='activity'>
        {this.renderUserDetails()}
        <div className='activity__right'>
          <div className='activity__header'>
            <span className='redemption__points'>{points} Points</span>
            <span className='redemption__amount'>USD 5.00</span>
            <span className='activity__date'>{date}</span>
          </div>
          <div className='activity__content'>
            <h1 className='activity__description'>{description}</h1>
          </div>
          <div className='activity__footer'>
            <span className='redemption__location'>
              <Globe />
              {center}
            </span>
            {this.renderStatus()}
          </div>
        </div>
      </div>
    );
  }
}
export default ActivityCard;
