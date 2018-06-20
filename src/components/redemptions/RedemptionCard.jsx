import React, { Component } from 'react';
import PropType from 'prop-types';

import Globe from '../svgIcons/activityIcons/Globe';

/**
 * @summary Renders an activity card
 * @class ActivityCard
 * @extends React.Component
 */
class RedemptionCard extends Component {
  /**
   * @name propTypes
   * @type {PropType}
   * @param {Object} propTypes - React PropTypes
   * @property {String} date - The date on which a fellow participated in an activity
   * @property {String} description - The description of the activity
   * @property {String} points - The points the activity is worth
   * @property {String} status - The current status of the activity
   * @property {boolean} showUserDetails - Whether or not to show user details
   */
  static propTypes = {
    date: PropType.string,
    description: PropType.string,
    points: PropType.number,
    status: PropType.string,
    showUserDetails: PropType.bool,
  };

  static defaultProps = {
    showUserDetails: true,
    date: '',
    description: '',
    points: null,
    status: '',
  };
  statuses = ['pending', 'expired', 'approved', 'default'];
  /**
   * @summary Renders the status indicator on the ActivityCard
   */
  renderStatus = () => {
    const status = this.props.status.toLowerCase();

    if (this.statuses.indexOf(status.toLowerCase()) < 0) {
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
    if (!this.props.showUserDetails) {
      return '';
    }
    return (
      <div className='activity__left'>
        <img className='activity__userPicture' src='http://placehold.it/55x55' alt='John Doe' />
        <span className='activity__owner'>John Doe</span>
      </div>
    );
  }

  render() {
    return (
      <div className='activity'>
        {this.renderUserDetails()}
        <div className='activity__right'>
          <div className='activity__header'>
            <span className='redemption__points'>{this.props.points} Points</span>
            <span className='redemption__amount'>USD 5.00</span>
            <span className='activity__date'>{this.props.date}</span>
          </div>
          <div className='activity__content'>
            <h1 className='activity__description'>{this.props.description}</h1>
          </div>
          <div className='activity__footer'>
            <span className='redemption__location'>
              <Globe />
              Nairobi
            </span>
            {this.renderStatus()}
          </div>
        </div>
      </div>
    );
  }
}
export default RedemptionCard;
