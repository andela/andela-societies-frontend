import React, { Component } from 'react';
import PropType from 'prop-types';

import TruncateDescription from '../TruncateDescription';
import Globe from '../svgIcons/activityIcons/Globe';
import Button from '../../common/Button';

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
  * @property {Boolean} showUserDetails - Whether or not to show user details
  * @property {Boolean} showLocation - Whether or not to show user location
  */
  static propTypes = {
    category: PropType.string.isRequired,
    date: PropType.string.isRequired,
    description: PropType.string.isRequired,
    points: PropType.number.isRequired,
    status: PropType.string.isRequired,
    showUserDetails: PropType.bool,
    showLocation: PropType.bool,
    owner: PropType.string,
    page: PropType.string,
    handleClick: PropType.func,
    id: PropType.string.isRequired,
  };

  static defaultProps = {
    showUserDetails: false,
    showLocation: false,
    owner: null,
    page: '',
    handleClick: () => {},
  };
  statuses = ['pending', 'rejected', 'approved', 'in review'];

  /**
   * @summary Renders the status indicator on the ActivityCard
   */
  renderStatus = () => {
    const status = this.props.status.toLowerCase();

    if (this.statuses.indexOf(status.toLowerCase()) < 0) {
      return '';
    }

    if (status === 'in review') {
      return (
        <span className='activity__status activity__status--inReview'>In review</span>
      );
    }

    let statusText = status.charAt(0).toUpperCase();
    statusText += status.slice(1);
    return (
      <span className={`activity__status activity__status--${status}`}>{statusText}</span>
    );
  }

  renderUserDetails() {
    if (!this.props.showUserDetails) {
      return '';
    }
    return (
      <div className='activity__left'>
        <img className='activity__userPicture' src='http://placehold.it/55x55' alt='John Doe' />
        <span className='activity__owner'>{this.props.owner}</span>
      </div>
    );
  }

  renderVerifyButtons() {
    if (this.props.owner) {
      return '';
    }
    return (
      <div className='verifyButtons'>
        <Button
          name='approve'
          value='Approve'
          className='activity-button approved'
          onClick={() => this.props.handleClick(true, this.props.id)}
        />
        <Button
          name='reject'
          value='Reject'
          className='activity-button rejected'
          onClick={() => this.props.handleClick(false, this.props.id)}
        />
      </div>
    );
  }

  render() {
    const {
      category,
      date,
      description,
      showLocation,
      points,
      page,
    } = this.props;
    return (
      <div className='activity'>
        {this.renderUserDetails()}
        <div className='activity__right'>
          <div className='activity__header'>
            <span className='activity__category'>{category}</span>
            <span className='activity__date'>{date}</span>
          </div>
          <div className='activity__content'>
            <TruncateDescription description={description} />
          </div>
          <div className='activity__footer'>
            {
              showLocation ?
                <span className='redemption__location'>
                  <Globe />
                  Nairobi
                </span>
                :
                <span className='activity__points'>
                  <span className='activity__pointsCount'>{points}</span>
                  Points
                </span>
            }
            {
              page === '/u/verify-activities' ?
                this.renderVerifyButtons() : this.renderStatus()
            }
          </div>
        </div>
      </div>
    );
  }
}
export default ActivityCard;
