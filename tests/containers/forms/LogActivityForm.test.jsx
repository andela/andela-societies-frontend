import React from 'react';
import { shallow, mount } from 'enzyme';
import moment from 'moment';
import { stub } from 'sinon';

import LogActivityForm from '../../../src/containers/forms/LogActivityForm';
import categories from '../../../src/fixtures/categories';
import activity from '../../../src/fixtures/activity';

const successMessage = {
  type: 'success',
  text: 'Activity Logged Successfully',
};

const defaultState = {
  activityTypeId: '',
  date: '',
  description: '',
  errors: {},
  numberOf: '',
  btnText: 'Log',
  formTitle: 'Log An Activity',
};

describe('<LogActivityForm />', () => {
  let shallowWrapper;
  let mounted;
  const createActivity = jest.fn();
  const updateActivity = jest.fn();
  const updateSelectedItem = jest.fn();

  beforeEach((() => {
    shallowWrapper = shallow(<LogActivityForm.WrappedComponent
      categories={categories}
      closeModal={stub()}
      createActivity={createActivity}
    />);

    mounted = mount(<LogActivityForm.WrappedComponent
      updateActivity={updateActivity}
      closeModal={stub()}
      categories={categories}
      createActivity={createActivity}
      selectedItem={activity}
      updateSelectedItem={updateSelectedItem}
    />);
    updateActivity.mockClear();
  }));

  it('should render without crashing', () => {
    expect(shallowWrapper).toHaveLength(1);
  });

  it('should show the <DateField/> component when it has loaded', () => {
    expect(shallowWrapper.find('DateField').length).toEqual(1);
  });

  it('should show the <Select/> component when it has loaded', () => {
    expect(shallowWrapper.find('Select').length).toEqual(1);
  });

  it('should render <Select/> with the correct number of options', () => {
    shallowWrapper.setProps({ categories });
    expect(shallowWrapper.find('Select').dive().find('option').length).toBe(4);
  });

  it('should show the <SingleInput/> component when it has loaded', () => {
    shallowWrapper.setState({ activityTypeId: 'id1' });
    expect(shallowWrapper.find('SingleInput').length).toEqual(1);
  });

  it('should render the SingleInput with the correct label', () => {
    shallowWrapper.setState({ activityTypeId: 'id1' });
    expect(shallowWrapper.find('SingleInput').dive().find('.formField__label').text()).toEqual('# of interviewees');
  });

  it('should show the <TextArea/> component when it has loaded', () => {
    expect(shallowWrapper.find('TextArea').length).toEqual(1);
  });
  it('should show the <Button/> component when it has loaded', () => {
    shallowWrapper.setState({ loading: false });
    const inputComponent = shallowWrapper.find('Button');
    expect(inputComponent.length).toEqual(2);
  });

  it('should reset state on receipt of success message', () => {
    mounted = mount(<LogActivityForm.WrappedComponent
      categories={categories}
      closeModal={() => { }}
      createActivity={() => { }}
      message={successMessage}
    />);
    const currentState = Object.assign({}, defaultState);
    expect(mounted.state()).toEqual(currentState);
  });

  it('should handle change event and update state', () => {
    mounted = mount(<LogActivityForm.WrappedComponent
      categories={categories}
      closeModal={() => { }}
      createActivity={() => { }}
    />);
    const instance = mounted.instance();
    instance.handleChange({ target: { name: 'description', value: 'lorem' } });
    expect(instance.state.description).toEqual('lorem');
  });

  it('should reset state when resetState is called', () => {
    mounted = mount(<LogActivityForm.WrappedComponent
      categories={categories}
      closeModal={() => { }}
      createActivity={() => { }}
    />);
    const instance = mounted.instance();
    jest.spyOn(instance, 'selectedCategory');
    instance.selectedCategory();
    instance.setState({
      activityTypeId: 'id1',
      date: '2018-12-12',
    }, () => {
      instance.resetState();
    });
    expect(instance.state).toEqual(defaultState);
  });

  it('should resetState when canceModal is invoked', () => {
    const instance = shallowWrapper.instance();
    jest.spyOn(instance, 'cancelModal');
    jest.spyOn(instance, 'resetState');
    instance.cancelModal();
    expect(instance.resetState).toHaveBeenCalled();
  });

  it('should run renderValidationError when handleAddEvent is called', () => {
    const instance = shallowWrapper.instance();
    jest.spyOn(instance, 'handleAddEvent');
    jest.spyOn(instance, 'renderValidationError');
    instance.handleAddEvent('date');
    expect(instance.renderValidationError).toHaveBeenCalled();
  });

  it('should run renderValidationError when handleAddEvent is called', () => {
    const instance = shallowWrapper.instance();
    jest.spyOn(instance, 'handleAddEvent');
    jest.spyOn(instance, 'renderValidationError');
    instance.handleAddEvent('date');
    expect(instance.renderValidationError).toHaveBeenCalled();
  });

  it('should add numberOf to errors fields if is not set when bootcamp interviews is selected', () => {
    const instance = shallowWrapper.instance();
    jest.spyOn(instance, 'handleAddEvent');
    shallowWrapper.setState({ activityTypeId: 'id1' });
    instance.handleAddEvent();
    expect(Object.keys(instance.state.errors)).toContain('numberOf');
  });

  it('should call createActivity if data is valid', () => {
    const instance = shallowWrapper.instance();
    const today = moment().format('YYYY-MM-DD');
    jest.spyOn(instance, 'handleAddEvent');
    shallowWrapper.setState({
      activityTypeId: 'id2',
      date: today,
      description: 'Qwerty',
      category: 'Participating in a tech event',
    });
    instance.handleAddEvent();
    expect(createActivity).toHaveBeenCalled();
  });

  it('should populate state with values from selectedItem', () => {
    expect(mounted.state().date).toEqual('November 3, 2017');
  });

  it('should call update activity thunk when submitting a selected activity', () => {
    const instance = mounted.instance();
    jest.spyOn(instance, 'handleAddEvent');
    const today = moment().format('YYYY-MM-DD');

    const selectedItem = {
      activityTypeId: 'id2',
      date: today,
      description: 'Qwerty',
      category: 'Participating in a tech event',
    };
    instance.setState({ ...selectedItem, errors: {} });
    instance.handleAddEvent();
    expect(updateSelectedItem).toHaveBeenCalled();
    expect(updateActivity).toHaveBeenCalled();
  });
});
