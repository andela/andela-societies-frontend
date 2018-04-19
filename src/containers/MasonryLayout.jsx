import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ActivityCard from '../components/activities/ActivityCard';
import dateFormatter from '../helpers/dateFormatter';

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
    * @property {Object} items - Array of data items to be rendered in the layout
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
          <div className='masonry-layout__panel' key={item.id}>
            <ActivityCard
              category={item.category}
              date={dateFormatter(item.date)}
              description={item.activity}
              points={item.points}
              status={item.status}
            />
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
