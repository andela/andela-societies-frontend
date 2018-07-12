import React, { Component } from 'react';
import PropType from 'prop-types';

// components
import Button from '../../common/Button';
import Tabs from '../../components/header/Tabs';

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
   * @property {Function} filterRedemptions - Returns a list of redemptions depending on selected tab
   * @property {Function} changeFilterHandler - filters redemptions by tab
   * @property {Function} selectAllClick - prop to toggle state of selectAllChecked
   */
  static propTypes = {
    title: PropType.string.isRequired,
    selectedSociety: PropType.string,
    hideFilter: PropType.bool,
    showSelectAllApproveBtn: PropType.bool,
    tabs: PropType.arrayOf(PropType.string),
    statuses: PropType.arrayOf(PropType.string),
    showTabs: PropType.bool,
    handleChangeTab: PropType.func,
    filterRedemptions: PropType.func,
    changeFilterHandler: PropType.func,
    filterActivities: PropType.func,
    handleSelectAllClick: PropType.func,
    handleApproveAllClick: PropType.func,
  };

  /**
   * @name defaultProps
   * @type {PropType}
   * @property {Function} filterActivities - function to filter activities on status
   * @property {Boolean} hideFilter - hide the filter activities dropdown
  */
  static defaultProps = {
    selectedSociety: 'istelle',
    filterActivities: null,
    hideFilter: false,
    showSelectAllApproveBtn: false,
    showTabs: false,
    tabs: [],
    statuses: ['All', 'In review', 'Pending', 'Rejected', 'Approved'],
    handleSelectAllClick: () => { },
    handleApproveAllClick: () => { },
    changeFilterHandler: () => { },
    handleChangeTab: () => { },
    filterRedemptions: () => { },
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
  getDropdownClassName = (isActive, classList) => (
    `${classList.join(' ')} ${isActive ? 'filterOptions__dropdown--active' : ''}`
  );

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

  renderSelectAllApprovebtn = () => (
    <div className='pageHeader__selectApprove'>
      <input
        type='checkbox'
        name='checkbox'
        className='pageHeader__selectApprove__checkbox'
        onChange={this.props.handleSelectAllClick}
      /> Select all
      <Button
        name='approveAll'
        value='Approve Selected'
        className='pageHeader__selectApprove__button'
        onClick={this.props.handleApproveAllClick}
      />
    </div>
  )

  renderFilterStatus = () => {
    const {
      selectedStatus,
      showFilterOptionsDropdown,
      activeClass,
    } = this.state;
    const { statuses } = this.props;
    return (
      <div className='filterOptions'>
        <button
          className='filterOptions__button'
          onClick={this.createFilterOptionsButtonClickHandler()}
        >
          {capitalizeString(selectedStatus)}
        </button>
        <div className={this.getDropdownClassName(
          showFilterOptionsDropdown,
          ['filterOptions__dropdown'],
        )}
        >
          {
            statuses.map(status => (
              <div
                key={status}
                onMouseDown={(e) => {
                  if (this.props.changeFilterHandler()) {
                    this.props.filterRedemptions(e, status);
                  } else {
                    this.props.filterActivities(e.currentTarget.textContent);
                  }
                }}
                className={`filterOptions__option ${selectedStatus === status ? activeClass : ''}`}
                role='button'
                tabIndex='0'
              >
                {status && capitalizeString(status)}
              </div>
            ))
          }
        </div>
      </div>
    );
  }

  render() {
    const {
      tabs,
      title,
      selectedSociety,
      showTabs,
    } = this.props;
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
        { this.props.showSelectAllApproveBtn && this.renderSelectAllApprovebtn()}
        {
          !this.props.hideFilter ?
            this.renderFilterStatus()
            : null
        }
      </header>
    );
  }
}

export default PageHeader;
