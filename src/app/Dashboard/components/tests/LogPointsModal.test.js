import React from 'react';
import { shallow } from 'enzyme';
import { LogPointsModal } from '../LogPointsModal';

describe('<LogPointsComponent />', () => {
  const setUpWrapper = ({
    categories = [],
  } = {}) => {
    const props = {
      categories,
      loadCategories: jest.fn(),
      handleChange: jest.fn(),
    };
    const shallowWrapper = shallow(<LogPointsModal {...props} />);
    return {
      shallowWrapper,
    };
  };

  it('should submit the log society activity points data', () => {
    const { shallowWrapper } = setUpWrapper();
    const instance = shallowWrapper.instance();
    instance.setState({
      logPoints: false,
    });
    instance.handleSubmit();
    expect(instance.state.logPoints).toBe(false);
  });

  it('should handleChange on the Textfields', () => {
    const { shallowWrapper } = setUpWrapper();
    expect(shallowWrapper.find('#standard-description').simulate('change', { target: { value: 'Description' } }));
  });

  it('should contain Log in points text', () => {
    const { shallowWrapper } = setUpWrapper();
    expect(shallowWrapper.find('.log-points__heading').text()).toEqual('Log in points');
  });
});
