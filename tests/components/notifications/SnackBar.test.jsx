import React from 'react';
import { shallow } from 'enzyme';
import SnackBar from '../../../src/components/notifications/SnackBar';

const successMessage = {
  type: 'success',
  text: 'Activity Logged Successfully',
};

const infoMessage = {
  type: 'info',
  text: 'Sending ...',
};

const errorMessage = {
  type: 'error',
  text: 'Not found',
};

const event = { preventDefault: () => {} };

describe('<SnackBar />', () => {
  let wrapper;

  beforeEach(() => {
    jest.spyOn(event, 'preventDefault');
  });

  it('should render success message', () => {
    wrapper = shallow(<SnackBar message={successMessage} />);
    expect(wrapper.find('.success').length).toBe(1);
  });

  it('should render info message', () => {
    wrapper = shallow(<SnackBar message={infoMessage} />);
    expect(wrapper.find('.info').length).toBe(1);
  });

  it('should not show content if show prop is set to false', () => {
    wrapper = shallow(<SnackBar show={false} message={successMessage} />);
    expect(wrapper.find('.show').length).not.toBe(1);
  });

  it('should display close button for errors messages', () => {
    wrapper = shallow(<SnackBar message={errorMessage} />);
    expect(wrapper.find('.snackbar__button').length).toBe(1);
  });

  it('should set show proprety to false when handleClick is called', () => {
    wrapper = shallow(<SnackBar message={errorMessage} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'handleClick');
    instance.handleClick(event);
    expect(instance.state.show).toBe(false);
  });
});
