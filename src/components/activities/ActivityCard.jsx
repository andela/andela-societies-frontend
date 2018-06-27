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
  * @property {String} id - id of the activity
  * @property {Boolean} showUserDetails - Whether or not to show user details
  * @property {Boolean} showLocation - Whether or not to show user location
  * @property {number} wordCount - number of words for the description
  * @property {String} page - The page accessed by user
  * @property {func} handleClick - handleClick event
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
    handleDeselectActivity: PropType.func,
    wordCount: PropType.number,
  };

  static defaultProps = {
    showUserDetails: false,
    showLocation: false,
    owner: null,
    page: '',
    handleClick: () => {},
    handleDeselectActivity: () => {},
    wordCount: 50,
  };

  /**
   * @name getDerivedStateFromProps
   * @summary Lifecylce methods that updates state of isActivityChecked if activity is checked or not
   * @param {Object} nextProps
   * @returns {Object} state
   */
  static getDerivedStateFromProps(nextProps) {
    const { selectedActivities } = nextProps;
    return {
      isActivityChecked: selectedActivities ? selectedActivities.includes(nextProps.id) : false,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isActivityChecked: false,
    };
  }
  statuses = ['pending', 'rejected', 'approved', 'in review'];

  /**
   * @name handleActivityChecked
   * @summary toggles state when checkbox is clicked
   * @returns {void}
   */
  handleActivityChecked = () => {
    const { id, handleDeselectActivity } = this.props;
    const { isActivityChecked } = this.state;
    this.setState({ isActivityChecked: !isActivityChecked }, () => {
      if (!this.state.isActivityChecked) handleDeselectActivity(id);
    });
  }

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

  renderCheckbox = () => (
    (
      <input
        type='checkbox'
        name='checkbox'
        value={this.props.id}
        className='activity__checkbox'
        checked={this.state.isActivityChecked}
        onChange={this.handleActivityChecked}
      />
    )
  );

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
          handleClick={() => this.props.handleClick(true, this.props.id)}
        />
        <Button
          name='reject'
          value='Reject'
          className='activity-button rejected'
          handleClick={() => this.props.handleClick(false, this.props.id)}
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
      wordCount,
    } = this.props;
    return (
      <div className='activity'>
        {this.renderUserDetails()}
        <div className='activity__right'>
          <div className='activity__header'>
            <div>
              <span className='activity__category'>{category}</span>
              <span className='activity__date'>{date}</span>
            </div>
            { page === '/u/verify-activities' && this.renderCheckbox()}
          </div>
          <div className='activity__content'>
            <TruncateDescription description={description} wordCount={wordCount} />
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
