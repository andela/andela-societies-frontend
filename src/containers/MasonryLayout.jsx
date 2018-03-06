import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

/**
 * Renders items in a masonry layout
 *
 * @extends React.component
 */
export class MasonryLayout extends Component {
  /**
   * React's lifecycle method componentWillMount
   */
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

  /**
   * React's lifecycle method componentDidMount
   */
  componentDidMount() {
    this.props.items.forEach((item, index) => {
      const div = document.createElement('div');
      div.style.marginBottom = `${this.props.gap}px`;
      render(
        item,
        div,
      );
      this[`column${index % this.props.columnCount}`].append(div);
    });
  }

  /**
   * Computes width of a column
   *
   * @return {string} css value to set as width of a column
   */
  getColumnWidth() {
    return `calc(${100 / this.props.columnCount}% - ${this.props.gap}px)`;
  }

  /**
   * Computes width of a column wrapper
   *
   * @return {string} css value to set as width of a column wrapper
   */
  getColumnWrapperWidth() {
    return `calc(100% + ${this.props.gap}px)`;
  }

  /**
   * Renders a column
   *
   * @return {jsx}
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

  /**
   * Renders the component
   *
   * @return {jsx}
   */
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

MasonryLayout.defaultProps = {
  columnCount: 4,
  gap: 20,
};

MasonryLayout.propTypes = {
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
  columnCount: PropTypes.number,
  gap: PropTypes.number,
};

export default MasonryLayout;
