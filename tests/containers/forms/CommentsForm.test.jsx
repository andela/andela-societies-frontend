import React from 'react';
import { shallow, mount } from 'enzyme';
import CommentsForm from '../../../src/containers/forms/CommentsForm';
import { redemption } from '../../../src/fixtures/redemptions';

const defaultState = {
  comment: '',
  errors: [],
};

const event = { preventDefault: () => { } };
const verifyRedemption = jest.fn();
const toggleOpenModal = jest.fn();

describe('<CommentsForm />', () => {
  let shallowWrapper;
  let mountedWrapper;
  beforeEach((() => {
    shallowWrapper = shallow(<CommentsForm.WrappedComponent
      verifyRedemption={verifyRedemption}
      toggleOpenModal={toggleOpenModal}
    />);
    mountedWrapper = mount(<CommentsForm.WrappedComponent
      verifyRedemption={verifyRedemption}
      toggleOpenModal={toggleOpenModal}
    />);
    jest.spyOn(event, 'preventDefault');
    verifyRedemption.mockClear();
    toggleOpenModal.mockClear();
  }));

  it('should render withour crashing', () => {
    expect(shallowWrapper).toHaveLength(1);
  });

  it('should show the <TextArea/> component when it has loaded', () => {
    expect(shallowWrapper.find('TextArea').length).toEqual(1);
  });

  it('should show the <Button/> component when it has loaded', () => {
    shallowWrapper.setState({ loading: false });
    const inputComponent = shallowWrapper.find('Button');
    expect(inputComponent.length).toEqual(2);
  });

  it('should handle change event and update state', () => {
    const instance = mountedWrapper.instance();
    instance.handleChange({ target: { name: 'comment', value: 'lorem' } });
    expect(instance.state.comment).toEqual('lorem');
  });

  it('should reset state when resetState is called', () => {
    const instance = mountedWrapper.instance();
    instance.setState({
      comment: 'Be more specific',
    }, () => {
      instance.resetState();
    });
    expect(instance.state).toEqual(defaultState);
  });

  it('should call verifyRedemption thunk when submitted', () => {
    const wrapper = mount(<CommentsForm.WrappedComponent
      verifyRedemption={verifyRedemption}
      toggleOpenModal={toggleOpenModal}
      selectedItem={redemption}
    />);
    const instance = wrapper.instance();
    instance.setState({ comment: 'Be more specific' });
    instance.handleSubmit();
    expect(verifyRedemption).toHaveBeenCalled();
  });

  it('should display error message if submit is done without comment', () => {
    const wrapper = mount(<CommentsForm.WrappedComponent
      verifyRedemption={verifyRedemption}
      toggleOpenModal={toggleOpenModal}
      selectedItem={redemption}
    />);
    const instance = wrapper.instance();
    instance.setState({ comment: '' });
    instance.handleSubmit();
    expect(instance.state.errors.length).toBe(1);
    expect(instance.state.errors).toContain('comment');
  });

  it('should call toggleOpenModal when handleCloseModal is invoked to close the modal', () => {
    const instance = mountedWrapper.instance();
    instance.handleCloseModal();
    expect(toggleOpenModal).toHaveBeenCalled();
  });
});
