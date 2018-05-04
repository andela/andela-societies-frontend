import React from 'react';
import { shallow, mount } from 'enzyme';
import LogActivityForm from '../../../src/containers/forms/LogActivityForm';
import categories from '../../../src/fixtures/categories';

describe('<LogActivityForm />', () => {
  const wrapper = shallow(<LogActivityForm categories={[]} />);

  it('should render withour crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render without crashing', () => {
    const mounted = mount.bind(
      null,
      <LogActivityForm categories={[]} />,
    );
    expect(mounted).not.toThrow();
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
    wrapper.setState({ selectValue: 'Bootcamp Interviews' });
    expect(wrapper.find('SingleInput').length).toEqual(1);
  });

  it('should render the SingleInput with the correct label', () => {
    wrapper.setState({ selectValue: 'Bootcamp Interviews' });
    expect(wrapper.find('SingleInput').dive().find('.formField__label').text()).toEqual('# of interviewees');
  });

  it('should show the <TextArea/> component when it has loaded', () => {
    expect(wrapper.find('TextArea').length).toEqual(1);
  });

  it('should show the <Buttons/> component when it has loaded', () => {
    expect(wrapper.find('Buttons').length).toEqual(2);
  });
});
