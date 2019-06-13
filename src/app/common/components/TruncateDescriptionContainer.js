import React, { Component } from 'react';

// third party libraries
import PropType from 'prop-types';

import ButtonComponent from './ButtonComponent';

/**
 * @summary Renders description
 * @class TruncateDescriptionContainer
 * @extends React.Component
 */
class TruncateDescriptionContainer extends Component {
  /**
   * @name propTypes
   * @type {PropType}
   * @param {String} description - The description to shorten
   */
  static propTypes = {
    description: PropType.string,
    wordCount: PropType.number.isRequired,
  }

  static defaultProps = {
    description: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      isItALongDesc: true,
    };
  }

  /**
   * @name truncateDescription
   * @summary Shortens the description passed as a param
   * @param {String} desc - description to be shortened
   * @param {Boolean} isItALongDesc - boolean value indicate if description is long
   * @return {String} desc
   */
  truncateDescription = (desc, isItALongDesc) => {
    const { wordCount } = this.props;
    if (desc && desc.trim().length > wordCount && isItALongDesc) {
      const shortDesc = desc.slice(0, wordCount + 1).concat('...');
      return shortDesc;
    }
    return desc;
  }

  /**
   * @name handleViewMoreLessClick
   * @summary Handles showing of more or less text
   * @return {void}
   */
  handleViewMoreLessClick = () => {
    const { isItALongDesc } = this.state;
    this.setState({ isItALongDesc: !isItALongDesc });
  }

  render() {
    const { isItALongDesc } = this.state;
    const { description, wordCount } = this.props;
    let buttonHtml = null;
    if (description && description.trim().length > wordCount) {
      buttonHtml = (
        <ButtonComponent className='button--see-more-or-less' onClick={this.handleViewMoreLessClick}>
          {isItALongDesc ? 'see more' : 'see less'}
        </ButtonComponent>
      );
    }
    return (
      <p>
        {this.truncateDescription(description, isItALongDesc)}
        {buttonHtml}
      </p>
    );
  }
}

export default TruncateDescriptionContainer;
