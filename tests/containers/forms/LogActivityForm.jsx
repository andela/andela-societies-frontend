import React from 'react';
import { shallow, mount } from 'enzyme';
import LogActivityForm from '../../../src/containers/forms/LogActivityForm';

describe('<Stats />', () => {
  it('should render withour crashing', () => {
    expect(mount.bind(null, <LogActivityForm />)).not.toThrow();
  });
  it('should show the <DateField/> component when it has loaded', () => {
    const wrapper = shallow(<LogActivityForm />);
    wrapper.setState({ loading: false });
    const dateComponent = wrapper.find('DateField');
    expect(dateComponent.length).toEqual(1);
  });
  it('should show the <Select/> component when it has loaded', () => {
    const wrapper = shallow(<LogActivityForm />);
    wrapper.setState({ loading: false });
    const selectComponent = wrapper.find('Select');
    expect(selectComponent.length).toEqual(1);
  });
  it('should show the <SingleInput/> component when it has loaded', () => {
    const wrapper = shallow(<LogActivityForm />);
    wrapper.setState({ loading: false });
    const inputComponent = wrapper.find('SingleInput');
    expect(inputComponent.length).toEqual(1);
  });
  it('should show the <TextArea/> component when it has loaded', () => {
    const wrapper = shallow(<LogActivityForm />);
    wrapper.setState({ loading: false });
    const inputComponent = wrapper.find('TextArea');
    expect(inputComponent.length).toEqual(1);
  });
  it('should show the <Buttons/> component when it has loaded', () => {
    const wrapper = shallow(<LogActivityForm />);
    wrapper.setState({ loading: false });
    const inputComponent = wrapper.find('Buttons');
    expect(inputComponent.length).toEqual(2);
  });
});
