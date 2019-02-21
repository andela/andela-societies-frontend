import React from 'react';
import { shallow } from 'enzyme';
import TableComponent from '../TableComponent';

describe('<TableComponent />', () => {
  const setUpWrapper = ({
    tableHeadings = [],
    children = [],
  } = {}) => {
    const props = {
      children,
      tableHeadings,
    };
    const shallowWrapper = shallow(<TableComponent {...props} />);
    return {
      shallowWrapper,
    };
  };

  it('should have two table heads columns', () => {
    const { shallowWrapper } = setUpWrapper({ tableHeadings: ['Name', 'Age']});
    expect(shallowWrapper.find('.table__head')).toHaveLength(2);
  });

  it('should table rows in the table body section', () => {
    const { shallowWrapper } = setUpWrapper({
      tableHeadings: ['Name', 'Age'],
      children: [
        <tr key={1}><td>John</td><td>10</td></tr>,
        <tr key={2}><td>Doe</td><td>20</td></tr>
      ]
    });
    expect(shallowWrapper.find('tbody').text()).toContain('John10Doe20');
  });
});
