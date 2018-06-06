import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';
import RedeemPointsForm from '../../../src/containers/forms/RedeemPointsForm';

describe('<RedeemPointsForm />', () => {
  const wrapper = shallow(<RedeemPointsForm.WrappedComponent
    redeemPoints={stub().resolves({})}
    closeModal={stub()}
  />);

  it('should render RedeemPointsForm', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should change state when handleChange is called also convert points to dollars', () => {
    wrapper.setState({ points: '' });
    const event = {
      target: {
        name: 'points',
        value: '50',
      },
    };
    wrapper.instance().handleChange(event);
    expect(wrapper.state().points).toEqual('50');
    expect(wrapper.state().dollars).toEqual('1.00');
  });

  it('should raise an error if a field is empty', () => {
    const submitButton = wrapper.find('.submitButton');
    wrapper.setState({ center: '', points: '50', reason: 'good enough' });
    submitButton.simulate('click');
    expect(wrapper.state().errors).toEqual(['center']);
  });

  it('should call redeemPoints thunk when all fields are filled or no errors', () => {
    const submitButton = wrapper.find('.submitButton');
    wrapper.setState({ center: 'Nairobi', points: '50', reason: 'good enough' });
    submitButton.simulate('click');
    expect(wrapper.state().errors).toHaveLength(0);
  });

  it('should reset state when cancel is clicked', () => {
    const cancel = wrapper.find('.cancelButton');
    wrapper.setState({ center: 'Nairobi', points: '50', reason: 'good enough' });
    cancel.simulate('click');
    expect(wrapper.state().center).toEqual('');
  });
});
