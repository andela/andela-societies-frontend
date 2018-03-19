import React, { Component } from 'react';
import PropType from 'prop-types';

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
  */
  static propTypes = {
    title: PropType.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showFilterOptionsDropdown: false,
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

  render() {
    return (
      <header className='pageHeader'>
        <h1 className='pageTitle'>{this.props.title}</h1>
        <div className='filterOptions'>
          <button
            className='filterOptions__button'
            onClick={this.createFilterOptionsButtonClickHandler()}
          >
            Pending
          </button>
          <div className={this.getDropdownClassName(
            this.state.showFilterOptionsDropdown,
            ['filterOptions__dropdown'],
          )}
          >
            <div className='filterOptions__option'>
              All
            </div>
            <div className='filterOptions__option'>
              Approved
            </div>
            <div className='filterOptions__option'>
              Expired
            </div>
            <div className='filterOptions__option'>
              In review
            </div>
            <div className='filterOptions__option filterOptions__option--active'>
              Pending
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default PageHeader;
