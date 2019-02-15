import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableComponent extends Component {
  /**
   * @name defaultProps
   * @type {PropType}
   * @property {array} tableHeadings
   *
   */
  static defaultProps = {
    tableHeadings: [],
  };

  /**
   * @name propTypes
   * @type {PropType}
   * @property {node} children
   * @property {array} tableHeadings
   *
   */
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    tableHeadings: PropTypes.arrayOf(PropTypes.string),
  };

  renderTableHead = tableHeadings => (
    <tr>
      {tableHeadings.map(tableHead => (
        <th scope='col' key={tableHead}>
          {tableHead}
        </th>
      ))}
    </tr>
  );

  render() {
    const { children, tableHeadings } = this.props;
    return (
      <table className='table'>
        <thead>{this.renderTableHead(tableHeadings)}</thead>
        <tbody>{children}</tbody>
      </table>
    );
  }
}

export default TableComponent;
