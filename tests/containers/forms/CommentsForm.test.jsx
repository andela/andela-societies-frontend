import React from 'react';
import { shallow, mount } from 'enzyme';
import CommentsForm from '../../../src/containers/forms/CommentsForm';
import { redemption } from '../../../src/fixtures/redemptions';
import { moreInfoText } from '../../../src/fixtures/commentsFormText';
import activity from '../../../src/fixtures/activity';

const defaultState = {
  comment: '',
  errors: {},
  ...moreInfoText,
};

const event = { preventDefault: () => { } };
const verifyRedemption = jest.fn();
const closeModal = jest.fn();
const deselectItem = jest.fn();
const requestMoreInfo = jest.fn();

describe('<CommentsForm />', () => {
  let shallowWrapper;
  let mountedWrapper;
  beforeEach((() => {
    shallowWrapper = shallow(<CommentsForm.WrappedComponent
      verifyRedemption={verifyRedemption}
    />);
    mountedWrapper = mount(<CommentsForm.WrappedComponent
      verifyRedemption={verifyRedemption}
      selectedItem={redemption}
      requestMoreInfo={requestMoreInfo}
    />);
    jest.spyOn(event, 'preventDefault');
    verifyRedemption.mockClear();
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

  it('should call verifyRedemption thunk when redemption is submitted ', () => {
    const instance = mountedWrapper.instance();
    instance.setState({ comment: 'Be more specific' });
    instance.handleSubmit();
    expect(verifyRedemption).toHaveBeenCalled();
  });

  it('should call requestMoreInfo thunk when an activity is submitted ', () => {
    mountedWrapper.setProps({ selectedItem: activity });
    const instance = mountedWrapper.instance();
    instance.setState({ comment: 'Be more specific' });
    instance.handleSubmit();
    expect(requestMoreInfo).toHaveBeenCalled();
  });

  describe('Button Actions', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<CommentsForm.WrappedComponent
        verifyRedemption={verifyRedemption}
        selectedItem={redemption}
        closeModal={closeModal}
        deselectItem={deselectItem}
      />);
    });

    it('should call closeModal prop and resetState function when handleCloseModal is called', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'resetState');
      instance.handleCloseModal();
      expect(closeModal).toHaveBeenCalled();
      expect(instance.resetState).toHaveBeenCalled();
    });

    it('should send verify redemption request and close modal when the form is submitted', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleCloseModal');
      instance.setState({ comment: 'more info required' });
      instance.handleSubmit();
      expect(verifyRedemption).toHaveBeenCalled();
    });

    it('should should not submit in without comment', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleCloseModal');
      instance.handleSubmit();
      expect(Object.keys(instance.state.errors)).toHaveLength(1);
    });
  });
});
