import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

// components
import CreateCategoryForm from '../../../src/containers/forms/CreateCategoryForm';

// fixtures
import categories from '../../../src/fixtures/categories';

const successMessage = {
  type: 'success',
  text: 'Category created Successfully',
};

const defaultState = {
  name: '',
  value: '',
  supportsMultiple: false,
  description: '',
  errors: {},
  formTitle: 'Create a Category',
  btnText: 'Create',
};
const editCategorySpy = spy();
const baseProps = {
  closeModal: () => {},
  createCategory: jest.fn(),
  editCategory: editCategorySpy,
  selectedItem: {},
};

describe('<CreateCategoryForm />', () => {
  let wrapper;
  let mounted;
  beforeEach((() => {
    wrapper = shallow(<CreateCategoryForm.WrappedComponent
      {...baseProps}
    />);
    mounted = mount(<CreateCategoryForm.WrappedComponent
      {...baseProps}
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
    expect(mounted.state()).toEqual(defaultState);
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

  it('should change state when the checkbox is clicked', () => {
    wrapper.setState({ supportsMultiple: true });
    const checkbox = wrapper.find('.create-category-checkbox');
    checkbox.simulate('change');
    expect(wrapper.state().supportsMultiple).toBe(false);
  });

  it('should run createCategory when handleAddEvent is called', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'handleAddEvent');
    instance.setState({
      name: 'Test Category',
      value: '34',
      description: 'Lorem Ipsum',
      supportsMultiple: true,
    }, () => {
      instance.handleAddEvent();
    });
    expect(baseProps.createCategory).toHaveBeenCalled();
  });

  it('should call editCategory when handleAddEvent is called and there is a seletcedItem prop', () => {
    const instance = wrapper.instance();
    const { name, description, value, supportsMultipleParticipants } = categories[0];
    wrapper.setProps({ selectedItem: categories[0] });
    wrapper.setState({ name, description, value, supportsMultiple: supportsMultipleParticipants, errors: {} });
    instance.handleAddEvent();
    expect(baseProps.editCategory).toBeTruthy();
  });
});
