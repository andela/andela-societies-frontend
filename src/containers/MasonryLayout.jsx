import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../common/ErrorMessage';

/**
 * @name MasonryLayout
 * @summary Renders items in a masonry layout fashion
 * @extends React.component
 */
class MasonryLayout extends Component {
  /**
    * @name propTypes
    * @type {PropType}
    * @param {Object} propTypes - React PropTypes
    * @property {Object} items - React nodes or DOM elements to render
    * @property {Boolean} showUserDetails - Whether or not to show activity owner details
    * @property {Boolean} showLocation - Whether or not to show activity owner location
  */
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  /**
   * React component lifecycle method getDerivedStateFromProps
   * @param {Object} nextProps - props
  */
  static getDerivedStateFromProps(nextProps) {
    return {
      items: nextProps.items,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
    };
  }

  /**
   * @name createItems
   * @memberof MasonryLayout
   * @param {Array} items Array of activities to be rendered in the Masonry layout
   * @returns React Elements containing ActivityCard for each activity
   */
  createItems = items => (
    items.map(item => (
      <div className='masonry-layout__panel' key={item.props.id}>
        {item}
      </div>
    ))
  );

  /**
   * Render MasonryLayout Component
   * @return {object} JSX for MasonryLayout component
   */
  render() {
    const { items } = this.state;
    return (
      <div className='masonry'>
        {
          items.length ?
            <div className='masonry-layout'>
              {
                this.createItems(items)
              }
            </div>
            :
            <ErrorMessage message='There are no activities at the moment' />
        }
      </div>
    );
  }
}

export default MasonryLayout;
