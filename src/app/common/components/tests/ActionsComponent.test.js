import React from 'react';
import { shallow } from 'enzyme';
import ActionsComponent from '../ActionsComponent';

describe('<ActionsComponent />', () => {
  const props = {
    id: '31132321',
    onClick: jest.fn(),
  }
  const shallowWrapper = shallow(<ActionsComponent {...props} />);

  it('should have 2 ButtonComponent components', () => {
    expect(shallowWrapper.find('ButtonComponent')).toHaveLength(2);
  });
});
