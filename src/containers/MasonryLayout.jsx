import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  /**
   * React component lifecycle method componentWillMount
   * @memberof MasonryLayout
   */
  componentWillMount() {
    this.setState({ items: this.props.items });
  }

  /**
   * React component lifecycle method componentWillReceiveProps
   * @memberof MasonryLayout
   * @param {Object} nextProps - props
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ items: nextProps.items });
  }

  /**
   * @name createItems
   * @memberof MasonryLayout
   * @param {Array} items Array of activities to be rendered in the Masonry layout
   * @returns React Elements containing ActivityCard for each activity
   */
  createItems = items => (
    <div>
      {
        items.map(item => (
          <div className='masonry-layout__panel' key={item.props.id}>
            {item}
          </div>
        ))
      }
    </div>
  )

  /**
   * Render MasonryLayout Component
   * @return {object} JSX for MasonryLayout component
   */
  render() {
    return (
      <div className='masonry'>
        <div className='masonry-layout'>
          {
            this.createItems(this.state.items)
          }
        </div>
      </div>
    );
  }
}

export default MasonryLayout;
