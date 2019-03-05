import React from 'react';
import { shallow } from 'enzyme';
import { LogActivityForm } from '../LogPointsModal';

describe('<LogPointsComponent />', () => {
  const setUpWrapper = ({
    categories = [],
  } = {}) => {
    const props = {
      categories,
      loadCategories: jest.fn(),
      handleChange: jest.fn(),
    };
    const shallowWrapper = shallow(<LogActivityForm {...props} />);
    return {
      shallowWrapper,
    };
  };

  it('should submit the log society activity points data', () => {
    const { shallowWrapper } = setUpWrapper();
    const instance = shallowWrapper.instance();
    instance.handleSubmit();
  });

  it('should handleChange on the Textfields', () => {
    const { shallowWrapper } = setUpWrapper();
    const instance = shallowWrapper.instance();
    instance.handleChange();
  });

  it('should contain Log in points text', () => {
    const { shallowWrapper } = setUpWrapper();
    expect(shallowWrapper.find('.log-points__heading').text()).toEqual('Log in points');
  });
});
