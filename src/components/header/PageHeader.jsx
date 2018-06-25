import React, { Component } from 'react';
import PropType from 'prop-types';

// components
import Button from '../../common/Button';

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
    * @property {func} selectAllClick - prop to toggle state of selectAllChecked
  */
  static propTypes = {
    title: PropType.string.isRequired,
    filterActivities: PropType.func,
    hideFilter: PropType.bool,
    showSelectAllApproveBtn: PropType.bool,
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
    filterActivities: null,
    hideFilter: false,
    showSelectAllApproveBtn: false,
    handleSelectAllClick: () => {},
    handleApproveAllClick: () => {},
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
      statuses: ['All', 'In review', 'Pending', 'Rejected', 'Approved'],
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

  render() {
    const {
      selectedStatus,
      statuses,
      showFilterOptionsDropdown,
      activeClass,
    } = this.state;
    return (
      <header className='pageHeader'>
        <h1 className='pageTitle'>{this.props.title}</h1>
        {this.props.showSelectAllApproveBtn && this.renderSelectAllApprovebtn()}
        {
          !this.props.hideFilter ?
            <div className='filterOptions'>
              <button
                className='filterOptions__button'
                onClick={this.createFilterOptionsButtonClickHandler()}
              >
                {selectedStatus}
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
                      onMouseDown={e => this.props.filterActivities(e.currentTarget.textContent)}
                      className={`filterOptions__option ${selectedStatus === status ? activeClass : ''}`}
                      role='button'
                      tabIndex='0'
                    >
                      {status}
                    </div>
                  ))
                }
              </div>
            </div>
            : null
        }
      </header>
    );
  }
}

export default PageHeader;
