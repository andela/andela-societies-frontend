import React, { Component, Fragment } from 'react';
import PropType from 'prop-types';

import TruncateDescription from '../TruncateDescription';
import Globe from '../svgIcons/activityIcons/Globe';
import Button from '../../common/Button';

import pointsToDollarConverter from '../../helpers/pointsToDollarsConverter';
import capitalizeString from '../../helpers/stringFormatter';

// constants
import clickActions from '../../constants/clickAction';
import { STATUSES } from '../../constants/statuses';

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
  * @property {String} center - Where the redeemed points go to
  * @property {String} date - The date on which a fellow participated in an activity
  * @property {String} description - The description of the activity
  * @property {Number} points - The points the activity is worth
  * @property {String} status - The current status of the activity
  * @property {String} id - id of the activity
  * @property {Boolean} showUserDetails - Whether or not to show user details
  * @property {Boolean} showLocation - Whether or not to show user location
  * @property {number} wordCount - number of words for the description
  * @property {String} page - The page accessed by user
  * @property {func} handleClick - handleClick event
  * @property {Boolean} showButtons - Whether or not to show buttons
  * @property {Boolean} showPoints - Whether or not to show user points
  * @property {Boolean} showAmount - Whether or not to show user amount
  * @property {Boolean} showCheckBox - To show the check box for the activity card
  */
  static propTypes = {
    category: PropType.string,
    center: PropType.string,
    date: PropType.string,
    description: PropType.string,
    points: PropType.number,
    status: PropType.string.isRequired,
    showUserDetails: PropType.bool,
    showLocation: PropType.bool,
    showButtons: PropType.bool,
    showMoreInfoButton: PropType.bool,
    showCompleteButton: PropType.bool,
    showPoints: PropType.bool,
    showAmount: PropType.bool,
    userCanEdit: PropType.bool,
    owner: PropType.string,
    page: PropType.string,
    handleClick: PropType.func,
    id: PropType.string.isRequired,
    handleDeselectActivity: PropType.func,
    showCheckBox: PropType.bool,
    wordCount: PropType.number,
  };

  static defaultProps = {
    category: '',
    center: '',
    date: '',
    points: 0,
    description: '',
    showUserDetails: false,
    showLocation: false,
    showButtons: false,
    showMoreInfoButton: false,
    showCompleteButton: false,
    showCheckBox: false,
    showPoints: false,
    showAmount: false,
    userCanEdit: false,
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
      isActivityChecked: selectedActivities
        ? selectedActivities.includes(nextProps.id)
        : false,
    };
  }

  constructor(props) {
    super(props);
    const statuses = Object.keys(STATUSES).map(key => (STATUSES[key]));
    this.state = {
      isActivityChecked: false,
      statuses,
      statusNeedingButtons: [STATUSES[1], STATUSES[2], STATUSES[6]],
    };
  }

  /**
   * @name handleActivityChecked
   * @summary toggles state when checkbox is clicked
   * @returns {void}
   */
  handleActivityChecked = () => {
    const { id, handleDeselectActivity } = this.props;
    const { isActivityChecked } = this.state;
    this.setState({
      isActivityChecked: !isActivityChecked,
    }, () => {
      if (!this.state.isActivityChecked) {
        handleDeselectActivity(id);
      }
    });
  }

  /**
   * @name handleClickableAreaClick
   * @summary responds to clicking on clickable area of the activity card
   */
  handleClickableAreaClick = () => {
    const {
      status, userCanEdit, id, handleClick,
    } = this.props;
    const { EDIT } = clickActions;
    if ((status === STATUSES[2] || status === STATUSES[1]) && userCanEdit) {
      handleClick(EDIT, id);
    }
  }

  /**
   * @summary Renders the status indicator on the ActivityCard
   */
  renderStatus = () => {
    const status = this.props.status.toLowerCase();
    if (this.state.statuses.indexOf(status.toLowerCase()) < 0) {
      return '';
    }

    if (status === 'in review') {
      return (
        <span className='activity__status activity__status--inReview'>In review</span>
      );
    }

    const statusText = capitalizeString(status);
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
        <img
          className='activity__userPicture'
          src='https://placehold.it/55x55'
          alt='John Doe'
        />
        <span className='activity__owner'>{this.props.owner}</span>
      </div>
    );
  }


  renderCheckbox = () => {
    let activityCheckBox = null;
    if (this.props.showCheckBox) {
      activityCheckBox = (<input
        type='checkbox'
        name='checkbox'
        value={this.props.id}
        className='activity__checkbox'
        checked={this.state.isActivityChecked}
        onChange={this.handleActivityChecked}
      />);
    }
    return activityCheckBox;
  }

  renderVerifyButtons() {
    const {
      showMoreInfoButton, id, handleClick, showCompleteButton,
    } = this.props;
    const {
      APPROVE, MORE_INFO, REJECT, COMPLETE,
    } = clickActions;
    let moreInfoButtonHtml = '';
    let showCompleteButtonHtml = '';
    if (showMoreInfoButton) {
      moreInfoButtonHtml = (<Button
        name='moreInfo'
        value='Comment'
        className='verifyButtons__button verifyButtons__button--moreInfo'
        onClick={() => handleClick(MORE_INFO, id)}
      />);
    }
    if (showCompleteButton) {
      showCompleteButtonHtml = (<Button
        name='complete'
        value='Complete'
        className='verifyButtons__button verifyButtons__button--complete'
        onClick={() => handleClick(COMPLETE, id)}
      />);
    }
    return (
      <Fragment>
        {showCompleteButton
          ? showCompleteButtonHtml
          :
          <div className='verifyButtons'>
            <Button
              name='approve'
              value='Approve'
              className='verifyButtons__button verifyButtons__button--approve'
              onClick={() => handleClick(APPROVE, id)}
            />
            <Button
              name='reject'
              value='Reject'
              className='verifyButtons__button verifyButtons__button--reject'
              onClick={() => handleClick(REJECT, id)}
            /> {moreInfoButtonHtml}
          </div>
        }
      </Fragment>
    );
  }

  renderButtonsOrStatus() {
    const { statusNeedingButtons } = this.state;
    const { showButtons, status } = this.props;
    return statusNeedingButtons.includes(status.toLowerCase()) && showButtons
      ? this.renderVerifyButtons()
      : this.renderStatus();
  }

  renderLocationOrPoints() {
    const { center, points, showLocation } = this.props;
    return (showLocation ?
      <span className='redemption__location'>
        <Globe /> {center}
      </span>
      :
      <span className='activity__points'>
        <span className='activity__pointsCount'>{points}</span>
        Points
      </span>);
  }

  render() {
    const {
      category,
      date,
      description,
      points,
      page,
      wordCount,
      showPoints,
      showAmount,
      userCanEdit,
      status,
    } = this.props;

    const locationOrPointsHtml = this.renderLocationOrPoints();
    const buttonsOrStatusHtml = this.renderButtonsOrStatus();

    const clickableAreaClassName = `activity__right ${
      (status === STATUSES[2] || status === STATUSES[1]) && userCanEdit
        ? 'activity__right--editable'
        : ''}`;
    const descriptionHtml = description ?
      <TruncateDescription description={description} wordCount={wordCount} />
      : '';

    return (
      <div className='activity'>
        {this.renderUserDetails()}
        {/* eslint-disable */}
        <div className={clickableAreaClassName} onClick={this.handleClickableAreaClick}>
          {/* eslint-enable */}
          <div className='activity__header'>
            <div>
              <span className='activity__category'>{category}</span>
              {showPoints &&
                <span className='redemption__points'>{points}
                Points
                </span>
              }
              <span className='activity__date'>{date}</span>
            </div>
            {showAmount &&
              <span className='redemption__amount'>
                {`USD ${pointsToDollarConverter(points)}`
                }
              </span>
            }
            {page === '/u/verify-activities' && this.renderCheckbox()}
          </div>
          <div className='activity__content'>
            { descriptionHtml }
          </div>
        </div>
        <div className='activity__footer'>
          {locationOrPointsHtml
          }
          {buttonsOrStatusHtml
          }
        </div>
      </div>
    );
  }
}
export default ActivityCard;
