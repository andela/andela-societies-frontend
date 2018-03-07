import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

/**
 * @name MasonryLayout
 * @summary Renders items in a masonry layout fashion
 * @extends React.component
 */
class MasonryLayout extends Component {
  componentWillMount() {
    const columnWidth = this.getColumnWidth();
    this.columns = Array(this.props.columnCount).fill({}).map((value, key) => (
      <div
        className="masonry__column"
        style={{
          width: columnWidth,
          marginRight: `${this.props.gap}px`,
        }}
        ref={(el) => { this[`column${key}`] = el; }}
        key={Math.random()}
      />
    ));
  }

  componentDidMount() {
    this.props.items.forEach((item, index) => {
      // create a DOM element (wrapper) we can render to.
      // this will wrap the item
      const div = document.createElement('div');
      div.style.marginBottom = `${this.props.gap}px`;
      // render to the element
      render(
        item,
        div,
      );
      // append the item to a column
      this[`column${index % this.props.columnCount}`].append(div);
    });
  }

  /**
   * @name getColumnWidth
   * @summary Computes width of a column
   * @return {string} css value to set as width of a column
   */
  getColumnWidth() {
    return `calc(${100 / this.props.columnCount}% - ${this.props.gap}px)`;
  }

  /**
   * @name getColumnWrapperWidth
   * @summary Computes width of a column wrapper
   * @return {string} css value to set as width of a column wrapper
   */
  getColumnWrapperWidth() {
    return `calc(100% + ${this.props.gap}px)`;
  }

  /**
   * @name renderColumns
   * @summary Renders columns of the masonry layout
   * @return {jsx} React node that wraps columns of the masonry layout
   */
  renderColumns() {
    return (
      <div
        className="masonry__columnWrapper"
        style={{
          width: this.getColumnWrapperWidth(),
        }}
      >
        {this.columns}
      </div>
    );
  }

  render() {
    return (
      <div className="masonry" ref={(el) => { this.masonry = el; }}>
        <div className="masonry__row">
          {this.renderColumns()}
        </div>
      </div>
    );
  }
}

/**
 * @name defaultProps
 * @summary The default values of props
 */
MasonryLayout.defaultProps = {
  columnCount: 4,
  gap: 20,
};

/**
    * @name propTypes
    * @type {PropType}
    * @param {Object} propTypes - React PropTypes
    * @property {Object} items - React nodes or DOM elements to render
    * @property {Number} columnCount - The number of columns of the masonry layout
    * @property {Number} gap - The distance (in pixels) between columns and items
  */
MasonryLayout.propTypes = {
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
  columnCount: PropTypes.number,
  gap: PropTypes.number,
};

export default MasonryLayout;
