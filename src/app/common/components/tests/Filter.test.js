import React from 'react';
import { shallow } from 'enzyme';
import Filter from '../Filter';

describe('<NavItemComponent />', () => {
  const filterBy = [
    { name: 'select all', checked: false },
    { name: 'approved', checked: false },
    { name: 'in review', checked: false },
    { name: 'rejected', checked: false },
    { name: 'pending', checked: false },
  ];

  const props = {
    filterBy,
    handleClick: () => jest.fn(),
    show: false,
    filterRef: React.createRef(),
  };
  const shallowWrapper = shallow(<Filter {...props} />);

  it('should have five inputs', () => {
    expect(shallowWrapper.find('input')).toHaveLength(5);
  });
});
