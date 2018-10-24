// Third party libraries
import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import 'jest-localstorage-mock';

// Components
import Categories from '../../src/containers/Categories';

// Fixtures
import storeFixture from '../../src/fixtures/store';
import categories from '../../src/fixtures/categories';

// constants
import clickActions from '../../src/constants/clickAction';

const store = createMockStore(storeFixture);
const history = { push: () => { }, location: { pathname: '' } };
const deleteCategorySpy = spy();
const handleClick = jest.fn();
const fetchCategories = jest.fn();
const props = {
  categories,
  history,
  fetchCategories,
  deleteCategory: deleteCategorySpy,
  handleClick,
};

const mounted = mount.bind(
  null,
  <Provider store={store}>
    <MemoryRouter>
      <Categories.WrappedComponent
        {...props}
        requesting={false}
      />
    </MemoryRouter>
  </Provider>,
);

let shallowWrapper;

describe('<Categories />', () => {
  beforeEach(() => {
    shallowWrapper = shallow(<Categories.WrappedComponent
      {...props}
      requesting
    />);
  });

  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
    expect(mounted.length).toBe(1);
  });

  it('should render loader when requesting categories', () => {
    shallowWrapper.setProps({ requesting: true });
    expect(shallowWrapper.find('Loader').length).toBe(1);
  });

  it('should render PageHeader', () => {
    expect(shallowWrapper.find('PageHeader').length).toBe(1);
  });

  it('should delete selected category', () => {
    const category =
      {
        description: 'Participating in a press interview for Andela marketing',
        id: 'id2',
        name: 'Press Interview',
        value: 100,
      };

    const instance = shallowWrapper.instance();

    jest.spyOn(instance, 'handleClick');
    instance.handleClick(category.id);
    expect(instance.handleClick).toHaveBeenCalled();
  });

  it('should display SnackBar Component', () => {
    const mountedWrapper = shallowWrapper.setState({
      message: {
        type: 'success',
        text: 'Category Created Successfully',
      },
      categories,
    });

    expect(mountedWrapper.find('SnackBar').length).toBe(1);
  });

  it('should call selectCategory method when an edit clickaction is supplied ', () => {
    const { EDIT } = clickActions;
    const instance = shallowWrapper.instance();
    jest.spyOn(instance, 'selectCategory');
    instance.handleClick(EDIT, 'id2');
    expect(instance.selectCategory).toHaveBeenCalled();
  });

  it('should call promptModal method when an delete clickaction is supplied ', () => {
    const { DELETE } = clickActions;
    const instance = shallowWrapper.instance();
    instance.handleClick(DELETE, 'id2');
    expect(deleteCategorySpy).toBeTruthy();
  });

  it('should select a category when selectCategory is invoked with an id', () => {
    const instance = shallowWrapper.instance();
    instance.selectCategory('eef48c80-43cd-11e8-9362-9801a7ae0330');
    expect(shallowWrapper.state().selectedCategory).toEqual(categories[1]);
  });

  it('should empty state when deselectCategory is invoked ', () => {
    const instance = shallowWrapper.instance();
    instance.selectCategory('eef48c80-43cd-11e8-9362-9801a7ae0330');
    instance.deselectCategory();
    expect(shallowWrapper.state().selectedCategory).toEqual({});
  });
});
