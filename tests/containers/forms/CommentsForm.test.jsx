import React from 'react';
import { shallow, mount } from 'enzyme';
import CommentsForm from '../../../src/containers/forms/CommentsForm';
import { redemption } from '../../../src/fixtures/redemptions';
import { moreInfoText } from '../../../src/fixtures/commentsFormText';

const defaultState = {
  comment: '',
  errors: {},
  ...moreInfoText,
};

const selectedItem = {
  id: '1',
  center: 'Nairobi',
  name: 'felix',
  value: '30',
  society: 'istelle',
  category: 'sports',
  points: '20',
  owner: 'Andela',
  description: 'best sports',
  itemType: 'activity',
  reason: '',
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
      selectedItem={selectedItem}
    />);
    mountedWrapper = mount(<CommentsForm.WrappedComponent
      verifyRedemption={verifyRedemption}
      selectedItem={{ ...redemption, rejectClicked: true }}
      requestMoreInfo={requestMoreInfo}
      closeModal={closeModal}
      deselectItem={deselectItem}
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
    mountedWrapper.setProps({ selectedItem: { ...redemption, clickAction: 'rejected' } });
    const instance = mountedWrapper.instance();
    instance.setState({ comment: 'Be more specific' });
    instance.handleSubmit();
    expect(verifyRedemption).toHaveBeenCalled();
  });

  it('should return null the default case when renderItemDetails is invoked with no selected Item', () => {
    const instance = shallowWrapper.instance();
    const emptySelectedItem = {};
    const result = instance.renderItemDetails(emptySelectedItem);
    expect(result).toBeNull();
  });

  it('should return owner with a value as a property when renderItemDetails is invoked with activity case', () => {
    const instance = shallowWrapper.instance();
    const result = instance.renderItemDetails(selectedItem);
    expect(result[3].props.name).toBe('owner');
    expect(result[3].props.content).toBe('Andela');
  });

  it('should return reason with a value as a property when renderItemDetails is invoked with redemption case', () => {
    const newSelectedItem = {
      ...selectedItem,
      itemType: 'redemption',
    };
    shallowWrapper.setProps({
      ...newSelectedItem,
    });
    const instance = shallowWrapper.instance();
    const result = instance.renderItemDetails(newSelectedItem);
    expect(result[4].props.name).toBe('reason');
    expect(result[4].props.content).toBe('felix');
  });

  describe('Button Actions', () => {
    it('should call closeModal prop and resetState function when handleCloseModal is called', () => {
      const instance = mountedWrapper.instance();
      jest.spyOn(instance, 'resetState');
      instance.handleCloseModal();
      expect(closeModal).toHaveBeenCalled();
      expect(instance.resetState).toHaveBeenCalled();
    });

    it('should should not submit in without comment', () => {
      const instance = mountedWrapper.instance();
      jest.spyOn(instance, 'handleCloseModal');
      instance.handleSubmit();
      expect(Object.keys(instance.state.errors)).toHaveLength(1);
    });
  });
});
