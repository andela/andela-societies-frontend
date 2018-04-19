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
    * @property {Object} items - React nodes or DOM elements to render
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

  componentWillMount() {
    this.setState({ items: this.props.items });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ items: nextProps.items });
  }

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
