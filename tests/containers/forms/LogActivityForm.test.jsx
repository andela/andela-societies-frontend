import React from 'react';
import { shallow, mount } from 'enzyme';
import moment from 'moment';

import LogActivityForm from '../../../src/containers/forms/LogActivityForm';
import categories from '../../../src/fixtures/categories';

const successMessage = {
  type: 'success',
  text: 'Activity Logged Successfully',
};

const infoMessage = {
  type: 'info',
  text: 'Sending ...',
};

const defaultState = {
  activityTypeId: '',
  date: '',
  description: '',
  errors: {},
  message: null,
  numberOf: '',
};

const createActivity = jest.fn();
const event = { preventDefault: () => {} };

describe('<LogActivityForm />', () => {
  let wrapper;
  let mounted;
  beforeEach((() => {
    wrapper = shallow(<LogActivityForm.WrappedComponent
      categories={categories}
      closeModal={() => { }}
      createActivity={createActivity}
    />);
    jest.spyOn(event, 'preventDefault');
  }));

  it('should render withour crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should show the <DateField/> component when it has loaded', () => {
    expect(wrapper.find('DateField').length).toEqual(1);
  });

  it('should show the <Select/> component when it has loaded', () => {
    expect(wrapper.find('Select').length).toEqual(1);
  });

  it('should render <Select/> with the correct number of options', () => {
    wrapper.setProps({ categories });
    expect(wrapper.find('Select').dive().find('option').length).toBe(4);
  });

  it('should show the <SingleInput/> component when it has loaded', () => {
    wrapper.setState({ activityTypeId: 'id1' });
    expect(wrapper.find('SingleInput').length).toEqual(1);
  });

  it('should render the SingleInput with the correct label', () => {
    wrapper.setState({ activityTypeId: 'id1' });
    expect(wrapper.find('SingleInput').dive().find('.formField__label').text()).toEqual('# of interviewees');
  });

  it('should show the <TextArea/> component when it has loaded', () => {
    expect(wrapper.find('TextArea').length).toEqual(1);
  });
  it('should show the <Button/> component when it has loaded', () => {
    wrapper.setState({ loading: false });
    const inputComponent = wrapper.find('Button');
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
    currentState.message = successMessage;
    expect(mounted.state()).toEqual(currentState);
  });

  it('should set message in state if not a success message', () => {
    mounted = mount(<LogActivityForm.WrappedComponent
      categories={categories}
      closeModal={() => { }}
      createActivity={() => { }}
      message={infoMessage}
    />);
    expect(mounted.state().message.type).toEqual('info');
  });

  it('should set message in state', () => {
    mounted = mount(<LogActivityForm.WrappedComponent
      categories={categories}
      closeModal={() => { }}
      createActivity={() => { }}
      message={infoMessage}
    />);
    expect(mounted.state().message.type).toEqual('info');
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

  it('should call preventDefault and resetState when canceModal is invoked', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'cancelModal');
    jest.spyOn(instance, 'resetState');
    instance.cancelModal(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(instance.resetState).toHaveBeenCalled();
  });

  it('should run renderValidationError when handleAddEvent is called', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'handleAddEvent');
    jest.spyOn(instance, 'renderValidationError');
    instance.handleAddEvent(event, 'date');
    expect(instance.renderValidationError).toHaveBeenCalled();
  });

  it('should run renderValidationError when handleAddEvent is called', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'handleAddEvent');
    jest.spyOn(instance, 'renderValidationError');
    instance.handleAddEvent(event, 'date');
    expect(instance.renderValidationError).toHaveBeenCalled();
  });

  it('should add numberOf to errors fields if is not set when bootcamp interviews is selected', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'handleAddEvent');
    wrapper.setState({ activityTypeId: 'id1' });
    instance.handleAddEvent(event);
    expect(Object.keys(instance.state.errors)).toContain('numberOf');
  });

  it('should call createActivity if data is valid', () => {
    const instance = wrapper.instance();
    const today = moment().format('YYYY-MM-DD');
    jest.spyOn(instance, 'handleAddEvent');
    wrapper.setState({
      activityTypeId: 'id2',
      date: today,
      description: 'Qwerty',
    });
    instance.handleAddEvent(event);
    expect(createActivity).toHaveBeenCalled();
  });
});
