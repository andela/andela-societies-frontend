import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import CategoryCard from '../../../src/components/categories/CategoryCard';
import categories from '../../../src/fixtures/categories';

describe('<CategoryCard />', () => {
  const handleClickSpy = spy();
  const props = {
    page: '/u/categories',
    handleClick: handleClickSpy,
  };
  const wrapper = mount.bind(
    null,
    <CategoryCard {...categories[0]} />,
  );
  let shallowWrapper;
  beforeEach(() => {
    shallowWrapper = shallow(<CategoryCard {...props} {...categories[0]} />);
  });

  it('should render without crashing', () => {
    expect(wrapper).not.toThrowError();
  });

  it('should render at least a description', () => {
    expect(wrapper().find('.activity__description').length).toBe(1);
  });

  it('should render category details', () => {
    expect(wrapper().find('.category').length).toBe(1);
  });

  it('should render delete button on categories page', () => {
    expect(shallowWrapper.find('.deleteCategory__button').length).toBe(1);
  });

  it('should call handleClickSpy prop when one clicks on the delete button', () => {
    const deleteBtn = shallowWrapper.find('.deleteCategory__button');
    deleteBtn.simulate('click');
    expect(handleClickSpy.called).toBeTruthy();
  });

  it('should call handleClickSpy prop when a category card is clicked', () => {
    const categoryCard = shallowWrapper.find('.category');
    categoryCard.simulate('click');
    expect(handleClickSpy.called).toBeTruthy();
  });
});
