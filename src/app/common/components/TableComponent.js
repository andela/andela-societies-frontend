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
    tableClassName: '',
  };

  /**
   * @name propTypes
   * @type {PropType}
   * @property {node} children
   * @property {array} tableHeadings
   *
   */
  static propTypes = {
    tableClassName: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    tableHeadings: PropTypes.arrayOf(PropTypes.string),
  };

  renderTableHead = tableHeadings => (
    <tr className='table__row--head'>
      {tableHeadings.map(tableHead => (
        <th scope='col' key={tableHead} className='table__head'>
          {tableHead}
        </th>
      ))}
    </tr>
  );

  render() {
    const { children, tableHeadings, tableClassName } = this.props;
    return (
      <table className={`table ${tableClassName}`}>
        <thead>
          {this.renderTableHead(tableHeadings)}
        </thead>
        <tbody>{children}</tbody>
      </table>
    );
  }
}

export default TableComponent;
