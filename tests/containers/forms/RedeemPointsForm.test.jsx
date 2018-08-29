import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';
import RedeemPointsForm from '../../../src/containers/forms/RedeemPointsForm';
import { redemption } from '../../../src/fixtures/redemptions';

describe('<RedeemPointsForm />', () => {
  let shallowWrapper;
  let mountedWrapper;
  const updateRedemption = jest.fn();
  const deselectItem = jest.fn();
  const closeModal = jest.fn();

  beforeEach(() => {
    shallowWrapper = shallow(<RedeemPointsForm.WrappedComponent
      redeemPoints={stub().resolves({})}
      updateRedemption={jest.fn()}
      closeModal={closeModal}
    />);

    mountedWrapper = mount(<RedeemPointsForm.WrappedComponent
      redeemPoints={stub().resolves({})}
      updateRedemption={updateRedemption}
      closeModal={closeModal}
      selectedItem={redemption}
      deselectItem={deselectItem}
    />);
    updateRedemption.mockClear();
  });

  it('should render RedeemPointsForm', () => {
    expect(shallowWrapper).toHaveLength(1);
  });

  it('should change state when handleChange is called also convert points to dollars', () => {
    shallowWrapper.setState({ points: '' });
    const event = {
      target: {
        name: 'points',
        value: '50',
      },
    };
    shallowWrapper.instance().handleChange(event);
    expect(shallowWrapper.state().points).toEqual('50');
    expect(shallowWrapper.state().dollars).toEqual('1.00');
  });

  it('should raise an error if a field is empty', () => {
    const submitButton = shallowWrapper.find('.submitButton');
    shallowWrapper.setState({ center: '', points: '50', reason: 'good enough' });
    submitButton.simulate('click');
    expect(Object.keys(shallowWrapper.state().errors)).toContain('center');
  });

  it('should call redeemPoints thunk when all fields are filled or no errors', () => {
    const submitButton = shallowWrapper.find('.submitButton');
    shallowWrapper.setState({ center: 'Nairobi', points: '50', reason: 'good enough' });
    submitButton.simulate('click');
    expect(Object.keys(shallowWrapper.state().errors)).toHaveLength(0);
  });

  it('should reset state when cancel is clicked', () => {
    const cancel = shallowWrapper.find('.cancelButton');
    shallowWrapper.setState({ center: 'Nairobi', points: '50', reason: 'good enough' });
    cancel.simulate('click');
    expect(shallowWrapper.state().center).toEqual('');
  });

  it('should populate state with values from selectedItem', () => {
    expect(mountedWrapper.state().center).toEqual('Nairobi');
  });

  it('should call update redemption thunk when submitting a selected redemption', () => {
    const instance = mountedWrapper.instance();
    instance.setState({
      center: redemption.center.name,
      points: redemption.value.toString(),
      reason: 'An updated reason',
    });
    instance.handleSubmit();
    expect(updateRedemption).toHaveBeenCalled();
  });

  it('should call closeModal when closing the form', () => {
    const instance = mountedWrapper.instance();
    instance.handleCloseModal();
    expect(closeModal).toHaveBeenCalled();
  });
});
