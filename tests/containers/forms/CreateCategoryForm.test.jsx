import React from 'react';
import { shallow, mount } from 'enzyme';
import CreateCategoryForm from '../../../src/containers/forms/CreateCategoryForm';

const successMessage = {
  type: 'success',
  text: 'Category created Successfully',
};

const infoMessage = {
  type: 'info',
  text: 'Sending ...',
};

const defaultState = {
  name: '',
  value: '',
  description: '',
  errors: {},
};

describe('<CreateCategoryForm />', () => {
  let wrapper;
  let mounted;
  beforeEach((() => {
    wrapper = shallow(<CreateCategoryForm.WrappedComponent
      closeModal={() => { }}
      createCategory={() => { }}
    />);
    mounted = mount(<CreateCategoryForm.WrappedComponent
      closeModal={() => { }}
      createCategory={() => { }}
    />);
  }));

  it('should render withour crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should show the <SingleInput/> components when they have loaded', () => {
    wrapper.setState({ name: 'Test', value: '25' });
    expect(wrapper.find('SingleInput').length).toEqual(2);
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
    mounted.setProps({ message: successMessage });
    const currentState = Object.assign({}, defaultState);
    expect(mounted.state()).toEqual(currentState);
  });

  it('should handle change event and update state', () => {
    const instance = mounted.instance();
    instance.handleChange({ target: { name: 'description', value: 'lorem' } });
    expect(instance.state.description).toEqual('lorem');
  });

  it('should reset state when resetState is called', () => {
    const instance = mounted.instance();
    instance.setState({
      name: 'Test Category',
      value: '34',
    }, () => {
      instance.resetState();
    });
    expect(instance.state).toEqual(defaultState);
  });

  it('should call resetState when cancelModal is invoked', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'cancelModal');
    jest.spyOn(instance, 'resetState');
    instance.cancelModal();
    expect(instance.resetState).toHaveBeenCalled();
  });

  it('should run renderValidationError when handleAddEvent is called', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'handleAddEvent');
    jest.spyOn(instance, 'renderValidationError');
    instance.handleAddEvent();
    expect(instance.renderValidationError).toHaveBeenCalled();
  });

  it('should run renderValidationError when handleAddEvent is called', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'handleAddEvent');
    jest.spyOn(instance, 'renderValidationError');
    instance.handleAddEvent();
    expect(instance.renderValidationError).toHaveBeenCalled();
  });
});
