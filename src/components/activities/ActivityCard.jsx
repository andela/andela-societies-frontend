import React, { Component } from 'react';
import PropType from 'prop-types';

/**
 * @summary Renders an activity card
 * @class ActivityCard
 * @extends React.Component
*/
class ActivityCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.statuses = ['pending', 'expired', 'approved', 'default'];
  }

  /**
   * @summary Renders the status indicator on the ActivityCard
   */
  renderStatus() {
    const status = this.props.status.toLowerCase();

    if (this.statuses.indexOf(status.toLowerCase()) < 0) {
      return '';
    }

    if (status === 'default') {
      return (
        <span className={`activity__status activity__status--${status}`}>In review</span>
      );
    }

    let statusText = status.charAt(0).toUpperCase();
    statusText += status.slice(1);
    return (
      <span className={`activity__status activity__status--${status}`}>{ statusText }</span>
    );
  }

  render() {
    return (
      <div className="activity">
        <div className="activity__header">
          <span className="activity__category">{this.props.category}</span>
          <span className="activity__date">{this.props.date}</span>
        </div>
        <div className="activity__content">
          <h1 className="activity__description">{this.props.description}</h1>
        </div>
        <div className="activity__footer">
          <span className="activity__points">
            <span className="activity__pointsCount">{this.props.points}</span>
            Points
          </span>
          {this.renderStatus()}
        </div>
      </div>
    );
  }
}

/**
  * @name propTypes
  * @type {PropType}
  * @param {Object} propTypes - React PropTypes
  * @property {String} category - The type of an Activity
  * @property {String} date - The date on which a fellow participated in an activity
  * @property {String} description - The description of the activity
  * @property {String} points - The points the activity is worth
  * @property {String} status - The current status of the activity
  */
ActivityCard.propTypes = {
  category: PropType.string.isRequired,
  date: PropType.string.isRequired,
  description: PropType.string.isRequired,
  points: PropType.string.isRequired,
  status: PropType.string.isRequired,
};

export default ActivityCard;
