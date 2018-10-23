import React, { Component } from 'react';
import PropType from 'prop-types';

// components
import Button from '../../common/Button';
import Tabs from '../../components/header/Tabs';

// constants
import { STATUSES } from '../../constants/statuses';

// helpers
import capitalizeString from '../../helpers/stringFormatter';

/**
 * @name PageHeader
 * @summary Renders a page's Header
 * @extends React.Component
 */
class PageHeader extends Component {
  /**
   * @name propTypes
   * @type {PropType}
   * @param {Object} propTypes - React PropTypes
   * @property {String} title - The title of the page
   * @property {String} selectedSociety - currently selected society
   * @property {Object} tabs - Array of tab titles
   * @property {Object} statuses - Array of status types
   * @property {Boolean} showTabs - Whether or not to show tabs
   * @property {Function} handleChangeTab - called when a tab is clicked
   * @property {Function} selectAllClick - prop to toggle state of selectAllChecked
   */
  static propTypes = {
    title: PropType.string,
    selectedSociety: PropType.string,
    hideFilter: PropType.bool,
    showSelectAllApproveBtn: PropType.bool,
    tabs: PropType.arrayOf(PropType.string),
    showTabs: PropType.bool,
    handleChangeTab: PropType.func,
    filterActivities: PropType.func,
    handleSelectAllClick: PropType.func,
    handleApproveAllClick: PropType.func,
    disabled: PropType.bool,
  };

  /**
   * @name defaultProps
   * @type {PropType}
   * @property {Function} filterActivities - function to filter activities on status
   * @property {Boolean} hideFilter - hide the filter activities dropdown
   */
  static defaultProps = {
    title: 'Activities',
    selectedSociety: 'istelle',
    filterActivities: null,
    hideFilter: false,
    showSelectAllApproveBtn: false,
    showTabs: false,
    tabs: [],
    handleSelectAllClick: () => {},
    handleApproveAllClick: () => {},
    handleChangeTab: () => {},
    disabled: false,
  };

  /**
   * React component lifecycle method getDerivedStateFromProps
   * @param {Object} nextProps - props
   */
  static getDerivedStateFromProps(nextProps) {
    return {
      selectedStatus: nextProps.selectedStatus,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedStatus: 'All',
      showFilterOptionsDropdown: false,
      activeClass: 'filterOptions__option--active',
    };
  }

  /**
   * @name getDropdownClassName
   * @summary Returns className from dropdown
   * @param {boolean} isActive Whether or not to show the dropdown
   * @param {array[string]} classList Other values for the className
   * @returns {String}
   */
  getDropdownClassName = (isActive, classList) =>
    `${classList.join(' ')} ${
      isActive ? 'filterOptions__dropdown--active' : ''
    }`;

  /**
   * @name createFilterOptionsButtonClickHandler
   * @summary Creates event handler for when filter button is clicked
   * @returns {function} Toggles filter options dropdown
   */
  createFilterOptionsButtonClickHandler = () => () => {
    this.setState(prevState => ({
      showFilterOptionsDropdown: !prevState.showFilterOptionsDropdown,
    }));
  };

  renderSelectAllApprovebtn = () => {
    const {
      disabled,
      handleApproveAllClick,
      handleSelectAllClick,
    } = this.props;
    return (
      <div className='pageHeader__selectAction'>
        <input
          type='checkbox'
          name='checkbox'
          className='pageHeader__selectApprove__checkbox'
          onChange={handleSelectAllClick}
        />
        Select all
        <Button
          name='approveAll'
          value='Approve Selected'
          className={
            disabled
              ? 'pageHeader__disable__button'
              : 'pageHeader__selectAction__button pageHeader__selectApprove__button '
          }
          onClick={handleApproveAllClick}
          disabled={disabled}
        />
      </div>
    );
  };

  renderFilterStatus = () => {
    const {
      selectedStatus,
      showFilterOptionsDropdown,
      activeClass,
    } = this.state;
    return (
      <div className='filterOptions'>
        {
          this.props.title === 'Activities' ?
            <button
              className='filterOptions__button'
              onClick={this.createFilterOptionsButtonClickHandler()}
              onBlur={this.createFilterOptionsButtonClickHandler()}
            >
              {capitalizeString(selectedStatus)}
            </button>
            : ''
        }
        <div
          className={this.getDropdownClassName(showFilterOptionsDropdown, [
            'filterOptions__dropdown',
          ])}
        >
          {Object.keys(STATUSES).map(status => (
            <div
              key={status}
              onMouseDown={(e) => {
                this.props.filterActivities(e.currentTarget.textContent);
              }}
              className={`filterOptions__option ${
                selectedStatus === STATUSES[status] ? activeClass : ''
              }`}
              role='button'
              tabIndex='0'
              onClick={this.createFilterOptionsButtonClickHandler()}
              onKeyDown={() => {}}
            >
              {STATUSES[status] && capitalizeString(STATUSES[status])}
            </div>
          ))}
        </div>
      </div>
    );
  };

  render() {
    const {
      tabs,
      title,
      selectedSociety,
      showTabs,
      showSelectAllApproveBtn,
      hideFilter,
    } = this.props;
    let showSelectAllApproveBtnHtml;
    let filterStatusHtml;
    if (showSelectAllApproveBtn) {
      showSelectAllApproveBtnHtml = this.renderSelectAllApprovebtn();
    }
    if (!hideFilter) {
      filterStatusHtml = this.renderFilterStatus();
    }
    return (
      <header className='pageHeader'>
        {
          showTabs ?
            <Tabs
              tabTitles={tabs}
              handleChangeTab={this.props.handleChangeTab}
              selectedTab={selectedSociety}
            />
            : <h1 className='pageTitle'>{title}</h1>
        }
        {showSelectAllApproveBtnHtml}
        {filterStatusHtml}
      </header>
    );
  }
}

export default PageHeader;
