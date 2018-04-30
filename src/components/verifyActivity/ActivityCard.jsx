import React, { Component } from 'react';
import PropType from 'prop-types';
import RedeemButtons from '../buttons/RedeemButtons';

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
    category: PropType.string.isRequired,
    date: PropType.string.isRequired,
    description: PropType.string.isRequired,
    points: PropType.string.isRequired,
    showUserDetails: PropType.bool,
  };
  static defaultProps = {
    showUserDetails: false,
  };
  renderUserDetails() {
    if (!this.props.showUserDetails) {
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
    return (
      <div className='activity'>
        {this.renderUserDetails()}
        <div className='activity__right'>
          <div className='activity__header'>
            <span className='activity__category'>{this.props.category}</span>
            <span className='activity__date'>{this.props.date}</span>
          </div>
          <div className='activity__content'>
            <h1 className='activity__description'>{this.props.description}</h1>
          </div>
          <div className='activity__footer'>
            <span className='activity__points'>
              <span className='activity__pointsCount'>{this.props.points}</span>
              Points
            </span>
            <div className='showButtons'>
              <RedeemButtons />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ActivityCard;
