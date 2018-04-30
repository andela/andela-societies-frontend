import React, { Component } from 'react';
import PropType from 'prop-types';

import Dropdown from '../../common/Dropdown';

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
        <Dropdown />
      </header>
    );
  }
}

export default PageHeader;
